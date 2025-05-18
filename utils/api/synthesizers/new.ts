type Requester = () => AsyncResult<Synthesizer>

export function newSynthesizer(requester: Requester) {
  return async (name: string, voices: number): AsyncResult<Synthesizer> => {
    return await requester('POST', '/synthesizers', {}, { name, voices, auth_token: useAuth().token })
  }
}