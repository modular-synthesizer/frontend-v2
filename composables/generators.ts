import { useStorage } from "@vueuse/core"
import type { NodeGenerator } from "~/core/business/synthesizers/NodeGenerator.type"

const storage = useStorage<NodeGenerator[]>("generators", [])

export type GeneratorsComposable = {
  generator(name: string): NodeGenerator
}

export function useGeneratorsTemplate(storage: Ref<NodeGenerator[]>) {
  return () => ({
    generator(name: string): NodeGenerator {
      return storage.value.find(g => g.name === name) as NodeGenerator
    },
    store(generators: NodeGenerator[]) {
      storage.value = generators
    }
  })
}

export const useGenerators = useGeneratorsTemplate(storage)