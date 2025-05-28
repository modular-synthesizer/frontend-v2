export type TimeoutFunction = typeof window.setTimeout

export type ClearFunction = typeof window.clearTimeout

export type Debouncer = {
  debounce: (name: string, delay: number, callback: () => void) => void,
  cancel: (name: string) => void,
  debouncers: Ref<Record<string, number>>
}

export function useDebounceTemplate(timeout: TimeoutFunction, clear: ClearFunction) {

  const debouncers: Ref<Record<string, number>> = ref({ })
  
  return (): Debouncer => ({
    debounce(name: string, delay: number, callback: () => void) {
      if (name in debouncers.value) clear(debouncers.value[name])
      debouncers.value[name] = timeout(callback, delay)
    },
    cancel(name: string) {
      clear(debouncers.value[name])
    },
    debouncers
  })
}

export const useDebounce = useDebounceTemplate(setTimeout, clearTimeout)