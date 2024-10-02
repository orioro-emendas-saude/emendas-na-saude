import { Flex, ShadowExpandable } from '@orioro/react-ui-core'
import { IndicatorBarChart } from '../IndicatorBarChart'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'
import { DataTable } from '../DataTable'
import { get } from 'lodash-es'
import { addRank, fmtIndicator } from '../../lib/data'

export function UfReport() {
  const { indicatorId, geoId } = useParams()

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
      <Flex
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        {DATA.brasil[indicatorId] && (
          <Flex
            direction="column"
            gap="5"
            width={{
              xs: '100%',
              md: '50%',
            }}
          >
            <Heading as="h3">Comparativo com Brasil</Heading>
            <IndicatorBarChart
              geoType="uf"
              indicatorId={indicatorId}
              entries={[uf, { ...DATA.brasil, name: 'Brasil' }]}
              highlights={{
                [geoId]: true,
              }}
            />
          </Flex>
        )}

        <Flex
          direction="column"
          gap="5"
          width={{
            xs: '100%',
            md: '50%',
          }}
        >
          <Heading as="h3">Indicadores do estado:</Heading>
          <DataTable
            data={Object.values(DATA.indicators).map((indicator) => ({
              name: indicator.shortName,
              value: fmtIndicator(
                DATA.indicators[indicator.id],
                uf[indicator.id],
              ),
            }))}
            schema={{
              name: {
                label: 'Indicador',
              },
              value: {
                label: 'Valor',
              },
            }}
          />
        </Flex>
      </Flex>

      <Flex direction="column" gap="5">
        <Heading as="h3">Regiões de saúde do estado:</Heading>

        <ShadowExpandable collapsedHeight={800}>
          <DataTable
            data={ufRegioes}
            schema={{
              [`${indicatorId}_rank`]: {
                label: 'Posição',
              },
              name: {
                label: 'Região de Saúde',
                fmtValue: (value, entry) => (
                  <Link to={`/mapa/${indicatorId}/regiao_de_saude/${entry.id}`}>
                    {value}
                  </Link>
                ),
              },
              [indicatorId]: {
                label: get(DATA, `indicators.${indicatorId}.shortName`),
                fmtValue: (value) =>
                  fmtIndicator(DATA.indicators[indicatorId], value),
              },
            }}
          />
        </ShadowExpandable>
      </Flex>

      <Flex direction="column" gap="5">
        <Heading as="h3">Municípios do estado:</Heading>

        <ShadowExpandable collapsedHeight={800}>
          <DataTable
            data={ufMunicipios}
            schema={{
              [`${indicatorId}_rank`]: {
                label: 'Posição',
              },
              name: {
                label: 'Município',
                fmtValue: (value, entry) => (
                  <Link to={`/mapa/${indicatorId}/municipio/${entry.id}`}>
                    {value}
                  </Link>
                ),
              },
              [indicatorId]: {
                label: get(DATA, `indicators.${indicatorId}.shortName`),
                fmtValue: (value) =>
                  fmtIndicator(DATA.indicators[indicatorId], value),
              },
            }}
          />
        </ShadowExpandable>
      </Flex>
    </Flex>
  )
}
