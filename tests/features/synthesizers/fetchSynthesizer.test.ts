import { describe, expect, test, vi } from "vitest"
import { fakeErrorApi, fakeModule, fakeNavigator, fakeSuccessApi, fakeSynthesizer } from "~/tests/fakes"

const fakes = {
  navigator: fakeNavigator,
}

describe("When the API successfully returns a synthesizer", () => {
  test("It correctly calls the fetcher to get the data", async () => {
    const fetchSpy = vi.spyOn(fakeSuccessApi.synthesizers, "get")
    const story = fetchSynthesizer(fakeSuccessApi, fakes.navigator)
    await story("synthesizerId")
    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith('synthesizerId')
  })
  test("It correctly calls the modules fetcher for data", async () => {
    const fetchSpy = vi.spyOn(fakeSuccessApi.modules, "list")
    const story = fetchSynthesizer(fakeSuccessApi, fakes.navigator)
    await story("synthesizerId")
    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith('synthesizerId')
  })
  test("It manages to get a synthesizer when there are no errors", async () => {
    const story = fetchSynthesizer(fakeSuccessApi, fakes.navigator)
    const response = await story("synthesizerId")
    expect(response).toEqual(fakeSynthesizer)
  })
  test("The synthesizer correctly has modules when there are no errors", async () => {
    const story = fetchSynthesizer(fakeSuccessApi, fakes.navigator)
    const response = await story("synthesizerId")
    expect(response?.modules).toEqual([ fakeModule ])
  })
})

describe("When the fetch of the synthesizer is in error", () => {
  test("It redirects the user if the synthesizer cannot be fetched", async () => {
    const navigatorSpy = vi.spyOn(fakes, "navigator")
    const story = fetchSynthesizer(fakeErrorApi, fakes.navigator)
    await story("cincorrectId")
    expect(navigatorSpy).toHaveBeenCalledExactlyOnceWith('/synthesizers')
  })
  test("does not call for the list of modules after that", async () => {
    const fetchSpy = vi.spyOn(fakeSuccessApi.modules, "list")
    const story = fetchSynthesizer(fakeErrorApi, fakes.navigator)
    await story("synthesizerId")
    expect(fetchSpy).toHaveBeenCalledTimes(0)
  })
})