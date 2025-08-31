// @vitest-environment nuxt
import { expect, test, vi } from "vitest"
import { fakeSnacker } from "../../../fakes"
import { fakeError, fakeErrorApi } from "~/tests/factories/api/error";
import { fakeSuccessApi } from "~/tests/factories/api/success";
import { moveSynthesizer } from "../../../../core/features/synthesizers/moveSynthesizer"
import { synthesizerFactory } from "~/tests/factories/synthesizers";

test("Calls the API with the correct parameters", async () => {
  const fakeSynthesizer = await synthesizerFactory()
  const apiSpy = vi.spyOn(fakeSuccessApi.synthesizers, "update")
  const feature = moveSynthesizer(fakeSuccessApi, fakeSnacker)
  await feature(fakeSynthesizer, { x: 100, y: 100 })
  expect(apiSpy).toHaveBeenCalledExactlyOnceWith("synthesizerId", { x: 100, y: 100 })
})

test("Correctly sets the value of the synthesizer scale", async () => {
  const fakeSynthesizer = await synthesizerFactory()
  const feature = moveSynthesizer(fakeSuccessApi, fakeSnacker)
  await feature(fakeSynthesizer, { x: 100, y: 100 })
  expect(fakeSynthesizer.x).toBe(100)
  expect(fakeSynthesizer.y).toBe(100)
})

test("Correctly display an alert if the request is not successful", async () => {
  const fakeSynthesizer = await synthesizerFactory()
  const snackSpy = vi.spyOn(fakeSnacker, "asyncError")
  const feature = moveSynthesizer(fakeErrorApi, fakeSnacker)
  await feature(fakeSynthesizer, { x: 100, y: 100 })
  expect(snackSpy).toHaveBeenCalledExactlyOnceWith(fakeError)
})