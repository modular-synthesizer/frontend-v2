import { describe, expect, it, vi } from "vitest";
import { GeneratorItemError, type GeneratorsComposable } from "~/composables/generators";
import { moduleFactory } from "~/tests/factories/modules";

describe("instanciateNode", async () => {
  const failingComposable: GeneratorsComposable = {
    generator(name) {
      throw new GeneratorItemError()
    }
  }
  const payload = {
    spy: vi.fn()
  }
  const context = {} as unknown as AudioContext;
  const module = await moduleFactory({
    nodes: [
      { id: "1", name: "first", generator: "test" }
    ]
  })
  const generators: GeneratorsComposable = {
    generator(_): NodeGenerator {
      return {
        id: "1", code: "payload.spy(); return 2;", name: 'test', inputs: 1, outputs: 1
      }
    }
  }
  const errorGenerators: GeneratorsComposable = {
    generator(_) {
      return { id: '1', name: 'test', inputs: 1, outputs: 1, code: 'throw new Error("")' }
    },
  }
  describe("instanciates the node if it finds it", () => {
    it("Has executed the code correctly", () => {
      const spy = vi.spyOn(payload, 'spy')
      instanciateNode(module.nodes[0], context, generators, payload)
      expect(spy).toHaveBeenCalledOnce()
    })
    it("Has affected the resul of the function to the audioNode", () => {
      const spy = vi.spyOn(payload, 'spy')
      instanciateNode(module.nodes[0], context, generators, payload)
      expect(module.nodes[0].audioNode).toEqual(2)
    })
  })
  it("does not instanciate the node if the generator is not found", () => {
    const spy = vi.spyOn(payload, 'spy')
    instanciateNode(module.nodes[0], context, failingComposable, payload)
    expect(spy).not.toHaveBeenCalled()
  })
  it("Fails if the code in the module node throws an error", () => {
    instanciateNode(module.nodes[0], context, errorGenerators, payload)
  })
  it("Starts the node if needed", () => {

  })
})