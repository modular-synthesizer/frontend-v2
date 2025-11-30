import type { Component } from "vue";
import { ControlKnob as Knob } from "./Knob";
import { ControlSmallKnob as SmallKnob } from "./SmallKnob";
import { ControlLargeKnob as LargeKnob } from "./LargeKnob";
import { ControlPort as Port } from "./Port";
import { ControlDefault as Default } from "./Default";

export type ControlComponent = { logic: Component, appearance: Component }

export const controls: Record<string, ControlComponent> = {
  Default, Knob, LargeKnob, Port, SmallKnob
}