import { useStorage } from "@vueuse/core"
import type { NodeGenerator } from "~/core/business/synthesizers/NodeGenerator.type"

const storage = useStorage<NodeGenerator[]>("generators", [])

export function useGeneratorsTemplate(storage: Ref<NodeGenerator[]>) {
  return () => ({
    generator(name: string): NodeGenerator | undefined {
      return storage.value.find(g => g.name === name)
    },
    store(generators: NodeGenerator[]) {
      storage.value = generators
      console.log(storage.value)
    }
  })
}

export const useGenerators = useGeneratorsTemplate(storage)