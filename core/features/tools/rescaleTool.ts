export function rescaleTool(
	api: ApiSchema,
	debouncer: Debouncer,
	snack: Snacker,
) {
	return async (tool: Tool, deltaY: number) => {
		tool.scale = computeScale(tool, deltaY);
		debouncer.debounce(`tool.scale.${tool.id}`, 1000, async () => {
			const response = await api.tools.update(tool.id, { scale: tool.scale });
			if (!response.ok) snack.asyncError(response);
		});
	};
}
