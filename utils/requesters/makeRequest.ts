type Requester<T> = (method: HttpMethod, url: string, parameters: HttpPayload, body: HttpPayload) => AsyncResult<T>;

/**
 * Makes a request on the API and builds a standard response from it.
 */
export async function makeRequest<T>(method: HttpMethod, url: string, parameters: HttpPayload, body: HttpPayload): AsyncResult<T> {
  try {
    const params = new URLSearchParams(parameters);
    const response = await fetch(`/proxy${url}?${params.toString()}`, { method, body: JSON.stringify(body) })
    if (response.status > 299) {
      const body = await response.json();
      return { ok: false, message: body.message, key: body.key }
    }
    return { ok: true, data: await response.json() }
  }
  catch(exception: unknown) {
    return { ok: false, message: exception.message, key: 'unknown' }
  }
}