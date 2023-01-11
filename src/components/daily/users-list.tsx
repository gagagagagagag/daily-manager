import { List, Avatar, Stack, Text, Group } from '@mantine/core'
import { UserData } from '@whiteboards-io/plugins'
import { ParticipantData } from './types'

export const UsersList = ({
  title,
  participants,
  users,
}: {
  title: string
  participants: ParticipantData[]
  users: UserData[]
}) => {
  return (
    <Stack>
      <Text fw={600} size={'sm'}>
        {title}
      </Text>
      <List spacing={'xs'} size={'sm'}>
        {participants.map((participant) => {
          const user = users.find((user) => user.id === participant.id)

          if (!user) {
            return (
              <List.Item key={participant.id}>User not on the board</List.Item>
            )
          }

          return (
            <List.Item
              key={user.id}
              icon={<Avatar src={user.photoURL} size={24} radius={'xl'} />}
            >
              <Group>
                <Text strikethrough={participant.done} span>
                  {user.displayName}
                </Text>
                {Boolean(participant.timeTaken) && (
                  <Text span>{participant.timeTaken}</Text>
                )}
              </Group>
            </List.Item>
          )
        })}
      </List>
    </Stack>
  )
}
