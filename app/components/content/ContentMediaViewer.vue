<script setup lang="ts">
const props = defineProps<{
  mediaItems: ContentMedia[]
  type?: string
  publishId?: string
  fullWidthContent?: boolean
}>()

const emit = defineEmits<{
  (e: 'intrinsic', payload: { id: string | number; width: number; height: number; aspect: number }): void
}>()

const isMultipleMediaItems = computed(() => props.mediaItems.length > 1)
const isSlideshow = computed(() => props.type === 'slideshow' && props.mediaItems.length > 1)
const currentIndex = ref(0)

const slideshowVars = computed(() => {
  if (isSlideshow.value) {
    return {
      '--slide-index': `${currentIndex.value}`,
      '--num-slides': `${props.mediaItems.length}`,
    }
  }
  return {}
})

const gridVars = computed(() => {
  return {}
})

function handleIntrinsic(id: string | number, payload: { width: number; height: number; aspect: number }) {
  emit('intrinsic', { id, ...payload })
}

function gotoNextSlide() {
  if (!isMultipleMediaItems.value) return
  currentIndex.value = (currentIndex.value + 1) % props.mediaItems.length
}

function gotoPreviousSlide() {
  if (!isMultipleMediaItems.value) return
  currentIndex.value = (currentIndex.value - 1 < 0) ? props.mediaItems.length - 1 : currentIndex.value - 1
}
</script>

<template>
  <div v-if="mediaItems.length" class="media-viewer"
    :class="{ 'slideshow-box': isSlideshow, 'full-width-content': fullWidthContent }">
    <ul class="media-strip" :class="[type ?? 'grid']" :style="{ ...slideshowVars, ...gridVars }">
      <li v-for="media in mediaItems" :key="media.id">
        <figure>
          <ContentImage v-if="media.type === 'image'" :src="media.src as string" :alt="media.alt as string"
            :aspectRatio="media.aspect as number | undefined" fitViewport
            @intrinsic="p => handleIntrinsic(media.id, p)" />
          <figcaption v-if="media.caption">
            {{ media.caption }}
          </figcaption>
        </figure>
        <slot name="media-item-overlay" :media-item="media" />
      </li>
    </ul>
    <footer>
      <slot name="caption" />
      <div v-if="isSlideshow" class="right">
        <UiBar>
          <button v-if="isMultipleMediaItems" class="compact" @click="gotoPreviousSlide">
            <span class="icon-chevron-left" />
          </button>
          <button v-if="isMultipleMediaItems" class="compact" @click="gotoNextSlide">
            <span class="icon-chevron-right" />
          </button>
        </UiBar>
        <slot name="footer-right" />
      </div>
    </footer>
  </div>
</template>

<style scoped>
.media-viewer {
  --media-viewer-footer-h: 0px;
  container-type: inline-size;
  position: relative;
  overflow: hidden;
  overflow: clip;

  &.slideshow-box {
    --media-viewer-footer-h: var(--base-size);
  }

  ul {
    list-style-type: none;
  }

  ul.media-strip {
    --slides-gap: var(--padding-mini);
    position: relative;
    gap: var(--padding-small);
    width: 100%;
    grid-gap: var(--slides-gap);

    &.grid {
      display: grid;
      grid-auto-rows: auto;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--padding-mini);
      height: auto;

      li {
        container-type: inline-size;
      }
    }

    &.slideshow {
      display: flex;
      align-items: center;
      transform: translateX(calc(var(--slide-index, 0) * (-100cqi - var(--slides-gap))));
      transition: transform 0.5s;

      li {
        width: 100%;
        height: 100%;
        flex-shrink: 0;

        figure {
          height: 100%;
        }
      }
    }

    figcaption {
      font-family: var(--font-family-second);
      font-size: var(--font-size-caption);
      padding: var(--padding-mini) var(--padding-small);
      width: fit-content;
      color: color-mix(in lab, var(--color-fg), var(--color-bg) 30%);
      background-color: color-mix(in lab, var(--color-bg), transparent 30%);
    }
  }

  footer {
    --button-size: var(--base-size);
    display: flex;
    align-items: flex-end;
    z-index: 200;
    padding: 0;
    position: sticky;
    bottom: 0;
    height: var(--media-viewer-footer-h);

    .right {
      margin-left: auto;
    }
  }
}
</style>
