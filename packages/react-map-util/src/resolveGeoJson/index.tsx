import { JsonObject } from 'type-fest'
import { Feature, GeoJsonObject } from 'geojson'
import { rewind as applyRewind } from '@turf/turf'
import { ResolvableData } from '../types'

type ResolvedMetadataSource = Record<string, Record<string, any>>

type MetadataSource = ResolvableData<ResolvedMetadataSource>

export type ResolveGeoJsonOptions = {
  geoJson: ResolvableData<GeoJsonObject>
  metadata: MetadataSource | MetadataSource[]
  getFeatureId: (feature: Feature) => string | null
  rewind?: boolean
}

async function maybeFetchJson<T extends Object = JsonObject>(
  data: string | (() => Promise<T>) | T,
): Promise<T> {
  switch (typeof data) {
    case 'string': {
      return fetch(data).then((res) => res.json())
    }
    case 'function': {
      return data()
    }
    default: {
      return data
    }
  }
}

function resolveFeatureProperties({
  feature,
  resolvedMetadata,
  getFeatureId,
}: {
  feature: Feature
  resolvedMetadata: ResolvedMetadataSource[]
  getFeatureId: ResolveGeoJsonOptions['getFeatureId']
}): Feature {
  const featureId = getFeatureId(feature)

  return {
    ...feature,
    properties: {
      id: featureId,
      ...(feature.properties || {}),
      ...(featureId && Array.isArray(resolvedMetadata)
        ? Object.fromEntries(
            resolvedMetadata.reduce(
              (acc, source) => {
                const featureMeta = source[featureId]

                if (!featureMeta) {
                  return acc
                } else {
                  if (typeof featureMeta !== 'object') {
                    throw new Error(
                      `Invalid featureMeta. featureId: ${featureId}; featureMeta: ${featureMeta}`,
                    )
                  }

                  return [...acc, ...Object.entries(featureMeta)]
                }
              },
              [] as [PropertyKey, any][],
            ),
          )
        : {}),
    },
  }
}

function defaultGetFeatureId(feature: Feature): string | null {
  return feature.properties?.id
}

export async function resolveGeoJson({
  geoJson: geoJsonSrc,
  metadata = [],
  getFeatureId = defaultGetFeatureId,
  rewind,
}: ResolveGeoJsonOptions) {
  const [rawGeoJson, resolvedMetadata] = await Promise.all([
    maybeFetchJson<GeoJSON>(geoJsonSrc),
    Promise.all(
      (Array.isArray(metadata) ? metadata : [metadata].filter(Boolean)).map(
        (dataSource) => maybeFetchJson<ResolvedMetadataSource>(dataSource),
      ),
    ),
  ])

  const geoJson = rewind
    ? applyRewind(rawGeoJson, {
        reverse: true,
      })
    : rawGeoJson

  switch (geoJson.type) {
    case 'Feature': {
      return resolveFeatureProperties({
        feature: geoJson,
        getFeatureId,
        resolvedMetadata,
      })
    }
    case 'FeatureCollection': {
      return {
        ...geoJson,
        features: geoJson.features.map((feature) =>
          resolveFeatureProperties({
            feature,
            getFeatureId,
            resolvedMetadata,
          }),
        ),
      }
    }
    default: {
      return geoJson
    }
  }
}
