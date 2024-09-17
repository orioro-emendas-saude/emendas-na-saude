import { geoMercator, GeoProjection } from 'd3-geo'
import { rewind } from '@turf/turf'
import { JsonObject } from 'type-fest'

type FitGeoJsonOptions = {
  width: number
  height: number
  rewind: boolean
  projection: () => GeoProjection
}

const DEFAULT_OPTIONS: FitGeoJsonOptions = {
  width: 400,
  height: 400,
  rewind: false,
  projection: geoMercator,
}

export async function fitGeoJson(
  geoJsonOrUrl: string | JsonObject,
  optionsInput: Partial<FitGeoJsonOptions> = DEFAULT_OPTIONS,
) {
  const options: FitGeoJsonOptions = {
    ...DEFAULT_OPTIONS,
    ...optionsInput,
  }

  const rawData =
    typeof geoJsonOrUrl === 'string'
      ? await fetch(geoJsonOrUrl).then((res) => {
          if (!res.ok) {
            throw Error(res.statusText)
          }
          return res.json()
        })
      : geoJsonOrUrl

  const geoJson = options.rewind
    ? rewind(rawData, {
        reverse: true,
      })
    : rawData

  const projection = options
    .projection()
    .fitSize([options.width, options.height], geoJson)

  return { geoJson, projection }
}
