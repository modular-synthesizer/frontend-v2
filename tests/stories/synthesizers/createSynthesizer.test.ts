import { expect, test, vi } from "vitest"
import { fakeError, fakeSnacker, type ExpectedFailure, type ExpectedSuccess } from "../../fakes"
import { createSynthesizer } from "../../../core/features/synthesizers/createSynthesizer"

const fakeSynthesizer: Synthesizer = {
  id: "synthesizerId",
  name: "Synthesizer name",
  members: [ ],
  voices: 1
}

const fakeList: Synthesizer[] = []

const fakes = {
  requestError: async (name: string, voices: number): ExpectedFailure => fakeError,
  requestSuccess: async (name: string, voices: number): ExpectedSuccess<Synthesizer> => ({ ok: true, data: fakeSynthesizer }),
}

test("Correctly sends a success notification when the synthesizer is correctly created", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "success")
  const story = createSynthesizer(fakes.requestSuccess, fakeSnacker)
  await story("Synthesizer name", 16, fakeList)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.create.success")
})

test("Correctly creates the synthesizer when valid data are given", async () => {
  const story = createSynthesizer(fakes.requestSuccess, fakeSnacker)
  const synthesizer: Synthesizer = await story("Synthesizer name", 16, fakeList) as Synthesizer
  expect(synthesizer.id).toEqual("synthesizerId")
})

test("Adds the newly created synthesizer to the given list", async () => {
  const story = createSynthesizer(fakes.requestSuccess, fakeSnacker)
  await story("Synthesizer name", 16, fakeList)
  expect(fakeList[0].id).toEqual("synthesizerId")
})

test("Returns undefined when the synthesizer is not correctly created", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "error")
  const story = createSynthesizer(fakes.requestError, fakeSnacker)
  await story("Bad name", 16, fakeList)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.errors.create")
})

test("Sends an error notification when the synthesizer is not correctly created", async () => {
  const story = createSynthesizer(fakes.requestError, fakeSnacker)
  expect(await story("Bad name", 16, fakeList)).toBeUndefined()
})