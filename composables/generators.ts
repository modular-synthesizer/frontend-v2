import { useStorage } from "@vueuse/core"
import type { NodeGenerator } from "~/core/business/synthesizers/NodeGenerator.type"

const storage = useStorage<NodeGenerator[]>("generators", [])

export type GeneratorsComposable = {
  generator(name: string): NodeGenerator
}

export class GeneratorItemError extends Error { }

export function useGeneratorsTemplate(storage: Ref<NodeGenerator[]>) {
  return () => ({
    generator(name: string): NodeGenerator {
      const item = storage.value.find(g => g.name === name)
      if (item === undefined) throw new GeneratorItemError()
      return item
    },
    store(generators: NodeGenerator[]) {
      storage.value = generators
    }
  })
}

export const useGenerators = useGeneratorsTemplate(storage)