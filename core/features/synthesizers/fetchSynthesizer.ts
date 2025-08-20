export function fetchSynthesizer(api: ApiSchema, navigator: Redirector) {
	return async (id: string): Eventual<Synthesizer> => {
		const response = await api.synthesizers.get(id);
		if (!response.ok) {
			navigator("/synthesizers");
			return;
		}

		const synthesizer = response.data;

		const [ modules, cables ] = await Promise.all([
			api.modules.list(id),
			api.cables.list(id)
		])

		synthesizer.modules = modules.ok ? modules.data : [];
		synthesizer.cables = cables.ok ? cables.data : [];
		
		return synthesizer;
	};
}
