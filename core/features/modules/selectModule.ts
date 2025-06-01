export function selectModule(selector: Selector) {
  return async(module: Module) => {
    selector.select(module)
  }
}