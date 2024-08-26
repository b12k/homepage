<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  import { BaseCookieConsent, BaseLayout } from './components';

  useHead({
    link: [
      {
        href: 'https://fonts.googleapis.com',
        rel: 'preconnect',
      },
      {
        crossorigin: '',
        href: 'https://fonts.gstatic.com',
        rel: 'preconnect',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;700&family=IBM+Plex+Sans:wght@400;700&family=IBM+Plex+Serif:wght@400;700&display=swap',
        rel: 'stylesheet',
      },
    ],
    title: 'Bogdan Kolesnyk - web solution architecture and development',
  });

  const route = useRoute();
  const isHomeRoute = computed(() =>
    route.matched.some(({ name }) => name === 'home'),
  );
</script>

<template>
  <BaseLayout
    :is-footer-visible="!isHomeRoute"
    :is-header-visible="!isHomeRoute"
  >
    <RouterView v-slot="{ Component }">
      <Transition
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut"
        mode="out-in"
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
