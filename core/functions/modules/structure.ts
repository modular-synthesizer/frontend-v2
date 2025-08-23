import type { GeneratorsComposable } from "~/composables/generators"
import type { ModuleLink } from "~/core/business/synthesizers/ModuleLink.type"
import type { ModuleNode } from "~/core/business/synthesizers/ModuleNode.type"

const AsyncFunction = (async () => { }).constructor

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
  for (const node of module.nodes) {
    instanciateNode(node, ctx, generators).then(() => {
      for (const link of linksFor(module, node.name)) {
        instanciateLink(module, link)
      }
    })
  }
}

type LinksFilteringFunction = (m: Module, n: string) => ModuleLink[]

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

export type ConnectFunction = (from: AudioNode, to: AudioNode, link: number, toIndex: number) => void

export const connect: ConnectFunction = (from, to, fromIndex, toIndex) => {
  from.connect(to, fromIndex, toIndex)
}

export function instanciateLinkTemplate(findNode: NodeFindingFunction, connect: ConnectFunction) {
  return (module: Module, link: ModuleLink) => {
    const from = findNode(module, link.from.node)
    const to = findNode(module, link.to.node)

    if (!to?.audioNode || !from?.audioNode) return

    connect(from.audioNode, to.audioNode, link.from.index, link.to.index)
  }
}

export const instanciateLink = instanciateLinkTemplate(findNode, connect)