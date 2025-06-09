export function roundAt(value: number, precision: number) {
  return Math.round((value + Number.EPSILON) * (10 ** precision)) / (10 ** precision)
}