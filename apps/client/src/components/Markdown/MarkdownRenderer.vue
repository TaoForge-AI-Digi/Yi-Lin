<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import CodeBlock from './CodeBlock.vue'

const props = defineProps<{
  content: string
}>()

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
})

const renderedHtml = computed(() => {
  return md.render(props.content)
})

const codeBlocks = computed(() => {
  const blocks: Array<{ code: string; language?: string }> = []
  const regex = /```(\w+)?\n([\s\S]*?)```/g
  let match
  
  while ((match = regex.exec(props.content)) !== null) {
    blocks.push({
      language: match[1],
      code: match[2].trim(),
    })
  }
  
  return blocks
})
</script>

<template>
  <div class="markdown-renderer">
    <div v-html="renderedHtml"></div>
  </div>
</template>

<style scoped>
.markdown-renderer {
  font-size: 14px;
  line-height: 1.6;
}
.markdown-renderer :deep(h1),
.markdown-renderer :deep(h2),
.markdown-renderer :deep(h3) {
  margin-top: 16px;
  margin-bottom: 8px;
}
.markdown-renderer :deep(p) {
  margin-bottom: 8px;
}
.markdown-renderer :deep(ul),
.markdown-renderer :deep(ol) {
  padding-left: 24px;
  margin-bottom: 8px;
}
.markdown-renderer :deep(code) {
  background: #f5f5f5;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}
.markdown-renderer :deep(pre) {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
}
.markdown-renderer :deep(a) {
  color: #007aff;
  text-decoration: none;
}
.markdown-renderer :deep(a:hover) {
  text-decoration: underline;
}
</style>
