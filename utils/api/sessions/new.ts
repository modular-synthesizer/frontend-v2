import { type AsyncResult, makeRequest } from "~/utils/requesters/makeRequest"

export function createSessions(requester: Requester<Session>) {
  return async (username: string, password: string): AsyncResult<Session> => {
    return await requester('POST', '/sessions', {}, { username, password });
  }
}
