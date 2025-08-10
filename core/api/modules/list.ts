export type ModuleListFetcher = (id: string) => ExpectedResult<Module[]>;

export function listModules(
	fetcher: Fetcher<Module[]>,
	auth: Auth,
): ModuleListFetcher {
	return async (synthesizerId: string) => {
		return await fetcher("GET", "/modules", {
			auth_token: auth.token,
			synthesizer_id: synthesizerId,
		});
	};
}
