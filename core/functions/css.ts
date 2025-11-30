export type Values = Array<Ref<number>|ComputedRef<number>|number>

export function px(...values: Values) {
  return () =>  values.map(v => `${typeof v === "number" ? v : v.value}px`).join(" ")
}