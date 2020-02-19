<template>
  <div class="home">
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
        {{ $t('copy') }}
      </button>
    </div>
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
}
</style>