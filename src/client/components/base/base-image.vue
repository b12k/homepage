<script lang="ts" setup>
  export interface BaseImageProps {
    alt?: string;
    lazy?: boolean;
    src: string;
  }

  const props = defineProps<BaseImageProps>();
</script>
<template>
  <img
    :alt="props.alt"
    :loading="props.lazy ? 'lazy' : 'eager'"
    :src="props.src"
    class="base-image"
  />
</template>
<style lang="scss">
  .base-image {
    object-fit: cover;
  }
</style>
