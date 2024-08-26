<script lang="ts" setup>
  import BaseFooter from './base-footer.vue';
  import BaseHeader from './base-header.vue';

  const props = withDefaults(
    defineProps<{
      isFooterVisible: boolean;
      isHeaderVisible: boolean;
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
      enter-active-class="animate__slideInDown"
      leave-active-class="animate__slideOutUp"
      mode="out-in"
    >
      <BaseHeader
        class="animate__animated animate-fastest"
        v-if="props.isHeaderVisible"
      />
    </Transition>
    <slot />
    <Transition
      enter-active-class="animate__slideInUp"
      leave-active-class="animate__slideOutDown"
      mode="out-in"
    >
      <BaseFooter
        class="animate__animated animate-fastest"
        v-if="props.isFooterVisible"
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
