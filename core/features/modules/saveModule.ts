export function saveModule(api: ApiSchema, snacker: Snacker) {
	return async (module: Module) => {
		const payload: Partial<Module> = { slot: module.slot, rack: module.rack };
		const response = await api.modules.update(module.id, payload);
		if (!response.ok) snacker.error("modules.save.error");
	};
}
