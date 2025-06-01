function collides(collider: module, { id, rack, slot, slots }: subject): boolean {
  if (collider.id === id) return false;
  if (rack !== collider.rack) return false;
  if (collider.slot >= slot + slots) return false;
  if (slot >= collider.slot + collider.slots) return false;
  return true;
}

export function moveModule() {
  return async (module: Module, { x, y }: Coordinates, collidesWith: Module[] = []) => {

    const slot = (x - (x % 20)) / 20
    const rack = (y - (y % 400)) / 400

    for (const collider of collidesWith) {
      if (collides(collider, { ...module, rack, slot })) return;
    }

    module.slot = slot
    module.rack = rack
  }
}