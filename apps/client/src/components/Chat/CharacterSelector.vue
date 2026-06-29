<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCharactersStore } from '@/stores/characters'
import { useChatStore } from '@/stores/chat'

const { t } = useI18n()
const chatStore = useChatStore()
const charactersStore = useCharactersStore()

const open = ref(false)
const search = ref('')
const dropdownRef = ref<HTMLElement>()

const session = computed(() => chatStore.activeSession)

const list = computed(() => {
  const q = search.value.toLowerCase()
  return charactersStore.characters.filter(c => !q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q))
})

const currentLabel = computed(() => {
  const s = session.value
  if (!s) return t('chat.selectCharacter')
  const c = charactersStore.characters.find(x => x.id === s.character_id)
  return c?.name || s.character_id || t('chat.default')
})

function select(id: string) {
  const s = session.value
  if (!s) return
  s.character_id = id
  charactersStore.setActive(id)
  open.value = false
  search.value = ''
}

function toggle() {
  open.value = !open.value
  if (open.value) search.value = ''
}

function onClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="dropdownRef" class="selector">
    <button class="selector-trigger" @click.stop="toggle">
      <span class="trigger-label">{{ currentLabel }}</span>
      <span class="trigger-arrow" :class="{ up: open }">▾</span>
    </button>
    <div v-if="open" class="selector-dropdown">
      <div class="search-wrap">
        <input
          v-model="search"
          class="search-input"
          :placeholder="t('chat.searchCharacter')"
          @click.stop
        />
      </div>
      <div class="dropdown-list">
        <button
          v-for="c in list"
          :key="c.id"
          class="item-btn"
          :class="{ active: session?.character_id === c.id }"
          @click="select(c.id)"
        >
          <span class="item-prefix">-</span>
          <span class="item-name">{{ c.name }}</span>
        </button>
        <div v-if="list.length === 0" class="empty-hint">
          {{ t('chat.noCharacters') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selector {
  position: relative;
}

.selector-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
  color: #333;
  max-width: 140px;
  white-space: nowrap;
}

.selector-trigger:hover {
  border-color: #007aff;
}

.trigger-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.trigger-arrow {
  font-size: 10px;
  color: #999;
  transition: transform 0.15s;
}

.trigger-arrow.up {
  transform: rotate(180deg);
}

.selector-dropdown {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 4px;
  width: 220px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.12);
  z-index: 300;
  overflow: hidden;
}

.search-wrap {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.search-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #007aff;
}

.dropdown-list {
  max-height: 300px;
  overflow-y: auto;
  padding: 4px 0;
}

.item-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 6px 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 12px;
  color: #444;
  text-align: left;
}

.item-btn:hover {
  background: #f0f7ff;
}

.item-btn.active {
  background: #e3f2fd;
  color: #007aff;
  font-weight: 500;
}

.item-prefix {
  color: #bbb;
  font-family: monospace;
}

.item-name {
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-hint {
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>
