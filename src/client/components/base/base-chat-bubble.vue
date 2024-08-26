<template>
  <div class="base-chat-bubble p-2">
    <slot />
  </div>
</template>
<style lang="scss">
  $black: #000;
  $white: #fff;
  $shadow: rgb(0 0 0 / 20%);
  $px: 4px;
  $bubble-border:
    0 -1 * $px $white,
    0 -2 * $px $black,
    $px 0 $white,
    $px -1 * $px $black,
    2 * $px 0 $black,
    0 $px $white,
    0 2 * $px $black,
    -1 * $px 0 $white,
    -1 * $px $px $black,
    -2 * $px 0 $black,
    -1 * $px -1 * $px $black,
    $px $px $black;

  .base-chat-bubble {
    position: relative;
    display: inline-block;
    text-align: center;
    background-color: $white;
    color: $black;
    box-shadow:
      $bubble-border,
      $px 3 * $px $shadow,
      -3 * $px $px $shadow,
      -2 * $px 2 * $px $shadow;
    box-sizing: border-box;
    margin-right: 3 * $px;

    &::after {
      content: '';
      display: block;
      position: absolute;
      box-sizing: border-box;
      height: $px;
      width: $px;
      bottom: -2 * $px;
      left: 30 * $px;
      box-shadow:
        0 $px $black,
        0 2 * $px $black,
        0 3 * $px $black,
        0 4 * $px $black,
        -1 * $px 3 * $px $black,
        -2 * $px 2 * $px $black,
        -3 * $px 1 * $px $black,
        -1 * $px $px $white,
        -2 * $px $px $white,
        -1 * $px 2 * $px $white,
        -1 * $px 0 $white,
        -2 * $px 0 $white,
        -3 * $px 0 $white;
    }
  }
</style>
