export type ToolDeleter = (id: string) => ExpectedResult<void>

export function deleteTool(
	requester: Fetcher<void>,
	auth: Auth,
): ToolDeleter {
  return async (id) => {
		return requester("DELETE", `/tools/${id}`, { auth_token: auth.token });
	};
}