// @vitest-environment nuxt
import { describe, expect, test, vi } from "vitest"
import { fakeError, fakeErrorApi, fakeSuccessApi, fakeTimeout, fakeClear, fakeSnacker, fakeSynthesizer } from "../../fakes"
import { rescaleSynthesizer } from "../../../core/features/synthesizers/scaleSynthesizer"

const fakeDebouncer = useDebounceTemplate(fakeTimeout, fakeClear)()

test("Calls the API with the correct parameters", async () => {
  const apiSpy = vi.spyOn(fakeSuccessApi.synthesizers, "update")
  const feature = rescaleSynthesizer(fakeSuccessApi, fakeDebouncer, fakeSnacker)
  await feature(fakeSynthesizer, 100)
  expect(apiSpy).toHaveBeenCalledExactlyOnceWith("synthesizerId", { scale: 0.5 })
})

test("Correctly sets the value of the synthesizer scale", async () => {
  const feature = rescaleSynthesizer(fakeSuccessApi, fakeDebouncer, fakeSnacker)
  await feature(fakeSynthesizer, 100)
  expect(fakeSynthesizer.scale).toBe(0.5)
})

test("Correctly display an alert if the request is not successful", async () => {
  const snackSpy = vi.spyOn(fakeSnacker, "asyncError")
  const feature = rescaleSynthesizer(fakeErrorApi, fakeDebouncer, fakeSnacker)
  await feature(fakeSynthesizer, 100)
  expect(snackSpy).toHaveBeenCalledExactlyOnceWith(fakeError)
})