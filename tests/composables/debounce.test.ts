import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
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

describe("Real time tests", () => {
  beforeEach(() => vi.useFakeTimers())

  test("It correctly stacks two callbacks when the delay is less than the debounce delay", async () => {
    const callbackSpy = vi.spyOn(fakes, 'callback')
    const fakeDebounce = useDebounceTemplate(setTimeout, clearTimeout)
    fakeDebounce().debounce("foo", 100, fakes.callback)
    await vi.advanceTimersByTime(90)
    fakeDebounce().debounce("foo", 100, fakes.callback)
    await vi.runAllTimers()
    expect(callbackSpy).toHaveBeenCalledTimes(1)
  })
  test("It correctly calls the callback twice if the debounce delay is shorter", async () => {
    const callbackSpy = vi.spyOn(fakes, 'callback')
    const fakeDebounce = useDebounceTemplate(setTimeout, clearTimeout)
    fakeDebounce().debounce("foo", 100, fakes.callback)
    await vi.advanceTimersByTime(110)
    fakeDebounce().debounce("foo", 100, fakes.callback)
    await vi.runAllTimers()
    expect(callbackSpy).toHaveBeenCalledTimes(2)
  })
  test("Correctly overwrites only one callback when the delay is shorter", async () => {
    const callbackSpy = vi.spyOn(fakes, 'callback')
    const fakeDebounce = useDebounceTemplate(setTimeout, clearTimeout)
    fakeDebounce().debounce("foo", 1000, fakes.callback)
    await vi.advanceTimersByTime(900)
    fakeDebounce().debounce("foo", 200, fakes.callback)
    await vi.advanceTimersByTime(300)
    expect(callbackSpy).toHaveBeenCalledTimes(1)
    await vi.runAllTimers()
  })
})