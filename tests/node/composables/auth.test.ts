import { beforeEach, expect, test, vi } from "vitest"
import { useAuthTemplate } from "../../../composables/auth"
import { ref } from "vue"

let session;

function generator() {
  return { token: '', admin: false, created_at: new Date(), duration: 0 }
}

let instance;

beforeEach(() => {
  session = ref({
    token: 'fakeToken',
    created_at: new Date(),
    admin: false,
    duration: 1000,
  })
})

test("The session is deemed authenticated if it exists", async () => {
  instance = useAuthTemplate(session, generator)
  expect(instance().authenticated).toBe(true)
})

test("It correctly changes the session afterward", async () => {
  instance = useAuthTemplate(ref(generator()), generator)
  expect(instance().authenticated).toBe(false)
  instance().store(session)
  expect(instance().authenticated).toBe(true)
})

test("It correctly resets the session and the authentication status", async () => {
  instance = useAuthTemplate(session, generator)
  expect(instance().authenticated).toBe(true)
  instance().reset()
  expect(instance().authenticated).toBe(false)
})