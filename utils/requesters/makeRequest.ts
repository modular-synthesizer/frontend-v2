type Requester<T> = (method: HttpMethod, url: string, parameters: HttpPayload, body: HttpPayload) => AsyncResult<T>;

async function getBody(response) {
  try {
    return await response.json();
  }
  catch(_) {
    return undefined
  }
}

/**
 * Makes a request on the API and builds a standard response from it.
 */
export async function makeRequest<T>(method: HttpMethod, url: string, parameters: HttpPayload = {}, body: HttpPayload = {}): AsyncResult<T> {
  try {
    const params = new URLSearchParams(parameters);
    const options = { method, ...(method !== 'GET' ? { body: JSON.stringify(body) } : {}) }
    const response = await fetch(`/proxy${url}?${params.toString()}`, options)
    if (response.status > 299) {
      const body = await getBody(response);
      return { ok: false, message: body.message, key: body.key }
    }
    return { ok: true, data: await getBody(response) }
  }
  catch(exception: unknown) {
    console.log(exception)
    return { ok: false, message: exception.message, key: 'unknown' }
  }
}