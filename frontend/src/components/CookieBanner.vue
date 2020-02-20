<template>
  <div class="c-banner">
    <img src="" alt="" class="c-banner__img">
    <div class="c-banner__info">
      <div class="c-banner__title">
        {{ $t('cookieTitle') }}
      </div>
      <div class="c-banner__text">
        {{ $t('cookieInfo') }}
      </div>
      <button class="c-banner__btn" @click="acceptCookies">Ok</button>
    </div>
    <div class="c-banner__close" @click="closeCookies" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeoutId: null
    }
  },
  methods: {
    acceptCookies () {
      window.localStorage.setItem('cookieConsent', true)
      this.closeCookies()
    },
    closeCookies () {
      this.$emit('closeBanner')
    }
  }
}
</script>

<style lang="scss">
.c-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: black;
  color: $c-light;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  padding: 2.5rem 2rem 2rem 2rem;
  box-shadow: 2px 2px 8px rgba($c-dark, .4);
  z-index: 5;
  width: 100%;

  &__title {
    font-weight: 600;
    font-size: $font-size-lg;
  }

  &__info {
    display: flex;
    flex-flow: column;
  }

  &__btn {
    @include btn-reset;
    @include transition-basic;
    border: 1px solid $c-light;
    padding: .5rem 1rem;
    width: fit-content;
    align-self: center;
    margin-top: 2rem;

    &:hover {
      color: black;
      background-color: white;
    }
  }

  &__close {
    position: fixed;
    right: 1rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;

    &::before, &::after {
      content: "";
      position: absolute;
      top: 50%;
      display: block;
      width: 2rem;
      height: 1px;
      background-color: white;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}
</style>