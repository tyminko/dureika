<template>
  <div>
    <h1>Test Content Page</h1>
    
    <div>
      <h2>Testing ContentDoc:</h2>
      <ContentDoc />
    </div>
    
    <div>
      <h2>Testing ContentRenderer with hardcoded content:</h2>
      <ContentRenderer :value="hardcodedContent" />
    </div>
  </div>
</template>

<script setup>
// Hardcoded content for testing
const hardcodedContent = {
  title: 'Test Content',
  body: {
    type: 'root',
    children: [
      {
        type: 'h1',
        children: [{ type: 'text', value: 'Test Content' }]
      },
      {
        type: 'p',
        children: [{ type: 'text', value: 'This is a test paragraph.' }]
      }
    ]
  }
}
</script>