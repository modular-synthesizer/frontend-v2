export function createTool(api: ApiSchema, snack: Snacker) {
  return async (list: Tool[], name: string, slots = 2): Eventual<Tool> => {
    const response = await api.tools.new(name, slots)
    if (response.ok) {
      snack.success("tools.create.success")
      list.push(response.data)
      return response.data
    }
    snack.error("tools.create.error")
    return
  }
}