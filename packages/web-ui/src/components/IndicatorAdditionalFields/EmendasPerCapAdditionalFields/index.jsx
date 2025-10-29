import { Output } from '@orioro/react-ui-core'
import { fmtIndicator, parseNumberPtBR } from '../../../lib/data'

import styled from 'styled-components'
import { SimpleSelect } from '../../SimpleSelect'
import { useMemo, useState } from 'react'
import { Flex } from '@orioro/react-ui-core'
import { useData } from '../../DataContext'
import { Heading } from '@radix-ui/themes'

const Container = styled.div``

const MODALIDADE_LABELS = {
  TOTAL: 'Todos',
  IND: 'Individual',
  BANC: 'Bancada',
  COMISS: 'Comissão',
  REL: 'Relator',
}

const CAT_ECON_LABELS = {
  TOTAL: 'Todas',
  CUSTEIO: 'Custeio',
  INVES: 'Investimento',
}

export function EmendasPerCapAdditionalFields({ data }) {
  const DATA = useData()

  const [modalidade, setModalidade] = useState('TOTAL')
  const [catEcon, setCatEcon] = useState('TOTAL')

  const dataKey = useMemo(() => {
    return modalidade === 'TOTAL' && catEcon === 'TOTAL'
      ? 'EMENDAS_TOTAL'
      : ['EMENDAS', modalidade, catEcon].filter(Boolean).join('_')
  }, [modalidade, catEcon])

  return (
    <Flex direction="column">
      <label
        style={{
          fontWeight: 'bold',
        }}
      >
        {[
          'Emendas',
          modalidade === 'TOTAL' ? null : MODALIDADE_LABELS[modalidade],
          catEcon === 'TOTAL' ? null : CAT_ECON_LABELS[catEcon],
          '(total)',
        ]
          .filter(Boolean)
          .join(' ')}
        :
      </label>
      <Flex direction="row">
        <SimpleSelect
          label="Modalidade"
          value={modalidade}
          onSetValue={setModalidade}
          options={Object.entries(MODALIDADE_LABELS).map(([value, label]) => ({
            value,
            label,
          }))}
        />
        <SimpleSelect
          label="Categoria"
          value={catEcon}
          onSetValue={setCatEcon}
          options={Object.entries(CAT_ECON_LABELS).map(([value, label]) => ({
            value,
            label,
          }))}
        />
      </Flex>
      <Flex direction="row" justifyContent="flex-start">
        <div
          style={{
            backgroundColor: 'var(--yellow-5)',
            padding: 5,
            fontWeight: 'bold',
            borderRadius: 4,
          }}
        >
          <Output
            schema={{
              type: 'text',
            }}
            value={fmtIndicator(
              DATA.indicators['EMENDAS_PERCAP'],
              parseNumberPtBR(data[dataKey]),
            )}
          />
        </div>
      </Flex>
    </Flex>
  )
}
