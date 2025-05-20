type Requester = (id: string) => AsyncResult<void>

/**
 * This story is used in several cases :
 * 1. A user removes a synthesizer on the API successfully and it's deleted from the interface.
 * 2. A user receives a message from the SSE socket to remove a synthesizer he's been banned from.
 * 
 * @param id The UUID of the synthesizer to delete from the list
 * @param list The list of synthesizer from which the syntheiszer will be deleted.
 */
export function deleteSynthesizerFromlist(id: string, list: Synthesizer[]) {
  const index: number = list.findIndex((s: Synthesizer) => s.id === id)
  if (index >= 0) list.splice(index, 1)
}

export function removeSynthesizer(requester: Requester, snacker: Snacker, list: Synthesizer[]) {
  return async (id: string) => {
    deleteSynthesizerFromlist(id, list)
    const response: AsyncResult<void> = await requester(id);
    if (response.ok) {
      snacker.success('synthesizers.deletion.success');
    }
    else {
      snacker.error('synthesizers.deletion.error');
    }
  }
}