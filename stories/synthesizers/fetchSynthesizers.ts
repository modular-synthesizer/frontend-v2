type Requester = () => AsyncResult<Synthesizer[]>

export function fetchSynthesizers(requester: Requester, snack: Snacker) {
  return async (): Promise<Synthesizers[]> => {
    const response: AsyncResult<Synthesizer[]> = await requester();
    if(!response.ok) snack.error('synthesizers.errors.list')
    return response.ok ? response.data : []
  }
}