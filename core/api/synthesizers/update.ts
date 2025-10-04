import type { ApiSynthesizer } from "@jsynple/core";

export type SynthesizerUpdateFetcher = (
	id: string,
	parameters: Partial<ApiSynthesizer> & { auth_token: string },
) => ExpectedResult<ApiSynthesizer>;

export function updateSynthesizer(
	requester: Fetcher<ApiSynthesizer>,
	auth: Auth,
): SynthesizerUpdateFetcher {
	return async (
		id: string,
		parameters: Partial<ApiSynthesizer>,
	): ExpectedResult<ApiSynthesizer> => {
		const payload = { ...parameters, auth_token: auth.token };
		return await requester("PUT", `/synthesizers/${id}`, {}, payload);
	};
}
