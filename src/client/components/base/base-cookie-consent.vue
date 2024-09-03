<script lang="ts" setup>
  import JsCookie from 'js-cookie';
  import { nextTick, onMounted, onUnmounted, ref } from 'vue';

  import { wait } from '../../utils';
  import BaseChatBubble from './base-chat-bubble.vue';

  const isCookieConsentAccepted = ref(false);
  const canShowCookieConsent = ref(false);
  const canShowChatBubble = ref(false);
  const canShowImage = ref(false);

  const consentCookieName = 'cookies_accepted';
  const animationDuration = 500;

  const showImageAndChatBubble = async () => {
    canShowImage.value = true;
    await wait(animationDuration);
    canShowChatBubble.value = true;
  };

  const hideChatBubbleAndImage = async () => {
    canShowChatBubble.value = false;
    await wait(animationDuration);
    canShowImage.value = false;
  };

  const acceptCookieConsent = () => {
    JsCookie.set(consentCookieName, 'true', {
      sameSite: 'lax',
    });
    hideChatBubbleAndImage();
  };

  const handleMouseMove = async () => {
    canShowCookieConsent.value = true;
    await nextTick();
    await showImageAndChatBubble();
    window.removeEventListener('mousemove', handleMouseMove);
  };

  onMounted(async () => {
    isCookieConsentAccepted.value = JsCookie.get(consentCookieName) === 'true';

    if (isCookieConsentAccepted.value) return;

    window.addEventListener('mousemove', handleMouseMove);
  });

  onUnmounted(() => window.removeEventListener('mousemove', handleMouseMove));
</script>
<template>
  <div
    class="base-cookie-consent position-fixed bottom-0 end-0 d-flex flex-column align-items-end"
    v-if="canShowCookieConsent"
  >
    <Transition
      enter-active-class="animate__bounceIn"
      leave-active-class="animate__bounceOut"
    >
      <BaseChatBubble class="animate__animated" v-if="canShowChatBubble">
        <h4>🍪 I love Cookies!</h4>
        <p>
          This website uses them.
          <br />
          <RouterLink :to="{ name: 'cookie-consent' }">
            Read here how...
          </RouterLink>
        </p>
        <div class="d-flex gap-1 overflow-hidden">
          <button
            @click="hideChatBubbleAndImage"
            class="btn btn-sm btn-light flex-grow-1"
          >
            Close
          </button>
          <button
            @click="acceptCookieConsent"
            class="btn btn-sm btn-success flex-grow-1"
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
        alt="Cookies!"
        class="animate__animated animate__faster"
        height="180"
        ref="$img"
        src="../../assets/images/cookies_bear.png"
        v-if="canShowImage"
        width="180"
      />
    </Transition>
  </div>
</template>
<style lang="scss">
  .base-cookie-consent {
    img {
      filter: drop-shadow(-3px -3px 5px #333);
      z-index: 10000;
    }

    .base-chat-bubble {
      z-index: 10001;
    }
  }
</style>
