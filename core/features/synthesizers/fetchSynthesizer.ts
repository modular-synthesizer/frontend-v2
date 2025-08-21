import { useGenerators } from "~/composables/generators";

export function fetchSynthesizer(api: ApiSchema, navigator: Redirector) {
	return async (id: string): Eventual<Synthesizer> => {
		const response = await api.synthesizers.get(id);
		if (!response.ok) {
			navigator("/synthesizers");
			return;
		}

		const synthesizer = response.data;

		const [ modules, cables, generators ] = await Promise.all([
			api.modules.list(id),
			api.cables.list(id),
			api.generators.list()
		])

		if (generators.ok) {
			useGenerators().store(generators.data)
		}

		synthesizer.modules = modules.ok ? modules.data : [];
		synthesizer.cables = cables.ok ? cables.data : [];
		
		return synthesizer;
	};
}
