function collides(collider: module, { id, rack, slot, slots }: subject): boolean {
  if (collider.id === id) return false;
  if (rack !== collider.rack) return false;
  if (collider.slot >= slot + slots) return false;
  if (slot >= collider.slot + collider.slots) return false;
  return true;
}

export function moveModule() {
  return async (module: Module, { x, y }: Coordinates, colliders: Module[] = []) => {
    const slot = (x - (x % 20)) / 20
    const rack = (y - (y % 400)) / 400
    const futureModule: Module = { ...module, rack, slot }
    if (colliders.some(c => collides(c, futureModule))) return;
    module.slot = slot
    module.rack = rack
  }
}