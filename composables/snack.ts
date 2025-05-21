type QueueItem = { text: string, timeout: number, color: string }

export type Snacker = {
  success: (text: string) => void
  error: (text: string) => void
  asyncError: (failure: AsyncFailure, prefix?: string) => void,
  queue: Ref<QueueItem[]>,
}

export const useSnackTemplate = (queue: Ref<QueueItem[]>): (() => Snacker) => {
  return (): Snacker => {

    function pushToQueue(text: string, color: string, timeout = 2500) {
      queue.value.push({ text, color, timeout })
    }

    function success(text: string) {
      pushToQueue(text, 'success')
    }

    function error(text: string) {
      pushToQueue(text, 'error')
    }

    function asyncError({ key, message }: AsyncFailure, prefix?: string) {
      pushToQueue(`${prefix ? `.${prefix}` : ''}${key}.${message}`, 'error')
    }

    return {
      asyncError,
      error,
      success,
      queue
    }
  }
}

export const useSnack = useSnackTemplate(useState<QueueItem[]>('snacks', () => []))