import type { ExpectedResult, Fetcher } from "~/core/types/async"

export type SessionFetcher = (username: string, password: string) => ExpectedResult<Session>

export function newSessionApi(requester: Fetcher<Session>): SessionFetcher {
  return async (username: string, password: string): ExpectedResult<Session> => {
    return await requester('POST', '/sessions', {}, { username, password });
  }
}
