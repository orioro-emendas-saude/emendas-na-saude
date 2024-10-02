import { Flex } from '@orioro/react-ui-core'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useParams } from 'react-router-dom'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'

export function MunicipioReport() {
  const { indicatorId, geoId } = useParams()

  const DATA = useData()

  const municipio = DATA.municipio[geoId]

  const municipioUf = DATA.uf[municipio.uf_id]
  const municipioRegiao = DATA.regiao_de_saude[municipio.regiao_de_saude_id]

  return (
    <Flex direction="column">
      <Flex direction="column" gap="5">
        <Heading as="h3">
          Comparativo com Região de Saúde, {municipioUf.name} e Brasil
        </Heading>
        <IndicatorBarChart
          indicatorId={indicatorId}
          entries={[
            municipio,
            municipioUf,
            {
              ...municipioRegiao,
              name: `CIR ${municipioRegiao.name}`,
            },
            DATA.brasil[indicatorId]
              ? { ...DATA.brasil, name: 'Brasil' }
              : null,
          ].filter(Boolean)}
          highlights={{
            [municipio.id]: true,
          }}
        />
      </Flex>
    </Flex>
  )
}
