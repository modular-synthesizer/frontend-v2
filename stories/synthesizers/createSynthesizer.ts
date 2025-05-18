type Requester = (name: string, voices: number) => AsyncResult<Synthesizer>

export function createSynthesizer(requester: Requester, snack: Snacker, list: Synthesizer[]) {
  return async (name: string, voices: number) => {
    const response: AsyncResult<Synthesizer> = await requester(name, voices)
    if (response.ok) {
      snack.success('synthesizers.create.success')
      list.push(response.data)
      return response.data
    }
    else {
      snack.error('synthesizers.errors.create')
      return undefined
    }
  }
}