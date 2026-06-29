<script setup lang="ts">
defineProps<{
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
</script>

<template>
  <div
    class="session-item"
    :class="{ active }"
    @click="emit('click')"
    @contextmenu.prevent="emit('contextmenu', $event)"
  >
    <span class="status-dot"></span>
    <span class="session-title">{{ session.title || '新建对话' }}</span>
    <span v-if="session.pinned" class="pin-icon">📌</span>
  </div>
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
