<template>
  <div class="app">
    <Navigation @clickSignIn="toggleSignIn"/>
    <router-view/>
    <img class="hero" :src="heroImage"/>
    <transition name="fade">
      <SignIn v-if="signInModalVisible" @close="closeSignIn"/>
    </transition>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import SignIn from '@/components/SignIn'

export default {
  components: {
    Navigation,
    SignIn
  },
  data () {
    return {
      signInModalVisible: false
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
    }
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
  background-repeat: no-repeat;
  background-size: 105%;
  background-position: center;
  padding-top: $spacer * 3;
}

.hero {
  @supports (mix-blend-mode: darken) {
    height: 50vh;
    position: fixed;
    right: 0;
    bottom: 0;
    @include blend-darken;
    display: block;
  }
  display: none;
}
</style>
