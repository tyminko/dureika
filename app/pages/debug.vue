<template>
  <div>
    <h1>Debug Page</h1>
    <div v-if="contentData">
      <h2>Content Data:</h2>
      <pre>{{ JSON.stringify(contentData, null, 2) }}</pre>
    </div>
    <div v-else>
      <p>No content data found</p>
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
// Try to fetch content from our direct file reading API
const { data: contentData, error } = await useFetch('/api/content-direct')
</script>