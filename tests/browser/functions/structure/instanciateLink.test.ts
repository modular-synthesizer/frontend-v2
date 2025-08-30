import { expect, vi, describe, it } from "vitest";
import { NodeNotFoundError } from "~/core/functions/modules/structure";
import { moduleFactory } from "~/tests/node/factories/modules";

interface Connectable { connect(_: Connectable): void }

describe("instanciateLink", async () => {
  const fakeNode: Connectable = { connect(_: Connectable) { } }
  const ctx: BaseAudioContext = { createGain: () => fakeNode } as unknown as BaseAudioContext
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
    const spy = vi.spyOn(fakeNode, "connect")
    instanciateLink(module, module.links[0])
    expect(spy).toHaveBeenNthCalledWith(1, module.nodes[1].audioNode, 0, 0)
  })
  it("Does not call the connect function if a node is not initialized", () => {
    const spy = vi.spyOn(fakeNode, "connect")
    instanciateLink(module, module.links[1])
    expect(spy).not.toBeCalled()
  })
  it("Throws an error if a node is not found", () => {
    expect(() => instanciateLink(module, module.links[2])).toThrow(NodeNotFoundError)
  })
})