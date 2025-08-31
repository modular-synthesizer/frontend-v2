import { expect, test, vi } from "vitest"
import { fakeSnacker } from "../../../fakes"
import { fakeErrorApi } from "~/tests/factories/api/error";
import { fakeSuccessApi } from "~/tests/factories/api/success";
import { createSynthesizer } from "../../../../core/features/synthesizers/createSynthesizer"

const fakeList: Synthesizer[] = []

test("Correctly sends a success notification when the synthesizer is correctly created", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "success")
  const story = createSynthesizer(fakeSuccessApi, fakeSnacker)
  await story("Synthesizer name", 16, fakeList)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.create.success")
})

test("Correctly creates the synthesizer when valid data are given", async () => {
  const story = createSynthesizer(fakeSuccessApi, fakeSnacker)
  const synthesizer: Synthesizer = await story("Synthesizer name", 16, fakeList) as Synthesizer
  expect(synthesizer.id).toEqual("synthesizerId")
})

test("Adds the newly created synthesizer to the given list", async () => {
  const story = createSynthesizer(fakeSuccessApi, fakeSnacker)
  await story("Synthesizer name", 16, fakeList)
  expect(fakeList[0].id).toEqual("synthesizerId")
})

test("Returns undefined when the synthesizer is not correctly created", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "error")
  const story = createSynthesizer(fakeErrorApi, fakeSnacker)
  await story("Bad name", 16, fakeList)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.errors.create")
})

test("Sends an error notification when the synthesizer is not correctly created", async () => {
  const story = createSynthesizer(fakeErrorApi, fakeSnacker)
  expect(await story("Bad name", 16, fakeList)).toBeUndefined()
})