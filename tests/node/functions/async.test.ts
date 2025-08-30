import { describe, expect, test } from "vitest"

describe("success", () => {
  test("Correctly creates a structure rerpesenting a success", () => {
    expect(success<number>(42)).toEqual({ ok: true, data: 42 })
  })
  test("Creates a success with an object", () => {
    expect(success<{ foo: string }>({ foo: 'bar' })).toEqual({ ok: true, data: { foo: 'bar' }})
  })
})

describe("failure", () => {
  test("Correctly creates an error from the correct structure", () => {
    expect(failure("foo", "bar")).toEqual({ ok: false, key: 'foo', message: 'bar' })
  })
})