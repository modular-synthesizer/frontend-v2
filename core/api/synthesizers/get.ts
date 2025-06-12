export type SynthesizerGetFetcher = (id: string) => ExpectedResult<Synthesizer>;

export function getSynthesizer(
	requester: Fetcher<Synthesizer>,
	auth: Auth,
): SynthesizerGetFetcher {
	return async (id: string): ExpectedResult<Synthesizer> => {
		return await requester("GET", `/synthesizers/${id}`, {
			auth_token: auth.token,
		});
	};
}
