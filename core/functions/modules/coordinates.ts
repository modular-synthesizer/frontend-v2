import { SLOT_WIDTH, RACK_HEIGHT } from "~/core/constants";

/**
 * Translates the rack and slot of a synthesizer into a set of X/Y coordinates in a synth.
 * @param module the module to translate
 * @returns the set of coordinates to place the module in the synthesizer
 */
export function getCoordinates(module: Module): Coordinates {
	return {
		x: module.slot * SLOT_WIDTH,
		y: module.rack * RACK_HEIGHT,
	};
}
