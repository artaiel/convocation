<template>
  <div class="popup">
    <img v-if="popup.isError" src="@/assets/images/error.svg" alt="" class="popup__icon">
    <img v-else src="@/assets/images/checkmark.svg" alt="" class="popup__icon">
    <p class="popup__text">
      {{ $t(`popupInfo.${popup.info}`) }}
    </p>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['popup'])
  },
  methods: {
    ...mapMutations(['hidePopup'])
  },
  mounted () {
    window.setTimeout(this.hidePopup, 3000);
  }
}
</script>

<style lang="scss">
.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(white, .8);
  top: 4rem;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  color: $c-dark;
  padding: 1rem 2rem;
  border-radius: $br;
  box-shadow: 2px 2px 8px rgba($c-dark, .4);
  max-width: 90vw;

  &__icon {
    margin-right: 1rem;
  }

  &__text {
    width: max-content;
  }
}
</style>