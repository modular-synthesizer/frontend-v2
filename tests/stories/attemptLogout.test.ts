import { ref } from "vue"
import { afterEach, expect, test, vi } from "vitest"
import { attemptLogout } from "../../stories/attemptLogout"

const fakeSession = ref({ foo: 'bar' })

const fakes = {
  navigator: (path: string) => { },
  storage: (name: string, content: unknown) => fakeSession
}

afterEach(() => vi.restoreAllMocks())

test('Logging out correctly deletes the session', async () => {
  const storageSpy = vi.spyOn(fakes, "storage")
  const logout = attemptLogout(fakes.navigator, fakes.storage)
  await logout()
  expect(storageSpy).toHaveBeenCalledExactlyOnceWith('user-session')
  expect(fakeSession.value).toBe(null)
})

test("Logging out correctly redirects the user to the home page", async () => {
  const navigatorSpy = vi.spyOn(fakes, "navigator")
  const logout = attemptLogout(fakes.navigator, fakes.storage)
  await logout()
  expect(navigatorSpy).toHaveBeenCalledExactlyOnceWith('/')
})