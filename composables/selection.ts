type State = {
  id?: string
}

export type Selector = {
  select: (item: Identified) => void
  reset: () => void
  selected: (item: Identified) => boolean
}

export function useSelectionTemplate() {

  const state: Ref<State> = ref({ })

  return (): Selector => ({
    select(item: Identified) {
      console.log(item.id)
      state.value.id = item.id
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