<template>
  <div class="user-panel">
    <div class="user-panel__controls">
      <button class="user-panel__menu-view" :class="{'user-panel__menu-view--active': ownedSelected }" @click="selectView('owned')">
        {{ $t('userMenu.owned') }}
      </button>
      <button class="user-panel__menu-view" :class="{'user-panel__menu-view--active': attendingSelected }" @click="selectView('attending')">
        {{ $t('userMenu.attending') }}
      </button>
      <button class="user-panel__menu-view" :class="{'user-panel__menu-view--active': settingsSelected }" @click="selectView('settings')">
        {{ $t('userMenu.settings') }}
      </button>
    </div>
    <transition :name="transitionType" mode="out-in">
      <component :is="currentComponent"/>
    </transition>
  </div>
</template>

<script>
import EventsAttending from '@/components/UserPanel/EventsAttending.vue'
import EventsOwned from '@/components/UserPanel/EventsOwned.vue'
import UserSettings from '@/components/UserPanel/UserSettings.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components:{
    EventsOwned,
    EventsAttending,
    UserSettings
  },
  data () {
    return {
      currentView: 'attending',
      transitionType: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    currentComponent () {
      if (this.ownedSelected) return 'EventsOwned'
      if (this.attendingSelected) return 'EventsAttending'
      if (this.settingsSelected) return 'UserSettings'

      return null
    },
    ownedSelected () {
      return this.currentView === 'owned'
    },
    attendingSelected () {
      return this.currentView === 'attending'
    },
    settingsSelected () {
      return this.currentView === 'settings'
    }
  },
  methods: {
    ...mapMutations(['toggleLoader', 'saveUserData']),
    ...mapActions(['getUserData']),
    selectView (view) {
      const leftToRight = this.ownedSelected || (this.attendingSelected && view === 'settings')
      leftToRight
        ? this.transitionType = 'right-to-left'
        : this.transitionType = 'left-to-right'
      this.currentView = view
    }
  },
  mounted () {
    this.getUserData()
  }
}
</script>

<style lang="scss" scoped>
.user-panel {
  width: $body-width-sm;
  margin: 0 auto;
  padding-bottom: 2rem;

  @media screen and (min-width: $size-lg) {
    max-width: $body-width-lg;
  }

  @media screen and (min-width: $size-xxl) {
    max-width: $body-width-xl;
  }

  &__controls {
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
  }

  &__menu-view {
    margin: 0 1rem;
    @include transition-basic;
    @include btn-reset;
    color: rgba($c-dark, .7);
    cursor: pointer;
    font-size: inherit;
    position: relative;
    border-bottom: 2px solid transparent;

    &:hover {
      color: $c-dark;
    }

    &--active {
      color: $c-dark;
      border-bottom: 2px solid $c-brown;
    }
  }
}
</style>