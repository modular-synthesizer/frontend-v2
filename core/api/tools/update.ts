export type ToolUpdateFetcher = (
	id: string,
	parameters: Partial<Tool>,
) => ExpectedResult<Tool>;

export function updateTool(
	requester: Fetcher<Tool>,
	auth: Auth,
): ToolUpdateFetcher {
	return async (
		id: string,
		parameters: Partial<Tool>,
	): ExpectedResult<Tool> => {
		const payload = { ...parameters, auth_token: auth.token };
		return await requester("PUT", `/tools/${id}`, {}, payload);
	};
}
