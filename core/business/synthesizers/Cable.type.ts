export type Cable = Identified & {
  from: string
  to: string
  // Add attributes for coordinates ? Or deduce them in the corresponding component.
}