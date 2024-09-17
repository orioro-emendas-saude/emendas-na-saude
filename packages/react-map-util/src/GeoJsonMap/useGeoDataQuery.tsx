import { GeoJsonObject } from 'geojson'
import { ResolvableData } from '../types'
import { resolveGeoJson, ResolveGeoJsonOptions } from '../resolveGeoJson'
import { Merge } from 'type-fest'
import { useFetch } from '@orioro/react-ui-core'
import { useCallback } from 'react'
import { geoMercator, GeoProjection } from 'd3-geo'

export function useGeoDataQuery(
  geoJsonOrUrl: ResolvableData<GeoJsonObject>,
  {
    metadata,
    getFeatureId,
    dataContext,
    projection = geoMercator,
    width = 400,
    height = 400,
  }: Merge<
    ResolveGeoJsonOptions,
    {
      dataContext?: (geoJson: GeoJsonObject) => Record<string, any>
      projection?: () => GeoProjection
      width?: number
      height?: number
    }
  >,
) {
  return useFetch(
    useCallback(async () => {
      const geoJson = await resolveGeoJson({
        geoJson: geoJsonOrUrl,
        metadata,
        getFeatureId,
        rewind: true,
      })

      const context =
        typeof dataContext === 'function' ? dataContext(geoJson) : {}

      return {
        geoJson,
        context: {
          projection: projection().fitSize([width, height], geoJson),
          ...context,
        },
      }
    }, [geoJsonOrUrl, metadata, dataContext]),
  )
}
