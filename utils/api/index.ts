export type Auth = { token: string }

export const api = {
  sessions: {
    new: createSessions(makeRequest),
  },
  synthesizers: {
    new: newSynthesizer(makeRequest, useAuth()),
    list: listSynthesizers(makeRequest, useAuth()),
  },
}