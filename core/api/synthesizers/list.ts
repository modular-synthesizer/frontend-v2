export type SynthesizerListFetcher = () => ExpectedResult<Synthesizer[]>;

export function listSynthesizers(
	requester: Fetcher<Synthesizer[]>,
	auth: Auth,
): SynthesizerListFetcher {
	return async (): ExpectedResult<Synthesizer[]> => {
		return requester("GET", "/synthesizers", { auth_token: auth.token });
	};
}
