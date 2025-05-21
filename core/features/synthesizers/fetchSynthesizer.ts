type Requester = (id: string) => ExpectedResult<Synthesizer>

export function fetchSynthesizer(requester: Requester, navigator: Redirector) {
  return async (id: string): Eventual<Synthesizer> => {
    const response = await requester(id)
    if (response.ok) return response.data;
    navigator('/synthesizers')
  }
}