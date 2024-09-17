import React from 'react'
import { MainMap } from '../../components/MainMap'

export function Index() {
  return (
    <MainMap
      geo={{
        type: 'pais',
        id: 'BR',
      }}
      indicator="INEAB"
    />
  )
}
