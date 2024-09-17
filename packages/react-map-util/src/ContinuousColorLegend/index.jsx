import React from 'react'
import { Flex, FlexDirection } from '@orioro/react-ui-core'
import styled from 'styled-components'

const ColorBar = styled.div`
  background: linear-gradient(
    to top,
    ${({ $min }) => $min.color},
    ${({ $max }) => $max.color}
  );
`

const LabelContainer = styled.div`
  position: relative;
`

const Label = styled.div`
  position: absolute;
  font-size: 0.9rem;
  font-family: inherit;
  white-space: nowrap;
`

export function ContinuousColorLegend({
  direction = 'column',
  height = 100,
  min,
  max,
}) {
  return (
    <Flex direction="row" gap="4px">
      <ColorBar
        style={{
          width: 10,
          height,
        }}
        $min={min}
        $max={max}
      />
      <LabelContainer>
        <Label
          style={{
            bottom: 0,
          }}
        >
          {min.label}
        </Label>
        <Label
          style={{
            top: 0,
          }}
        >
          {max.label}
        </Label>
      </LabelContainer>
    </Flex>
  )
}
