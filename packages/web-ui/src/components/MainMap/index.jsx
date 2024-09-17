import React, { useCallback } from 'react'
import { GeoJsonMap } from '@orioro/react-map-util'

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
import { EvenSpacedList, Flex } from '@orioro/react-ui-core'
import { assetUrl, fmtIndicator } from '../../lib/data'
import { Heading } from '@radix-ui/themes'

function geoJsonFromGeo(geo, DATA) {
  switch (geo.type) {
    case 'pais': {
      return 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&intrarregiao=UF'
    }

    case 'uf': {
      return async function () {
        const regioesGeoJson = await fetch(
          assetUrl(`/geo/regioes-saude-simplified.json`),
        ).then((res) => res.json())

        return {
          ...regioesGeoJson,
          features: regioesGeoJson.features.filter(
            (feat) => feat.properties?.est_id + '' === geo.id,
          ),
        }
      }
    }

    case 'regiao_de_saude': {
      return async function () {
        const regiao_municipios = DATA.DTB.filter(
          (entry) => entry.regiao_de_saude_id + '' === geo.id + '',
        )

        const regiao_municipios_dict = Object.fromEntries(
          regiao_municipios.map((mun) => [mun.municipio_id, true]),
        )

        const estadoGeoJson = await fetch(
          `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${regiao_municipios[0].estado_id}?formato=application/vnd.geo+json&intrarregiao=municipio`,
        ).then((res) => res.json())

        return {
          ...estadoGeoJson,
          features: estadoGeoJson.features.filter(
            (feat) => regiao_municipios_dict[feat.properties.codarea],
          ),
        }
      }
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
      return DATA.regiao_de_saude
    }
    case 'regiao_de_saude': {
      return DATA.municipio
    }
    case 'municipio': {
      return DATA.municipio
    }
  }
}

function getFeatureIdFromGeo(geo) {
  switch (geo.type) {
    case 'pais': {
      return (feature) => feature.properties.codarea
    }
    case 'uf': {
      return (feature) => feature.properties.reg_id + ''
    }
    case 'regiao_de_saude': {
      return (feature) => feature.properties.codarea
    }
    case 'municipio': {
      return (feature) => feature.properties.codarea
    }
    default: {
      throw new Error(`Unable to get feature id from ${geo.type}: ${geo.id}`)
    }
  }
}

function dataContextFromGeo(geo, indicatorId, DATA) {
  const colorScaleRange =
    COLOR_SCALES[get(DATA, `indicators.${indicatorId}.color`)] ||
    COLOR_SCALES.blue

  switch (geo.type) {
    case 'regiao_de_saude': {
      //
      // Load all municipios from the given UF
      //
      const regiao = DATA.regiao_de_saude[geo.id]
      const uf_municipios = DATA.municipios.filter(
        (mun) => mun.uf_id === regiao.uf_id,
      )

      return () => {
        const fillColorScale = scaleSequential(
          extent(uf_municipios, (mun) => mun[indicatorId]),
          colorScaleRange,
        )

        return {
          fillColorScale,
        }
      }
    }
    case 'municipio': {
      //
      // Load all municipios from the given UF
      //
      const municipio = DATA.municipio[geo.id]
      const uf_municipios = DATA.municipios.filter(
        (mun) => mun.uf_id === municipio.uf_id,
      )

      return () => {
        const fillColorScale = scaleSequential(
          extent(uf_municipios, (mun) => mun[indicatorId]),
          colorScaleRange,
        )

        return {
          fillColorScale,
        }
      }
    }

    //
    // Scale among
    //
    case 'pais':
    case 'uf':
    default: {
      return (geoJson) => {
        const fillColorScale = scaleSequential(
          extent(
            geoJson.features,
            (feature) => feature.properties[indicatorId],
          ),
          colorScaleRange,
        )

        return {
          fillColorScale,
        }
      }
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

function getTooltipContents(geo, DATA) {
  return (
    <Flex direction="column" gap="4">
      <Heading as="h4" size="4">
        {geo.properties.name}
      </Heading>
      <EvenSpacedList columns={3} gap="3">
        {Object.values(DATA.indicators).map(({ id, shortName }) => (
          <div
            style={{
              fontSize: '.8rem',
            }}
          >
            <strong>{shortName}:</strong>
            <br />
            {fmtIndicator(DATA.indicators[id], geo.properties[id])}
          </div>
        ))}
      </EvenSpacedList>
    </Flex>
  )
}

export function MainMap({ geo, onSetGeo, indicator = 'INEAB' }) {
  const DATA = useData()

  const tooltip = useCallback((geo) => getTooltipContents(geo, DATA), [DATA])

  return (
    <GeoJsonMap
      geoJson={geoJsonFromGeo(geo, DATA)}
      metadata={metadataFromGeo(geo, DATA)}
      getTooltipContents={tooltip}
      dataContext={dataContextFromGeo(geo, indicator, DATA)}
      getFeatureId={getFeatureIdFromGeo(geo)}
      getGeographyProps={(feature, { fillColorScale }) => {
        const fill = fillColorScale(feature.properties[indicator]) || 'white'
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
                  type: 'regiao_de_saude',
                  id: feature.properties.reg_id + '',
                })
                break
              }
              case 'regiao_de_saude': {
                onSetGeo({
                  type: 'municipio',
                  id: feature.properties.codarea,
                })
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
