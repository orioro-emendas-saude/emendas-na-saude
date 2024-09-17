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
import { useRef } from 'react'
import styled from 'styled-components'

const ARROW_HEIGHT = 7
const GAP = 2

const Container = styled.div`
  pointer-events: none;
  padding: 10px;
  font-size: 0.9rem;
  max-width: 300px;
  border-radius: 4px;
  font-family: sans-serif;
`

export function MapTooltip({
  backgroundColor = 'black',
  color = 'white',
  children,
}) {
  const arrowRef = useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    placement: 'top',
    open: false,
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

  return (
    <Container
      ref={refs.setFloating}
      style={{
        ...floatingStyles,
        backgroundColor,
        color,
      }}
      {...getFloatingProps()}
    >
      <FloatingArrow ref={arrowRef} context={context} fill={backgroundColor} />
      {children}
    </Container>
  )
}
