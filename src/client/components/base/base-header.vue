<script lang="ts" setup>
  import BaseIcon from './base-icon.vue';
  import BaseHeaderNav, {
    type BaseHeaderNavProps,
  } from './base-header-nav.vue';

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
          <BaseIcon :icon="'DigitalBrain'" class="display-6" />
          <span
            class="d-inline-flex flex-column justify-content-center h-100 fw-bold"
          >
            Bogdan Kolesnyk
          </span>
        </RouterLink>
        <BaseHeaderNav :links="links" />
      </div>
    </nav>
  </header>
</template>
