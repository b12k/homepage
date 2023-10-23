<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref, computed } from 'vue';
  import { useCharMatrixStore, useContextStore } from '../../store';

  const charMatrixStore = useCharMatrixStore();
  const contextStore = useContextStore();
  const $element = ref<HTMLElement>();
  const isLandscape = ref(contextStore.device.type === 'desktop');

  const rowsOfChars = computed(() => {
    if (isLandscape.value) return charMatrixStore.rowsOfChars;
    return [
      ...charMatrixStore.placeholderRowsOfChars,
      ...charMatrixStore.rowsOfChars,
      ...charMatrixStore.placeholderRowsOfChars,
    ];
  });

  let intervalId: ReturnType<typeof setInterval> | undefined;

  async function checkOrientation() {
    if (!$element.value) return;

    const { height, width } = $element.value.getBoundingClientRect();
    isLandscape.value = width > height;
  }

  onMounted(() => {
    intervalId = setInterval(charMatrixStore.reBuildRowsOfChars, 3000);

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
  });

  onBeforeUnmount(() => {
    clearInterval(intervalId);
    window.removeEventListener('resize', checkOrientation);
  });
</script>
<template>
  <section
    ref="$element"
    class="chars-matrix container-fluid d-flex flex-column justify-content-around"
    :class="{
      'is-landscape': isLandscape,
    }"
  >
    <div
      v-for="(rows, rowIdx) in rowsOfChars"
      :key="rowIdx"
      class="font-monospace row fw-lighter text-white-50 g-0"
    >
      <div
        v-for="({ char, isBit }, charIdx) in rows"
        :key="`${rowIdx}-${charIdx}`"
        class="chars-matrix-char col text-center"
        :class="{
          'fw-bold text-white': !isBit,
        }"
      >
        <Transition
          mode="out-in"
          enter-active-class="animate__fadeIn"
          leave-active-class="animate__fadeOut fw-lighter"
        >
          <span :key="char" class="animate__animated animate__slow">
            {{ char }}
          </span>
        </Transition>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
  .chars-matrix {
    background-color: #da291c;
    min-height: 100svh;
    font-size: 3vh;
    opacity: 1;

    &.is-landscape {
      font-size: 8vh;
    }

    &-char:hover {
      opacity: 0.25;
      cursor: default;
      transition: opacity 0.3s;
    }
  }
</style>
