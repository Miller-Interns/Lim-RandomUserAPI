<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'

  defineProps<{
    currentPage: number
    totalPages: number
    loading: boolean
  }>()

  const emit = defineEmits(['next', 'prev'])
</script>

<template>
  <div class="pagination">
    <span v-if="loading">Refreshing...</span>
    <div v-else class="pagination-controls">
      <button @click="emit('prev')" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="emit('next')" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<style scoped>
  /*Pagination*/
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    gap: 10px;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .pagination button {
    background: #007bff;
    color: white;
    border: none;
    padding: 5px 15px;
    cursor: pointer;
    border-radius: 5px;
  }

  .pagination-controls button:hover {
    background: #0056b3;
  }

  .pagination button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .pagination span {
    font-weight: bold;
  }
</style>
