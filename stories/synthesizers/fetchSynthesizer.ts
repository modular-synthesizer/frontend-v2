type Requester = (id: string) => AsyncResult<Synthesizer>

type Navigator = typeof navigateTo;

export function fetchSynthesizer(requester: Requester, navigator: Navigator) {
  console.log(navigator);
  return async (id: string) => {
    const response = await requester(id)
    if (!response.ok) {
      return navigator('/synthesizers')
    }
    return response.data
  }
}