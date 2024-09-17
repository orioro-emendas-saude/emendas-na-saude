import { GeoJsonMap } from '.'
import { scaleSequential } from 'd3-scale'
import { extent } from 'd3-array'
import { interpolateBlues } from 'd3-scale-chromatic'
import { color } from 'd3-color'

export default {
  title: 'GeoJsonMap',
}

export const Basic = () => {
  return (
    <GeoJsonMap
      geoJson="https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&intrarregiao=UF"
      getFeatureId={(geo) => geo.properties.codarea}
      metadata={[
        async () => {
          const data = await fetch(
            'https://servicodados.ibge.gov.br/api/v3/agregados/4714/periodos/-6/variaveis/93?localidades=N3[all]',
          ).then((res) => {
            if (!res.ok) {
              throw Error(res.statusText)
            }
            return res.json()
          })

          return Object.fromEntries(
            data[0].resultados[0].series.map(({ localidade, serie }) => [
              localidade.id,
              { populacao: parseInt(serie['2022']) },
            ]),
          )
        },
      ]}
      dataContext={(geoJson) => {
        const populacaoScale = scaleSequential(
          extent(geoJson.features, (feature) => feature.properties?.populacao),
          interpolateBlues,
        )

        return {
          populacaoScale,
        }
      }}
      style={{
        fontFamily: 'sans-serif',
        border: '1px solid skyblue',
      }}
      getTooltipContents={(geo) => {
        return JSON.stringify(geo.properties)
      }}
      getGeographyProps={(geo, { populacaoScale }) => {
        const fill = populacaoScale(geo.properties.populacao)

        return {
          fill,
          stroke: color(fill).copy({ opacity: 0.8 }).rgb(),
        }
      }}
    />
  )
}
