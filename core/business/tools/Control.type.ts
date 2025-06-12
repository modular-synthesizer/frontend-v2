export type ControlComponent =
	| "SmallKnob"
	| "Knob"
	| "LargeKnob"
	| "Port"
	| "Fader";

// export type Control = Identified & {
//   component: ControlComponent,
//   payload: Record<string, string|number>
// }

export type KnobControl = {
	component: "SmallKnob" | "Knob" | "LargeKnob";
	payload: { x: number; y: number; target: string };
};

export type Control = Identified & KnobControl;
