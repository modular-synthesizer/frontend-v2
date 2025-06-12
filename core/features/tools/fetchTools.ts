export function fetchTools(api: ApiSchema, snack: Snacker) {
	return async (): Promise<Tool[]> => {
		const results = await api.tools.list();
		if (!results.ok) {
			snack.error("modules.errors.list");
			return [];
		}
		return results.data;
	};
}
