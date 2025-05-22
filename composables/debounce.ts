export type TimeoutFunction = typeof window.setTimeout

export type ClearFunction = typeof window.clearTimeout

export function useDebounceTemplate(timeout: TimeoutFunction, clear: ClearFunction) {

  const debouncers = ref({ })
  
  return () => ({
    debounce(name: string, delay: number, callback: Function) {
      if (name in debouncers.value) clear(debouncers.value[name])
      debouncers.value[name] = timeout(callback, delay)
    },
    cancel(name: string) {
      clear(debouncers.value[name])
    },
    debouncers
  })
}

const useDebounce = useDebounceTemplate(setTimeout, clearTimeout)