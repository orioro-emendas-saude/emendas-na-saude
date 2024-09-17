import React, { forwardRef, useRef } from 'react'
import {
  FloatingArrow,
  arrow,
  useFloating,
  offset,
  useClientPoint,
  useInteractions,
  flip,
  shift,
} from '@floating-ui/react'
import styled from 'styled-components'

const ARROW_HEIGHT = 5
const GAP = 5

export function useTooltip({ contents }) {
  const arrowRef = useRef(null)

  const open = Boolean(contents)

  const { refs, floatingStyles, context } = useFloating({
    open: open,
    placement: 'top',
    middleware: [
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
      offset(ARROW_HEIGHT + GAP),
    ],
  })
  const clientPoint = useClientPoint(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([clientPoint])

  return {
    context,
    arrowRef,
    getFloatingProps,
    getReferenceProps,
    refs,
    floatingStyles,
  }
}

const Container = styled.div`
  pointer-events: none;
  padding: 10px;
  font-size: 0.9rem;
  max-width: 300px;
  border-radius: 4px;
  font-family: inherit;
`

export const Tooltip = forwardRef(function TooltipInner(
  {
    arrowRef,
    context,
    style,
    backgroundColor = 'black',
    color = 'white',
    children,
    getFloatingProps,
  },
  ref,
) {
  return (
    <Container
      ref={ref}
      style={{
        ...style,
        backgroundColor,
        color,
      }}
      {...getFloatingProps()}
    >
      <FloatingArrow
        ref={arrowRef}
        context={context}
        fill={backgroundColor}
        height={ARROW_HEIGHT}
      />
      {children}
    </Container>
  )
})
