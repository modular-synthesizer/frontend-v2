import { Snacker } from "../composables/useSnack"
import { Session } from "../types/session"

export const fakeError = { ok: false, key: 'username', message: 'unknown' }

export const fakeNavigator = (path: string) => { }

export const fakeSnacker: Snacker = {
  success(test: string) { },
  error(test: string) { },
  asyncError(failure: AsyncFailure) { },
}

export const fakeSession = { token: 'testToken' }

export const fakeStore = (session: Session) => { }