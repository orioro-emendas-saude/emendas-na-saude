import { EvenSpacedList, Flex } from '@orioro/react-ui-core'
import { useData } from '../DataContext'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useParams } from 'react-router-dom'
import { Heading } from '@radix-ui/themes'

export function MunicipioAllReport() {
  const DATA = useData()

  const { geoId } = useParams()

  const municipio = DATA.municipio[geoId]

  const municipioUf = DATA.uf[municipio.uf_id]
  const municipioRegiao = DATA.regiao_de_saude[municipio.regiao_de_saude_id]

  return (
    <EvenSpacedList
      columns={{
        xs: 1,
        md: 2,
      }}
    >
      {Object.values(DATA.indicators).map((indicator) => (
        <Flex direction="column">
          <Heading as="h2">{indicator.name}</Heading>
          <IndicatorBarChart
            indicatorId={indicator.id}
            entries={[
              municipio,
              municipioUf,
              {
                ...municipioRegiao,
                name: `CIR ${municipioRegiao.name}`,
              },
              DATA.brasil[indicator.id]
                ? { ...DATA.brasil, name: 'Brasil' }
                : null,
            ].filter(Boolean)}
            highlights={{
              [municipio.id]: true,
            }}
          />
        </Flex>
      ))}
    </EvenSpacedList>
  )
}
