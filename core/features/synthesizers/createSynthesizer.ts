type Requester = (name: string, voices: number) => ExpectedResult<Synthesizer>

export function createSynthesizer(requester: Requester, snack: Snacker) {
  return async (name: string, voices: number, list: Synthesizer[]): Eventual<Synthesizer> => {
    const response: AsyncResult<Synthesizer> = await requester(name, voices)
    if (response.ok) {
      snack.success('synthesizers.create.success')
      list.push(response.data)
      return response.data
    }
    snack.error('synthesizers.errors.create')
    return undefined
  }
}