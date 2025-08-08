export type ToolCreator = (name: string, slots: number) => ExpectedResult<Tool>;

export function newTool(
	fetcher: Fetcher<Tool>,
	auth: Auth,
): ToolCreator {
	return async (name: string, slots: number): ExpectedResult<Tool> => {
		return fetcher("POST", "/tools", {}, { auth_token: auth.token, name, slots });
	};
}
