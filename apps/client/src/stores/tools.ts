import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as api from '@/api/tools'

export const useToolsStore = defineStore('tools', () => {
  const builtinTools = ref<api.BuiltinTool[]>([])
  const mcpServers = ref<api.MCPServer[]>([])

  async function load() {
    const data = await api.fetchTools()
    builtinTools.value = data.builtin
    mcpServers.value = data.mcpServers
  }

  async function createMCP(data: Partial<api.MCPServer>) {
    const s = await api.createMCPServer(data)
    mcpServers.value.push(s)
  }

  async function updateMCP(id: string, data: Partial<api.MCPServer>) {
    const s = await api.updateMCPServer(id, data)
    const idx = mcpServers.value.findIndex(x => x.id === id)
    if (idx >= 0) Object.assign(mcpServers.value[idx], s)
  }

  async function removeMCP(id: string) {
    await api.deleteMCPServer(id)
    mcpServers.value = mcpServers.value.filter(x => x.id !== id)
  }

  return { builtinTools, mcpServers, load, createMCP, updateMCP, removeMCP }
})
