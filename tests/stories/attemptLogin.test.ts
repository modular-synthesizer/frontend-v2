import { expect, test, vi } from "vitest"
import { attemptLogin } from "../../stories/attemptLogin"

const fakes = {
  requestError: (username: string, password: string) => {
    return { ok: false, key: 'username', message: 'unknown' }
  },
  requestSuccess: (username: string, password: string) => {
    return { ok: true, data: { token: 'testToken' } }
  },
  navigator: (path: string) => { },
  storage: (name: string, content: unknown) => { }
}

const fakeSnacker: Snacker = {
  success(test: string) { },
  error(test: string) { },
  asyncError(failure: AsyncFailure) { },
}

test("Calls the asynchronous function with the correct parameters", async () => {
  const asyncSpy = vi.spyOn(fakes, "requestError")
  const story = attemptLogin(fakes.requestError, fakeSnacker, fakes.navigator, fakes.storage)
  await story("anyUsername", "anyPassword")
  expect(asyncSpy).toHaveBeenCalledWith("anyUsername", "anyPassword")
})

test("Fails if the underlying asynchronous call is not successful", async () => {
  const errorSpy = vi.spyOn(fakeSnacker, "asyncError")
  const story = attemptLogin(fakes.requestError, fakeSnacker, fakes.navigator, fakes.storage)
  await story("wrongUsername", "wrongPassword")
  expect(errorSpy).toHaveBeenCalledOnce()
})

test("Stores the session if the underlying asynchronous call is successful", async () => {
  const storageSpy = vi.spyOn(fakes, "storage")
  const story = attemptLogin(fakes.requestSuccess, fakeSnacker, fakes.navigator, fakes.storage)
  await story("correctUsername", "correctPassword")
  expect(storageSpy).toHaveBeenCalledOnce()
})

test("Redirects if the underlying asynchronous call is successful", async () => {
  const navigatorSpy = vi.spyOn(fakes, "navigator")
  const story = attemptLogin(fakes.requestSuccess, fakeSnacker, fakes.navigator, fakes.storage)
  await story("correctUsername", "correctPassword")
  expect(navigatorSpy).toHaveBeenCalledOnce()
})