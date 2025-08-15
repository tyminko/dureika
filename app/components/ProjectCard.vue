<template>
  <div class="project-card">
    <div>
      <ContentImage 
        v-if="project.image" 
        :src="project.image" 
        :alt="project.title" 
        :width="400"
        :height="300"
        :crop="'center'"
        :focus="'auto'"
        class="project-image" 
      />
      <div v-else class="project-placeholder">
        <span>{{ project.title?.charAt(0) }}</span>
      </div>
    </div>

    <div class="project-content">
      <h3 class="project-title">
        <NuxtLink :to="project._path">
          {{ project.title }}
        </NuxtLink>
      </h3>

      <p class="project-description">
        {{ project.description }}
      </p>

      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>

      <div class="project-meta">
        <span v-if="project.date">
          {{ formatDate(project.date) }}
        </span>
        <NuxtLink :to="project._path">
          Read more →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.project-image:hover {
  transform: scale(1.05);
}
</style>