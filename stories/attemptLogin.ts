import { useStorage } from '@vueuse/core'

type LoginRequester = (username: string, password: string) => void

type Snacker = {
  success: (text: string) => void
  error: (text: string) => void
  asyncError: (failure: AsyncFailure) => void
}

type Navigator = typeof navigateTo;

type Storage = (name: string, data: unknown) => void;

/**
 * this user story allows the user to attempt to login on the application. it creates the function
 * that will be called from the asynchronous procedure around the presentational login form. This
 * function will only forward the arguments to the API on the correct route.
 */
export function attemptLogin(loginRequester: LoginRequester, snacker: Snacker, navigator: Navigator, storage: Storage) {
  return async (username: string, password: string) => {
    const response = await loginRequester(username, password);
    if (response.ok) {
      storage('user-session', response.data);
      return navigator('/')
    }
    return snacker.asyncError(response)
  }
}