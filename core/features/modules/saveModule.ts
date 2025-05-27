export function saveModule(api: ApiSchema, snacker: Snacker) {
  return async (module: Module) => {
    await api.modules.update(module.id, { slot: module.slot, rack: module.rack })
  }
}