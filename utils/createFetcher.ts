import type { ExpectedResult, HttpPayload, HttpVerb } from "~/core/types/async";

async function getBody(response: Response) {
  try {
    return await response.json();
  }
  catch(_) {
    return undefined
  }
}

type Fetch = typeof fetch;

export function createFetcher<Entity>(fetchFunction: Fetch) {
  return async (method: HttpVerb, url: string, parameters: HttpPayload = {}, body: HttpPayload = {}): ExpectedResult<Entity> => {
    try {
      const params = new URLSearchParams(parameters);
      const options = { method, ...(method !== 'GET' ? { body: JSON.stringify(body) } : {}) }
      const response = await fetchFunction(`/proxy${url}?${params.toString()}`, options)
      if (response.status > 299) {
        const body = await getBody(response);
        return { ok: false, message: body.message, key: body.key }
      }
      return { ok: true, data: await getBody(response) }
    }
    catch(exception: unknown) {
      return { ok: false, message: (exception as Error).message, key: 'unknown' }
    }
  }
}