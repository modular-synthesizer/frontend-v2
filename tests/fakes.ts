import type { Session } from "~/core/business/Session.type"

export const fakeError = failure('username', 'unknown')

export type ExpectedFailure = Promise<AsyncFailure>;

export type ExpectedSuccess<T> = Promise<AsyncSuccess<T>>

export const fakeNavigator: Redirector = ((_path: string) => { }) as Redirector

export const fakeSnacker = useSnackTemplate(ref([]))()

export const fakeTimeout: TimeoutFunction = (callback: () => void, timeout: number) => {
  callback()
  return 42
}

export const fakeClear: ClearFunction = (timeout: number) => { }

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
  id: 'synthesizerId',
  scale: 1.0
}

export const fakeStore = (_session: Session) => { }

export const fakeSuccessApi: ApiSchema = {
  modules: {
    list: async () => success([]),
  },
  sessions: {
    new: async (_usr: string, _pwd: string) => success(fakeSession),
  },
  synthesizers: {
    list: async () => success([ fakeSynthesizer ]),
    get: async (_id: string) => success(fakeSynthesizer),
    new: async (_nme: string, _vcs: number) => success(fakeSynthesizer),
    delete: async(_id: string) => success(undefined),
    update: async(_id: string, payload: Partial<Synthesizer>) => success({ ... fakeSynthesizer, ...payload })
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
    update: async(_id: string, payload: Partial<Synthesizer>) => fakeError,
  },
}