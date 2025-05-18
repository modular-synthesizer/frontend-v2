import { afterEach, expect, test, vi } from "vitest"
import { attemptLogin } from "../../stories/attemptLogin"
import { fakeError, fakeNavigator, fakeSession, fakeSnacker, fakeStore } from "../fakes"

const fakes = {
  requestError: (username: string, password: string) => fakeError,
  requestSuccess: (username: string, password: string) => ({ ok: true, data: fakeSession }),
  navigator: fakeNavigator,
  store: fakeStore,
}

afterEach(() => vi.restoreAllMocks())

test("Calls the asynchronous function with the correct parameters", async () => {
  const asyncSpy = vi.spyOn(fakes, "requestError")
  const story = attemptLogin(fakes.requestError, fakeSnacker, fakes.navigator, fakes.store)
  await story("anyUsername", "anyPassword")
  expect(asyncSpy).toHaveBeenCalledExactlyOnceWith("anyUsername", "anyPassword")
})

test("Fails if the underlying asynchronous call is not successful", async () => {
  const errorSpy = vi.spyOn(fakeSnacker, "asyncError")
  const story = attemptLogin(fakes.requestError, fakeSnacker, fakes.navigator, fakes.store)
  await story("wrongUsername", "wrongPassword")
  expect(errorSpy).toHaveBeenCalledExactlyOnceWith(fakeError)
})

test("Stores the session if the underlying asynchronous call is successful", async () => {
  const storageSpy = vi.spyOn(fakes, "store")
  const story = attemptLogin(fakes.requestSuccess, fakeSnacker, fakes.navigator, fakes.store)
  await story("correctUsername", "correctPassword")
  expect(storageSpy).toHaveBeenCalledExactlyOnceWith(fakeSession)
})

test("Redirects if the underlying asynchronous call is successful", async () => {
  const navigatorSpy = vi.spyOn(fakes, "navigator")
  const story = attemptLogin(fakes.requestSuccess, fakeSnacker, fakes.navigator, fakes.store)
  await story("correctUsername", "correctPassword")
  expect(navigatorSpy).toHaveBeenCalledExactlyOnceWith('/')
})