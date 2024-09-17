import { Flex } from '@orioro/react-ui-core'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useParams } from 'react-router-dom'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'

export function PaisReport() {
  const { indicatorId, geoId } = useParams()

  const DATA = useData()

  return (
    <Flex direction="column">
      <Flex direction="column" gap="5">
        <Heading as="h3">Comparativo entre estados:</Heading>
        <IndicatorBarChart indicatorId={indicatorId} entries={DATA.ufs} />
      </Flex>
    </Flex>
  )
}
