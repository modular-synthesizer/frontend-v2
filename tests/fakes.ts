import type { Snacker } from "../composables/snack"
import type { Session } from "~/core/business/Session.type"

export const fakeError: AsyncFailure = { ok: false, key: 'username', message: 'unknown' }

export type ExpectedFailure = Promise<AsyncFailure>;

export type ExpectedSuccess<T> = Promise<AsyncSuccess<T>>

type FakeNavigator = typeof navigateTo;

export const fakeNavigator: FakeNavigator = ((_path: string) => { }) as unknown as FakeNavigator

export const fakeSnacker: Snacker = {
  success(_: string) { },
  error(_: string) { },
  asyncError(_: AsyncFailure) { },
  queue: ref([]),
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

export const fakeSynthesizer: Synthesizer = {
  name: 'test synthétiseur',
  voices: 16,
  members: [ ],
  id: 'synthesizerId'
}

export const fakeStore = (_session: Session) => { }

export const fakeSuccessApi: ApiSchema = {
  modules: {
    list: async () => ({ ok: true, data: [] }),
  },
  sessions: {
    new: async (_usr: string, _pwd: string) => ({ ok: true, data: fakeSession }),
  },
  synthesizers: {
    list: async () => ({ ok: true, data: [] }),
    get: async (_id: string) => ({ ok: true, data: fakeSynthesizer }),
    new: async (_nme: string, _vcs: number) => ({ ok: true, data: fakeSynthesizer }),
    delete: async(_id: string) => ({ ok: true, data: undefined }),
  },
}

export const fakeErrorApi: ApiSchema = {
  modules: {
    list: async () => fakeError,
  },
  sessions: {
    new: async (_usr: string, _pwd: string) => fakeError,
  },
  synthesizers: {
    list: async () => fakeError,
    get: async (_id: string) => fakeError,
    new: async (_nme: string, _vcs: number) => fakeError,
    delete: async(_id: string) => fakeError,
  },
}