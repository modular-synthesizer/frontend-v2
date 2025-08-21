import type { PortsComposable } from "~/composables/cables/ports";

export function loadModule(ports: PortsComposable, generators: GeneratorsComposable) {
  /**
   * Loads the module and "plugs" it into the synthesizer by instanciating cables when the module at the
   * other end of the cable has been correctly loaded (or at least the port at the other end of the cable).
   * 
   * @param module the module to insert in the overall system.
   * @param synthesizer the synthesizer to insert the module into.
   */
  return (module: Module, synthesizer: Synthesizer) => {
    loadNodes(module, generators)
    ports.load(module)
    for (const c of cablesFor(synthesizer.cables, module)) {
      if (ports.isLoaded(c)) {
        console.log(`loaded ${c.id}`)
      }
    }
  }
}


function cablesFor(cables: Cable[], module: Module) {
  return module.ports.flatMap(p => {
    return (cables ?? []).filter(c => {
      return [c.from, c.to].includes(p.id)
    })
  })
}

async function loadNodes(module: Module, generators: GeneratorsComposable) {
  const ctx = new AudioContext()
  for(const node of module.nodes) {
    const generator = generators.generator(node.generator)
    const AsyncFunction = (async () => {}).constructor;
    const executor = AsyncFunction("context", "payload", generator.code)
    const audioNode: AudioNode = await executor(ctx, {}) as unknown as AudioNode;
    console.log(audioNode)
  }
}