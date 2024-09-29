<script lang="ts" setup>
  import { OssCard } from '../components';
</script>

<template>
  <main class="page-projects container">
    <h1 class="mb-4">Projects Banana</h1>
    <div class="row g-3">
      <div :key="i" class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="i in 12">
        <OssCard
          :src="`https://picsum.photos/600?i=${i}`"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ad expedita harum iure perferendis provident. 123123456789`"
          href="https://github.com"
          title="Awesome Project"
        />
      </div>
    </div>
  </main>
</template>
