import { factory } from "@factory-js/factory";

export const ParametersFactory = factory.define({
  props: {
    id: () => "paramId",
    name: () => "param-name",
    value: () => 50.001,
    minimum: () => 0,
    maximum: () => 100,
    precision: () => 0,
    step: () => 1,
  },
  vars: { }
})