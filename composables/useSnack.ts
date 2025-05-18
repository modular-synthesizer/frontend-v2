type QueueItem = { text: string, timeout: number, color: string }

export type Snacker = {
  success: (text: string) => void
  error: (text: string) => void
  asyncError: (failure: AsyncFailure) => void
}

export const useSnack = () => {

  const queue = useState<QueueItem[]>('snackbar').value

  function pushToQueue(text: string, color: string, timeout: number = 2500) {
    if (import.meta.server || queue === undefined) return;
    queue.push({ text, color: 'success', timeout: 2500 })
  }

  function success(text: string) {
    pushToQueue(text, 'success')
  }

  function error(text: string) {
    pushToQueue(text, 'error')
  }

  function asyncError({ key, message }: AsyncFailure) {
    error(`login.${key}.${message}`)
  }

  return { asyncError, error, success }
}
