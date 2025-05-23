type DragCallback = (x: number, y: number) => void

type Callbacks = { move: DragCallback, drop: DragCallback }

type State = {
  // The frame of reference of the synthesizer
  reference: ScaledCoordinates
  // The origin of the event in the frame of reference of the synthesizer.
  origin: Coordinates
}

function subtract(first: Coordinates, second: Coordinates) {
  return add(first, { x: -second.x, y: -second.y })
}

function add(first: Coordinates, second: Coordinates) {
  return { x: first.x + second.x, y: first.y + second.y }
}

function inRef(coords: Coordinates, reference: ScaledCoordinates) {
  return {
    x: coords.x / reference.scale - reference.x,
    y: coords.y / reference.scale - reference.y
  }
}

export function useDragEventsTemplate() {

  const state = ref({
    reference: { x: 0, y: 0, scale: 1.0 },
    origin: { x: 0, y: 0 },
  })

  return () => ({
    /**
     * Sets the origin of a drag'n'drop event. The origin is made in the DOM itself, but in the synthesizer too,
     * and these are two different referentials. We store both the origin as the ratio between both of them will
     * @param reference the coordinates and scale of the synthesizer when the event is first started
     * @param event the origin of the click event triggering the drag'n'drop
     * @param callbacks the callbacks that will be called with the inferred coordinates when moving or dropping.
     */
    start(reference: ScaledCoordinates, event: Coordinates) {
      state.value.reference = { ... reference }
      state.value.origin = inRef(event, reference)
    },
    move(event: Coordinates) {
      const reference = state.value.reference
      const delta = subtract(inRef(event, reference), state.value.origin)
      return add(reference, delta)
    },
    reset() {

    },
    state
  })
}

export const useDragEvents = useDragEventsTemplate()