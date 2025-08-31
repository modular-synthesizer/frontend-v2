export const fakeError = failure('username', 'unknown')

export const fakeErrorApi: ApiSchema = {
  cables: {
    list: async () => fakeError,
  },
  categories: {
    list: async () => fakeError,
  },
  generators: {
    list: async () => fakeError,
  },
  modules: {
    list: async () => fakeError,
    update: async (_id: string, _payload: Partial<Module>) => fakeError,
  },
  sessions: {
    new: async (_usr: string, _pwd: string) => fakeError,
  },
  synthesizers: {
    list: async () => fakeError,
    get: async (_id: string) => fakeError,
    new: async (_nme: string, _vcs: number) => fakeError,
    delete: async(_id: string) => fakeError,
    update: async(_id: string, _payload: Partial<Synthesizer>) => fakeError,
  },
  tools: {
    delete: async () => fakeError,
    get: async (_id: string) => fakeError,
    list: async () => fakeError,
    new: async (__name: string, _cateId: string, _slots: number) => fakeError,
    update: async(_id: string, _payload: Partial<Tool>) => fakeError,
  },
}