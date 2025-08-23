import { expect, vi, describe, it } from "vitest";
import { instanciateLinkTemplate, NodeNotFoundError } from "~/core/functions/modules/structure";
import { moduleFactory } from "~/tests/factories/modules";

describe("instanciateLink", async () => {
  const ctx: BaseAudioContext = { createGain: () => { return "stub for nodes" } } as unknown as BaseAudioContext
  const module = await moduleFactory({
    nodes: [
      { id: "1", name: "first", generator: "test", audioNode: ctx.createGain() },
      { id: "2", name: "second", generator: "test", audioNode: ctx.createGain() },
      { id: "3", name: "third", generator: "test" }
    ],
    links: [
      { id: "1", from: { node: "first", index: 0 }, to: { node: "second", index: 0 } },
      { id: "1", from: { node: "first", index: 0 }, to: { node: "third", index: 0 } },
      { id: "1", from: { node: "first", index: 0 }, to: { node: "fourth", index: 0 } },
    ],
  })

  it("Correctly calls the connect function if both nodes are initialized", () => {
    const mockConnect = vi.fn()
    const instanciateLink = instanciateLinkTemplate(findNode, mockConnect)
    instanciateLink(module, module.links[0])
    expect(mockConnect).toHaveBeenNthCalledWith(1, module.nodes[0].audioNode, module.nodes[1].audioNode, 0, 0)
  })
  it("Does not call the connect function if a node is not initialized", () => {
    const mockConnect = vi.fn()
    const instanciateLink = instanciateLinkTemplate(findNode, mockConnect)
    instanciateLink(module, module.links[1])
    expect(mockConnect).not.toBeCalled()
  })
  it("Throws an error if a node is not found", () => {
    expect(() => instanciateLink(module, module.links[2])).toThrow(NodeNotFoundError)
  })
})