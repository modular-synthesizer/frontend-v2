export function selectModule(selector: Selector) {
  return async(module: Module) => {
    console.log("Selecting module " + module.id)
    selector.select(module)
  }
}