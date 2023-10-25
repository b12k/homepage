<script lang="ts" setup>
  import type { OssCardProps } from './types';
  import { BaseImage } from '../base';

  const props = defineProps<OssCardProps>();
</script>
<template>
  <article class="card shadow-sm">
    <BaseImage class="card-img-top" :src="props.src" :alt="props.alt" lazy />
    <div class="card-body">
      <h5 class="card-title">{{ props.title }}</h5>
      <p class="card-text">
        {{ props.description }}
      </p>
    </div>
  </article>
</template>
