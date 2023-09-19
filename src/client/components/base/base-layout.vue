<script lang="ts" setup>
  import BaseHeader from './base-header.vue';
  import BaseFooter from './base-footer.vue';

  const props = withDefaults(
    defineProps<{
      isHeaderVisible: boolean;
      isFooterVisible: boolean;
    }>(),
    {
      isFooterVisible: true,
      isHeaderVisible: true,
    },
  );
</script>

<template>
  <section class="base-layout d-flex flex-column h-100">
    <Transition
      mode="out-in"
      enter-active-class="animate__slideInDown"
      leave-active-class="animate__slideOutUp"
    >
      <BaseHeader
        v-if="props.isHeaderVisible"
        class="animate__animated animate-fastest"
      />
    </Transition>
    <slot />
    <Transition
      mode="out-in"
      enter-active-class="animate__slideInUp"
      leave-active-class="animate__slideOutDown"
    >
      <BaseFooter
        v-if="props.isFooterVisible"
        class="animate__animated animate-fastest"
      />
    </Transition>
  </section>
</template>

<style lang="scss">
  .base-layout {
    > main {
      flex: 1;
    }
  }
</style>
