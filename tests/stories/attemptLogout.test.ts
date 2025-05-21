import { ref } from "vue"
import { afterEach, expect, test, vi } from "vitest"
import { attemptLogout } from "../../core/features/sessions/attemptLogout"

const fakes = {
  navigator: (_: string) => { },
  reset: () => { },
}

afterEach(() => vi.restoreAllMocks())

test('Logging out correctly deletes the session', async () => {
  const resetSpy = vi.spyOn(fakes, "reset")
  const logout = attemptLogout(fakes.navigator, fakes.reset)
  await logout()
  expect(resetSpy).toHaveBeenCalledExactlyOnceWith()
})

test("Logging out correctly redirects the user to the home page", async () => {
  const navigatorSpy = vi.spyOn(fakes, "navigator")
  const logout = attemptLogout(fakes.navigator, fakes.reset)
  await logout()
  expect(navigatorSpy).toHaveBeenCalledExactlyOnceWith('/')
})