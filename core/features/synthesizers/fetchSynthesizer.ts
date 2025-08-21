import { useGenerators } from "~/composables/generators";

export function fetchSynthesizer(api: ApiSchema, navigator: Redirector) {
	return async (id: string): Eventual<Synthesizer> => {
		const [ response, generators ] = await Promise.all([
			api.synthesizers.get(id),
			api.generators.list(),
		])

		if (!response.ok || !generators.ok) {
			navigator("/synthesizers");
			return;
		}

		useGenerators().store(generators.data)
		const synthesizer = response.data;

		const [ modules, cables ] = await Promise.all([
			api.modules.list(id),
			api.cables.list(id),
		])

		synthesizer.modules = modules.ok ? modules.data : [];
		synthesizer.cables = cables.ok ? cables.data : [];
		
		return synthesizer;
	};
}
