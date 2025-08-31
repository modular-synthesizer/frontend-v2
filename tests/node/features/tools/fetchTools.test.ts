import { describe, expect, test, vi } from "vitest";
import { fakeErrorApi } from "~/tests/factories/api/error";
import { fakeSuccessApi } from "~/tests/factories/api/success";
import { fakeSnacker } from "~/tests/fakes";

describe("API success", async () => {

  const feature = fetchTools(fakeSuccessApi, fakeSnacker)

  test("It correctly returns the list of tools", async () => {
    expect((await feature())[0].id).toEqual("toolId")
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