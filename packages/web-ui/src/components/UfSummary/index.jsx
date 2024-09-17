import { Flex, Output } from '@orioro/react-ui-core'
import { useData } from '../DataContext'
import { Heading } from '@radix-ui/themes'
import { get } from 'lodash-es'
import { useParams } from 'react-router-dom'

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
            get(DATA, `uf.${id}.${indicatorId}`) +
            ` (${get(DATA, `uf.${id}.${indicatorId}_FAIXA`)})`
          }
        />

        <Output
          schema={{
            type: 'text',
          }}
          label="Ranking entre estados brasileiros"
          value={get(DATA, `uf.${id}.${indicatorId}_rank`)}
        />
      </Flex>
    </Flex>
  )
}
