import ControlDefaultAppearance from "./Appearance.vue";
import ControlDefaultLogic from "../Knob/Logic.vue";
import type { ControlComponent } from "..";

export const ControlDefault: ControlComponent = {
  logic: ControlDefaultLogic,
  appearance: ControlDefaultAppearance
}