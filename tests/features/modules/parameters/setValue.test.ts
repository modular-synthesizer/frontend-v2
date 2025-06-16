import { beforeEach, describe, expect, test } from "vitest"
import { ParametersFactory } from "~/tests/factories/parameters"

const feature = setParameterValue()

describe('setValue', async () => {
  let parameter: Parameter;

  beforeEach(async () => {
    parameter = await ParametersFactory.build()
  })

  test("Correctly sets the value when whithin the range", async () => {
    feature(parameter, 20)
    expect(parameter.value).toBe(20)
  })
  test("Does clamp the value if below the minimum", async () => {
    feature(parameter, -10)
    expect(parameter.value).toBe(0)
  })
  test("Does clamp the value if above the maximum", async () => {
    feature(parameter, 200)
    expect(parameter.value).toBe(100)
  })
})