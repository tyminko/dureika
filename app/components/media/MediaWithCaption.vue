<template>
  <figure class="media-figure">
    <slot />
    <figcaption v-if="$slots.caption" class="media-caption">
      <slot v-if="$slots.caption" name="caption" mdc-unwrap="p" />
    </figcaption>
  </figure>
</template>

<style scoped>
.media-figure {
  margin: 2rem 0;
  text-align: center;
}

.media-caption {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.4;
  text-align: left;
}
</style>
