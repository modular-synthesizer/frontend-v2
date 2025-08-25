import { afterEach, describe, expect, it, vi } from "vitest";
import { GeneratorItemError, type GeneratorsComposable } from "~/composables/generators";

describe("instanciateNode", async () => {
  afterEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
  })
  const failingComposable: GeneratorsComposable = {
    generator(_) {
      throw new GeneratorItemError()
    }
  }
  const payload = {
    spy: vi.fn()
  }
  const context: AudioContext = new AudioContext()
  const node: ModuleNode = { id: "1", name: "first", generator: "test" }
  const generators: GeneratorsComposable = {
    generator(_): NodeGenerator {
      return {
        id: "1", code: "return context.createGain();", name: 'test', inputs: 1, outputs: 1
      }
    }
  }
  const errorGenerators: GeneratorsComposable = {
    generator(_) {
      return { id: '1', name: 'test', inputs: 1, outputs: 1, code: 'invalid syntax' }
    },
  }
  describe("instanciates the node if it finds it", () => {
    const fakeGain = new GainNode(context)
    const spy = vi.spyOn(context, 'createGain').mockReturnValue(fakeGain)
    it("Has executed the code correctly", () => {
      instanciateNode(node, context, generators, payload)
      expect(spy).toHaveBeenCalledOnce()
    })
    it("Has affected the resul of the function to the audioNode", () => {
      instanciateNode(node, context, generators, payload)
      expect(node.audioNode).toEqual(fakeGain)
    })
  })
  it("does not instanciate the node if the generator is not found", () => {
    const spy = vi.spyOn(payload, 'spy')
    instanciateNode(node, context, failingComposable, payload)
    expect(spy).not.toHaveBeenCalled()
  })
  it("Fails if the code in the module node throws an error", () => {
    const node: ModuleNode = { id: "1", name: "first", generator: "test" }
    instanciateNode(node, context, errorGenerators, payload)
    expect(node.audioNode).toBeUndefined()
  })
  it("Starts the node if needed", () => {

  })
})