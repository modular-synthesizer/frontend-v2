import { expect, test, vi } from "vitest"
import { fakeError, fakeSnacker } from "../../fakes"
import { createSynthesizer } from "../../../stories/synthesizers/createSynthesizer"

const fakeSynthesizer: Synthesizer = {
  id: "synthesizerId",
  name: "Synthesizer name",
  members: [ ],
  voices: 1
}

const fakeList: Synthesizer[] = []

const fakes = {
  requestError: (name: string, voices: number): AsyncFailure => fakeError,
  requestSuccess: (name: string, voices: number): AsyncSuccess<Synthesizer> => ({ ok: true, data: fakeSynthesizer }),
}

test("Correctly sends a success notification when the synthesizer is correctly created", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "success")
  const story = createSynthesizer(fakes.requestSuccess, fakeSnacker, fakeList)
  await story("Synthesizer name", 16)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.create.success")
})

test("Correctly creates the synthesizer when valid data are given", async () => {
  const story = createSynthesizer(fakes.requestSuccess, fakeSnacker, fakeList)
  const synthesizer: Synthesizer = await story("Synthesizer name", 16) as Synthesizer
  expect(synthesizer.id).toEqual("synthesizerId")
})

test("Adds the newly created synthesizer to the given list", async () => {
  const story = createSynthesizer(fakes.requestSuccess, fakeSnacker, fakeList)
  await story("Synthesizer name", 16)
  expect(fakeList[0].id).toEqual("synthesizerId")
})

test("Returns undefined when the synthesizer is not correctly created", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "error")
  const story = createSynthesizer(fakes.requestError, fakeSnacker, fakeList)
  await story("Bad name", 16)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.errors.create")
})

test("Sends an error notification when the synthesizer is not correctly created", async () => {
  const story = createSynthesizer(fakes.requestError, fakeSnacker, fakeList)
  expect(await story("Bad name", 16)).toBeUndefined()
})