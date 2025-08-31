import { describe, expect, test, vi } from "vitest"
import { fakeNavigator } from "~/tests/fakes"
import { fakeErrorApi } from "~/tests/factories/api/error";
import { fakeSuccessApi } from "~/tests/factories/api/success";
import { synthesizerFactory } from "~/tests/factories/synthesizers";
import { moduleFactory } from "~/tests/factories/modules";

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
    const fakeSynthesizer = await synthesizerFactory()
    const story = fetchSynthesizer(fakeSuccessApi, fakes.navigator)
    const response = await story("synthesizerId")
    expect(response).toEqual(fakeSynthesizer)
  })
  test("The synthesizer correctly has modules when there are no errors", async () => {
    const fakeModule = await moduleFactory()
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