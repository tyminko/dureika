<template>
  <div class="image-gallery">
    <div class="gallery-grid">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="gallery-item"
        @click="openLightbox(index)"
      >
        <ContentImage
          :src="image.src"
          :alt="image.alt"
          context="gallery"
          class="gallery-image"
        />
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">&times;</button>
        <ContentImage
          :src="currentImage.src"
          :alt="currentImage.alt"
          context="single"
          class="lightbox-image"
        />
        <div class="lightbox-nav">
          <button @click="previousImage" :disabled="currentIndex === 0">‹</button>
          <span>{{ currentIndex + 1 }} / {{ images.length }}</span>
          <button @click="nextImage" :disabled="currentIndex === images.length - 1">›</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string
  alt: string
}

interface Props {
  images: GalleryImage[]
}

const props = defineProps<Props>()

const lightboxOpen = ref(false)
const currentIndex = ref(0)

const currentImage = computed(() => {
  return props.images[currentIndex.value] || { src: '', alt: '' }
})

const openLightbox = (index: number) => {
  currentIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  }
}

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

// Keyboard navigation
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!lightboxOpen.value) return
    
    switch (e.key) {
      case 'Escape':
        closeLightbox()
        break
      case 'ArrowRight':
        nextImage()
        break
      case 'ArrowLeft':
        previousImage()
        break
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.image-gallery {
  width: 100%;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.gallery-item {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.gallery-item:hover {
  transform: scale(1.02);
}

.gallery-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-nav {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.lightbox-nav button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.lightbox-nav button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 