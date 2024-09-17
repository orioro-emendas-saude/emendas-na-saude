import { Flex } from '@orioro/react-ui-core'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'
import { DataTable } from '../DataTable'
import { get } from 'lodash-es'
import { addRank } from '../../lib/data'

export function UfReport() {
  const { indicatorId, geoId } = useParams()

  const navigate = useNavigate()

  const DATA = useData()

  const uf = DATA.uf[geoId]

  const ufRegioes = addRank(
    DATA.regioes_de_saude.filter((regiao) => regiao.uf_id === geoId),
    indicatorId,
    DATA.indicators[indicatorId].rank,
  )

  const ufMunicipios = addRank(
    DATA.municipios.filter((municipio) => municipio.uf_id === geoId),
    indicatorId,
    DATA.indicators[indicatorId].rank,
  )

  return (
    <Flex direction="column">
      <Flex direction="column" gap="5">
        <Heading as="h3">Comparativo com demais estados:</Heading>
        <IndicatorBarChart
          geoType="uf"
          indicatorId={indicatorId}
          entries={DATA.ufs}
          highlights={{
            [geoId]: true,
          }}
        />
      </Flex>

      <Flex direction="column" gap="5">
        <Heading as="h3">Comparativo entre regiões de saúde:</Heading>
        <IndicatorBarChart
          geoType="regiao_de_saude"
          indicatorId={indicatorId}
          entries={ufRegioes}
          highlights={{
            [geoId]: true,
          }}
        />
      </Flex>

      <Flex direction="column" gap="5">
        <Heading as="h3">Comparativo entre municípios:</Heading>
        <IndicatorBarChart
          indicatorId={indicatorId}
          geoType="municipio"
          entries={ufMunicipios}
          highlights={{
            [geoId]: true,
          }}
        />
      </Flex>

      <Flex
        direction={{
          xs: 'column',
          md: 'row',
        }}
        gap="5"
      >
        <Flex direction="column" gap="5">
          <Heading as="h3">
            20 Regiões de saúde com situação mais crítica:
          </Heading>
          <DataTable
            data={ufRegioes.slice(0, 20)}
            schema={{
              [`${indicatorId}_rank`]: {
                label: 'Posição',
              },
              name: {
                label: 'Região de Saúde',
              },
              [indicatorId]: {
                label: get(DATA, `indicators.${indicatorId}.shortName`),
              },
            }}
          />
        </Flex>
        <Flex direction="column" gap="5">
          <Heading as="h3">20 Municípios com situação mais crítica:</Heading>
          <DataTable
            data={ufMunicipios.slice(0, 20)}
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
    </Flex>
  )
}
