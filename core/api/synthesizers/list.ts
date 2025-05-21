export function listSynthesizers(requester: Fetcher<Synthesizer[]>, auth: Auth) {
  return async (): ExpectedResult<Synthesizer[]> => {
    return requester('GET', '/synthesizers', { auth_token: auth.token })
  }
}