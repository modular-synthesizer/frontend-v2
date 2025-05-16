type QueueItem = { text: string, timeout: number, color: string }

export const useSnack = () => {

  const queue = useState<QueueItem[]>('snackbar').value

  function success(text: string) {
    queue.push({ text, color: 'success', timeout: 2500 })
  }

  function error(text: string) {
    queue.push({ text, color: 'error', timeout: 2500 })
  }

  function asyncError({ key, message }: AsyncFailure) {
    error(`login.${key}.${message}`)
  }

  return { asyncError, error, success }
}
