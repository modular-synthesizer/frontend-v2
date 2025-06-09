import type { Parameter } from "./Parameter.type"

export type Module = Identified & {
  rack: number
  slot: number
  slots: number
  controls: Control[]
  parameters: Parameter[]
}