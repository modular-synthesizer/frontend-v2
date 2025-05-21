export function createSynthesizer(api: ApiSchema, snack: Snacker) {
  return async (name: string, voices: number, list: Synthesizer[]): Eventual<Synthesizer> => {
    const response: AsyncResult<Synthesizer> = await api.synthesizers.new(name, voices)
    if (response.ok) {
      snack.success('synthesizers.create.success')
      list.push(response.data)
      return response.data
    }
    snack.error('synthesizers.errors.create')
    return undefined
  }
}