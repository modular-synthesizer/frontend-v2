import { describe, expect, it } from "vitest";
import { linksFor } from "~/core/functions/modules/structure";
import { moduleFactory } from "~/tests/node/factories/modules";

describe("linksFor", async () => {
  const module = await moduleFactory({
    links: [
      { id: "first-link", from: { node: "first-node", index: 0 }, to: { node: "second-node", index: 0 } },
      { id: "second-link", from: { node: "third-node", index: 0 }, to: { node: "first-node", index: 0 } }
    ]
  })

  it("Returns one node if only one node is selected", () => {
    expect(linksFor(module, "second-node")).toEqual([module.links[0]])
  })
  it("Returns several nodes if several nodes are selected", () => {
    expect(linksFor(module, "first-node")).toEqual([module.links[0], module.links[1]])
  })
  it("Returns an empty array if no node matches", () => {
    expect(linksFor(module, "other-node")).toEqual([])
  })
})