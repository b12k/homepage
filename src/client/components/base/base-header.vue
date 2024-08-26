<script lang="ts" setup>
  import BaseHeaderNav, {
    type BaseHeaderNavProps,
  } from './base-header-nav.vue';
  import BaseIcon from './base-icon.vue';
  import BaseOffcanvas from './base-offcanvas.vue';

  const links: BaseHeaderNavProps['links'] = [
    {
      emoji: '👋',
      label: 'About',
      name: 'about',
    },
    {
      emoji: '🐶',
      label: 'Projects',
      name: 'projects',
    },
    {
      emoji: '📢',
      label: 'Speaking',
      name: 'speaking',
    },
    {
      emoji: '📬',
      label: 'Contact',
      name: 'contact',
    },
  ];
</script>

<template>
  <header class="base-header">
    <nav class="navbar navbar-expand-lg">
      <div class="container align-items-center">
        <RouterLink
          :to="{ name: 'home' }"
          class="navbar-brand d-flex align-items-center gap-2"
        >
          <BaseIcon class="display-6" icon="DigitalBrain" />
          <span
            class="d-inline-flex flex-column justify-content-center h-100 fw-bold full-name"
          >
            Bogdan Kolesnyk
          </span>
        </RouterLink>
        <BaseHeaderNav :links="links" class="d-none d-lg-flex" />
        <BaseOffcanvas class="d-lg-none">
          <BaseHeaderNav :links="links" />
        </BaseOffcanvas>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
  @import '../../styles/bootstrap/bootstrap';

  .base-header {
    .full-name {
      @include media-breakpoint-only('xs') {
        font-size: 1rem;
      }
    }
  }
</style>
