<template>
  <main class="page-home">
    <CharsMatrix />
    <FloatingLink />
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { CharsMatrix, FloatingLink } from '../components';
  export default defineComponent({
    components: {
      CharsMatrix,
      FloatingLink,
    },
  });
</script>
