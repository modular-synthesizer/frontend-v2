import ControlSmallKnobAppearance from "./Appearance.vue";
import ControlSmallKnobLogic from "../Knob/Logic.vue";
import type { ControlComponent } from "..";

export const ControlSmallKnob: ControlComponent = {
  logic: ControlSmallKnobLogic,
  appearance: ControlSmallKnobAppearance
}