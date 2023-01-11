export type PluginData = {
  started: boolean
  completedAt: string | null
  startedAt: string | null
  currentSpeaker: string | null
  speakerStartDate: string | null
  participants: ParticipantData[]
} | null

export type ParticipantData = {
  id: string
  timeTaken: string | null
  done: boolean
  skipped: boolean
}
