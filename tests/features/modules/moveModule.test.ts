import { beforeEach, describe, expect, test } from "vitest"
import { ModulesFactory } from "~/tests/factories/modules"

const feature = moveModule()

describe("Coordinates computation", async () => {

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

describe("When there are colliding modules given", async () => {

  let module: Module, collider: Module;

  beforeEach(async () => {
    module = await ModulesFactory.build()
    collider = await ModulesFactory.props({ rack: () => 3, slot: () => 5, id: () => "anotherModule" }).build()
  })

  test("Skips checks if both modules are the same", async () => {
    await feature(module, { x: 100, y: 800 }, [ module ])
    expect(module.rack).toBe(2)
    expect(module.slot).toBe(5)
  })
  test("Skips checks both modules are on different racks", async () => {
    await feature(module, { x: 100, y: 800 }, [ collider ])
    expect(module.rack).toBe(2)
    expect(module.slot).toBe(5)
  })
  test("Both modules are on the same rack, but their slots intersect", async () => {
    const coords = { x: collider.slot * 20, y: collider.rack * 400 }
    await feature(module, coords, [ collider ])
    expect(module.rack).toBe(0)
    expect(module.slot).toBe(20)
  })
})