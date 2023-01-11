import { Alert, Button, Grid, Stack, Transition } from '@mantine/core'

import { PluginData } from './types'

export const DailyControls = ({
  isSpeaker,
  pluginData,
  onDone,
  onStartDaily,
  onResetData,
  onEndDaily,
}: {
  isSpeaker: boolean
  pluginData: PluginData
  onDone: (skipped: boolean) => void
  onStartDaily: () => void
  onResetData: () => void
  onEndDaily: () => void
}) => {
  return (
    <Stack>
      <Transition mounted={isSpeaker} transition={'slide-up'}>
        {(styles) => (
          <Alert title={'Your turn now!'} style={styles}>
            It's your turn to speak, when you're done press the button below!
          </Alert>
        )}
      </Transition>
      {isSpeaker && (
        <>
          <Button color={'teal'} onClick={() => onDone(false)} fullWidth>
            I'm done!
          </Button>
        </>
      )}
      <Grid>
        {!pluginData?.started && (
          <Grid.Col span={12}>
            <Button onClick={onStartDaily} color={'teal'} fullWidth>
              Start Daily
            </Button>
          </Grid.Col>
        )}
        {pluginData?.started && !pluginData?.completedAt && (
          <Grid.Col span={6}>
            <Button
              variant={'filled'}
              color={'red'}
              onClick={onEndDaily}
              fullWidth
            >
              End daily now
            </Button>
          </Grid.Col>
        )}
        {pluginData?.completedAt && (
          <Grid.Col span={12}>
            <Button color={'red'} onClick={onResetData} fullWidth>
              Clear data
            </Button>
          </Grid.Col>
        )}
        {pluginData?.started && !pluginData.completedAt && (
          <Grid.Col span={6}>
            <Button
              color={'yellow'}
              disabled={isSpeaker}
              onClick={() => onDone(true)}
              fullWidth
            >
              Skip user
            </Button>
          </Grid.Col>
        )}
      </Grid>
    </Stack>
  )
}
