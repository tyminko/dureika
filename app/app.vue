<template>
  <div>
    <header>
      <nav class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="logo">
              Portfolio
            </NuxtLink>
          </div>
          <div class="nav-links">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/projects">Projects</NuxtLink>
            <NuxtLink to="/about">About</NuxtLink>
          </div>
        </div>
      </nav>
    </header>

    <main class="max-w-7xl mx-auto py-8">
      <div class="container">
        <NuxtPage />
      </div>
    </main>

    <footer>
      <div class="max-w-7xl mx-auto py-8">
        <p class="text-center">
          © 2024 Portfolio. Built with Nuxt.js and deployed on GitHub Pages.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Navigation will be handled by individual pages
</script>
