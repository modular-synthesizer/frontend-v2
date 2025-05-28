import { describe, expect, test } from "vitest";
import { ModulesFactory } from "../factories/modules";

describe("getCoordinates", async () => {
  const module = await ModulesFactory.props({
    rack: () => 10, slot: () => 100
  }).build()

  test("It returns the correct X coordinate", async () => {
    expect(getCoordinates(module).x).toBe(100 * SLOT_WIDTH)
  })
  test("It returns the correct Y coordinate", async () => {
    expect(getCoordinates(module).y).toBe(10 * RACK_HEIGHT)
  })
})