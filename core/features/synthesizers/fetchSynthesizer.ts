export function fetchSynthesizer(api: ApiSchema, navigator: Redirector) {
  return async (id: string): Eventual<Synthesizer> => {
    const response = await api.synthesizers.get(id)
    if (response.ok) return response.data;
    navigator('/synthesizers')
  }
}