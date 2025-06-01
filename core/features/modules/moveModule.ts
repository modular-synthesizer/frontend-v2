function collides(collider: module, { id, rack, slot, slots }: subject): boolean {
  if (collider.id === id) return false;
  if (rack !== collider.rack) return false;
  if (collider.slot >= slot + slots) return false;
  if (slot >= collider.slot + collider.slots) return false;
  return true;
}

function collidesAny(module: Module, colliders: Module[]) {
  for (const collider of colliders) {
    if (collides(collider, module)) return true;
  }
  return false
}

export function moveModule() {
  return async (module: Module, { x, y }: Coordinates, collidesWith: Module[] = []) => {
    const slot = (x - (x % 20)) / 20
    const rack = (y - (y % 400)) / 400
    if (collidesAny({ ...module, rack, slot }, collidesWith)) return;
    module.slot = slot
    module.rack = rack
  }
}