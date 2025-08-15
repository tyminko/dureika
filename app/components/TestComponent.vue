<template>
  <div class="test-component" style="border: 2px solid red; padding: 1rem; margin: 1rem 0;">
    <h3>Test Component Works!</h3>
    <p>Message: {{ message }}</p>
    <p>Number: {{ number }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message?: string
  number?: number
}>()
</script>
