<template>
  <div class="home">
    <template v-if="eventId">
      <div class="home__info">
        <div class="home__header center bold">
          {{ $t('homeSuccess') }}
        </div>
        <div class="home__details">
          <p>
            {{ $t('homeLinkInfo') }}
          </p>
        </div>
      </div>
      <div class="home__link">
        <div class="home__url">
          <p>{{ eventURL }}</p>
        </div>
        <button
          class="home__copy"
          v-clipboard:copy="eventURL"
          v-clipboard:success="handleCopySuccess"
          v-clipboard:error="handleCopyFailure"
        >
          {{ $t('action.copy') }}
        </button>
      </div>
    </template>
    <template v-else>
      <div class="home__info home__not-found">
        <div class="home__header center bold">
          {{ $t('homeNull') }}
        </div>
        <img src="@/assets/images/rat.png" alt="A drawing of a rat illustrating no found content">
      </div>
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    eventId: {
      type: String,
      default: ''
    }
  },
  computed: {
    eventURL () {
      return `${window.location.origin}/event/${this.eventId}`
    }
  },
  methods: {
    ...mapMutations(['showPopup']),
    handleCopySuccess () {
      this.showPopup({ info: 'urlCopied' })
    },
    handleCopyFailure () {
      this.showPopup({ info: 'errorGeneric', isError: true })
    }
  }
}
</script>

<style lang="scss">
.home {
  width: $body-width-sm;
  margin: 0 auto;

  @media screen and (min-width: $size-lg) {
    width: $body-width-lg;
  }

  @media screen and (min-width: $size-xxl) {
    width: $body-width-xl;
  }

  &__info {
    margin: 0 auto;
    text-align: justify;
  }

  &__header {
    font-size: $font-size-lg;
    margin-bottom: $spacer * 2;

    @media screen and (min-width: $size-md) {
      font-size: $font-size-xxl;
    }
  }

  &__details {
    font-size: $font-size;

    @media screen and (min-width: $size-md) {
      font-size: $font-size-lg;
    }

    & > p {
      margin-bottom: $spacer * 2;
    }
  }

  &__link {
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-between;
  }

  &__url {
    margin-bottom: 2rem;
    font-size: $font-size-lg;
    word-break: break-all;
    text-align: center;
  }

  &__copy {
    @include btn-reset;
    border: 1px solid $c-brown;
    padding: $spacer * .5 $spacer * 2;
    @include transition-basic;
    letter-spacing: 1px;
    font-size: $font-size-lg;

    &:hover {
      background-color: $c-brown;
      color: white;
    }
  }

  &__not-found {
    max-width: $body-width-sm;
    margin: 10rem auto 0 auto;
    display: flex;
    align-items: center;
    flex-flow: column;

    @media screen and (min-width: $size-lg) {
      max-width: $body-width-lg;
    }

    @media screen and (min-width: $size-xxl) {
      max-width: $body-width-xl;
    }

    & > img {
    @include blend-darken;
    max-width: 15rem;
    margin-top: 1.5rem;
  }
  }
}
</style>