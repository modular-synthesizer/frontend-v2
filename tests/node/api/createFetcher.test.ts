import { describe, expect, test, vi } from "vitest"

function verbs(...args: string[]) {
  return args.map((verb: string) => ({ verb }))
}

const fakes = {
  fetch: ((_url: string, _options: { method: HttpVerb, body?: string }) => { }) as (typeof fetch),
  success: (async (_url: string, _options: { method: HttpVerb, body?: string }): Promise<Response> => {
    return new Response("", { status: 200 });
  }) as (typeof fetch),
  error: (async (_url: string, _options: { method: HttpVerb, body?: string }): Promise<Response> => {
    return new Response(JSON.stringify({ key: 'testKey', message: 'testMessage'}), { status: 400 });
  }) as (typeof fetch),
  exception: (async (_url: string, _options: { method: HttpVerb, body?: string }): Promise<Response> => {
    throw new Error('testError')
  }) as (typeof fetch),
}

describe("How the call is transferred", async () => {
  test("The HTTP query is made with the correct verb and URL", async () => {
    const fetchSpy = vi.spyOn(fakes, "fetch")
    const fetcher = createFetcher(fakes.fetch)
    fetcher('GET', '/test')
    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith('/proxy/test?', { method: 'GET' })
  })
  test("The HTTP query is made with the correct querystring if there are parameters", async () => {
    const fetchSpy = vi.spyOn(fakes, "fetch")
    const fetcher = createFetcher(fakes.fetch)
    fetcher('GET', '/test', { foo: 'bar', test: 'baz' })
    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith('/proxy/test?foo=bar&test=baz', { method: 'GET' })
  })
  test("The body is correctly forwarded when it's present", async () => {
    const fetchSpy = vi.spyOn(fakes, "fetch")
    const fetcher = createFetcher(fakes.fetch)
    fetcher('POST', '/test', { }, { foo: 'bar' })
    const body = JSON.stringify({ foo: 'bar' })
    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith('/proxy/test?', { method: 'POST', body })
  })
  test.each(verbs('GET', 'DELETE'))("The body is ignored in case the HTTP verb is $verb", async ({ verb }) => {
    const fetchSpy = vi.spyOn(fakes, "fetch")
    const fetcher = createFetcher(fakes.fetch)
    fetcher(verb as HttpVerb, '/test', { }, { foo: 'bar' })
    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith('/proxy/test?', { method: verb })
  })
})

describe("The underlying HTTP query is successful", async () => {
  test("Returns the parsed body as an asynchronous success object", async () => {
    const fetcher = createFetcher(fakes.success)
    const results: AsyncResult<unknown> = await fetcher('GET', '/test')
    expect(results.ok).toBe(true)
  })
})

describe("The function itself raises an exception", async () => {
  test("Correctly wraps the exception as an asynchronous error object", async () => {
    const fetcher = createFetcher(fakes.error)
    const results: AsyncResult<unknown> = await fetcher('GET', '/test')
    expect(results).toEqual({ ok: false, key: 'testKey', message: 'testMessage' })
  })
})

describe("The uderlying call returns an error", async () => {
  test("Correctly forwards the error as an asynchronous error object", async () => {
    const fetcher = createFetcher(fakes.exception)
    const results: AsyncResult<unknown> = await fetcher('GET', '/test')
    expect(results).toEqual({ ok: false, key: 'unknown', message: 'testError' })
  })
})