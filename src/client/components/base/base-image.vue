<script lang="ts" setup>
  export interface BaseImageProps {
    alt?: string;
    lazy?: boolean;
    src: string;
  }

  const { alt, lazy, src } = defineProps<BaseImageProps>();
</script>
<template>
  <img
    :alt="alt"
    :loading="lazy ? 'lazy' : 'eager'"
    :src="src"
    class="base-image"
  />
</template>
<style lang="scss">
  .base-image {
    object-fit: cover;
  }
</style>
