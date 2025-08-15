<script setup lang="ts">
type PresetSize = typeof sizes[number]
type PrefixType = ['square', 'vertical', 'horizontal'][number]
type PresetPrefix = PrefixType | 'normal'

const props = defineProps<{
  src?: string
  alt?: string
  aspectRatio?: string | number
  square?: boolean
  orientation?: PresetPrefix
  size?: string
}>()

const emit = defineEmits(['load'])

const sizes = [100, 200, 400, 800, 1600, 2000] as const
const aspectRatios: Record<PrefixType, number> = {
  square: 1 / 1,
  vertical: 1 / 1.9,
  horizontal: 1.9 / 1,
}

const imgRef = ref<HTMLImageElement | null>(null)
const loaded = ref(false)
const error = ref(false)

const placeholderCssUrl = computed(() => {
  const src = props.src
  if (src === undefined || src.startsWith('data:') || src.startsWith('blob:')) {
    return ''
  }
  const url = imgUrl(src, 'placeholder', props.orientation)
  return `url(${url})`
})

const srcStr = computed(() => {
  const src = props.src
  if (src === undefined || src.startsWith('data:') || src.startsWith('blob:')) {
    return src
  }
  return imgUrl(src, 400, props.orientation)
})

const srcSetStr = computed(() => {
  const src = props.src
  if (src === undefined || src.startsWith('data:') || src.startsWith('blob:')) {
    return
  }
  return sizes.map(size => [imgUrl(src, size, props.orientation), size]).map(([url, size]) => `${url} ${size}w`).join(', ')
})

const sizesStr = computed(() => props.size || '800px')

function checkIfLoaded() {
  const nuxtApp = useNuxtApp()
  const initialLoad = nuxtApp.isHydrating

  if (imgRef.value?.complete && initialLoad) {
    loaded.value = true
    error.value = false
  }
}
onMounted(() => checkIfLoaded())

const onLoad = () => {
  loaded.value = true
  error.value = false
}

function onError() {
  // error.value = true
  loaded.value = false
}

watch(loaded, loaded => emit('load', loaded), { immediate: true })

function transformSize(size: PresetSize | 'placeholder', orientation?: PresetPrefix) {
  const width = size === 'placeholder' ? 50 : size
  const suffix = size === 'placeholder' ? ',bl-10,q-50' : ''
  if (!orientation || orientation === 'normal') {
    return `tr:w-${width}${suffix}`
  }
  const aspectRatio = aspectRatios[orientation]
  const hSize = Math.round(width / aspectRatio)
  return `tr:w-${width},h-${hSize},fo-auto${suffix}`
}

function imgUrl(src: string, size: PresetSize | 'placeholder', orientation?: PresetPrefix) {
  if (src.startsWith('/')) {
    return src
  }
  const transform = transformSize(size, orientation)
  const endpoint = src.startsWith('https://i.vimeocdn.com') ? 'video/' : ''
  const name = decodeURIComponent(src.split(/(awc|video|appspot\.com\/o)\//).pop() ?? '')
  return `https://ik.imagekit.io/nqxb73nnx/${endpoint}${transform}/${name}`
}
</script>

<template>
  <div
    v-if="!error"
    class="px-img"
    :class="{ loaded }"
    :style="{
      '--placeholder-url': placeholderCssUrl,
      'aspect-ratio': props.aspectRatio,
    }">
    <img
      ref="imgRef"
      :srcset="srcSetStr"
      :sizes="sizesStr"
      :src="srcStr"
      :alt="alt"
      :style="{ 'aspect-ratio': props.aspectRatio }"
      loading="lazy"
      @load="onLoad"
      @error="onError">
  </div>
  <div v-else class="px-img empty" />
</template>

<style scoped lang="scss">
.px-img {
  position: relative;
  width: 100%;
  height: 100%;
  transition: opacity 0.2s;
  display: block;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    display: block;
    background-image: var(--placeholder-url);
    background-repeat: no-repeat;
    background-size: 100%;
    opacity: 1;
    transition: opacity 0.2s;
  }

  &.loaded:after {
    opacity: 0;
  }

  &.empty {
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 1px;
      background-color: color-mix(in lab, var(--color-text) 33%, transparent);
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>
