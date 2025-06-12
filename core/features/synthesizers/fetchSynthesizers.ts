export function fetchSynthesizers(api: ApiSchema, snack: Snacker) {
	return async (): Promise<Synthesizer[]> => {
		const response: AsyncResult<Synthesizer[]> = await api.synthesizers.list();
		if (!response.ok) {
			snack.error("synthesizers.errors.list");
			return [];
		}

		return response.data;
	};
}
