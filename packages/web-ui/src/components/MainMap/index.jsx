import React from 'react'
import { GeoJsonMap } from '@orioro/react-map-util'
import { loadData, loadUfs, loadMunicipios } from '../../lib/data'

import { scaleSequential } from 'd3-scale'
import { extent } from 'd3-array'
import {
  interpolateBlues,
  interpolateGreens,
  interpolateOranges,
  interpolatePurples,
  interpolateReds,
} from 'd3-scale-chromatic'
import { useData } from '../DataContext'
import { get } from 'lodash-es'
// import { color } from 'd3-color'

function geoJsonFromGeo(geo) {
  switch (geo.type) {
    case 'pais': {
      return 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&intrarregiao=UF'
    }
    case 'uf': {
      return `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${geo.id}?formato=application/vnd.geo+json&intrarregiao=municipio`
    }
    case 'municipio': {
      return `https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${geo.id}?formato=application/vnd.geo+json`
    }
  }
}

function metadataFromGeo(geo, DATA) {
  switch (geo.type) {
    case 'pais': {
      return DATA.uf
    }
    case 'uf': {
      return DATA.municipio
    }
  }
}

function getFeatureIdFromGeo(geo) {
  switch (geo.type) {
    case 'uf': {
      return (feature) => feature.properties.codarea
    }
    case 'pais':
    default: {
      return (feature) => feature.properties.codarea
    }
  }
}

export const COLOR_SCALES = {
  blue: interpolateBlues,
  green: interpolateGreens,
  orange: interpolateOranges,
  purple: interpolatePurples,
  red: interpolateReds,
}

export function MainMap({ geo, onSetGeo, indicator = 'INEAB' }) {
  const DATA = useData()

  return (
    <GeoJsonMap
      geoJson={geoJsonFromGeo(geo)}
      metadata={metadataFromGeo(geo, DATA)}
      getTooltipContents={null}
      dataContext={(geoJson) => {
        const fillColorScale = scaleSequential(
          extent(geoJson.features, (feature) => feature.properties[indicator]),
          // interpolateBlues,
          COLOR_SCALES[get(DATA, `indicators.${indicator}.color`)] ||
            COLOR_SCALES.blue,
        )

        return {
          fillColorScale,
        }
      }}
      getFeatureId={getFeatureIdFromGeo(geo)}
      getGeographyProps={(feature, { fillColorScale }) => {
        const fill = fillColorScale(feature.properties[indicator])
        return {
          fill,
          style: {
            cursor: 'pointer',
          },
          onClick: () => {
            switch (geo.type) {
              case 'pais': {
                onSetGeo({
                  type: 'uf',
                  id: feature.properties.codarea,
                })
                break
              }
              case 'uf': {
                onSetGeo({
                  type: 'municipio',
                  id: feature.properties.codarea,
                })
                break
              }
              default: {
                console.warn('no action')
              }
            }
          },
        }
      }}
    />
  )
}
