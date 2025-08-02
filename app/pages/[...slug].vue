<script lang="ts" setup>
const route = useRoute()

// Skip API routes and static files
if (route.path.startsWith('/api/') || route.path.includes('.')) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

// Debug: Let's see what collections are available
const { data: allContent } = await useAsyncData('debug-all', () => {
  return queryCollection('content').all()
})

// Debug: Let's see what we get for this specific path
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

// Log for debugging
console.log('Route path:', route.path)
console.log('All content:', allContent.value)
console.log('Page content:', page.value)
</script>

<template>
  <div>
    <template v-if="page">
      <ContentRenderer :value="page" />
    </template>
    <template v-else>
      <div class="empty-page">
        <h1>Page Not Found</h1>
        <p>Oops! The content you're looking for doesn't exist.</p>
        <p>Path: {{ route.path }}</p>

        <!-- Debug info -->
        <div v-if="allContent">
          <h2>Available content:</h2>
          <ul>
            <li v-for="item in allContent" :key="item.path">
              {{ item.path }} - {{ item.title }}
            </li>
          </ul>
        </div>

        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </template>
  </div>
</template>