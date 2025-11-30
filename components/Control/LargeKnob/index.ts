import ControlLargeKnobAppearance from "./Appearance.vue";
import ControlLargeKnobLogic from "../Knob/Logic.vue";
import type { ControlComponent } from "..";

export const ControlLargeKnob: ControlComponent = {
  logic: ControlLargeKnobLogic,
  appearance: ControlLargeKnobAppearance
}