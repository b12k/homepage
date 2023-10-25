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
    :src="props.src"
    class="card-img-top"
    :alt="props.alt"
    :loading="props.lazy ? 'lazy' : 'eager'"
  />
</template>
