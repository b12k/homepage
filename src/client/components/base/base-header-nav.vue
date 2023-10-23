<script lang="ts" setup>
  export interface BaseHeaderNavProps {
    links: Array<{
      name: string;
      emoji: string;
      label: string;
    }>;
  }

  const props = defineProps<BaseHeaderNavProps>();
</script>
<template>
  <ul class="base-header-nav navbar-nav gap-2">
    <li v-for="link in props.links" :key="link.name" class="nav-item">
      <RouterLink
        class="nav-link text-black px-0 d-block d-lg-inline-block text-center pe-2 pe-lg-1"
        :to="{ name: link.name }"
      >
        {{ link.emoji }} {{ link.label }}
      </RouterLink>
    </li>
  </ul>
</template>
<style lang="scss">
  .base-header-nav {
    .nav-link {
      display: inline-block;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #da291c;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
      }

      &.router-link-active::after,
      &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
  }
</style>
