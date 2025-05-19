import { useStorage } from '@vueuse/core'

type LoginRequester = (username: string, password: string) => AsyncResult<Session>

type Navigator = typeof navigateTo;

type Store = (data: Session) => void

/**
 * this user story allows the user to attempt to login on the application. it creates the function
 * that will be called from the asynchronous procedure around the presentational login form. This
 * function will only forward the arguments to the API on the correct route.
 */
export function attemptLogin(loginRequester: LoginRequester, snacker: Snacker, navigator: Navigator, store: Store) {
  return async (username: string, password: string) => {
    const response = await loginRequester(username, password);
    if (response.ok) {
      store(response.data);
      snacker.success("login.success")
      return navigator('/')
    }
    return snacker.asyncError(response)
  }
}