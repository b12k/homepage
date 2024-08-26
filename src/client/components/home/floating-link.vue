<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import { BaseIcon } from '../base';

  const animationClass = ref<string>();

  function addAnimationClass() {
    animationClass.value = 'animate__animated animate__tada';
  }
  function handleIconMouseOver() {
    if (animationClass.value) return;
    addAnimationClass();
  }

  function handleIconAnimationEnd() {
    animationClass.value = undefined;
  }

  onMounted(() => {
    setInterval(addAnimationClass, 5000);
  });
</script>

<template>
  <div
    class="floating-link-bar w-100 d-flex justify-content-center p-4 position-absolute bottom-0"
  >
    <div
      :class="animationClass"
      @animationend="handleIconAnimationEnd"
      @mouseover="handleIconMouseOver"
      class="floating-link-bar-link"
    >
      <RouterLink
        :to="{
          name: 'about',
        }"
        class="d-flex flex-column h-100 w-100 justify-content-center text-center h1"
      >
        <BaseIcon icon="ShakaBrah" />
      </RouterLink>
    </div>
  </div>
</template>
<style lang="scss">
  .floating-link-bar {
    pointer-events: none;

    &-link {
      background-color: rgb(0 0 0 / 35%);
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      position: relative;

      --animate-duration: 1s;

      &:hover {
        border: 2px dotted #000;
      }

      a {
        text-decoration: none;
        pointer-events: all;
      }
    }
  }
</style>
