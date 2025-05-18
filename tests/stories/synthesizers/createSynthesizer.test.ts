import { expect, test, vi } from "vitest"
import { fakeError, fakeSnacker } from "../../fakes"
import { createSynthesizer } from "../../../stories/synthesizers/createSynthesizer"

const fakeSynthesizer = {
  id: "synthesizerId",
  name: "Synthesizer name",
  members: [ ]
}

const fakes = {
  requestError: (name: string, voices: number) => fakeError,
  requestSuccess: (name: string, voices: number) => ({ ok: true, data: fakeSynthesizer }),
}

test("Correctly creates the synthesizer when valid data are given", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "success")
  const story = createSynthesizer(fakes.requestSuccess, fakeSnacker)
  await story("Synthesizer name", 16)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.create.success")
})

test("Correctly sends a success notification when the synthesizer is correctly created", async () => {
  const story = createSynthesizer(fakes.requestSuccess, fakeSnacker)
  const synthesizer: Synthesizer = await story("Synthesizer name", 16)
  expect(synthesizer.id).toEqual("synthesizerId")
})

test("Returns undefined when the synthesizer is not correctly created", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "error")
  const story = createSynthesizer(fakes.requestError, fakeSnacker)
  await story("Bad name", 16)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.errors.create")
})

test("Sends an error notification when the synthesizer is not correctly created", async () => {
  const story = createSynthesizer(fakes.requestError, fakeSnacker)
  expect(await story("Bad name", 16)).toBeUndefined()
})