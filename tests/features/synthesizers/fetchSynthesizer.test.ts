import { expect, test, vi } from "vitest"
import { fakeErrorApi, fakeNavigator, fakeSuccessApi, fakeSynthesizer } from "~/tests/fakes"

const fakes = { navigator: fakeNavigator }

test("It correctly calls the fetcher to get the data", async () => {
  const fetchSpy = vi.spyOn(fakeSuccessApi.synthesizers, "get")
  const story = fetchSynthesizer(fakeSuccessApi, fakes.navigator)
  await story("synthesizerId")
  expect(fetchSpy).toHaveBeenCalledExactlyOnceWith('synthesizerId')
})

test("It manages to get a synthesizer when there are no errors", async () => {
  const story = fetchSynthesizer(fakeSuccessApi, fakes.navigator)
  const response = await story("incorrectId")
  expect(response).toEqual(fakeSynthesizer)
})

test("It redirects the user if the synthesizer cannot be fetched", async () => {
  const navigatorSpy = vi.spyOn(fakes, "navigator")
  const story = fetchSynthesizer(fakeErrorApi, fakes.navigator)
  await story("cincorrectId")
  expect(navigatorSpy).toHaveBeenCalledExactlyOnceWith('/synthesizers')
})