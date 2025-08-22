type LinkTermination = {
  node: string
  index: number
}

export type ModuleLink = Identified & {
  from: LinkTermination,
  to: LinkTermination,
}