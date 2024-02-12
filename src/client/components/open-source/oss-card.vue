<script lang="ts" setup>
  import type { OssCardProps } from './types';
  import { BaseImage } from '../base';

  const props = defineProps<OssCardProps>();
</script>
<template>
  <article class="oss-card card shadow-sm">
    <div class="card-img-top ratio ratio-16x9">
      <BaseImage :src="props.src" :alt="props.alt" lazy />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ props.title }}</h5>
      <p class="card-text">
        {{ props.description }}
      </p>
    </div>
  </article>
</template>
