type DragCallback = (coordinates: Coordinates) => void

type Callbacks = { move?: DragCallback, drop?: DragCallback }

type State = {
  // The frame of reference of the synthesizer
  reference: ScaledCoordinates
  // The origin of the event in the frame of reference of the synthesizer.
  origin: Coordinates,
  callbacks: Callbacks,
}

export type DragEventsHandler = {
  start: (reference: ScaledCoordinates, coords: Coordinates, callbacks: Callbacks) => void
  move: (event: Coordinates) => void
  end: (event: Coordinates) => void,
  state: Ref<State>
}

export function useDragEventsTemplate() {

  function defaultState() {
    return {
      reference: { x: 0, y: 0, scale: 1.0 },
      origin: { x: 0, y: 0 },
      callbacks: {} as Callbacks
    }
  }

  const state = ref(defaultState())

  return (): DragEventsHandler => ({
    /**
     * Sets the origin of a drag'n'drop event. The origin is made in the DOM itself, but in the synthesizer too,
     * and these are two different referentials. We store both the origin as the ratio between both of them will
     * @param reference the coordinates and scale of the synthesizer when the event is first started
     * @param event the origin of the click event triggering the drag'n'drop
     * @param callbacks the callbacks that will be called with the inferred coordinates when moving or dropping.
     */
    start(reference: ScaledCoordinates, event: Coordinates, callbacks: Callbacks = { }) {
      state.value.reference = { ... reference }
      state.value.origin = inRef(event, reference)
      state.value.callbacks = callbacks
    },
    move(event: Coordinates) {
      const { reference, callbacks, origin } = state.value
      const delta = subtract(inRef(event, reference), origin)
      callbacks.move?.(add(reference, delta))
    },
    end(event: Coordinates) {
      const { reference, callbacks, origin } = state.value
      const delta = subtract(inRef(event, reference), origin)
      callbacks.drop?.(add(reference, delta))
      state.value = defaultState()
    },
    state,
  })
}

export const useDragEvents = useDragEventsTemplate()