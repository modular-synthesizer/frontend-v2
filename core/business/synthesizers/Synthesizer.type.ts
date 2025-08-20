import type { Cable } from "./Cable.type";

export type Synthesizer = {
	id: string;
	name: string;
	voices: number;
	members: Membership[];
	scale: number;
	modules: Module[];
	cables: Cable[];
	x: number;
	y: number;
};
