type Requester = (id: string) => AsyncResult<void>

export function removeSynthesizer(requester: Requester, snacker: Snacker, list: Synthesizer[]) {
  return async (id: string) => {
    const response: AsyncResult<void> = await requester(id);
    if (response.ok) {
      snacker.success('synthesizers.deletion.success');
      const index: number = list.findIndex((s: Synthesizer) => s.id === id)
      if (index >= 0) list.splice(index, 1)
    }
    else {
      snacker.error('synthesizers.deletion.error');
    }
  }
}