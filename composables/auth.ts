import { useStorage } from '@vueuse/core'

function session(): Eventual<Session> {
  try {
    return JSON.parse(useStorage('user-session').value);
  }
  catch(_) {
    return undefined;
  }
}

export const useAuth = () => {
  return {
    get authenticated() {
      return session() !== undefined
    },
    session
  }
}
