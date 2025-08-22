import type { ModuleLink } from "~/core/business/synthesizers/ModuleLink.type"

const AsyncFunction = (async () => {}).constructor

/**
 * Instanciates a given module inner node by creating the corresponding Web Audio API node and
 * starting them if needing, by evaluating the arbitrary code of the generator sent by the API.
 * 
 * @param node the node to get the informations (like the name of the generator) from.
 * @param ctx the audio context to create the nodes into. Remember that nodes MUST be created in
 *   the same audio context so that you can link them with one another.
 * @param generators the composable containing generators to search into.
 * 
 * @return the created Web Audio API node initialized with the given generator.
 */
export async function instanciateNode(node: ModuleNode, ctx: AudioContext, generators: GeneratorsComposable): Promise<AudioNode> {
  const generator = generators.generator(node.generator)
  const executor = AsyncFunction("context", "payload", generator.code)
  const instance: AudioNode = await executor(ctx, {}) as AudioNode
  if (instance instanceof AudioScheduledSourceNode) {
    instance.start()
  }
  node.audioNode = instance;
  return instance
}

export async function instanciateModule(module: Module, generators: GeneratorsComposable) {
  const ctx = new AudioContext()
  for(const node of module.nodes) {
    instanciateNode(node, ctx, generators).then(() => {
      for(const link of linksFor(module, node)) {
        instanciateLink(module, link)
      }
    })
  }
}

function linksFor(module: Module, node: ModuleNode): ModuleLink[] {
  return module.links.filter(l => [l.from.node, l.to.node].includes(node.name))
}

function findNode(module: Module, name: string): ModuleNode {
  return module.nodes.find(n => n.name === name) as ModuleNode
}

function instanciateLink(module: Module, link: ModuleLink) {
  const from = findNode(module, link.from.node)
  const to = findNode(module, link.to.node)

  if (!to?.audioNode || !from?.audioNode) return 

  from.audioNode?.connect(to.audioNode, link.from.index, link.to.index)
}