import { describe, expect, test, vi } from "vitest";
import type { Coordinates } from "~/core/types/geometry";
import { ModulesFactory } from "~/tests/factories/modules";
import { fakeSnacker } from "~/tests/fakes";
import { fakeErrorApi } from "~/tests/factories/api/error";

describe("saveModule", async () => {
  const module = await ModulesFactory.build()
  const api = { modules: { update: (_1: Module, _2: Coordinates) => success(module) }}

  test("Queries the API with the correct parameters", async () => {
    const apiSpy = vi.spyOn(api.modules, "update")
    const feature = saveModule(api as unknown as ApiSchema, fakeSnacker)
    await feature(module)
    expect(apiSpy).toHaveBeenCalledExactlyOnceWith("module-id", { rack: 0, slot: 20})
  })
  
  describe("Nominal case", async () => {
    test("Does not call the snacker", async () => {
      const snackerSpy = vi.spyOn(fakeSnacker, "error")
      const feature = saveModule(api as unknown as ApiSchema, fakeSnacker)
      await feature(module)
      expect(snackerSpy).toHaveBeenCalledTimes(0)
    })
  })
  
  describe("Error case", async () => {
    test("Does call the snacker with the correct parameters", async () => {
      const snackerSpy = vi.spyOn(fakeSnacker, "error")
      const feature = saveModule(fakeErrorApi, fakeSnacker)
      await feature(module)
      expect(snackerSpy).toHaveBeenCalledExactlyOnceWith('modules.save.error')
    })
  })
})