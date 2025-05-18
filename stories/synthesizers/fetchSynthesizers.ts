type Requester = () => AsyncResult<Synthesizer[]>

type Snacker = {
  success: (text: string) => void
  error: (text: string) => void
  asyncError: (failure: AsyncFailure) => void
}

export function fetchSynthesizers(requester: Requester, snack: Snacker) {
  return async (): Promise<Synthesizers[]> => {
    const response: AsyncResult<Synthesizer[]> = await requester();
    if(!response.ok) snack.error('synthesizers.errors.list')
    return response.ok ? response.data : []
  }
}