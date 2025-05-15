import { createSessions } from './sessions/new'

export const api = {
  sessions: {
    new: createSessions(makeRequest)
  }
}