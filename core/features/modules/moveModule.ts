export function moveModule() {
  return async (module: Module, { x, y }: Coordinates) => {
    module.slot = (x - (x % 20)) / 20
    module.rack = (y - (y % 400)) / 400
  }
}