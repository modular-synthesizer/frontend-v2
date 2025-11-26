import type { Component } from "vue";
import SmallKnob from "./SmallKnob.vue";
import LargeKnob from "./LargeKnob.vue";
import Knob from "./Knob.vue";
import KnobLogic from "./Logic/Knob.vue"
import DefaultLogic from "./Logic/DefaultLogic.vue";
import Port from "./Port.vue";
import DefaultAppearance from "./DefaultAppearance.vue";
import PortLogic from "./Logic/Port.vue"

export type ControlComponent = { logic: Component, appearance: Component }

export const controls: Record<string, ControlComponent> = {
  "Default": { appearance: DefaultAppearance, logic: DefaultLogic },
  "SmallKnob": { logic: KnobLogic, appearance: SmallKnob },
  "LargeKnob": { logic: KnobLogic, appearance: LargeKnob },
  "Knob": { logic: KnobLogic, appearance: Knob },
  "Port": { logic: PortLogic, appearance: Port },
}