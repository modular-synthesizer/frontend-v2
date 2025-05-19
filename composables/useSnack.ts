import { useStorage } from '@vueuse/core'

type QueueItem = { text: string, timeout: number, color: string }

export type Snacker = {
  success: (text: string) => void
  error: (text: string) => void
  asyncError: (failure: AsyncFailure) => void
}

export const useSnack = () => {

  const queue = useState<QueueItem[]>('snacks', () => [])

  function pushToQueue(text: string, color: string, timeout: number = 2500) {
    setTimeout(() => queue.value.push({ text, color, timeout }), 100)
  }

  function success(text: string) {
    pushToQueue(text, 'success')
  }

  function error(text: string) {
    pushToQueue(text, 'error')
  }

  function asyncError({ key, message }: AsyncFailure) {
    pushToQueue(`login.${key}.${message}`, 'error')
  }

  return {
    asyncError,
    error,
    success,
    queue
  }
}
