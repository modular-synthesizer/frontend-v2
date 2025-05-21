import { createFetcher } from "~/core/api/createFetcher";
import { newSessionApi } from "./sessions/new.api";

export const api = {
  sessions: {
    new: newSessionApi(createFetcher<Session>(fetch))
  },
  synthesizers: {
    delete: deleteSynthesizer(createFetcher<void>(fetch), useAuth()),
    get: getSynthesizer(createFetcher<Synthesizer>(fetch), useAuth()),
    list: listSynthesizers(createFetcher<Synthesizer[]>(fetch), useAuth()),
  },
}