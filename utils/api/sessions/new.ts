import { type AsyncResult, makeRequest } from "~/utils/requesters/makeRequest"

export async function createSessions(username: string, password: string): AsyncResult<unknown> {
  return makeRequest('POST', '/sessions', {}, { username, password });
}