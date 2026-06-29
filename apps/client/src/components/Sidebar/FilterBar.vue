<script setup lang="ts">
</script>

<template>
  <div class="filter-bar">
    <button class="filter-btn">过滤</button>
    <button class="sort-btn">排序</button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}
.filter-btn, .sort-btn {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
}
</style>
