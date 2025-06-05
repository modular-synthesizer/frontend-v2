import type { Component } from "vue";
import SmallKnob from "./SmallKnob.vue";
import KnobLogic from "./Logic/Knob.vue"
import Default from "./Default.vue";
import DefaultLogic from "./Logic/Default.vue";

export type ControlComponent = { logic: Component, appearance: Component }

export const controls: Record<string, ControlComponent> = {
  "Default": { appearance: Default, logic: DefaultLogic },
  "SmallKnob": { logic: KnobLogic, appearance: SmallKnob },
}