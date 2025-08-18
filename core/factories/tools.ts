export function toolFactory(payload: Partial<Tool> = {}): Tool {
  return { id: '', categoryId: '', name: '', slots: 2, x: 0, y: 0, scale: 1.0, controls: [], nodes: [], ...payload }
}