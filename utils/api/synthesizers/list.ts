export function listSynthesizers(requester: Requester<Synthesizer[]>, auth: Auth) {
  return async (): AsyncResult<Synthesizer[]> => {
    return requester('GET', '/synthesizers', { auth_token: auth.token })
  }
}