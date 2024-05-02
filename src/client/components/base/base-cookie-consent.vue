<script lang="ts" setup>
  import { nextTick, onMounted, ref } from 'vue';
  import JsCookie from 'js-cookie';
  import BaseChatBubble from './base-chat-bubble.vue';
  import { wait } from '../../utils';

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

  onMounted(async () => {
    isCookieConsentAccepted.value = JsCookie.get(consentCookieName) === 'true';

    if (isCookieConsentAccepted.value) return;

    canShowCookieConsent.value = true;

    await nextTick();

    await showImageAndChatBubble();
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
      <BaseChatBubble v-if="canShowChatBubble" class="animate__animated">
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
            @click="hideChatBubbleAndImage"
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
