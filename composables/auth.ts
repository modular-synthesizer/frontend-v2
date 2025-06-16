import { useStorage } from '@vueuse/core'

function defaultSession() {
  const account: Account = { id: '', username: '', email: '' }
  return { token: '', admin: false, created_at: (new Date()), duration: 0, account, rights: [] }
}

const storage = useStorage('user-session', defaultSession)

export function useAuthTemplate(storage: Ref<Session>, generator: () => Session) {
  return () => ({
    get authenticated(): boolean {
      return storage.value.token !== ''
    },
    can(right: string): boolean {
      return storage.value.rights.findIndex(r => r.label === right) > 0
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