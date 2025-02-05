<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style scoped>
  html,
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }

  .app {
    height: 100vh;
    width: 100vw;
    display: flex;
    box-sizing: border-box;
    background-color: white;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }
</style>
