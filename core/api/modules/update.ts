export type ModuleUpdateFetcher = (id: string, infos: Partial<Module>) => ExpectedResult<Module>

export function updateModule(fetcher: Fetcher<Module>, auth: Auth) {
  return async (id: string, { rack, slot }: Partial<Module>) => {
    return await fetcher('PUT', `/modules/${id}`, {}, { rack, slot, auth_token: auth.token })
  }
}