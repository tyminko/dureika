<script lang="ts" setup>
const route = useRoute()

// Get the project slug from the route
const projectSlug = computed(() => {
  // Remove '/projects/' prefix from the path
  return route.path.replace('/projects/', '')
})

// Use queryCollection to get the specific project content
const { data: project } = await useAsyncData(`project-${projectSlug.value}`, () => {
  return queryCollection('content').path(route.path).first()
})

// Set page head with project metadata
useHead(() => ({
  title: project.value?.title ? `${project.value.title} - Portfolio` : 'Project - Portfolio',
  meta: [
    { 
      name: 'description', 
      content: project.value?.description || 'Project details and information' 
    }
  ]
}))
</script>

<template>
  <div>
    <template v-if="project">
      <!-- Project Header -->
      <div class="mb-8">
        <NuxtLink to="/projects" class="back-link">
          ← Back to Projects
        </NuxtLink>
        
        <h1 class="mt-4 mb-2">{{ project.title }}</h1>
        <p class="text-lg text-gray-600 mb-4">{{ project.description }}</p>
        
        <!-- Project Tags -->
        <div v-if="project.tags" class="mb-6">
          <div class="tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        
        <!-- Project Image -->
        <div v-if="project.image" class="mb-6">
          <img :src="project.image" :alt="project.title" class="project-image" />
        </div>
      </div>

      <!-- Project Content -->
      <div class="project-content">
        <ContentRenderer :value="project" />
      </div>
    </template>
    
    <template v-else>
      <div class="empty-page">
        <h1>Project Not Found</h1>
        <p>Oops! The project you're looking for doesn't exist.</p>
        <p>Project: {{ projectSlug }}</p>
        <NuxtLink to="/projects" class="back-link">← Back to Projects</NuxtLink>
      </div>
    </template>
  </div>
</template>

<style scoped>
.back-link {
  @apply text-blue-600 hover:text-blue-800 underline;
}

.project-image {
  @apply w-full max-w-2xl rounded-lg shadow-lg;
}

.tags {
  @apply flex flex-wrap gap-2;
}

.tag {
  @apply px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm;
}

.project-content {
  @apply prose prose-lg max-w-none;
}
</style>