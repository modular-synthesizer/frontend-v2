export const api = {
  sessions: {
    new: createSessions(makeRequest),
  },
  synthesizers: {
    new: newSynthesizer(makeRequest),
    list: listSynthesizers(makeRequest),
  },
}