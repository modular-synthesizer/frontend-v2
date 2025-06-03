import { factory } from "@factory-js/factory";
import { createObject } from "./utils/createObject";

export const SynthesizerFactory = factory.define({
  props: {
    id: () => "synthesizer-id",
    name: () => "synthesizer name",
    voices: () => 16,
    members: () => [ ],
    modules: () => [ ],
    scale: () => 1.0,
    x: () => 0,
    y: () => 0
  },
  vars: { }
})

export const synthesizerFactory = createObject<Synthesizer>(SynthesizerFactory)