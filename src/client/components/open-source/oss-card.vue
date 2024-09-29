<script lang="ts" setup>
  import type { BaseImageProps } from '../base';

  export interface OssCardProps extends BaseImageProps {
    description: string;
    href: string;
    title: string;
  }

  import { BaseImage } from '../base';
  const { alt, description, src, title } = defineProps<OssCardProps>();
</script>
<template>
  <article class="oss-card card shadow-sm overflow-hidden">
    <div class="card-img-top ratio ratio-16x9">
      <BaseImage :alt="alt" :src="src" lazy />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ description }}
      </p>
    </div>
  </article>
</template>
