import { SynthesizerBuilder, type Synthesizer } from "@jsynple/core"
import { initSynthesizer } from "@jsynple/audio"

export function fetchSynthesizer(api: ApiSchema, navigator: Redirector) {
	return async (id: string, context: AudioContext): Eventual<Synthesizer> => {
		const response = await api.synthesizers.get(id);
		if (!response.ok) {
			navigator("/synthesizers");
			return;
		}

		const [modules, cables, generators] = await Promise.all([
			api.modules.list(id),
			api.cables.list(id),
			api.generators.list()
		])

		const data = await SynthesizerBuilder(response.data, modules.ok ? modules.data : [], cables.ok ? cables.data : [])

		await initSynthesizer(data, generators.ok ? generators.data : [], context)

		return data
	};
}
