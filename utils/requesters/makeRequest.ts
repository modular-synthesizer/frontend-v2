/**
 * Makes a request on the API and builds a standard response from it.
 */
export async function makeRequest<T>(method: HttpMethod, url: string, parameters: HttpPayload, body: HttpPayload): AsyncResult<T> {
  try {
    const params = new URLSearchParams(parameters);
    const response = await fetch(`${url}?${params.toString()}`, { method, body: JSON.stringify(body) })
    if (response.status > 299) return { ok: false, message: 'http_error' }
    return { ok: true, data: response.data }
  }
  catch(exception: unknown) {
    return { ok: false, message: exception.message }
  }
}