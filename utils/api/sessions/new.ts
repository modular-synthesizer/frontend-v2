import { type AsyncResult, makeRequest } from "~/utils/requesters/makeRequest"

export function createSessions(requester: Requester<unknown>) {
  return async (username: string, password: string): AsyncResult<unknown> => {
    const response: AsyncResult<unknown> = await requester('POST', '/sessions', {}, { username, password });
    console.log(response);
    return response;
  }
}
