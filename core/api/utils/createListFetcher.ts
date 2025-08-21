import type { Fetch } from "../createFetcher";

export type ListFetcher<T> = () => ExpectedResult<T[]>;

export function createListFetcher<T>(path: string) {
  return (fetch: Fetch, auth: Auth): ListFetcher<T> => {
    const fetcher = createFetcher<T[]>(fetch)
    return () => fetcher("GET", path, { auth_token: auth.token })
  }
}