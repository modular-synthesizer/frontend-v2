import type { GeneratorsComposable } from "~/composables/generators"
import type { ModuleLink } from "~/core/business/synthesizers/ModuleLink.type"
import type { ModuleNode } from "~/core/business/synthesizers/ModuleNode.type"

export async function instanciatePolyphonyVoice(module: Module, generators: GeneratorsComposable) {
  const ctx = new AudioContext()
  for (const node of module.nodes) {
    instanciateNode(node, ctx, generators).then(() => {
      for (const link of linksFor(module, node.name)) {
        instanciateLink(module, link)
      }
    })
  }
}

const AsyncFunction = (async () => { }).constructor

export type NodeInstanciationFunction = (n: ModuleNode, a: AudioContext, g: GeneratorsComposable, payload?: Record<string, unknown>) => Eventual<AudioNode>

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
export const instanciateNode: NodeInstanciationFunction = async (node, ctx, generators, payload = {}) => {
  try {
    const generator = generators.generator(node.generator)
    const instance: AudioNode = await AsyncFunction("context", "payload", generator.code)(ctx, payload) as AudioNode
    if (instance instanceof AudioScheduledSourceNode) instance.start()
    node.audioNode = instance;
    return instance
  }
  catch (error) {
    console.log(node)
  }
}

type LinksFilteringFunction = (m: Module, n: string) => ModuleLink[]

/**
 * @see ~/tests/functions/structure/linksFor.test.ts
 * @param module The module to search the links into.
 * @param name The name of the node to look for in the list of link. A link is included if this node is its "from" or "to".
 * @returns The filtered list of links.
 */
export const linksFor: LinksFilteringFunction = (module, name) => {
  return module.links.filter(l => [l.from.node, l.to.node].includes(name))
}

type NodeFindingFunction = (m: Module, n: string) => ModuleNode

/**
 * @see ~/tests/functions/structure/findNode.test.ts
 * @param module the module into which the nodes are searched.
 * @param name the name of the node to search.
 * @returns the first module node matching the given name, or throws an error if not found.
 */
export const findNode: NodeFindingFunction = (module, name) => {
  const node = module.nodes.find(n => n.name === name)
  if (node === undefined) throw new NodeNotFoundError()
  return node
}

export class NodeNotFoundError extends Error { }

export type LinkInstanciationFunction = (module: Module, link: ModuleLink) => void

/**
 * @see~/tests/functions/structure/instanciateLink.test.ts
 * @param module The module in which the nodes to link are instanciated. As it is an inner link, only one module regroups them.
 * @param link The link to instanciate, allowing us to retrieve the two nodes and connect them.
 */
export const instanciateLink: LinkInstanciationFunction = (module, link) => {
  const from = findNode(module, link.from.node)
  const to = findNode(module, link.to.node)

  if (!to?.audioNode || !from?.audioNode) return

  from.audioNode.connect(to.audioNode, link.from.index, link.to.index)
}