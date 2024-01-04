<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { BaseLayout, BaseCookieConsent } from './components';

  useHead({
    title: 'Bogdan Kolesnyk - web solution architecture and development',
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: '',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;700&family=IBM+Plex+Sans:wght@400;700&family=IBM+Plex+Serif:wght@400;700&display=swap',
      },
    ],
  });

  const route = useRoute();
  const isHomeRoute = computed(() =>
    route.matched.some(({ name }) => name === 'home'),
  );
</script>

<template>
  <BaseLayout
    :is-header-visible="!isHomeRoute"
    :is-footer-visible="!isHomeRoute"
  >
    <RouterView v-slot="{ Component }">
      <Transition
        mode="out-in"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
      >
        <component
          :is="Component"
          class="page animate__animated animate-fastest"
        />
      </Transition>
    </RouterView>
  </BaseLayout>
  <BaseCookieConsent />
</template>
