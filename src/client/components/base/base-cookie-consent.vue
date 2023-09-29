<script lang="ts" setup>
  import { nextTick, onMounted, ref } from 'vue';
  import type { CookiesStatic } from 'js-cookie';
  import BaseChatBubble from './base-chat-bubble.vue';

  const isCookieConsentAccepted = ref(false);
  const canShowCookieConsent = ref(false);
  const canShowChatBubble = ref(false);
  const canShowImage = ref(false);

  let Cookies: CookiesStatic | undefined;
  const consentCookieName = 'cookies_accepted';

  const handleImageAnimationEnd = () => {
    canShowChatBubble.value = canShowImage.value;
    canShowCookieConsent.value = canShowImage.value;
  };

  const handleChatBubbleAnimationEnd = () => {
    canShowImage.value = canShowChatBubble.value;
  };
  const acceptCookieConsent = () => {
    Cookies?.set(consentCookieName, 'true', {
      sameSite: 'lax',
    });
    canShowChatBubble.value = false;
  };

  const closeCookieBanner = async () => {
    canShowChatBubble.value = false;
  };

  onMounted(async () => {
    const { default: JsCookies } = await import('js-cookie');

    isCookieConsentAccepted.value = JsCookies.get(consentCookieName) === 'true';

    if (isCookieConsentAccepted.value) return;

    Cookies = JsCookies;

    canShowCookieConsent.value = true;

    await nextTick();

    canShowImage.value = true;
  });
</script>
<template>
  <div
    v-if="canShowCookieConsent"
    class="base-cookie-consent position-fixed bottom-0 end-0 d-flex flex-column align-items-end"
  >
    <Transition
      enter-active-class="animate__bounceIn"
      leave-active-class="animate__bounceOut"
    >
      <BaseChatBubble
        v-if="canShowChatBubble"
        class="animate__animated"
        @animationend="handleChatBubbleAnimationEnd"
      >
        <h4>🍪 Cookies!</h4>
        <p>
          This website uses them.
          <br />
          <RouterLink :to="{ name: 'cookie-consent' }">
            Read here how...
          </RouterLink>
        </p>
        <div class="d-flex gap-1 overflow-hidden">
          <button
            class="btn btn-sm btn-light flex-grow-1"
            @click="closeCookieBanner"
          >
            Close
          </button>
          <button
            class="btn btn-sm btn-success flex-grow-1"
            @click="acceptCookieConsent"
          >
            I'm OK with it
          </button>
        </div>
      </BaseChatBubble>
    </Transition>
    <Transition
      enter-active-class="animate__slideInUp"
      leave-active-class="animate__slideOutDown"
    >
      <img
        v-if="canShowImage"
        ref="$img"
        class="animate__animated animate__faster"
        width="180"
        height="180"
        src="../../assets/images/cookies_bear.png"
        alt="Cookies!"
        @animationend="handleImageAnimationEnd"
      />
    </Transition>
  </div>
</template>
