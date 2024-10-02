import { Flex, Output } from '@orioro/react-ui-core'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'
import { get } from 'lodash-es'
import { useParams } from 'react-router-dom'
import { addRank, fmtIndicator } from '../../lib/data'
import { IndicatorRankBadge } from '../IndicatorRankBadge'
import { IndicatorAdditionalFields } from '../IndicatorAdditionalFields'

export function MunicipioSummary({ id }) {
  const { indicatorId } = useParams()

  const DATA = useData()

  const ufMunicipios = addRank(
    DATA.municipios.filter((mun) => mun.uf_id === DATA.municipio[id].uf_id),
    indicatorId,
    DATA.indicators[indicatorId].rank,
  )

  return (
    <Flex direction="column">
      <Heading as="h1" size="8">
        {get(DATA, `municipio.${id}.name`)}
      </Heading>

      <Flex gap="2">
        <Output
          schema={{
            type: 'text',
          }}
          label="População"
          value={get(DATA, `municipio.${id}.populacao`)}
        />

        <Output
          schema={{
            type: 'text',
          }}
          label={get(DATA, `indicators.${indicatorId}.shortName`)}
          value={
            <Flex direction="row" alignItems="center">
              <div>
                {fmtIndicator(
                  DATA.indicators[indicatorId],
                  get(DATA, `municipio.${id}.${indicatorId}`),
                )}
              </div>
              <IndicatorRankBadge
                indicatorId={indicatorId}
                rankLabel={get(DATA, `municipio.${id}.${indicatorId}_FAIXA`)}
              />
            </Flex>
          }
        />

        <Output
          schema={{
            type: 'text',
          }}
          label="Posição entre municípios do estado"
          value={[
            ufMunicipios.find((mun) => mun.id === id)[`${indicatorId}_rank`],
            'de',
            ufMunicipios.length,
          ].join(' ')}
        />

        <IndicatorAdditionalFields
          indicatorId={indicatorId}
          additionalFields={
            DATA.indicators[indicatorId].additionalFields_municipio
              ? JSON.parse(
                  DATA.indicators[indicatorId].additionalFields_municipio,
                )
              : null
          }
          data={DATA.municipio[id]}
        />
      </Flex>
    </Flex>
  )
}
