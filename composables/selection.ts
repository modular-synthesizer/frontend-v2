type State = {
  current?: Identified|undefined
  next?: Identified|undefined
  locked: boolean
}

export type Selector = {
  select: (item: Identified) => void
  reset: () => void
  selected: (item: Identified) => boolean
  lock: () => void
  unlock: () => void
  state: Ref<State>
}

function processNext(s: State) {
  if (!s.locked) {
    s.current = s.next
    s.next = undefined
  }
}

export function useSelectionTemplate() {

  const state: Ref<State> = ref({ locked: false })

  return (): Selector => ({
    select(item: Identified) {
      state.value.next = item
      processNext(state.value)
    },
    reset() {
      state.value.next = undefined
      processNext(state.value)
    },
    unlock() {
      state.value.locked = false
      processNext(state.value)
    },
    lock() {
      state.value.locked = true
    },
    selected(item: Identified) {
      return state.value.current?.id === item.id
    },
    state
  })
}

export const useSelection = useSelectionTemplate()