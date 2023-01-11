import { ReactElement } from 'react'
import { Stack, Title, Divider } from '@mantine/core'

import { DailyController } from './daily'

export const SidebarLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Stack h={'100%'}>
      <Title size={'xl'} align={'right'}>
        Daily Manager
      </Title>
      <Divider />
      {children}
    </Stack>
  )
}

export const Sidebar = () => {
  return (
    <SidebarLayout>
      <DailyController />
    </SidebarLayout>
  )
}
