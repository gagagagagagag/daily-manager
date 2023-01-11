import { Stack, Text } from '@mantine/core'

export const DailyEnded = ({ duration }: { duration: string }) => {
  return (
    <Stack spacing={'md'}>
      <Text size={'sm'}>
        The daily has lasted for {duration}. Please clear the data to start a
        new one.
      </Text>
    </Stack>
  )
}
