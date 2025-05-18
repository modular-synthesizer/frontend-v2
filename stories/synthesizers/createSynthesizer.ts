type Requester = (name: string, voices: number) => AsyncResult<Synthesizer>

export function createSynthesizer(requester: Requester, snack: Snacker) {
  return async (name: string, voices: number): Promise<Eventual<Synthesizer>> => {
    const response: AsyncResult<Synthesizer> = await requester(name, voices)
    if (response.ok) {
      snack.success('synthesizers.create.success')
      return response.data
    }
    else {
      snack.error('synthesizers.errors.create')
      return undefined
    }
  }
}