// @vitest-environment nuxt
import { describe, expect, test, vi } from "vitest"
import { fakeError, fakeErrorApi, fakeSuccessApi, fakeSnacker, fakeSynthesizer } from "../../fakes"
import { moveSynthesizer } from "../../../core/features/synthesizers/moveSynthesizer"

test("Calls the API with the correct parameters", async () => {
  const apiSpy = vi.spyOn(fakeSuccessApi.synthesizers, "update")
  const feature = moveSynthesizer(fakeSuccessApi, fakeSnacker)
  await feature(fakeSynthesizer, { x: 100, y: 100 })
  expect(apiSpy).toHaveBeenCalledExactlyOnceWith("synthesizerId", { x: 100, y: 100 })
})

test("Correctly sets the value of the synthesizer scale", async () => {
  const feature = moveSynthesizer(fakeSuccessApi, fakeSnacker)
  await feature(fakeSynthesizer, { x: 100, y: 100 })
  expect(fakeSynthesizer.x).toBe(100)
  expect(fakeSynthesizer.y).toBe(100)
})

test("Correctly display an alert if the request is not successful", async () => {
  const snackSpy = vi.spyOn(fakeSnacker, "asyncError")
  const feature = moveSynthesizer(fakeErrorApi, fakeSnacker)
  await feature(fakeSynthesizer, { x: 100, y: 100 })
  expect(snackSpy).toHaveBeenCalledExactlyOnceWith(fakeError)
})