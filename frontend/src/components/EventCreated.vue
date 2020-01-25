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
        <input type="text" :value="eventURL" spellcheck="false">
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
    <transition name="slide-down">
      <div v-if="popupSuccessVisible" class="home__popup">
        <p class="bold">
          {{ $t('linkCopied') }}
        </p>
      </div>
    </transition>
    <transition name="slide-down">
      <div v-if="popupFailureVisible" class="home__popup">
        <p class="bold">
          {{ $t('linkCopyingFailed') }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    eventId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      popupSuccessVisible: false,
      popupFailureVisible: false
    }
  },
  computed: {
    eventURL () {
      return 'https://circle-convocation.herokuapp.com/event/' + this.eventId
    }
  },
  methods: {
    handleCopySuccess () {
      this.popupSuccessVisible = true
      window.setTimeout(() => {
        this.popupSuccessVisible = false
      }, 1700)
    },
    handleCopyFailure () {
      this.popupFailureVisible = true
      window.setTimeout(() => {
        this.popupFailureVisible = false
      }, 1700)
    }
  }
}
</script>

<style lang="scss">
.home {
  &__link {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  &__url {
    width: 100%;
    & > input {
      border: 1px solid $c-brown;
      padding: $spacer * .5 $spacer * 1.5;
      display: flex;
      align-items: center;
      width: 100%;
      font-size: $font-size-lg;
      color: inherit;
    }
  }

  &__copy {
    @include btn-reset;
    border: 1px solid $c-brown;
    padding: $spacer * .5 $spacer * 2;
    margin-left: $spacer * 4;
    @include transition-basic;
    letter-spacing: 1px;
    font-size: $font-size-lg;

    &:hover {
      background-color: $c-brown;
      color: white;
    }
  }

  &__popup {
    margin: 0 auto;
    margin-top: $spacer * 2;
    text-align: center;

    & > p {
      margin: 0 auto;
      display: inline-block;
      font-size: $font-size-lg;
    }
  }
}
</style>