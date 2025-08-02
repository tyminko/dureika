<script lang="ts" setup>
const route = useRoute()

// Skip API routes, static files, and project paths
if (route.path.startsWith('/api/') ||
  route.path.includes('.') ||
  route.path.startsWith('/projects/')) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

// Use queryCollection to get the parsed content (Nuxt 4 approach)
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
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
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </template>
  </div>
</template>