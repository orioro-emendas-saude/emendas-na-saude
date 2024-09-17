import { useQuery } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { fitGeoJson } from '.'
import { LoadingOverlay, useFetch } from '@orioro/react-ui-core'

export default {
  title: 'fitGeoJson',
}

export const Basic = () => {
  const [{ status, result }] = useFetch(
    useCallback(
      () =>
        fitGeoJson(
          'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&intrarregiao=UF',
          {
            rewind: true,
          },
        ),
      [],
    ),
  )

  const width = 400
  const height = 400

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
      }}
    >
      {status === 'loading' && <LoadingOverlay message="Carregando dados" />}
      {status === 'success' && (
        <ComposableMap
          width={width}
          height={height}
          projection={result.projection}
        >
          <Geographies geography={result.data}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="none"
                  stroke="#000"
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      )}
    </div>
  )
}
