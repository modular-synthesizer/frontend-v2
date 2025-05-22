async function fetchRescale(api: ApiSchema, synthesizer: Synthesizer, scale: number) {
  return useDebounceFn(async () => {
    console.log("test")
    return await api.synthesizers.update(synthesizer, { scale })
  }, 1000)
}

export function rescaleSynthesizer(api: ApiSchema, debouncer: Debouncer) {
  console.log(debouncer)
  return async (synthesizer: Synthesizer, deltaY: number) => {
    const unbound: number = Math.abs(synthesizer.scale + deltaY * -ZOOM_RATIO);
    const scale = Math.min(Math.max(MAX_ZOOM_OUT, unbound), MAX_ZOOM_IN);

    synthesizer.scale = scale;
    const debounced = debouncer.debounce('test', 1000, () => {
      api.synthesizers.update(synthesizer.id, { scale })
    })
  }
}