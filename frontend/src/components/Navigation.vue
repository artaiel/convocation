<template>
  <div class="nav">
    <a href="/" class="nav__logo">
      <div class="nav__logo-icon">
        <img src="@/assets/images/logo.png" alt="Convocation logo">
      </div>
      <div class="nav__logo-name">
        Convocation
      </div>
    </a>
    <div class="nav__links">
      <router-link to="/" class="nav__links-item">Create event</router-link>
      <router-link v-if="loggedIn" to="/my-events" class="nav__links-item">Your events</router-link>
      <div
        class="nav__languages"
        @mouseleave="languageHovered = false"
      >
        <button
          class="nav__links-item"
          @mouseover="languageHovered = true"
          @click="languageHovered = !languageHovered"
        >
          {{ $t('languageName') }}
        </button>
        <transition name="slide-down">
          <div v-if="languageHovered" class="nav__languages-dropdown">
            <button
              v-for="languageCode in languageSelection"
              :key="`lang-${languageCode}`"
              class="nav__links-item"
              @click="changeLocale(languageCode)"
            >
              {{ $t('languageName', languageCode) }}
            </button>
          </div>
        </transition>
      </div>
      <router-link to="/donate" class="nav__links-item">Donate</router-link>
      <button v-if="!loggedIn" class="nav__links-item">Sign in</button>
      <button v-if="loggedIn" class="nav__links-item">Log out</button>
    </div>
  </div>
</template>

<script>
import { languages } from '@/lib/constants'

export default {
  data () {
    return {
      languageHovered: false,
      loggedIn: true,
      languages
    }
  },
  computed: {
    languageSelection () {
      return this.languages.filter(lang => lang !== this.$i18n.locale)
    }
  },
  methods: {
    changeLocale (locale) {
      this.$i18n.locale = locale
      this.languageHovered = false
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  width: $nav-width;
  margin: 0 auto;
  margin-bottom: $spacer * 10;

  &__logo {
    display: flex;
  }

  &__logo-icon {
    width: 40px;
    height: 40px;
    margin-right: $spacer * 2;

    & > img {
      width: 100%;
      height: 100%;
      @include blend-hard-light;
      -webkit-backface-visibility: hidden;
      transition: all .21s ease-in-out;
    }
  }

  &__logo-name {
    font-size: $font-size-xxl;
    display: flex;
    align-items: center;
  }

  &__links {
    display: flex;
    align-items: center;
  }

  &__links-item {
    margin-left: $spacer * 2;
    font-size: $font-size-lg;
    @include btn-reset;
    @include transition-basic;

    &:hover {
      color: black;
       text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  &__languages {
    position: relative;
  }

  &__languages-dropdown {
    position: absolute;
    display: flex;
    flex-flow: column;
    padding-top: $spacer * .5;

    & > * {
      text-align: left;
    }
  }
}


.slide-down {
  @media screen and (min-width: $size-sm) {
    &-enter-active {
      transition: all 0.21s ease-in-out;
    }
    &-leave-active {
      transition: all 0.21s ease-in-out;
    }
    &-enter,
    &-leave-to {
      transform: translateY(-10px);
      opacity: 0;
    }
  }
}
</style>