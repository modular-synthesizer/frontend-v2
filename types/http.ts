export type AsyncSuccess<T> = {
  ok: true
  data: T
}

export type AsyncFailure = {
  ok: false
  key: string
  message: string
}

export type AsyncResult<T> = Promise<AsyncFailure | AsyncSuccess<T>>

type HttpPayload = Record<string, unknown>

type HttpMethod = 'GET'|'POST'|'PUT'|'DELETE'