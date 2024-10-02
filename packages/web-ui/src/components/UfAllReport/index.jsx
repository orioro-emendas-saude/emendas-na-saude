import { EvenSpacedList, Flex } from '@orioro/react-ui-core'
import { useData } from '../DataContext'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useParams } from 'react-router-dom'
import { Heading } from '@radix-ui/themes'

export function UfAllReport() {
  const DATA = useData()

  const { geoId } = useParams()

  const uf = DATA.uf[geoId]

  return (
    <EvenSpacedList
      columns={{
        xs: 1,
        md: 2,
      }}
    >
      {Object.values(DATA.indicators).map((indicator) =>
        DATA.brasil[indicator.id] ? (
          <Flex direction="column">
            <Heading as="h2">{indicator.name}</Heading>

            <IndicatorBarChart
              geoType="uf"
              indicatorId={indicator.id}
              entries={[uf, { ...DATA.brasil, name: 'Brasil' }]}
              highlights={{
                [uf.id]: true,
              }}
            />
          </Flex>
        ) : null,
      )}
    </EvenSpacedList>
  )
}
