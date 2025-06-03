export type Synthesizer = {
  id: string
  name: string
  voices: number
  members: Membership[]
  scale: number
  modules: Module[]
  x: number
  y: number
  controls: Control[]
}