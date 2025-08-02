<template>
  <div>
    <h1>Welcome to My Portfolio</h1>
    <p>This is a showcase of my work and projects.</p>

    <div class="grid grid-cols-2 gap-4 mt-8">
      <NuxtLink to="/about" class="card">
        <h2>About</h2>
        <p>Learn more about my work and background</p>
      </NuxtLink>

      <NuxtLink to="/projects" class="card">
        <h2>Projects</h2>
        <p>Browse through my creative projects</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Fetch content for the home page
const { data: homeContent } = await useAsyncData('home', () =>
  queryCollection('content').path('/').first()
)
</script>