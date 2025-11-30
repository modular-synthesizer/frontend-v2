import type { Parameter } from "~/core/business/synthesizers/Parameter.type";
import { round } from "../maths";

export function getValue(parameter: Parameter) {
	const { value = 0, precision = 0 } = parameter;
	return round(value, precision);
}
