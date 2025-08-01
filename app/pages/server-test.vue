<template>
  <div>
    <h1>Server Test Page</h1>
    <div v-if="content">
      <h2>Content found:</h2>
      <pre>{{ JSON.stringify(content, null, 2) }}</pre>
    </div>
    <div v-else>
      <p>No content found</p>
    </div>
  </div>
</template>

<script setup>
// Try to get content server-side
const { data: content } = await useAsyncData('server-content', () => {
  // This should work server-side
  return queryContent().find()
})
</script>