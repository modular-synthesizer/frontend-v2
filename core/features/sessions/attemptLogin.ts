type Store = (data: Session) => void

/**
 * this user story allows the user to attempt to login on the application. it creates the function
 * that will be called from the asynchronous procedure around the presentational login form. This
 * function will only forward the arguments to the API on the correct route.
 */
export function attemptLogin(api: ApiSchema, snacker: Snacker, navigator: Redirector, store: Store) {
  return async (username: string, password: string) => {
    const response = await api.sessions.new(username, password);
    if (response.ok) {
      store(response.data);
      snacker.success("login.success")
      return navigator('/')
    }
    return snacker.asyncError(response, 'login')
  }
}