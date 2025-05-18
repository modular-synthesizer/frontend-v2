import { afterEach, expect, test, vi } from "vitest"
import { fetchSynthesizers } from "../../../stories/synthesizers/fetchSynthesizers.ts"
import { fakeError, fakeSnacker } from "../../fakes"

const fakeSynthesizer = {
  id: "testId",
  name: "testName"
}

const fakes = {
  requestError: () => fakeError,
  requestSuccess: () => ({ ok: true, data: [ fakeSynthesizer ] }),
}

afterEach(() => vi.restoreAllMocks())

test("It correctly calls the snacker when the underlying request fails", async () => {
  const errorSpy = vi.spyOn(fakeSnacker, "error")
  const story = fetchSynthesizers(fakes.requestError, fakeSnacker)
  await story()
  expect(errorSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.errors.list")
})

test("It returns an empty list when the underlying request fails", async () => {
  const story = fetchSynthesizers(fakes.requestError, fakeSnacker)
  expect(await story()).toEqual([])
})

test("It returns the list of items when the request succeeds", async () => {
  const story = fetchSynthesizers(fakes.requestSuccess, fakeSnacker)
  expect(await story()).toEqual([ fakeSynthesizer ])
})