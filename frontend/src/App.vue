<template>
  <div>
    <div class="app">
      <Navigation
        @clickSignIn="toggleSignIn"
        @checkIfLoggedIn="updateUserLoggedInState"
      />
      <router-view/>
      <img class="hero" :src="heroImage"/>
      <transition name="fade">
        <div v-if="signInModalVisible">
          <div class="sign-in-background" @click="closeSignIn" />
          <SignIn
            @close="closeSignIn"
            @toggleLoading="toggleLoading"
            @closeSignIn="closeSignIn"
            @checkIfLoggedIn="updateUserLoggedInState"
          />
        </div>
      </transition>
      <transition name="fade">
        <div v-if="isLoaderVisible" class="loader-background">
          <div class="loader"></div>
        </div>
      </transition>
      <transition name="popup-transition">
        <Popup v-if="popup.visible"/>
      </transition>
      <transition name="fade">
        <CookieBanner v-if="showCookieBanner" @closeBanner="showCookieBanner = false"/>
      </transition>
    </div>
    <div class="easter-egg">
      <div class="easter-egg__title">
        Dear QA:
      </div>
      <div class="easter-egg__text">
        <i>Why</i> would you be here.
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import SignIn from '@/components/SignIn'
import Popup from '@/components/Popup'
import CookieBanner from '@/components/CookieBanner'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    CookieBanner,
    Navigation,
    SignIn,
    Popup
  },
  data () {
    return {
      signInModalVisible: false,
      showCookieBanner: false
    }
  },
  computed: {
    ...mapState(['isLoaderVisible', 'popup']),
    heroImage () {
      return require('@/assets/images/raven.png')
    }
  },
  methods: {
    ...mapMutations(['updateUserLoggedInState', 'showPopup']),
    toggleSignIn () {
      if (window.localStorage.getItem('cookieConsent')) {
        this.signInModalVisible = !this.signInModalVisible
      } else {
        this.showCookieBanner = true
        this.showPopup({ info: 'errorNoCookieConsent', isError: true })
      }
    },
    closeSignIn () {
      this.signInModalVisible = false
    },
    toggleLoading () {
      this.loading = !this.loading
    }
  },
  mounted () {
    this.updateUserLoggedInState()
    if (!window.localStorage.getItem('cookieConsent')) {
      this.showCookieBanner = true
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Alegreya:400,700&display=swap');

.easter-egg {
  display: none;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .app {
    display: none;
  }

  .easter-egg {
    display: flex;
    flex-flow: column;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;

    &__title {
      font-size: $font-size-lg;
      margin-bottom: 1rem;
    }

    &__text {
      font-size: $font-size-lg;
    }
  }
}

.app {
  font-family: 'Alegreya', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-image: url('~@/assets/images/background.jpg');
  background-position: top left;
  padding: $spacer 0;

  @media screen and (min-width: $size-sm) {
    padding: $spacer * 3 0;
  }
}

.sign-in-background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba($c-brown, 0.95);
  top: 0;
  left: 0;
}

.hero {
  @media screen and (min-width: $size-xxl) {
    display: block;
  }
  @supports (mix-blend-mode: darken) {
    height: 40vh;
    position: fixed;
    right: 5rem;
    bottom: 1rem;
    @include blend-darken;
  }
  display: none;
}

.loader-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 2;
  backdrop-filter: blur(3px);
  transition: all .4s ease-in-out;
}

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  color: $c-blue-dark;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  animation: loading 1.3s infinite linear;
}
</style>
