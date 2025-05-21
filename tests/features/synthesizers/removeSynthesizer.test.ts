import { afterEach, expect, test, vi } from 'vitest'
import { fakeErrorApi, fakeSnacker, fakeSuccessApi } from '../../fakes'
import { removeSynthesizer } from "../../../core/features/synthesizers/removeSynthesizer"

const fakeData = () => {
  return [
    { id: 'firstSynth', voices: 1, name: 'First Synth', members: [ ]},
    { id: 'secondSynth', voices: 1, name: 'Second Synth', members: [ ]},
  ]
}

afterEach(() => vi.restoreAllMocks())

test('Correctly delets the synthesizer from the list', async () => {
  const data = fakeData()
  await removeSynthesizer(fakeSuccessApi, fakeSnacker)("firstSynth", data)
  expect(data.length).toBe(1)
})

test('Displays a success snack if the synthesizer is correctly deleted', async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "success")
  const story = removeSynthesizer(fakeSuccessApi, fakeSnacker)
  await story("secondSynth", fakeData())
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.deletion.success")
})

test('Displays an error snack if the synthesizer fails to be deleted', async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "error")
  const story = removeSynthesizer(fakeErrorApi, fakeSnacker)
  await story("secondSynth", fakeData())
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.deletion.error")
})

test('Does not delete any synthesizer in the list if the synthesizer is not in it', async () => {
  const data = fakeData()
  await removeSynthesizer(fakeErrorApi, fakeSnacker)("thirdSynth", data)
  expect(data.length).toBe(2)
})