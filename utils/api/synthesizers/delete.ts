export function deleteSynthesizer(requester: Requester<void>, auth: Auth) {
  return async (id: string): AsyncResult<void> => {
    return requester('DELETE', `/synthesizers/${id}`, { auth_token: auth.token })
  }
}