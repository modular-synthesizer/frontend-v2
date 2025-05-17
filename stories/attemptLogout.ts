import type { Navigator, Storage } from "../attemptLogin"

export function attemptLogout(navigator: Navigator, storage: Storage) {
  return async () => {
    const session = storage("user-session")
    session.value = null
    navigator('/')
  }
}