<template>
  <div>
    <h1>Content Test</h1>
    <p>Basic test page</p>

    <h2>Simple Test:</h2>
    <p>If you can see this, the page is working.</p>

    <h2>Data Test:</h2>
    <p>About Data: {{ aboutData ? 'Found' : 'Not found' }}</p>
    <p>All Content: {{ allContent ? 'Found' : 'Not found' }}</p>
  </div>
</template>

<script setup>
// Simple test without complex queries
const { data: aboutData } = await useAsyncData('about', () => queryCollection('default').find())
const { data: allContent } = await useAsyncData('all', () => queryCollection('default').find())
</script>