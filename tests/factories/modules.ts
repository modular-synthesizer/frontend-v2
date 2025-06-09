import { factory } from "@factory-js/factory";
import { createObject, type Factory } from "./utils/createObject";

export const ModulesFactory = factory.define({
  props: {
    id: () => "module-id",
    rack: () => 0,
    slot: () => 20,
    slots: () => 12,
    controls: (): Control[] => [],
    parameters: (): Parameter[] => [],
  },
  vars: { }
})

export const moduleFactory = createObject<Module>(ModulesFactory as Factory<Module>)