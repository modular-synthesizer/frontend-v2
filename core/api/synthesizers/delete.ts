export type SynthesizerDeleteFetcher = (id: string) => ExpectedResult<void>;

export function deleteSynthesizer(
	requester: Fetcher<void>,
	auth: Auth,
): SynthesizerDeleteFetcher {
	return async (id: string): ExpectedResult<void> => {
		return requester("DELETE", `/synthesizers/${id}`, {
			auth_token: auth.token,
		});
	};
}
