import { expect, test, vi } from "vitest"
import { attemptLogin } from "../../stories/attemptLogin"

const fakeRequesterError: LoginRequester = (username: string, password: string) => {
  return { ok: false, key: 'username', message: 'unknown' }
}
const fakeRequesterSuccess: LoginRequester = (username: string, password: string) => {
  return { ok: true, data: { } }
}
const fakeSnacker: Snacker = {
  success(test: string) { },
  error(test: string) { },
  asyncError(failure: AsyncFailure) { },
}

test("Fails if the underlying asynchronous call is not successful", async () => {
  const story = attemptLogin(fakeRequesterError, fakeSnacker)
  const errorSpy = vi.spyOn(fakeSnacker, "asyncError")
  await story("wrongUsername", "wrongPassword")
  expect(errorSpy).toHaveBeenCalled()
})