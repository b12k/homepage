<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { onMounted, ref, watch } from 'vue';
  import BaseIcon from './base-icon.vue';

  const route = useRoute();
  const $isMounted = ref(false);
  const OFFCANVAS_ID = 'offcanvas-menu';

  onMounted(async () => {
    $isMounted.value = true;

    const { Offcanvas } = await import('bootstrap');
    watch(route, () => Offcanvas.getInstance(`#${OFFCANVAS_ID}`)?.hide());
  });
</script>

<template>
  <span class="base-offcanvas">
    <button
      class="btn btn-outline-danger"
      type="button"
      data-bs-toggle="offcanvas"
      :data-bs-target="`#${OFFCANVAS_ID}`"
    >
      <BaseIcon icon="Hamburger" />
      Menu
    </button>
    <teleport v-if="$isMounted" to="body">
      <div :id="OFFCANVAS_ID" class="offcanvas offcanvas-end" tabindex="-1">
        <div class="offcanvas-header">
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" />
        </div>
        <div class="offcanvas-body">
          <slot />
        </div>
      </div>
    </teleport>
  </span>
</template>

<style lang="scss">
  #offcanvas-menu {
    width: 250px;
  }
</style>
