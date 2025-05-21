import { createFetcher } from "~/utils/createFetcher";
import { newSessionApi } from "./sessions/new.api";

export const endpoints = {
  sessions: {
    new: newSessionApi(createFetcher<Session>(fetch))
  }
}