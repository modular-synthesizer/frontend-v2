/**
 * Subtract a set of coordinates from another set of coordinates.
 * the X coordinates in the subtraction of both X, and Y are the subtraction of both Y coordinates.
 * Coordinates are subtracted in the same order for X and Y coordinates.
 */
export function subtract(first: Coordinates, second: Coordinates) {
	return add(first, { x: -second.x, y: -second.y });
}

export function add(first: Coordinates, second: Coordinates) {
	return { x: first.x + second.x, y: first.y + second.y };
}

export function inRef(coords: Coordinates, reference: ScaledCoordinates) {
	return {
		x: coords.x / reference.scale - reference.x,
		y: coords.y / reference.scale - reference.y,
	};
}

export function fromEvent({ clientX, clientY }: MouseEvent) {
	return { x: clientX, y: clientY };
}
