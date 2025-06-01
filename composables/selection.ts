type State = {
  id?: string
}

export type Selector = {
  select: (item: Identifiable) => void
  reset: () => void
  selected: (item: Identifiable) => vois
}

export function useSelectionTemplate() {

  const state: Ref<State> = ref({ })

  return (): Selector => ({
    select(item: Identified) {
      state.value.id = item.id
      console.log(state.value.id)
    },
    reset() {
      state.value.id = undefined;
    },
    selected(item: Identified) {
      return state.value.id === item.id
    }
  })
}

export const useSelection = useSelectionTemplate()