import type { ApiModule } from "@jsynple/core";

export type ModuleListFetcher = (id: string) => ExpectedResult<ApiModule[]>;

export function listModules(
	fetcher: Fetcher<ApiModule[]>,
	auth: Auth,
): ModuleListFetcher {
	return async (synthesizerId: string) => {
		return await fetcher("GET", "/modules", {
			auth_token: auth.token,
			synthesizer_id: synthesizerId,
		});
	};
}
