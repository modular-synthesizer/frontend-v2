import { useStorage } from '@vueuse/core'

function defaultSession() {
  const account: Account = { id: '', username: '', email: '' }
  return { token: '', admin: false, created_at: (new Date()), duration: 0, account }
}

const storage = useStorage('user-session', defaultSession)

export function useAuthTemplate(storage: Ref<Session>, generator: () => Session) {
  return () => ({
    get authenticated(): boolean {
      return storage.value.token !== ''
    },
    reset() {
      storage.value = generator()
    },
    store(session: Session) {
      storage.value = session
    },
    get token(): string {
      return storage.value.token
    },
    get username(): string {
      return storage.value.account.username
    },
  })
}

export const useAuth = useAuthTemplate(storage, defaultSession);