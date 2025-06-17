export type ToolFetcher = (id: string) => ExpectedResult<Tool>;

export function getTool(
	fetcher: Fetcher<Tool>,
	auth: Auth,
): ToolFetcher {
	return async (id: string): ExpectedResult<Tool> => {
		return fetcher("GET", `/tools/${id}`, { auth_token: auth.token });
	};
}
