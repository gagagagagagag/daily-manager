import { UserData } from '@whiteboards-io/plugins'
import { IconSpeakerphone } from '@tabler/icons'
import { Card, Group, ThemeIcon, Text, Stack } from '@mantine/core'

import { UsersList } from './users-list'
import { Timer } from './timer'
import { ParticipantData } from './types'

export const Participants = ({
  speakerId,
  speakerStartDate,
  participants,
  users,
}: {
  speakerId: string | null
  speakerStartDate: string | null
  participants: ParticipantData[]
  users: UserData[]
}) => {
  const speaker = speakerId ? users.find((user) => user.id === speakerId) : null

  const waitingParticipants = participants.filter(
    (participant) => !participant.done && participant.id !== speakerId
  )
  const doneParticipants = participants.filter(
    (participant) => participant.done
  )

  return (
    <Stack>
      {speaker && speakerStartDate && (
        <SpeakerCard speaker={speaker} startDate={speakerStartDate} />
      )}
      {waitingParticipants.length > 0 && (
        <UsersList
          title={'Waiting list:'}
          participants={waitingParticipants}
          users={users}
        />
      )}
      {doneParticipants.length > 0 && (
        <UsersList
          title={'Done:'}
          participants={doneParticipants}
          users={users}
        />
      )}
    </Stack>
  )
}

export const SpeakerCard = ({
  speaker,
  startDate,
}: {
  speaker: UserData
  startDate: string
}) => {
  return (
    <Stack spacing={5}>
      <Text fw={600} size={'sm'}>
        Speaker:
      </Text>
      <Card withBorder>
        <Group position={'apart'}>
          <Group>
            <ThemeIcon size={24}>
              <IconSpeakerphone size={16} />
            </ThemeIcon>
            <Text size={'md'} fw={700}>
              {speaker.displayName}
            </Text>
          </Group>
          <Timer startDate={startDate} />
        </Group>
      </Card>
    </Stack>
  )
}
