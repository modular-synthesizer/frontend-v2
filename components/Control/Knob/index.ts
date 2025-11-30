import ControlKnobAppearance from "./Appearance.vue";
import ControlKnobLogic from "./Logic.vue";
import type { ControlComponent } from "..";

export const ControlKnob: ControlComponent = {
  logic: ControlKnobLogic,
  appearance: ControlKnobAppearance
}