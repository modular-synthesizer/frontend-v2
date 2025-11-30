import { describe, expect, test } from "vitest";
import { moduleFactory } from "../factories/modules";
import { ParametersFactory } from "../factories/parameters";

describe("getCoordinates", async () => {
  const module = await moduleFactory({ rack: 10, slot: 100 })

  test("It returns the correct X coordinate", async () => {
    expect(getCoordinates(module).x).toBe(100 * SLOT_WIDTH)
  })
  test("It returns the correct Y coordinate", async () => {
    expect(getCoordinates(module).y).toBe(10 * RACK_HEIGHT)
  })
})

describe("parameters functions", async () => {
  const parameter = await ParametersFactory.build()
  
  describe("getValue", async () => {
    test("getting the correct value for this parameter", () => {
      expect(getValue(parameter)).toEqual(50)
    })
  })
})