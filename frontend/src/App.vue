<template>
  <div class="app" :class="{ 'app--darken-background': signInModalVisible }">
    <Navigation
      :userLoggedIn="userLoggedIn"
      @clickSignIn="toggleSignIn"
      @checkIfLoggedIn="checkIfLoggedIn"
    />
    <router-view/>
    <img class="hero" :src="heroImage"/>
    <transition name="fade">
      <SignIn
        v-if="signInModalVisible"
        @close="closeSignIn"
        @toggleLoading="toggleLoading"
        @closeSignIn="closeSignIn"
        @checkIfLoggedIn="checkIfLoggedIn"
      />
    </transition>
    <transition name="fade">
      <div v-if="loading" class="loader-background">
        <div class="loader"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import SignIn from '@/components/SignIn'
import { isLoggedIn } from '@/lib/auth.js'

export default {
  components: {
    Navigation,
    SignIn
  },
  data () {
    return {
      signInModalVisible: false,
      loading: false,
      userLoggedIn: false
    }
  },
  computed: {
    heroImage () {
      return require('@/assets/images/raven.png')
    }
  },
  methods: {
    toggleSignIn () {
      this.signInModalVisible = !this.signInModalVisible
    },
    closeSignIn () {
      this.signInModalVisible = false
    },
    toggleLoading () {
      this.loading = !this.loading
    },
    checkIfLoggedIn () {
      this.userLoggedIn = isLoggedIn()
    }
  },
  mounted () {
    this.checkIfLoggedIn()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Alegreya:400,700&display=swap');
@import '~@/assets/styles/main.scss';

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

  &--darken-background::after {
    content: "";
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba($c-brown, 0.95);
    top: 0;
    left: 0;
  }
}

.hero {
  @media screen and (min-width: $size-xxl) {
    display: block;
  }
  @supports (mix-blend-mode: darken) {
    height: 50vh;
    position: fixed;
    right: 0;
    bottom: 0;
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
  background-color: transparent;
  z-index: 2;
}

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.loader {
  color: $c-blue-dark;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  animation: load4 1.3s infinite linear;
}

@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
</style>
