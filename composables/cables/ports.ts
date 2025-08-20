import type { Port } from "~/core/business/synthesizers/Port.type"

export type PortsComposable = {
  isLoaded(cable: Cable): boolean
  load(module: Module): void
}

const loaded: Ref<Port[]> = ref([])

export const usePorts = (): PortsComposable => {

  function isLoaded(cable: Cable): boolean {
    return isPortLoaded(cable.from) && isPortLoaded(cable.to)
  }

  function isPortLoaded(id: string): boolean {
    return !!loaded.value.find(p => p.id === id)
  }

  return {
    load(module: Module) {
      loaded.value = [... loaded.value, ...module.ports]
    },
    isLoaded
  }
}