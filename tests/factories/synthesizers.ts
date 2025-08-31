import { factory } from "@factory-js/factory";
import { createObject, type Factory } from "./utils/createObject";
import type { FactoryProps } from "./utils/FactoryProps";
import { moduleFactory } from "./modules";

const module = await moduleFactory()

export const SynthesizerFactory = factory.define({
  props: {
    id: () => "synthesizerId",
    name: () => "synthesizer name",
    voices: () => 16,
    members: () => [ ],
    modules: () => [ module ],
    scale: () => 1.0,
    x: () => 0,
    y: () => 0,
    cables: () => [],
  } as FactoryProps<Synthesizer>,
  vars: { }
})

export const synthesizerFactory = createObject<Synthesizer>(SynthesizerFactory as Factory<Synthesizer>)