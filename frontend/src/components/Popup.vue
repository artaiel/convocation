<template>
  <div class="popup">
    <svg
      v-if="popup.isError"
      class="popup__icon"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="red"/>
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      class="popup__icon"
    >
      <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/>
      <path
        d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        fill="rgb(4, 71, 148)"
      />
    </svg>
    <p class="popup__text">
      {{ $t(`popupInfo.${popup.info}`) }}
    </p>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      timeoutId: null
    }
  },
  computed: {
    ...mapState(['popup'])
  },
  methods: {
    ...mapMutations(['hidePopup'])
  },
  watch: {
    popup: {
      handler () {
        window.clearTimeout(this.timeoutId)
        this.timeoutId = window.setTimeout(this.hidePopup, 2500)
      },
      deep: true
    }
  },
  mounted () {
    this.timeoutId = window.setTimeout(this.hidePopup, 2500)
  }
}
</script>

<style lang="scss">
.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(white, .9);
  top: 4rem;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  color: $c-dark;
  padding: 1rem 2rem;
  border-radius: $br;
  box-shadow: 2px 2px 8px rgba($c-dark, .4);
  max-width: 90vw;
  z-index: 5;

  &__icon {
    margin-right: 1rem;
  }

  &__text {
    width: max-content;
  }
}
</style>