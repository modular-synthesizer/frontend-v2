export type Module = Identified & {
  rack: number
  slot: number
  slots: number
  controls: Control[]
}