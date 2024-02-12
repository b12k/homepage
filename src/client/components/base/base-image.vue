<script lang="ts" setup>
  export interface BaseImageProps {
    src: string;
    lazy?: boolean;
    alt?: string;
  }

  const props = defineProps<BaseImageProps>();
</script>
<template>
  <img
    class="base-image"
    :src="props.src"
    :alt="props.alt"
    :loading="props.lazy ? 'lazy' : 'eager'"
  />
</template>
<style lang="scss">
  .base-image {
    object-fit: cover;
  }
</style>
