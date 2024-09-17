import { Box } from '@orioro/react-ui-core'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export function Root() {
  return (
    <Box p="6">
      <Outlet />
    </Box>
  )
}
