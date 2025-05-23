import { describe, expect, test } from "vitest"
import { fakeSynthesizer } from "../fakes"

const useDragEvents = useDragEventsTemplate()

function createSynth(x: number, y: number, scale: number) {
  return { id: "1", members: [], name: "testReference", voices: 16, x, y, scale }
}

describe("correctly sets the position when starting a drag", () => {
  test("It correctly sets the origin in a normal reference frame", () => {
    const synth = createSynth(0, 0, 1.0)
    useDragEvents().start(synth, { x: 100, y: 200 })
    expect(useDragEvents().state.value.origin).toEqual({ x: 100, y: 200 })
  })

  test("it Correctly sets the origin when the reference frame is translated", async () => {
    const synth = createSynth(100, 100, 1.0)
    useDragEvents().start(synth, { x: 100, y: 200 })
    expect(useDragEvents().state.value.origin).toEqual({ x: 0, y: 100 })
  })

  test("it Correctly sets the origin when the reference frame is scaled", async () => {
    const synth = createSynth(0, 0, 2.0)
    useDragEvents().start(synth, { x: 100, y: 200 })
    expect(useDragEvents().state.value.origin).toEqual({ x: 50, y: 100 })
  })

  test("it Correctly sets the origin when the reference frame is scaled and translated", async () => {
    const synth = createSynth(50, 50, 2.0)
    useDragEvents().start(synth, { x: 100, y: 200 })
    expect(useDragEvents().state.value.origin).toEqual({ x: 0, y: 50 })
  })
})

describe("Correctly returns the new position when dragging and moving", () => {
  test("Correctly generates the new coordinates in a normal reference frame", () => {
    const synth = createSynth(0, 0, 1.0)
    useDragEvents().start(synth, { x: 100, y: 200 })
    const newCoordinates = useDragEvents().move({ x: 200, y: 50 })
    expect(newCoordinates).toEqual({ x: 100, y: -150 })
  })

  test("Correctly generates the new coordinates when the reference is translated", () => {
    const synth = createSynth(100, 100, 1.0)
    useDragEvents().start(synth, { x: 100, y: 200 })
    const newCoordinates = useDragEvents().move({ x: 200, y: 50 })
    expect(newCoordinates).toEqual({ x: 200, y: -50 })
  })

  test("Correctly generates the new coordinates when the reference is scale", () => {
    const synth = createSynth(0, 0, 2.0)
    useDragEvents().start(synth, { x: 100, y: 100 })
    const newCoordinates = useDragEvents().move({ x: 200, y: 200 })
    expect(newCoordinates).toEqual({ x: 50, y: 50 })
  })

  test("Correctly generates the new coordinates when the reference is scale and translated", () => {
    const synth = createSynth(100, 100, 2.0)
    useDragEvents().start(synth, { x: 100, y: 100 })
    const newCoordinates = useDragEvents().move({ x: 200, y: 200 })
    expect(newCoordinates).toEqual({ x: 150, y: 150 })
  })

  test("Correctly generates the new coordinates when moving twice", () => {
    const synth = createSynth(100, 100, 2.0)
    useDragEvents().start(synth, { x: 100, y: 100 })
    useDragEvents().move({ x: 200, y: 200 })
    const newCoordinates = useDragEvents().move({ x: 100, y: 200 })
    expect(newCoordinates).toEqual({ x: 100, y: 150 })
  })
})