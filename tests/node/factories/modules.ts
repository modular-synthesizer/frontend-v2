import { factory } from "@factory-js/factory";
import { createObject, type Factory } from "./utils/createObject";
import type { ModuleNode } from "~/core/business/synthesizers/ModuleNode.type";
import type { Port } from "~/core/business/synthesizers/Port.type";
import type { ModuleLink } from "~/core/business/synthesizers/ModuleLink.type";

export const ModulesFactory = factory.define({
  props: {
    id: () => "module-id",
    rack: () => 0,
    slot: () => 20,
    slots: () => 12,
    controls: (): Control[] => [],
    parameters: (): Parameter[] => [],
    ports: (): Port[] => [],
    nodes: (): ModuleNode[] => [],
    links: (): ModuleLink[] => [],
  },
  vars: {}
})

export const moduleFactory = createObject<Module>(ModulesFactory as Factory<Module>)