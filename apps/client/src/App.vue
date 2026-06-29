<script setup lang="ts">
import { onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useProvidersStore } from '@/stores/providers'
import { useCharactersStore } from '@/stores/characters'
import Sidebar from '@/components/Sidebar.vue'
import ChatArea from '@/components/ChatArea.vue'

const chatStore = useChatStore()
const providersStore = useProvidersStore()
const charactersStore = useCharactersStore()

onMounted(async () => {
  await Promise.all([
    providersStore.load(),
    charactersStore.load(),
    chatStore.loadSessions(),
  ])
  let targetId: string | null = null
  try {
    const saved = JSON.parse(localStorage.getItem('yi-lin-chat-defaults') || '{}')
    if (saved.activeSessionId && chatStore.sessions.find(s => s.id === saved.activeSessionId)) {
      targetId = saved.activeSessionId
    }
  } catch {}
  if (!targetId) {
    if (chatStore.sessions.length === 0) {
      const s = await chatStore.createSession()
      targetId = s.id
    } else {
      targetId = chatStore.sessions[0].id
    }
  }
  await chatStore.switchSession(targetId)
})
</script>

<template>
  <div class="app-layout">
    <Sidebar />
    <ChatArea />
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #app { height: 100%; }
.app-layout { display: flex; height: 100%; }
</style>
