export function getSynthesizer(requester: Fetcher<Synthesizer>, auth: Auth) {
  return async (id: string): ExpectedResult<Synthesizer> => {
    return await requester("GET", `/synthesizers/${id}`, { auth_token: auth.token })
  }
}