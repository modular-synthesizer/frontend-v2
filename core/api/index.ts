import { createFetcher } from "~/utils/createFetcher";
import { newSessionApi } from "./sessions/new.api";

export const api = {
  sessions: {
    new: newSessionApi(createFetcher<Session>(fetch))
  }
}