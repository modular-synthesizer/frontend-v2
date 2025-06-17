export function rescaleSynthesizer(
	api: ApiSchema,
	debouncer: Debouncer,
	snack: Snacker,
) {
	return async (synthesizer: Synthesizer, deltaY: number) => {
		synthesizer.scale = computeScale(synthesizer, deltaY);
		debouncer.debounce(`synth.scale.${synthesizer.id}`, 1000, async () => {
			const response = await api.synthesizers.update(synthesizer.id, { scale: synthesizer.scale });
			if (!response.ok) snack.asyncError(response);
		});
	};
}
