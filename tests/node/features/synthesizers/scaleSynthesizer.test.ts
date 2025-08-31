// @vitest-environment nuxt
import { describe, expect, test, vi } from "vitest"
import { fakeTimeout, fakeClear, fakeSnacker } from "../../../fakes"
import { fakeErrorApi } from "~/tests/factories/api/error";
import { factories } from "../../../factories"
import { rescaleSynthesizer } from "../../../../core/features/synthesizers/scaleSynthesizer"

const fakeDebouncer = useDebounceTemplate(fakeTimeout, fakeClear)()

describe("Feature to scale up or down the synthesizer", async () => {

  const synthesizer = await factories.synthesizers.build()

  const api: ApiSchema = {
    synthesizers: { update: async(id: string) => success(synthesizer) }
  } as unknown as ApiSchema

  test("Calls the API with the correct parameters", async () => {
    const apiSpy = vi.spyOn(api.synthesizers, "update")
    const feature = rescaleSynthesizer(api, fakeDebouncer, fakeSnacker)
    await feature(synthesizer, 100)
    expect(apiSpy).toHaveBeenCalledExactlyOnceWith(synthesizer.id, { scale: 0.5 })
  })

  test("Correctly sets the value of the synthesizer scale", async () => {
    const feature = rescaleSynthesizer(api, fakeDebouncer, fakeSnacker)
    await feature(synthesizer, 100)
    expect(synthesizer.scale).toBe(0.5)
  })

  test("Correctly display an alert if the request is not successful", async () => {
    const snackSpy = vi.spyOn(fakeSnacker, "asyncError")
    const feature = rescaleSynthesizer(fakeErrorApi, fakeDebouncer, fakeSnacker)
    await feature(synthesizer, 100)
    expect(snackSpy).toHaveBeenCalledExactlyOnceWith({ ok: false, key: "username", message: "unknown" })
  })
})