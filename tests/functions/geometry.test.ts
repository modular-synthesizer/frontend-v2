import { describe, expect, test } from "vitest"

describe("subtract", () => {
  test("Correctly subtracts two sets of coordinates", () => {
    expect(subtract({ x: 0, y: 0 }, { x: 1, y: 1 })).toEqual({ x: -1, y: -1 })
  })
  test("Correctly subtracts when either coordinates is negative", () => {
    expect(subtract({ x: -1, y: 1 }, { x: 1, y: -1 })).toEqual({ x: -2, y: 2 })
  })
})

describe("add", () => {
  test("Correctly subtracts two sets of coordinates", () => {
    expect(add({ x: 0, y: 0 }, { x: 1, y: 1 })).toEqual({ x: 1, y: 1 })
  })
  test("Correctly subtracts when either coordinates is negative", () => {
    expect(add({ x: -1, y: 1 }, { x: 1, y: -1 })).toEqual({ x: 0, y: 0 })
  })
})

describe("inRef", () => {
  test("Correctly places the point in the reference frame given", () => {
    expect(inRef({ x: 10, y: 10 }, { x: 2, y: 2, scale: 2.0 })).toEqual({ x: 3, y: 3 })
  })
})