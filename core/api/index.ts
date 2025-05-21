import { createFetcher } from "~/core/api/createFetcher";
import { newSessionApi } from "./sessions/new.api";
import { listModules } from "./synthesizers/modules/list";

export type ApiSchema = {
  modules: { list: ModuleListFetcher },
  sessions: { new: SessionCreationFetcher },
  synthesizers: {
    delete: SynthesizerDeleteFetcher,
    get: SynthesizerGetFetcher,
    new: SynthesizerCreationFetcher,
    list: SynthesizerListFetcher
  }
}

export const api: ApiSchema = {
  modules: {
    list: listModules(createFetcher<Module[]>(fetch), useAuth()),
  },
  sessions: {
    new: newSessionApi(createFetcher<Session>(fetch))
  },
  synthesizers: {
    delete: deleteSynthesizer(createFetcher<void>(fetch), useAuth()),
    get: getSynthesizer(createFetcher<Synthesizer>(fetch), useAuth()),
    new: newSynthesizer(createFetcher<Synthesizer>(fetch), useAuth()),
    list: listSynthesizers(createFetcher<Synthesizer[]>(fetch), useAuth()),
  },
}