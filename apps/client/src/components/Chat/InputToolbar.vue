<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useChatStore } from '@/stores/chat'
import ModelSelector from './ModelSelector.vue'
import CharacterSelector from './CharacterSelector.vue'

const { t } = useI18n()
const chatStore = useChatStore()

const session = computed(() => chatStore.activeSession)
function onWorkspaceChange(e: Event) {
  const s = session.value
  if (s) s.workspace = (e.target as HTMLSelectElement).value
}
function toggleThinking() {
  const s = session.value
  if (s) {
    s.thinking = !s.thinking
    if (!s.thinking) s.reasoning_effort = undefined
  }
}
function onReasoningEffortChange(e: Event) {
  const s = session.value
  if (s) s.reasoning_effort = (e.target as HTMLSelectElement).value || undefined
}
</script>

<template>
  <div v-if="session" class="input-toolbar">
    <div class="toolbar-left">
      <CharacterSelector />
      <ModelSelector />
      <label class="toolbar-item workspace">
        <span class="label">{{ t('chat.workspace') }}</span>
        <input type="text" :value="session.workspace || ''" @change="onWorkspaceChange" :placeholder="`/${t('chat.workspace').toLowerCase()}/project`" />
      </label>
    </div>
    <div class="toolbar-right">
      <button class="thinking-toggle" :class="{ active: session.thinking }" @click="toggleThinking">
        🧠 {{ t('chat.thinking') }}
      </button>
      <label v-if="session.thinking" class="toolbar-item">
        <span class="label">{{ t('chat.reasoningEffort') }}</span>
        <select :value="session.reasoning_effort || ''" @change="onReasoningEffortChange">
          <option value="">{{ t('chat.default') }}</option>
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
          <option value="max">最高</option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped>
.input-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  border-bottom: 1px solid #e0e0e0;
  background: #fafafa;
  gap: 8px;
  flex-wrap: wrap;
}
.toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.toolbar-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}
.toolbar-item .label {
  white-space: nowrap;
}
.toolbar-item select,
.toolbar-item input {
  font-size: 12px;
  padding: 3px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  max-width: 140px;
}
.toolbar-item.workspace input {
  min-width: 120px;
}
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.thinking-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
  color: #666;
  white-space: nowrap;
}
.thinking-toggle.active {
  background: #e8f4ff;
  border-color: #007aff;
  color: #007aff;
}
</style>
