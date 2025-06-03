export type ControlComponent = 'SmallKnob'|'Knob'|'LargeKnob'|'Port'|'Fader'

export type Control = Identified & {
  component: ControlComponent,
  payload: Record<string, string|number>
}