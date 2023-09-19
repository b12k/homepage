<script lang="ts" setup>
  import BaseIcon from './base-icon.vue';
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
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'about' }">
              About
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'projects' }">
              Projects
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'speaking' }">
              Speaking
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'contact' }">
              Contact
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
