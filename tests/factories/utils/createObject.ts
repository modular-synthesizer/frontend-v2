type Overrides = Record<string, () => unknown>

type Factory = {
  props: (o: Overrides) => Factory
  build: () => void
}

export function createObject<T>(factory: Factory) {
  return async (overloads: Record<string, unknown>): Promise<T> => {
    const entries = Object.entries(overloads).map(([ k, v ]) => [ k, () => v])
    const overrides: Overrides = Object.fromEntries(entries)
    return (await factory.props(overrides).build()) as T
  }
}
