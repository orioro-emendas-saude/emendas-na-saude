import { Flex } from '@orioro/react-ui-core'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useParams } from 'react-router-dom'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'

export function UfReport() {
  const { indicatorId, geoId } = useParams()

  const DATA = useData()

  return (
    <Flex direction="column">
      <Flex direction="column" gap="5">
        <Heading as="h3">Comparativo entre municípios:</Heading>
        <IndicatorBarChart
          indicatorId={indicatorId}
          entries={DATA.municipios.filter(
            (municipio) => municipio.uf_id === geoId,
          )}
          highlights={{
            [geoId]: true,
          }}
        />
      </Flex>
    </Flex>
  )
}
