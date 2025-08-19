type Requester = (id: string) => ExpectedResult<void>;

export function deleteToolFromList(id: string, list: Tool[]) {
	const index: number = list.findIndex((s: Tool) => s.id === id);
	if (index >= 0) list.splice(index, 1);
}

export function removeTool(api: ApiSchema, snacker: Snacker) {
	return async (id: string, list: Tool[]) => {
		deleteToolFromList(id, list);
		const response: AsyncResult<void> = await api.tools.delete(id);
		if (response.ok) {
			snacker.success("tools.deletion.success");
		} else {
			snacker.error("tools.deletion.error");
		}
	};
}
