import { apiGet, apiPost, apiPut, apiDelete } from './client'

export interface BuiltinTool {
  name: string
  description: string
}

export interface MCPServer {
  id: string
  name: string
  command: string
  args: string[]
  env: Record<string, string>
}

export interface ToolsData {
  builtin: BuiltinTool[]
  mcpServers: MCPServer[]
}

export async function fetchTools(): Promise<ToolsData> {
  return apiGet('/api/tools')
}

export async function createMCPServer(data: Partial<MCPServer>): Promise<MCPServer> {
  return apiPost('/api/tools/mcp', data)
}

export async function updateMCPServer(id: string, data: Partial<MCPServer>): Promise<MCPServer> {
  return apiPut(`/api/tools/mcp/${id}`, data)
}

export async function deleteMCPServer(id: string): Promise<void> {
  return apiDelete(`/api/tools/mcp/${id}`)
}
