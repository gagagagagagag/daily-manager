import { Text, Stack } from '@mantine/core'
import { UserData } from '@whiteboards-io/plugins'

import { UsersList } from './users-list'

export const DailyStart = ({ users }: { users: UserData[] }) => {
  return (
    <Stack spacing={'md'}>
      <Text size={'sm'}>
        When ready click Start Daily to start a daily session with the following
        people:
      </Text>
      <UsersList
        title={'Users on board:'}
        users={users}
        participants={users.map((user) => ({
          id: user.id,
          done: false,
          skipped: false,
          timeTaken: null,
        }))}
      />
    </Stack>
  )
}
