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
        <input type="text" :value="url" spellcheck="false">
      </div>
      <button
        class="home__copy"
        v-clipboard:copy="url"
        v-clipboard:success="handleCopySuccess"
        v-clipboard:error="handleCopyFailure"
      >
        {{ $t('copy') }}
      </button>
    </div>
    <div v-if="popupVisible" class="popup">
      {{ $t('linkCopied') }}
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      url: 'https://www.convocation.herokuapp.com/id/aiganstmdffycvs',
    }
  },
  methods: {
    handleCopySuccess () {
      console.log('ok')
    },
    handleCopyFailure () {
      console.log('not ok')
    }
  }
}
</script>

<style lang="scss">
.home {
  &__link {
    width: $body-width;
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
}
</style>