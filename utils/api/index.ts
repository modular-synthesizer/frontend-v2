export const api = {
  sessions: {
    new: createSessions(makeRequest),
  },
  synthesizers: {
    create: createSynthesizer(makeRequest),
    list: listSynthesizers(makeRequest),
  },
}