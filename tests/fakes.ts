import type { Session } from "~/core/business/sessions/Session.type"

export type ExpectedFailure = Promise<AsyncFailure>;

export type ExpectedSuccess<T> = Promise<AsyncSuccess<T>>

export const fakeNavigator: Redirector = ((_path: string) => { }) as Redirector

export const fakeSnacker = useSnackTemplate(ref([]))()

export const fakeTimeout: TimeoutFunction = (callback: () => void, timeout: number) => {
  callback()
  return 42
}

export const fakeClear: ClearFunction = (_timeout: number) => { }