export function fetchTool(api: ApiSchema, navigator: Redirector) {
  return async (id: string): Eventual<Tool> => {
    const response: AsyncResult<Tool> = await api.tools.get(id);
    if (!response.ok) {
      navigator("/tools");
      return;
    }
    return response.data;
  }
}