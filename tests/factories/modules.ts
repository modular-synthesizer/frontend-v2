import { factory } from "@factory-js/factory";

export const ModulesFactory = factory.define({
  props: {
    id: () => "module-id",
    rack: () => 0,
    slot: () => 20,
    slots: () => 12
  },
  vars: { }
})