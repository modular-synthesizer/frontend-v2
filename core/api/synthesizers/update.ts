export type SynthesizerUpdateFetcher = (
	id: string,
	parameters: Partial<Synthesizer> & { auth_token: string },
) => ExpectedResult<Synthesizer>;

export function updateSynthesizer(
	requester: Fetcher<Synthesizer>,
	auth: Auth,
): SynthesizerGetFetcher {
	return async (
		id: string,
		parameters: Partial<Synthesizer>,
	): ExpectedResult<Synthesizer> => {
		const payload = { ...parameters, auth_token: auth.token };
		return await requester("PUT", `/synthesizers/${id}`, {}, payload);
	};
}
