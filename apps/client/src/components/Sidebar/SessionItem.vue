<script setup lang="ts">
import { ref } from 'vue'
import ContextMenu from './ContextMenu.vue'

const props = defineProps<{
  session: {
    id: string
    title: string
    pinned?: boolean
  }
  active: boolean
}>()

const emit = defineEmits<{
  click: []
  contextmenu: [event: MouseEvent]
}>()

const showContextMenu = ref(false)
const contextMenuPos = ref({ x: 0, y: 0 })

function handleContextMenu(event: MouseEvent) {
  contextMenuPos.value = { x: event.clientX, y: event.clientY }
  showContextMenu.value = true
  emit('contextmenu', event)
}

function handleContextAction(action: string) {
  console.log('Action:', action, 'Session:', props.session.id)
}
</script>

<template>
  <div
    class="session-item"
    :class="{ active }"
    @click="emit('click')"
    @contextmenu.prevent="handleContextMenu"
  >
    <span class="status-dot"></span>
    <span class="session-title">{{ session.title || '新建对话' }}</span>
    <span v-if="session.pinned" class="pin-icon">📌</span>
  </div>

  <ContextMenu
    :visible="showContextMenu"
    :x="contextMenuPos.x"
    :y="contextMenuPos.y"
    :session-id="session.id"
    @close="showContextMenu = false"
    @action="handleContextAction"
  />
</template>

<style scoped>
.session-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 2px;
}
.session-item:hover {
  background: #e9ecef;
}
.session-item.active {
  background: #d0ebff;
  font-weight: 500;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
  margin-right: 8px;
}
.session-title {
  flex: 1;
}
.pin-icon {
  font-size: 12px;
}
</style>
