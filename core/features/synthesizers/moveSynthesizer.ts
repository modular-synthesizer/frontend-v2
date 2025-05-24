export function moveSynthesizer(api: ApiSchema, snack: Snacker) {
  return async (synthesizer: Synthesizer, { x, y }: Coordinates) => {
      synthesizer.x = x
      synthesizer.y = y
      const response = await api.synthesizers.update(synthesizer.id, { x, y })
      if (!response.ok) snack.asyncError(response)
  }
}