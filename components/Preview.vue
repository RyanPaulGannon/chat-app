<template>
  <div class="flex flex-col items-center h-screen">
    <h1 class="text-center">Preview</h1>
    <div class="flex-1" id="htmlContainer" v-html="htmlContent"></div>
  </div>
</template>

<script setup lang="ts">
const htmlContent = '<p>This is your rendered HTML content.</p>'
</script>
