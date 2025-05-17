import { useStorage } from '@vueuse/core'

const defaultSession = { token: '', admin: false, created_at: (new Date()), duration: 0 }

const storage = useStorage('user-session', defaultSession)

function store(session: Session) {
  storage.value = session
}

export const useAuth = () => {
  return {
    get authenticated() {
      return storage.value.token !== ''
    },
    reset: () => store(defaultSession),
    store,
  }
}
