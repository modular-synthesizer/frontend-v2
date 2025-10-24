import type { ApiCable } from "@jsynple/core";
import type { Cable } from "~/core/business/synthesizers/Cable.type";

export type CableListFetcher = (id: string) => ExpectedResult<ApiCable[]>;

export function listCables(
	fetcher: Fetcher<ApiCable[]>,
	auth: Auth,
): CableListFetcher {
	return async (synthesizerId: string) => {
		return await fetcher("GET", "/links/v2", {
			auth_token: auth.token,
			synthesizer_id: synthesizerId,
		});
	};
}
