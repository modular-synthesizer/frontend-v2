import ControlPortAppearance from "./Appearance.vue";
import ControlPortLogic from "./Logic.vue";
import type { ControlComponent } from "..";

export const ControlPort: ControlComponent = {
  logic: ControlPortLogic,
  appearance: ControlPortAppearance
}