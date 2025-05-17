type LoginRequester = (username: string, password: string) => void

type Snacker = {
  success: (text: string) => void
  error: (text: string) => void
  asyncError: (failure: AsyncFailure) => void
}

type Navigator = typeof navigateTo;

/**
 * this user story allows the user to attempt to login on the application. it creates the function
 * that will be called from the asynchronous procedure around the presentational login form. This
 * function will only forward the arguments to the API on the correct route.
 */
export function attemptLogin(loginRequester: LoginRequester, snacker: Snacker, navigator: Navigator) {
  return async (username: string, password: string) => {
    const response = await loginRequester(username, password);
    // Display the correct message in the snackbar queue depending on the state of the response.
    return response.ok ? navigator('/') : snacker.asyncError(response)
  }
}