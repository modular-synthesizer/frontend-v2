import { describe, expect, test, vi } from "vitest";
import { fakeErrorApi, fakeSnacker, fakeSuccessApi } from "~/tests/fakes";

describe("API success", async () => {

  const feature = fetchTools(fakeSuccessApi, fakeSnacker)

  test("It correctly returns the list of tools", async () => {
    expect(await feature()).toEqual([ { id: "toolId", controls: [] }])
  })
})

describe("API error", async () => {

  test("It correctly calls the snacker when the underlying request fails", async () => {
    const errorSpy = vi.spyOn(fakeSnacker, "error")
    const feature = fetchTools(fakeErrorApi, fakeSnacker)
    await feature()
    expect(errorSpy).toHaveBeenCalledExactlyOnceWith("modules.errors.list")
  })
  test("It returns an empty list when the underlying request fails", async () => {
    const feature = fetchTools(fakeErrorApi, fakeSnacker)
    expect(await feature()).toEqual([])
  })
})