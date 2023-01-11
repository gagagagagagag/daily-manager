import { DateTime } from 'luxon'
import { isUndefined } from 'lodash'
import { useState, useEffect, useCallback } from 'react'
import { Loader, Stack } from '@mantine/core'
import {
  watchPluginBoardData,
  watchBoardUsers,
  UserData,
  getCurrentBoardUser,
  setPluginBoardData,
} from '@whiteboards-io/plugins'
import { useAsync } from 'react-async-hook'

import type { PluginData } from './types'
import { Participants } from './participants'
import { DailyControls } from './daily-controls'
import { DailyStart } from './daily-start'
import { DailyEnded } from './daily-ended'
import { dateDiffDate, getRandomFromArray, nowDiffDate } from './utils'

export const DailyController = () => {
  const [pluginData, setPluginData] = useState<PluginData | undefined>(
    undefined
  )
  const [boardUsers, setBoardUsers] = useState<UserData[] | undefined>(
    undefined
  )
  const currentUser = useAsync<UserData>(getCurrentBoardUser, [])

  useEffect(
    () =>
      watchPluginBoardData<PluginData>((pluginData) => {
        setPluginData(pluginData)
      }),
    []
  )

  useEffect(
    () =>
      watchBoardUsers((usersData) => {
        setBoardUsers(usersData)
      }),
    []
  )

  const endDailyHandler = useCallback(() => {
    setPluginBoardData({
      ...pluginData,
      completedAt: DateTime.now().toISO(),
      currentSpeaker: null,
      speakerStartDate: null,
    })
  }, [pluginData])

  const onDoneHandler = useCallback(
    (skipped: boolean) => {
      if (!pluginData) return

      const newParticipants = pluginData.participants.map((participant) => {
        if (participant.id !== pluginData.currentSpeaker) {
          return participant
        }

        return {
          ...participant,
          done: true,
          skipped: skipped,
          timeTaken: skipped
            ? null
            : pluginData.speakerStartDate
            ? nowDiffDate(pluginData.speakerStartDate)
            : 'Error',
        }
      })

      const waitingParticipants = newParticipants
        .filter((participant) => !participant.done)
        .map((participant) => participant.id)
      const randomUser = getRandomFromArray(waitingParticipants)

      setPluginBoardData<PluginData>({
        ...pluginData,
        participants: newParticipants,
        completedAt:
          waitingParticipants.length === 0 ? DateTime.now().toISO() : null,
        currentSpeaker: randomUser ?? null,
        speakerStartDate: randomUser ? DateTime.now().toISO() : null,
      })
    },
    [pluginData]
  )

  const startDailyHandler = useCallback(() => {
    if (!boardUsers || boardUsers.length === 0) {
      return null
    }

    const userIds = boardUsers.map((user) => user.id)
    const randomUser = getRandomFromArray(userIds)

    setPluginBoardData<PluginData>({
      started: true,
      startedAt: DateTime.now().toISO(),
      completedAt: null,
      currentSpeaker: randomUser,
      speakerStartDate: DateTime.now().toISO(),
      participants: userIds.map((userId) => ({
        id: userId,
        timeTaken: null,
        done: false,
        skipped: false,
      })),
    })
  }, [boardUsers])

  const resetDataHandler = useCallback(() => {
    setPluginBoardData(null)
  }, [])

  if (
    isUndefined(pluginData) ||
    isUndefined(boardUsers) ||
    currentUser.loading
  ) {
    return <Loader />
  }

  return (
    <Stack justify={'space-between'} h={'100%'}>
      {!pluginData?.startedAt && <DailyStart users={boardUsers} />}
      <Stack>
        {pluginData?.startedAt && pluginData.completedAt && (
          <DailyEnded
            duration={dateDiffDate(
              pluginData.completedAt,
              pluginData.startedAt
            )}
          />
        )}
        <Participants
          speakerId={pluginData?.currentSpeaker ?? null}
          speakerStartDate={pluginData?.speakerStartDate ?? null}
          participants={pluginData?.participants ?? []}
          users={boardUsers}
        />
      </Stack>
      <DailyControls
        isSpeaker={currentUser.result?.id === pluginData?.currentSpeaker}
        pluginData={pluginData}
        onDone={onDoneHandler}
        onStartDaily={startDailyHandler}
        onResetData={resetDataHandler}
        onEndDaily={endDailyHandler}
      />
    </Stack>
  )
}
