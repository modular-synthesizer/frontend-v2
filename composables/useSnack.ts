type QueueItem = { text: string, timeout: number, color: string }

type State = { queue: QueueItem[] }

const state: Ref<State> = ref({ queue: [] });

export const useSnack = () => {

  function success(text: string) {
    state.value.queue.push({ text, color: 'success', timeout: 2500 })
  }

  function error(text: string) {
    state.value.queue.push({ text, color: 'error', timeout: 2500 })
  }

  return { success, error, state }
}
