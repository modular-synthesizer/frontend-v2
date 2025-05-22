export function rescaleSynthesizer(api: ApiSchema, debouncer: Debouncer, snack: Snacker) {
  return async (synthesizer: Synthesizer, deltaY: number) => {
    const unbound: number = Math.abs(synthesizer.scale + deltaY * -ZOOM_RATIO);
    const scale = Math.min(Math.max(MAX_ZOOM_OUT, unbound), MAX_ZOOM_IN);

    synthesizer.scale = scale;
    const debounced = debouncer.debounce(`synth.scale.${synthesizer.id}`, 1000, async () => {
      const response = await api.synthesizers.update(synthesizer.id, { scale })
      if (!response.ok) snack.asyncError(response)
    })
  }
}