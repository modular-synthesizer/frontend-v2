type LoginRequester = (username: string, password: string) => void

export function attemptLogin(loginRequester: LoginRequester) {
  return async (username: string, password: string) => {
    const response: AsyncResult<unknown> = await loginRequester(username, password);
    console.log(response);
  }
}