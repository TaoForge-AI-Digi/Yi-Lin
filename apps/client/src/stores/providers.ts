import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as api from '@/api/providers'

export const useProvidersStore = defineStore('providers', () => {
  const providers = ref<api.Provider[]>([])
  async function load() { providers.value = await api.fetchProviders() }
  async function create(data: Partial<api.Provider>) { const p = await api.createProvider(data); providers.value.push(p) }
  async function update(id: string, data: Partial<api.Provider>) {
    const p = await api.updateProvider(id, data)
    const idx = providers.value.findIndex(x => x.id === id)
    if (idx >= 0) providers.value[idx] = p
  }
  async function remove(id: string) { await api.deleteProvider(id); providers.value = providers.value.filter(x => x.id !== id) }
  return { providers, load, create, update, remove }
})
