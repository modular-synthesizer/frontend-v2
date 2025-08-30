// @vitest-environment nuxt
import { expect, test } from "vitest"
import { useSnackTemplate } from "../../../composables/snack";

test("Initializes the queue as an empty array", async () => {
  const snacker = useSnackTemplate(ref([]));
  expect(snacker().queue.value).toEqual([])
})

test("Correctly adds a success to the list of snacks to display", async () => {
  const snacker = useSnackTemplate(ref([]));
  snacker().success('test')
  expect(snacker().queue.value).toEqual([{ text: "test", color: "success", timeout: 2500 }])
})

test("Correctly adds an error to the list of snacks to display", async () => {
  const snacker = useSnackTemplate(ref([]));
  snacker().error('test')
  expect(snacker().queue.value).toEqual([{ text: "test", color: "error", timeout: 2500 }])
})

test("Correctly adds an asynchronous error to the list of snacks", async () => {
  const snacker = useSnackTemplate(ref([]));
  const failure: AsyncFailure = { ok: false, key: 'testKey', message: 'testMessage' }
  snacker().asyncError(failure)
  expect(snacker().queue.value).toEqual([{ text: "testKey.testMessage", color: "error", timeout: 2500 }])
})

test("Correctly adds an asynchronous error with a prefix", async () => {
  const snacker = useSnackTemplate(ref([]));
  const failure: AsyncFailure = { ok: false, key: 'testKey', message: 'testMessage' }
  snacker().asyncError(failure, 'prefix')
  expect(snacker().queue.value).toEqual([{ text: "prefix.testKey.testMessage", color: "error", timeout: 2500 }])
})

test("Can add more than one snack in the correct order", async () => {
  const snacker = useSnackTemplate(ref([]))
  snacker().success('first')
  snacker().success('second')
  expect(snacker().queue.value).toEqual([
    { text: "first", color: "success", timeout: 2500 },
    { text: "second", color: "success", timeout: 2500 },
  ])
})