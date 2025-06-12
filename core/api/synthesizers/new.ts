export type SynthesizerCreationFetcher = (
	name: string,
	voices: number,
) => ExpectedResult<Synthesizer>;

export function newSynthesizer(
	requester: Fetcher<Synthesizer>,
	auth: Auth,
): SynthesizerCreationFetcher {
	return async (name: string, voices: number): ExpectedResult<Synthesizer> => {
		return await requester(
			"POST",
			"/synthesizers",
			{},
			{ name, voices: `${voices}`, auth_token: auth.token },
		);
	};
}
