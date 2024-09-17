import { Flex } from '@orioro/react-ui-core'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useParams } from 'react-router-dom'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'

export function MunicipioReport() {
  const { indicatorId, geoId } = useParams()

  const DATA = useData()

  const municipio = DATA.municipio[geoId]

  return (
    <Flex direction="column">
      <Flex direction="column" gap="5">
        <Heading as="h3">Comparativo entre municípios do estado:</Heading>
        <IndicatorBarChart
          geoType="municipio"
          indicatorId={indicatorId}
          entries={DATA.municipios.filter(
            (mun) => mun.uf_id === municipio.uf_id,
          )}
          highlights={{
            [geoId]: true,
          }}
        />
      </Flex>
    </Flex>
  )
}
