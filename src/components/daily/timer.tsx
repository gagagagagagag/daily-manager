import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { Text } from '@mantine/core'

export const Timer = ({ startDate }: { startDate: string }) => {
  const [timer, setTimer] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const date = DateTime.fromISO(startDate)

      setTimer(DateTime.now().diff(date, 'seconds').toFormat('mm:ss'))
    }, 500)

    return () => clearInterval(interval)
  }, [startDate])

  return <Text>{timer}</Text>
}
