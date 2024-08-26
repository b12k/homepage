<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';

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
      :data-bs-target="`#${OFFCANVAS_ID}`"
      class="btn btn-outline-danger"
      data-bs-toggle="offcanvas"
      type="button"
    >
      <BaseIcon icon="Hamburger" />
      Menu
    </button>
    <teleport to="body" v-if="$isMounted">
      <div :id="OFFCANVAS_ID" class="offcanvas offcanvas-end" tabindex="-1">
        <div class="offcanvas-header">
          <button class="btn-close" data-bs-dismiss="offcanvas" type="button" />
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
