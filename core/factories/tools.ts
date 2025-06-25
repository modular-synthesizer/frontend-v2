export function createTool(payload: Partial<Tool> = {}): Tool {
  return { id: '', x: 0, y: 0, scale: 1.0, controls: [], nodes: [], ...payload }
}