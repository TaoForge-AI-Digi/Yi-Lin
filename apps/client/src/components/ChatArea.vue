<script setup lang="ts">
import MessageList from './MessageList.vue'
import ChatInput from './ChatInput.vue'
import ApprovalDialog from './ApprovalDialog.vue'
import StrategyIndicator from './Chat/StrategyIndicator.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
</script>

<template>
  <main class="chat-area">
    <StrategyIndicator />
    <MessageList />
    <ChatInput />
    <ApprovalDialog
      v-if="chatStore.pendingApproval"
      :approval="chatStore.pendingApproval"
      @respond="(c: 'once' | 'always' | 'reject') => chatStore.respondApproval(c)"
    />
  </main>
</template>

<style scoped>
.chat-area { flex: 1; display: flex; flex-direction: column; min-width: 0; }
</style>
