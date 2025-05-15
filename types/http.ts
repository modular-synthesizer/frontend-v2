export type AsyncSuccess<T> = {
  ok: true,
  data: T
}

export type Failure = {
  ok: false,
  message: string
}

export type AsyncResult<T> = Promise<AsyncFailure<T> | AsyncSuccess>

type HttpPayload = Record<string, unknown>

type HttpMethod = 'GET'|'POST'|'PUT'|'DELETE'