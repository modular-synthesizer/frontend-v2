type Requester = () => ExpectedResult<Synthesizer[]>

export function fetchSynthesizers(requester: Requester, snack: Snacker) {
  return async (): Promise<Synthesizer[]> => {
    const response: AsyncResult<Synthesizer[]> = await requester();
    if(!response.ok) {
      snack.error('synthesizers.errors.list')
      return []
    }
    
    return response.data
  }
}