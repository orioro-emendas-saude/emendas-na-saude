import { Flex, Output } from '@orioro/react-ui-core'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'
import { get } from 'lodash-es'
import { useParams } from 'react-router-dom'
import { fmtIndicator } from '../../lib/data'
import { IndicatorRankBadge } from '../IndicatorRankBadge'
import { IndicatorAdditionalFields } from '../IndicatorAdditionalFields'

export function UfSummary({ id }) {
  const { indicatorId } = useParams()

  const DATA = useData()

  return (
    <Flex direction="column">
      <Heading as="h1" size="8">
        {get(DATA, `uf.${id}.name`)}
      </Heading>

      <Flex gap="2">
        <Output
          schema={{
            type: 'text',
          }}
          label="População"
          value={get(DATA, `uf.${id}.Pop_2022`)}
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
                  get(DATA, `uf.${id}.${indicatorId}`),
                )}
              </div>
              <IndicatorRankBadge
                indicatorId={indicatorId}
                rankLabel={get(DATA, `uf.${id}.${indicatorId}_FAIXA`)}
              />
            </Flex>
          }
        />

        <Output
          schema={{
            type: 'text',
          }}
          label="Ranking entre estados brasileiros"
          value={get(DATA, `uf.${id}.${indicatorId}_rank`)}
        />

        <IndicatorAdditionalFields
          indicatorId={indicatorId}
          additionalFields={
            DATA.indicators[indicatorId].additionalFields_uf
              ? JSON.parse(DATA.indicators[indicatorId].additionalFields_uf)
              : null
          }
          data={DATA.uf[id]}
        />
      </Flex>
    </Flex>
  )
}
