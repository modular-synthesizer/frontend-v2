export function round(value: number, precision = 0) {
  return Math.round((value + Number.EPSILON) * (10 ** precision)) / (10 ** precision)
}