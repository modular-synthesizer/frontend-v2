import { describe, expect, test } from "vitest"
import { ModulesFactory } from "~/tests/factories/modules"

const feature = moveModule()

describe("Coordiantes computation", async () => {

  const module = await ModulesFactory.build()

  test("The module is correctly placed to new coordinates", async () => {
    await feature(module, { x: 100, y: 400 })
    expect(module.rack).toBe(1)
    expect(module.slot).toBe(5)
  })

  test("The coordinates are floored to the nearest spot", async () => {
    await feature(module, { x: 119, y: 499 })
    expect(module.rack).toBe(1)
    expect(module.slot).toBe(5)
  })
})