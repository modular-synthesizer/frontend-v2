import { afterEach, describe, expect, test, vi } from "vitest"
import { fakeSynthesizer } from "../../fakes"

const useDragEvents = useDragEventsTemplate()

function createSynth(x: number, y: number, scale: number) {
  return { id: "1", members: [], name: "testReference", voices: 16, x, y, scale }
}

const callback = ({ x, y }: Coordinates) => { }
const callbacks = { move: callback, drop: callback }

afterEach(() => vi.restoreAllMocks())

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

  const callbacks = { move: ({ x, y }: Coordinates) => { } }

  test("Correctly generates the new coordinates in a normal reference frame", () => {
    const callbackSpy = vi.spyOn(callbacks, "move")
    const synth = createSynth(0, 0, 1.0)
    useDragEvents().start(synth, { x: 100, y: 200 }, callbacks)
    useDragEvents().move({ x: 200, y: 50 })
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 100, y: -150 })
  })

  test("Correctly generates the new coordinates when the reference is translated", () => {
    const callbackSpy = vi.spyOn(callbacks, "move")
    const synth = createSynth(100, 100, 1.0)
    useDragEvents().start(synth, { x: 100, y: 200 }, callbacks)
    useDragEvents().move({ x: 200, y: 50 })
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 200, y: -50 })
  })

  test("Correctly generates the new coordinates when the reference is scale", () => {
    const callbackSpy = vi.spyOn(callbacks, "move")
    const synth = createSynth(0, 0, 2.0)
    useDragEvents().start(synth, { x: 100, y: 100 }, callbacks)
    useDragEvents().move({ x: 200, y: 200 })
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 50, y: 50 })
  })

  test("Correctly generates the new coordinates when the reference is scale and translated", () => {
    const callbackSpy = vi.spyOn(callbacks, "move")
    const synth = createSynth(100, 100, 2.0)
    useDragEvents().start(synth, { x: 100, y: 100 }, callbacks)
    useDragEvents().move({ x: 200, y: 200 })
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 150, y: 150 })
  })

  test("Correctly generates the new coordinates when moving twice", () => {
    const callbackSpy = vi.spyOn(callbacks, "move")
    const synth = createSynth(100, 100, 2.0)
    useDragEvents().start(synth, { x: 100, y: 100 }, callbacks)
    useDragEvents().move({ x: 200, y: 200 })
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 150, y: 150 })
    useDragEvents().move({ x: 100, y: 200 })
    expect(callbackSpy).toHaveBeenCalledWith({ x: 100, y: 150 })
  })
})

describe("Correctly returns the new position when dragging and dropping", () => {

  test("Correctly generates the new coordinates in a normal reference frame", () => {
    const callbackSpy = vi.spyOn(callbacks, "drop")
    const synth = createSynth(0, 0, 1.0)
    useDragEvents().start(synth, { x: 100, y: 200 }, callbacks)
    useDragEvents().end({ x: 200, y: 50 })
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 100, y: -150 })
  })

  test("Correctly generates the new coordinates when the reference is translated", () => {
    const callbackSpy = vi.spyOn(callbacks, "drop")
    const synth = createSynth(100, 100, 1.0)
    useDragEvents().start(synth, { x: 100, y: 200 }, callbacks)
    useDragEvents().end({ x: 200, y: 50 })
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 200, y: -50 })
  })

  test("Correctly generates the new coordinates when the reference is scale", () => {
    const callbackSpy = vi.spyOn(callbacks, "drop")
    const synth = createSynth(0, 0, 2.0)
    useDragEvents().start(synth, { x: 100, y: 100 }, callbacks)
    useDragEvents().end({ x: 200, y: 200 })
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 50, y: 50 })
  })

  test("Correctly generates the new coordinates when the reference is scale and translated", () => {
    const callbackSpy = vi.spyOn(callbacks, "drop")
    const synth = createSynth(100, 100, 2.0)
    useDragEvents().start(synth, { x: 100, y: 100 }, callbacks)
    useDragEvents().end({ x: 200, y: 200 })
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 150, y: 150 })
  })

  test("Correctly calls the end callback only once", () => {
    const callbackSpy = vi.spyOn(callbacks, "drop")
    const synth = createSynth(100, 100, 2.0)
    useDragEvents().start(synth, { x: 100, y: 100 }, callbacks)
    useDragEvents().end({ x: 200, y: 200 })
    useDragEvents().end({ x: 100, y: 200 })
    // Only the first call is made as after that, the state is reset.
    expect(callbackSpy).toHaveBeenCalledExactlyOnceWith({ x: 150, y: 150 })
  })
})

