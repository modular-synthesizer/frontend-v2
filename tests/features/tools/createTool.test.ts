import { expect, test, vi } from "vitest"
import { fakeErrorApi, fakeSnacker, fakeSuccessApi } from "../../fakes"

const fakeList: Tool[] = []

test("Correctly sends a success notification when the synthesizer is correctly created", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "success")
  const story = createTool(fakeSuccessApi, fakeSnacker)
  await story(fakeList, "tool-name", "category-id", 12)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("tools.create.success")
})

test("Correctly creates the synthesizer when valid data are given", async () => {
  const story = createTool(fakeSuccessApi, fakeSnacker)
  const tool = await story(fakeList, "tool-name", "category-id", 12) as Tool
  expect(tool.id).toEqual("toolId")
})

test("Adds the newly created synthesizer to the given list", async () => {
  const story = createTool(fakeSuccessApi, fakeSnacker)
  await story(fakeList, "tool-name", "category-id", 12)
  expect(fakeList[0].id).toEqual("toolId")
})

test("Returns undefined when the synthesizer is not correctly created", async () => {
  const snackerSpy = vi.spyOn(fakeSnacker, "error")
  const story = createTool(fakeErrorApi, fakeSnacker)
  await story(fakeList, "tool-name", "category-id", 12)
  expect(snackerSpy).toHaveBeenCalledExactlyOnceWith("tools.create.error")
})

test("Sends an error notification when the synthesizer is not correctly created", async () => {
  const story = createTool(fakeErrorApi, fakeSnacker)
  expect(await story(fakeList, "Bad name", "categoryId", 16)).toBeUndefined()
})