import { afterEach, expect, test, vi } from "vitest"
import { attemptLogin } from "../../../../core/features/sessions/attemptLogin"
import { fakeNavigator, fakeSnacker } from "../../../fakes"
import { fakeError, fakeErrorApi } from "~/tests/factories/api/error";
import { fakeSuccessApi } from "~/tests/factories/api/success";
import { sessionFactory } from "~/tests/factories/sessions";

const fakes = {
  navigator: fakeNavigator,
  store: (_: Session) => {},
}

afterEach(() => vi.restoreAllMocks())

test("Calls the asynchronous function with the correct parameters", async () => {
  const asyncSpy = vi.spyOn(fakeErrorApi.sessions, "new")
  const story = attemptLogin(fakeErrorApi, fakeSnacker, fakes.navigator, fakes.store)
  await story("anyUsername", "anyPassword")
  expect(asyncSpy).toHaveBeenCalledExactlyOnceWith("anyUsername", "anyPassword")
})

test("Fails if the underlying asynchronous call is not successful", async () => {
  const errorSpy = vi.spyOn(fakeSnacker, "asyncError")
  const story = attemptLogin(fakeErrorApi, fakeSnacker, fakes.navigator, fakes.store)
  await story("wrongUsername", "wrongPassword")
  expect(errorSpy).toHaveBeenCalledExactlyOnceWith(fakeError, 'login')
})

test("Stores the session if the underlying asynchronous call is successful", async () => {
  const fakeSession = await sessionFactory()
  const storageSpy = vi.spyOn(fakes, "store")
  const story = attemptLogin(fakeSuccessApi, fakeSnacker, fakes.navigator, fakes.store)
  await story("correctUsername", "correctPassword")
  expect(storageSpy).toHaveBeenCalledExactlyOnceWith(fakeSession)
})

test("Redirects if the underlying asynchronous call is successful", async () => {
  const navigatorSpy = vi.spyOn(fakes, "navigator")
  const story = attemptLogin(fakeSuccessApi, fakeSnacker, fakes.navigator, fakes.store)
  await story("correctUsername", "correctPassword")
  expect(navigatorSpy).toHaveBeenCalledExactlyOnceWith('/')
})