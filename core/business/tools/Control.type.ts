export type ControlComponent = 'SmallKnob'|'Knob'|'LargeKnob'|'Port'|'Fader'

export type Control = Identified & {
  component: ControlComponent
}