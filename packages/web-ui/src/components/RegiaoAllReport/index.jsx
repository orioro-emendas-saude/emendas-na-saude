import { Flex } from '@orioro/react-ui-core'
import { useData } from '../DataContext'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useParams } from 'react-router-dom'
import { Heading } from '@radix-ui/themes'
import { PrintableEvenSpacedList } from '../PrintableEvenSpacedList'

export function RegiaoAllReport() {
  const DATA = useData()

  const { geoId } = useParams()

  const regiao = DATA.regiao_de_saude[geoId]

  const regiaoUf = DATA.uf[regiao.uf_id]

  return (
    <PrintableEvenSpacedList
      columns={{
        xs: 1,
        md: 2,
      }}
    >
      {Object.values(DATA.indicators).map((indicator) => (
        <Flex direction="column" key={indicator.id}>
          <Heading as="h2">{indicator.name}</Heading>
          <IndicatorBarChart
            indicatorId={indicator.id}
            entries={[
              regiao,
              regiaoUf,
              DATA.brasil[indicator.id]
                ? { ...DATA.brasil, name: 'Brasil' }
                : null,
            ].filter(Boolean)}
            highlights={{
              [regiao.id]: true,
            }}
          />
        </Flex>
      ))}
    </PrintableEvenSpacedList>
  )
}
