export function newSynthesizer(requester: Fetcher<Synthesizer>, auth: Auth) {
  return async (name: string, voices: number): ExpectedResult<Synthesizer> => {
    return await requester('POST', '/synthesizers', {}, { name, voices: `${voices}`, auth_token: auth.token })
  }
}