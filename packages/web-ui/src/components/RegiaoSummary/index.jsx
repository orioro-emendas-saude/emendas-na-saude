import { Flex, Output } from '@orioro/react-ui-core'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'
import { get } from 'lodash-es'
import { useParams } from 'react-router-dom'
import { addRank, fmtIndicator } from '../../lib/data'
import { IndicatorRankBadge } from '../IndicatorRankBadge'
import { IndicatorAdditionalFields } from '../IndicatorAdditionalFields'

export function RegiaoSummary({ id }) {
  const { indicatorId } = useParams()

  const DATA = useData()

  const ufRegioes = addRank(
    DATA.regioes_de_saude.filter(
      (reg) => reg.uf_id === DATA.regiao_de_saude[id].uf_id,
    ),
    indicatorId,
    DATA.indicators[indicatorId].rank,
  )

  return (
    <Flex direction="column">
      <Heading as="h1" size="8">
        <span style={{ fontSize: '1rem' }}>Região de Saúde</span>
        <br />
        {get(DATA, `regiao_de_saude.${id}.name`)}
      </Heading>

      <Flex gap="2">
        <Output
          schema={{
            type: 'text',
          }}
          label="População"
          value={get(DATA, `regiao_de_saude.${id}.populacao`)}
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
                  get(DATA, `regiao_de_saude.${id}.${indicatorId}`),
                )}
              </div>
              <IndicatorRankBadge
                indicatorId={indicatorId}
                rankLabel={get(
                  DATA,
                  `regiao_de_saude.${id}.${indicatorId}_FAIXA`,
                )}
              />
            </Flex>
          }
        />

        <Output
          schema={{
            type: 'text',
          }}
          label="Ranking dentre Regiões de Saúde do estado"
          value={[
            ufRegioes.find((reg) => reg.id === id)[`${indicatorId}_rank`],
            'de',
            ufRegioes.length,
          ].join(' ')}
        />

        <IndicatorAdditionalFields
          indicatorId={indicatorId}
          additionalFields={
            DATA.indicators[indicatorId].additionalFields_regiao_de_saude
              ? JSON.parse(
                  DATA.indicators[indicatorId].additionalFields_regiao_de_saude,
                )
              : null
          }
          data={DATA.regiao_de_saude[id]}
        />
      </Flex>
    </Flex>
  )
}
