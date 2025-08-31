type Overrides<T> = Record<keyof T, () => unknown>

export type Factory<T> = {
  props: (o: Overrides<T>) => Factory<T>
  build: () => void
}

export function createObject<T>(factory: Factory<T>) {
  return async (overloads: Partial<T> = {}): Promise<T> => {
    const entries = Object.entries(overloads).map(([ k, v ]) => [ k, () => v])
    const overrides: Overrides<T> = Object.fromEntries(entries)
    return (await factory.props(overrides).build()) as T
  }
}
