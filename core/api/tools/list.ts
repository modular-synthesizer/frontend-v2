export type ToolsListFetcher = () => ExpectedResult<Tool[]>

export function listTools(fetcher: Fetcher<Tool[]>, auth: Auth): ToolsListFetcher {
  return async (): ExpectedResult<Tool[]> => {
    return fetcher('GET', '/tools', { auth_token: auth.token })
  }
}