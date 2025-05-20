export function getSynthesizer(requester: Requester<Synthesizer>, auth: Auth) {
  return async (id: string): AsyncResult<Synthesizer> => {
    return await requester("GET", `/synthesizers/${id}`, { auth_token: auth.token })
  }
}