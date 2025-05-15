type LoginRequester = (username: string, password: string) => void

export function attemptLogin(loginRequester: LoginRequester) {
  return loginRequester;
}