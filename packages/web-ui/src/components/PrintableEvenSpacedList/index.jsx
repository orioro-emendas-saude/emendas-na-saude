import styled from 'styled-components'
import { EvenSpacedList } from '@orioro/react-ui-core'

export const PrintableEvenSpacedList = styled(EvenSpacedList)`
  @media print {
    > * {
      width: 100%;
      height: 50vh;
    }
  }
`
