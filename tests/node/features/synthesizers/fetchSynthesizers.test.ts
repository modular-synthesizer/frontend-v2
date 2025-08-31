import { afterEach, expect, test, vi } from "vitest"
import { fetchSynthesizers } from "../../../../core/features/synthesizers/fetchSynthesizers"
import { fakeSnacker } from "../../../fakes"
import { fakeErrorApi } from "~/tests/factories/api/error";
import { fakeSuccessApi } from "~/tests/factories/api/success";
import { synthesizerFactory } from "~/tests/factories/synthesizers";

afterEach(() => vi.restoreAllMocks())

test("It correctly calls the snacker when the underlying request fails", async () => {
  const errorSpy = vi.spyOn(fakeSnacker, "error")
  const story = fetchSynthesizers(fakeErrorApi, fakeSnacker)
  await story()
  expect(errorSpy).toHaveBeenCalledExactlyOnceWith("synthesizers.errors.list")
})

test("It returns an empty list when the underlying request fails", async () => {
  const story = fetchSynthesizers(fakeErrorApi, fakeSnacker)
  expect(await story()).toEqual([])
})

test("It returns the list of items when the request succeeds", async () => {
  const fakeSynthesizer = await synthesizerFactory()
  const story = fetchSynthesizers(fakeSuccessApi, fakeSnacker)
  expect(await story()).toEqual([ fakeSynthesizer ])
})