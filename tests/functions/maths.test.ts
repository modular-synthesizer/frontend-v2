import { describe, expect, test } from "vitest";
import { round } from "~/core/functions/maths";

describe('round', () => {
  test("It correctly rounds numbers when no precision is given", () => {
    expect(round(12.2)).toEqual(12)
  })
  test("it can round to the nearest superior number", () => {
    expect(round(12.8)).toEqual(13)
  })
  test("it correctly rounds numbers with precision", () => {
    expect(round(12.42, 1)).toEqual(12.4)
  })
  test("it correctly round numbers with precision to the nearest superior value", () => {
    expect(round(12.48, 1)).toEqual(12.5)
  })
})