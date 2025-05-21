import type { ExpectedResult, Fetcher } from "~/core/types/async"

export type SessionCreationFetcher = (username: string, password: string) => ExpectedResult<Session>

export function newSessionApi(requester: Fetcher<Session>): SessionCreationFetcher {
  return async (username: string, password: string): ExpectedResult<Session> => {
    return await requester('POST', '/sessions', {}, { username, password });
  }
}
