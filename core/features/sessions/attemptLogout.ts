export function attemptLogout(navigator: Redirector, reset: () => void) {
  return async () => {
    reset()
    navigator('/')
  }
}