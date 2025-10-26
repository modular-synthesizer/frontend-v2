import type { NodeGenerator } from "@jsynple/core";

export type GeneratorsListFetcher = () => ExpectedResult<NodeGenerator[]>;

export function listGenerators(
  fetcher: Fetcher<NodeGenerator[]>,
  auth: Auth,
): GeneratorsListFetcher {
  return async () => {
    return await fetcher("GET", "/generators", {
      auth_token: auth.token,
    });
  };
}
