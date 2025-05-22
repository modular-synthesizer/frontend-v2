import { afterEach, expect, test, vi } from "vitest"
import { useDebounceTemplate } from "../../composables/debounce"
import { fakeTimeout, fakeClear } from "../fakes"

const fakes = {
  callback: () => { }
}

afterEach(() => vi.restoreAllMocks())

test("It correctly stores a callback in the list of callbacks", () => {
  const fakeDebounce = useDebounceTemplate(fakeTimeout, fakeClear)
  fakeDebounce().debounce("test", 1000, () => { })
  expect(fakeDebounce().debouncers.value).toEqual({ test: 42 })
})

test("if called twice, it calls only the callback once", async () => {
  const callbackSpy = vi.spyOn(fakes, 'callback')
  const fakeDebounce = useDebounceTemplate(setTimeout, clearTimeout)
  fakeDebounce().debounce("test", 20, fakes.callback)
  fakeDebounce().debounce("test", 20, fakes.callback)
  await new Promise(resolve => setTimeout(resolve, 50))
  expect(callbackSpy).toHaveBeenCalledTimes(1)
})

test("Correctly stores two callbacks in separate keys", () => {
  const fakeDebounce = useDebounceTemplate(fakeTimeout, fakeClear)
  fakeDebounce().debounce("foo", 1000, () => { })
  fakeDebounce().debounce("bar", 1000, () => { })
  expect(fakeDebounce().debouncers.value).toEqual({ foo: 42, bar: 42 })
})

test("Calls both callbacks if they're not under the same key", async () => {
  const callbackSpy = vi.spyOn(fakes, 'callback')
  const fakeDebounce = useDebounceTemplate(setTimeout, clearTimeout)
  fakeDebounce().debounce("foo", 20, fakes.callback)
  fakeDebounce().debounce("bar", 20, fakes.callback)
  await new Promise(resolve => setTimeout(resolve, 50))
  expect(callbackSpy).toHaveBeenCalledTimes(2)
})