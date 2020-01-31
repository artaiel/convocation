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
    <transition name="sidebar-transition">
      <div v-if="sidebarDisplayed" class="sidebar">
        <img class="sidebar__icon" :src="require('@/assets/images/pen.png')"  @click="toggleSidebar" alt="Button toggling navigation menu">
        <ul class="sidebar__list">
          <li @click="toggleSidebar" class="sidebar__item">
            <router-link to="/">Create event</router-link>
          </li>
          <li @click="toggleSidebar" v-if="userLoggedIn" class="sidebar__item">
            <router-link to="/my-events">Your events</router-link>
          </li>
          <li @click="toggleSidebar" class="sidebar__item">
            <router-link to="/donate">Donate</router-link>
          </li>
          <li @click="toggleSidebar" class="sidebar__item">
            <router-link to="/event/5e32069e1c9d440000cb867a">ex event</router-link>
          </li>
          <li @click="toggleSidebar" class="sidebar__item">
            <button v-if="!userLoggedIn" class="sidebar__button" @click="$emit('clickSignIn')">Sign in</button>
          </li>
          <li @click="toggleSidebar" class="sidebar__item">
            <button v-if="userLoggedIn" class="sidebar__button" @click="logOut">Log out</button>
          </li>
        </ul>
        <ul class="sidebar__list sidebar__languages">
          <li v-for="languageCode in languageSelection" :key="`${languageCode}-mobile`" @click="chooseLanguageMobile(languageCode)">
            {{ $t('languageName', languageCode) }}
          </li>
        </ul>
      </div>
    </transition>
    <div class="nav__desktop">
      <div class="nav__links">
        <router-link to="/" class="nav__links-item">Create event</router-link>
        <router-link v-if="userLoggedIn" to="/my-events" class="nav__links-item">Your events</router-link>
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
        <!-- <router-link to="/donate" class="nav__links-item">Donate</router-link> -->
        <router-link to="/event/5e32069e1c9d440000cb867a" class="nav__links-item">exevent</router-link>
        <button v-if="!userLoggedIn" class="nav__links-item" @click="$emit('clickSignIn')">Sign in</button>
        <button v-if="userLoggedIn" class="nav__links-item" @click="logOut">Log out</button>
      </div>
    </div>
    <div class="nav__mobile" @click="toggleSidebar">
      <img
        class="nav__mobile-icon"
        :src="require('@/assets/images/pen.png')" alt="">
    </div>
  </div>
</template>

<script>
import apiClient from '@/lib/APIClient'
import { languages } from '@/lib/constants'
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      languageHovered: false,
      languages,
      sidebarDisplayed: false
    }
  },
  computed: {
    ...mapState(['userLoggedIn']),
    languageSelection () {
      return this.languages.filter(lang => lang !== this.$i18n.locale)
    }
  },
  methods: {
    ...mapMutations(['toggleLoader', 'clearUserData']),
    changeLocale (locale) {
      this.$i18n.locale = locale
      this.languageHovered = false
    },
    toggleSidebar () {
      this.sidebarDisplayed = !this.sidebarDisplayed
    },
    chooseLanguageMobile (languageCode) {
      this.changeLocale(languageCode)
      this.toggleSidebar()
    },
    async logOut () {
      this.toggleLoader()
      try {
        await apiClient.call('logout')
      } catch (err) {
        console.error(err)
      } finally {
        this.clearUserData()
        this.toggleLoader()
        this.$emit('checkIfLoggedIn')
        if (this.$route.path !== '/') this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  width: $body-width-sm;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: $spacer * 2;

  @media screen and (min-width: $size-md) {
    margin-bottom: $spacer * 10;
  }

  @media screen and (min-width: $size-lg) {
    width: $body-width-lg;
  }

  &__desktop {
    display: none;

    @media screen and (min-width: $size-md) {
      display: flex;
    }
  }

  &__mobile {
    display: flex;
    align-items: center;

    @media screen and (min-width: $size-md) {
      display: none;
    }
  }

  &__mobile-icon {
    width: $spacer * 5;
    height: $spacer * 5;
    mix-blend-mode: hard-light;
    filter: drop-shadow(2px 2px 5px black);
    cursor: pointer;
  }


  &__logo {
    display: flex;
    align-items: center;
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

.sidebar {
  min-height: 100vh;
  width: 100vw;
  background-color: $c-brown;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 3;
  padding-top: $spacer * 5;

  @media screen and (min-width: $size-md) {
    display: none;
  }

  &__icon {
    position: fixed;
    width: $spacer * 5;
    height: $spacer * 5;
    cursor: pointer;
    right: 2%;
    top: $spacer;
  }

  &__list {
    list-style: none;
    color: $c-light;
    font-size: $font-size-xl;
    padding: 2rem 0;
    text-align: center;
  }

  &__item {
    & > a {
      padding: $spacer $spacer * 3;
      display: block;
      width: 100%;
    }
  }

  &__button {
    @include btn-reset;
    font-size: inherit;
    padding: $spacer $spacer * 3;
    width: 100%;
    text-align: center;
  }

  &__languages {
    position: relative;

    &::before {
      content: "";
      width: 15%;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      height: 1px;
      background-color: wheat;
      position: absolute;
    }

    & > li {
      padding: $spacer $spacer * 3;
      display: block;
      width: 100%;
    }
  }
}

.sidebar-transition {
  &-enter-active {
    transition: all 0.3s ease-in-out;
  }
  &-leave-active {
    transition: all 0.3s ease-in-out;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>