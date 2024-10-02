import { Flex } from '@orioro/react-ui-core'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useParams } from 'react-router-dom'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'
import { DataTable } from '../DataTable'
import { get } from 'lodash-es'
import { addRank } from '../../lib/data'

export function RegiaoReport() {
  const { indicatorId, geoId } = useParams()

  const DATA = useData()

  const regiao = DATA.regiao_de_saude[geoId]

  const regiaoUf = DATA.uf[regiao.uf_id]

  const regiaoMunicipios = addRank(
    DATA.municipios.filter(
      (municipio) => municipio.regiao_de_saude_id === geoId,
    ),
    indicatorId,
    DATA.indicators[indicatorId].rank,
  )

  return (
    <Flex direction="column">
      <Flex direction="column" gap="5">
        <Heading as="h3">Comparativo com {regiaoUf.name} e Brasil</Heading>
        <IndicatorBarChart
          indicatorId={indicatorId}
          entries={[
            regiao,
            regiaoUf,
            DATA.brasil[indicatorId]
              ? { ...DATA.brasil, name: 'Brasil' }
              : null,
          ].filter(Boolean)}
          highlights={{
            [regiao.id]: true,
          }}
        />
      </Flex>

      <Flex direction="column" gap="5">
        <Heading as="h3">Municípios da região de saúde:</Heading>
        <DataTable
          data={regiaoMunicipios}
          schema={{
            [`${indicatorId}_rank`]: {
              label: 'Posição',
            },
            name: {
              label: 'Município',
            },
            [indicatorId]: {
              label: get(DATA, `indicators.${indicatorId}.shortName`),
            },
          }}
        />
      </Flex>
    </Flex>
  )
}
