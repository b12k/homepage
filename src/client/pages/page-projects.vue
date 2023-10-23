<script lang="ts" setup>
  import { OssCard } from '../components';
</script>

<template>
  <main class="page-projects container">
    <h1 class="mb-4">Projects</h1>
    <div class="row g-3">
      <div
        v-for="i in 12"
        :key="i"
        class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2"
      >
        <OssCard />
      </div>
    </div>
  </main>
</template>
