type Requester = () => AsyncResult<Synthesizer>

export function createSynthesizer(requester: Requester) {
  return async (name: string, voices: number): AsyncResult<Synthesizer> => {
    return await requester(name, voices)
  }
}