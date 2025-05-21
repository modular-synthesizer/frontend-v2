import { afterEach, expect, test, vi } from "vitest"
import { attemptLogin } from "../../../core/features/sessions/attemptLogin"
import { fakeError, fakeNavigator, fakeSession, fakeSnacker, fakeStore, type ExpectedFailure, type ExpectedSuccess } from "../../fakes"

const fakes = {
  requestError: async (_: string, _2: string): ExpectedFailure => fakeError,
  requestSuccess: async (_: string, _2: string): ExpectedSuccess<Session> => ({ ok: true, data: fakeSession }),
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
  expect(errorSpy).toHaveBeenCalledExactlyOnceWith(fakeError, 'login')
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