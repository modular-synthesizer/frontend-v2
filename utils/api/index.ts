export type Auth = { token: string }

export const api = {
  sessions: {
    new: createSessions(makeRequest),
  },
  synthesizers: {
    delete: deleteSynthesizer(makeRequest, useAuth()),
    get: getSynthesizer(makeRequest, useAuth()),
    list: listSynthesizers(makeRequest, useAuth()),
    new: newSynthesizer(makeRequest, useAuth()),
  },
}