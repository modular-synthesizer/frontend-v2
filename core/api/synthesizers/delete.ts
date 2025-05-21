export function deleteSynthesizer(requester: Fetcher<void>, auth: Auth) {
  return async (id: string): ExpectedResult<void> => {
    return requester('DELETE', `/synthesizers/${id}`, { auth_token: auth.token })
  }
}