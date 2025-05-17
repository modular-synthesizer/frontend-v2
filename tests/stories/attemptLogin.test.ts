import { afterEach, expect, test, vi } from "vitest"
import { attemptLogin } from "../../stories/attemptLogin"

const fakeError = { ok: false, key: 'username', message: 'unknown' }

const fakeSession = { token: 'testToken' }

const fakes = {
  requestError: (username: string, password: string) => fakeError,
  requestSuccess: (username: string, password: string) => {
    return { ok: true, data: fakeSession }
  },
  navigator: (path: string) => { },
  storage: (name: string, content: unknown) => { }
}

const fakeSnacker: Snacker = {
  success(test: string) { },
  error(test: string) { },
  asyncError(failure: AsyncFailure) { },
}

afterEach(() => vi.restoreAllMocks())

test("Calls the asynchronous function with the correct parameters", async () => {
  const asyncSpy = vi.spyOn(fakes, "requestError")
  const story = attemptLogin(fakes.requestError, fakeSnacker, fakes.navigator, fakes.storage)
  await story("anyUsername", "anyPassword")
  expect(asyncSpy).toHaveBeenCalledExactlyOnceWith("anyUsername", "anyPassword")
})

test("Fails if the underlying asynchronous call is not successful", async () => {
  const errorSpy = vi.spyOn(fakeSnacker, "asyncError")
  const story = attemptLogin(fakes.requestError, fakeSnacker, fakes.navigator, fakes.storage)
  await story("wrongUsername", "wrongPassword")
  expect(errorSpy).toHaveBeenCalledExactlyOnceWith(fakeError)
})

test("Stores the session if the underlying asynchronous call is successful", async () => {
  const storageSpy = vi.spyOn(fakes, "storage")
  const story = attemptLogin(fakes.requestSuccess, fakeSnacker, fakes.navigator, fakes.storage)
  await story("correctUsername", "correctPassword")
  expect(storageSpy).toHaveBeenCalledExactlyOnceWith('user-session', fakeSession)
})

test("Redirects if the underlying asynchronous call is successful", async () => {
  const navigatorSpy = vi.spyOn(fakes, "navigator")
  const story = attemptLogin(fakes.requestSuccess, fakeSnacker, fakes.navigator, fakes.storage)
  await story("correctUsername", "correctPassword")
  expect(navigatorSpy).toHaveBeenCalledExactlyOnceWith('/')
})