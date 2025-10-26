import type { ApiSynthesizer } from "@jsynple/core";

export type SynthesizerGetFetcher = (id: string) => ExpectedResult<ApiSynthesizer>;

export function getSynthesizer(
	requester: Fetcher<ApiSynthesizer>,
	auth: Auth,
): SynthesizerGetFetcher {
	return async (id: string): ExpectedResult<ApiSynthesizer> => {
		return await requester("GET", `/synthesizers/${id}`, {
			auth_token: auth.token,
		});
	};
}
