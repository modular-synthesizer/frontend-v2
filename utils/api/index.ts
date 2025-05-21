export type Auth = { token: string }

export const api = {
  synthesizers: {
    delete: deleteSynthesizer(makeRequest, useAuth()),
    get: getSynthesizer(makeRequest, useAuth()),
    list: listSynthesizers(makeRequest, useAuth()),
  },
}