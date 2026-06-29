import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as api from '@/api/characters'

export const useCharactersStore = defineStore('characters', () => {
  const characters = ref<api.Character[]>([])
  const activeId = ref('general')
  const active = computed(() => characters.value.find(c => c.id === activeId.value) || characters.value[0])

  async function load() { characters.value = await api.fetchCharacters() }
  function setActive(id: string) { activeId.value = id }

  return { characters, activeId, active, load, setActive }
})
