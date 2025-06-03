import { describe, expect, test } from "vitest";

describe("useSelection", async () => {
  const items: Identified[] = [ { id: '1' }, { id: '2' } ]
  
  describe("Initial state", async () => {

    const useSelectionMock = useSelectionTemplate();

    test("it has no current selected item", async () => {
      expect(useSelectionMock().state.value.current).toBeUndefined()
    })
    test("it has no next item", async () => {
      expect(useSelectionMock().state.value.next).toBeUndefined()
    })
    test("it is not locked", () => {
      expect(useSelectionMock().state.value.locked).toBeFalsy()
    })
    test("it returns false for an item selected state", async () => {
      expect(useSelectionMock().select(items[0])).toBeFalsy()
    })
  })

  describe("Simple selection", async () => {

    const useSelectionMock = useSelectionTemplate();
    useSelectionMock().select(items[0])

    test("It selected the right item", () => {
      expect(useSelectionMock().state.value.current).toEqual(items[0])
    })
    test("It has no next item in the queue", () => {
      expect(useSelectionMock().state.value.next).toBeUndefined()
    })
  })

  describe("Double selection", async () => {

    const useSelectionMock = useSelectionTemplate();
    useSelectionMock().select(items[1])
    useSelectionMock().select(items[0])

    test("It selected the right item", () => {
      expect(useSelectionMock().state.value.current).toEqual(items[0])
    })
    test("It has no next item in the queue", () => {
      expect(useSelectionMock().state.value.next).toBeUndefined()
    })
  })

  describe("Locked selection", async () => {

    const useSelectionMock = useSelectionTemplate();
    useSelectionMock().select(items[1])
    useSelectionMock().lock()
    useSelectionMock().select(items[0])

    test("It selected the right item", () => {
      expect(useSelectionMock().state.value.current).toEqual(items[1])
    })
    test("It has no next item in the queue", () => {
      expect(useSelectionMock().state.value.next).toEqual(items[0])
    })
  })

  describe("Unlocked selection", async () => {

    const useSelectionMock = useSelectionTemplate();
    useSelectionMock().select(items[1])
    useSelectionMock().lock()
    useSelectionMock().select(items[0])
    useSelectionMock().unlock()

    test("It selected the right item", () => {
      expect(useSelectionMock().state.value.current).toEqual(items[0])
    })
    test("It has no next item in the queue", () => {
      expect(useSelectionMock().state.value.next).toBeUndefined()
    })
  })
})