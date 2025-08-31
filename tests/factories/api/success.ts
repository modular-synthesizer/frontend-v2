import { moduleFactory } from "../modules"
import { sessionFactory } from "../sessions";
import { synthesizerFactory } from "../synthesizers";

const fakeModule = await moduleFactory()

const fakeSession = await sessionFactory()

const fakeSynthesizer = await synthesizerFactory()

export const fakeSuccessApi: ApiSchema = {
  cables: {
    list: async () => success([])
  },
  categories: {
    list: async () => success([{ name: 'categoryName' }] as Category[]),
  },
  generators: {
    list: async () => success([])
  },
  modules: {
    list: async () => success([ fakeModule ]),
    update: async (_id: string, payload: Partial<Module>) => success({ ...fakeModule, ...payload })
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
  tools: {
    delete: async () => success(undefined),
    get: async (_id) => success(toolFactory({ id: 'toolId' })),
    new: async (__name, _cateId, _slots) => success(toolFactory({ id: 'toolId' })),
    update: async(_id, _payload: Partial<Tool>) => success(toolFactory({ id: 'toolId' })),
    list: async () => success([ toolFactory({ id: 'toolId' }) ])
  },
}