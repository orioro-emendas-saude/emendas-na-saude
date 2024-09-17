import { Flex } from '@orioro/react-ui-core'
import { Outlet } from 'react-router-dom'

export function Root() {
  return (
    <Flex p="6" direction="column" gap="4">
      <Outlet />
    </Flex>
  )
}
