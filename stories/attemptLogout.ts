import type { Navigator, Storage } from "../attemptLogin"

export function attemptLogout(navigator: Navigator, reset: () => void) {
  return async () => {
    reset()
    navigator('/')
  }
}