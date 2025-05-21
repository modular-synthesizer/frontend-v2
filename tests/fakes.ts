import type { Snacker } from "../composables/snack"
import type { Session } from "~/core/business/Session.type"

export const fakeError: AsyncFailure = { ok: false, key: 'username', message: 'unknown' }

export type ExpectedFailure = Promise<AsyncFailure>;

export type ExpectedSuccess<T> = Promise<AsyncSuccess<T>>

type FakeNavigator = typeof navigateTo;

export const fakeNavigator: FakeNavigator = ((path: string) => { }) as unknown as FakeNavigator

export const fakeSnacker: Snacker = {
  success(_: string) { },
  error(_: string) { },
  asyncError(_: AsyncFailure) { },
}

export const fakeAccount: Account = {
  id: '1',
  username: 'FakeAccount',
  email: 'fake@account.synple'
}

export const fakeSession: Session = {
  token: 'testToken',
  admin: false,
  created_at: new Date(),
  account: fakeAccount,
  duration: 10000,
}

export const fakeStore = (session: Session) => { }