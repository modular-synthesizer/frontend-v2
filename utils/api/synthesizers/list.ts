export function listSynthesizers(requester: Requester<Synthesizer[]>) {
  return async (): AsyncResult<Synthesizer[]> => {
    return requester('GET', '/synthesizers', { auth_token: useAuth().token })
  }
}