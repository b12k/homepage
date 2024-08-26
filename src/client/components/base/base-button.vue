<template>
  <button @click="handleClick" class="btn btn-primary">Button</button>
</template>

<script lang="ts" setup>
  import { api } from '../../services';

  const handleClick = () => {
    api();
  };
</script>
