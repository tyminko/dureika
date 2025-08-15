<template>
  <div>
    <div class="mb-8">
      <h1 class="mb-4">All Projects</h1>
      <p>Browse through all my creative work and projects</p>
    </div>

    <!-- Filter Tags -->
    <div class="mb-8">
      <div class="filter-buttons">
        <button v-for="tag in allTags" :key="tag" @click="toggleTag(tag)" :class="[
          'filter-btn',
          selectedTags.includes(tag) ? 'active' : ''
        ]">
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-3">
      <NuxtLink v-for="project in filteredProjects" :key="project.path" :to="project.path" class="project-card">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <div v-if="project.tags" class="tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </NuxtLink>
      <ImageComponent src="sos-alys.jpg" alt="Project 1">Asdas ## asdasdas asd</ImageComponent>
    </div>

    <!-- No results message -->
    <div v-if="filteredProjects.length === 0" class="text-center py-12">
      <p class="text-lg">No projects match the selected filters.</p>
    </div>
  </div>
</template>

<script setup>
const selectedTags = ref([])

// Fetch all projects
const { data: projects } = await useAsyncData('all-projects', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/projects/%')
    .all()
)

// Get all unique tags
const allTags = computed(() => {
  const tags = new Set()
  projects.value?.forEach(project => {
    if (project.tags) {
      project.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags).sort()
})

// Filter projects based on selected tags
const filteredProjects = computed(() => {
  if (selectedTags.value.length === 0) {
    return projects.value || []
  }
  return projects.value?.filter(project =>
    project.tags?.some(tag => selectedTags.value.includes(tag))
  ) || []
})

// Toggle tag selection
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

useHead({
  title: 'Projects - Portfolio',
  meta: [
    { name: 'description', content: 'Browse through all creative projects and work' }
  ]
})
</script>

<style scoped>
.filter-buttons {
  @apply flex flex-wrap gap-2 mb-6;
}

.filter-btn {
  @apply px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors;
}

.filter-btn.active {
  @apply bg-blue-500 text-white border-blue-500;
}

.project-card {
  @apply p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow hover:border-blue-300;
  @apply text-decoration-none;
}

.project-card:hover {
  @apply text-decoration-none;
}

.tags {
  @apply flex flex-wrap gap-2 mt-4;
}

.tag {
  @apply px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm;
}
</style>