import { describe, expect, it } from "vitest";
import { findNode, NodeNotFoundError } from "~/core/functions/modules/structure";
import { moduleFactory } from "~/tests/node/factories/modules";

describe("findNode", async () => {
  const module: Module = await moduleFactory({
    nodes: [
      { id: "first-node", name: "test-node", generator: "testGenerator" },
      { id: "second-node", name: "first-node", generator: "testGenerator" },
    ]
  })

  it("Returns the correct node given its name", () => {
    expect(findNode(module, "test-node").id).toEqual("first-node")
  })
  it("Returns the correct node even if another node would have the same ID", () => {
    expect(findNode(module, "first-node").id).toEqual("second-node")
  })
  it("Fails if the node does not exist", () => {
    expect(() => findNode(module, "unknown-node").id).toThrow(NodeNotFoundError)
  })
})