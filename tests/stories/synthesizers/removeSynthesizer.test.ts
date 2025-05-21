import { afterEach, expect, test, vi } from 'vitest'
import { fakeError, fakeSnacker, type ExpectedFailure, type ExpectedSuccess } from '../../fakes'
import { removeSynthesizer } from "../../../core/features/synthesizers/removeSynthesizer"

const fakeData = () => {
  return [
    { id: 'firstSynth', voices: 1, name: 'First Synth', members: [ ]},
    { id: 'secondSynth', voices: 1, name: 'Second Synth', members: [ ]},
  ]
}

const fakes = {
  requestError: async (): ExpectedFailure => fakeError,
  requestSuccess: async (): ExpectedSuccess<void> => ({ ok: true, data: undefined }),
}

afterEach(() => vi.restoreAllMocks())

test('Correctly delets the synthesizer from the list', async () => {
  const data = fakeData()
  await removeSynthesizer(fakes.requestSuccess, fakeSnacker)("firstSynth", data)
  expect(data.length).toBe(1)
})

test('Displays a success snack if the synthesizer is correctly deleted', async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "success")
  const story = removeSynthesizer(fakes.requestSuccess, fakeSnacker)
  await story("secondSynth", fakeData())
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.deletion.success")
})

test('Displays an error snack if the synthesizer fails to be deleted', async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "error")
  const story = removeSynthesizer(fakes.requestError, fakeSnacker)
  await story("secondSynth", fakeData())
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.deletion.error")
})

test('Does not delete any synthesizer in the list if the synthesizer is not in it', async () => {
  const data = fakeData()
  await removeSynthesizer(fakes.requestError, fakeSnacker)("thirdSynth", data)
  expect(data.length).toBe(2)
})