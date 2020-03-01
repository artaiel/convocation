<template>
  <div class="owned">
    <div class="owned__element">
      <label class="owned__label" :class="{'owned__label--error': $v.title.$error }">
        {{ $t('userMenu.labelTitle') }}
        <span v-if="$v.title.$error" class="owned__error-msg">- at least 3 characters</span>
      </label >
      <input class="owned__input" v-model="title" spellcheck="false"/>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        {{ $t('userMenu.labelDescription') }}
      </label >
      <textarea class="owned__input owned__input--description" v-model="description" spellcheck="false"/>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        {{ $t('userMenu.labelUrl') }}
      </label >
      <router-link class="owned__event-url" :to="{ path: routerUrl }">
        {{ eventUrl }}
      </router-link>
    </div>
    <div class="owned__element">
      <label class="owned__label" :class="{'owned__label--error': $v.webhook.$error }">
        {{ $t('userMenu.labelWebhook') }}
        <img
          src="@/assets/images/questionmark.png"
          class="owned__qm"
          v-tooltip.bottom="{
            content: $t('userMenu.webhookTooltip'),
            html: true,
            delay: 250,
            trigger: 'manual',
            show: showTooltip
          }"
          @mouseover="showTooltip = true"
          @mouseout="showTooltip = false"
          @click="showTooltip = !showTooltip"
        >
        <span v-if="$v.webhook.$error" class="owned__error-msg">{{ $t('validations.urlInvalid') }}</span>
      </label >
      <input class="owned__input" v-model="webhook" spellcheck="false" @focus="$event.target.select()"/>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        {{ $t('userMenu.labelNotificationSelection') }}
      </label >
      <label :for="`emailNotificationCheckbox-${eventIndex}`" class="owned__checkbox-icon">
        <img v-if="emailNotifications" src="@/assets/images/exit.png" alt="Icon marking email notification on attendee updates as active" class="owned__checkbox-icon-img">
      </label>
      <input type="checkbox" :id="`emailNotificationCheckbox-${eventIndex}`" v-model="emailNotifications" class="owned__checkbox-input">
    </div>
    <div class="owned__element">
      <label class="owned__label">
        {{ $t('userMenu.labelNotificationLanguage') }}
      </label >
      <div class="owned__notification-language">
        <button
          class="owned__notification-language"
          :class="{'owned__notification-language--active': notificationLanguageEn }"
          @click="changeNotificationLanguage('en')"
        >
          {{ $t('languageName', LANG_EN) }}
        </button>
        <button
          class="owned__notification-language"
          :class="{'owned__notification-language--active': notificationLanguageDe }"
          @click="changeNotificationLanguage('de')"
        >
          {{ $t('languageName', LANG_DE) }}
        </button>
        <button
          class="owned__notification-language"
          :class="{'owned__notification-language--active': notificationLanguagePl }"
          @click="changeNotificationLanguage('pl')"
        >
          {{ $t('languageName', LANG_PL) }}
        </button>
      </div>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        {{ $t('userMenu.labelAttending') }}
      </label >
      <p class="owned__attending">
        {{ attendees }}
      </p>
    </div>
    <div class="owned__controls">
      <button class="owned__button" @click="updateEvent">
        <span>{{ $t('action.update') }}</span>
      </button>
      <button class="owned__button" @click="showConfirmation">
        <span>{{ $t('action.deleteEvent') }}</span>
      </button>
    </div>
    <transition name="fade">
      <div v-if="confirmationVisible" class="confirmation">
        <div class="confirmation__text">
          {{ $t('userMenu.confirmEventDeletion') }}
        </div>
        <div class="confirmation__controls">
          <button class="confirmation__btn" @click="deleteEvent">
            {{ $t('action.confirm') }}
          </button>
          <button class="confirmation__btn" @click="hideConfirmation">
            {{ $t('action.cancel') }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { LANG_EN, LANG_DE, LANG_PL } from '@/lib/constants'
import { minLength, url, required } from 'vuelidate/lib/validators'
import apiClient from '@/lib/APIClient'

export default {
  props: {
    eventIndex: {
      type: Number,
      required: true
    }
  },
  mixins: [validationMixin],
  validations: {
    title: {
      minLength: minLength(3),
      required
    },
    webhook: {
      url
    }
  },
  data () {
    return {
      confirmationVisible: false,
      showTooltip: false,
      LANG_EN,
      LANG_DE,
      LANG_PL
    }
  },
  computed: {
    ...mapState(['userInfo']),
    attendees () {
      if (this.userInfo.eventsOwned[this.eventIndex].attendeeNames.length > 0) {
        const names = [...this.userInfo.eventsOwned[this.eventIndex].attendeeNames]
        const sortedNames = names.sort((a, b) => {
          const u1 = a.toUpperCase()
          const u2 = b.toUpperCase()
          if (u1 < u2) {
            return -1
          }
          if (u1 > u2) {
            return 1
          }
          return 0
        })
        return sortedNames.join(', ')
      }

      return '-'
    },
    eventUrl () {
      const base = process.env.NODE_ENV === 'development'
        ? `${window.location.protocol}//${window.location.host}`
        : 'https://circle-convocation.herokuapp.com'
      return `${base}/event/${this.userInfo.eventsOwned[this.eventIndex]._id}`
    },
    routerUrl () {
      return `/event/${this.userInfo.eventsOwned[this.eventIndex]._id}`
    },
    title: {
      get () {
        return this.userInfo.eventsOwned[this.eventIndex].eventName
      },
      set (val) {
        this.updateEventTitle({ eventIndex: this.eventIndex, title: val })
      }
    },
    description: {
      get () {
        return this.userInfo.eventsOwned[this.eventIndex].description
      },
      set (val) {
        this.updateEventDescription({ eventIndex: this.eventIndex, description: val })
      }
    },
    emailNotifications: {
      get () {
        return this.userInfo.eventsOwned[this.eventIndex].emailNotifications
      },
      set (val) {
        this.updateEventEmailNotifications({ eventIndex: this.eventIndex, emailNotifications: val })
      }
    },
    notificationLanguageEn () {
      return this.userInfo.eventsOwned[this.eventIndex].notificationLanguage === 'en'
    },
    notificationLanguageDe () {
      return this.userInfo.eventsOwned[this.eventIndex].notificationLanguage === 'de'
    },
    notificationLanguagePl () {
      return this.userInfo.eventsOwned[this.eventIndex].notificationLanguage === 'pl'
    },
    triggerMode () {
      return window.innerWidth > 768 ? 'hover' : 'click'
    },
    webhook: {
      get () {
        return this.userInfo.eventsOwned[this.eventIndex].webhookUrl
      },
      set (val) {
        this.updateEventWebhook({ eventIndex: this.eventIndex, webhook: val })
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateEventTitle',
      'updateEventDescription',
      'updateEventWebhook',
      'updateEventEmailNotifications',
      'toggleLoader',
      'saveUserData',
      'showPopup',
      'updateEventData',
      'setEventNotificationLanguage'
    ]),
    ...mapActions(['getUserData']),
    changeNotificationLanguage (locale) {
      this.setEventNotificationLanguage({ eventIndex: this.eventIndex, locale })
    },
    validationFailed () {
      this.$v.$touch()
      return this.$v.$error
    },
    showConfirmation () {
      this.confirmationVisible = true
    },
    hideConfirmation () {
      this.confirmationVisible = false
    },
    async updateEvent () {
      if (this.validationFailed()) {
        return
      }

      try {
        this.toggleLoader()
        const updatePayload = {
          eventId: this.userInfo.eventsOwned[this.eventIndex]._id,
          eventName: this.title,
          description: this.description,
          emailNotifications: this.emailNotifications,
          webhookUrl: this.webhook,
          notificationLanguage: this.userInfo.eventsOwned[this.eventIndex].notificationLanguage
        }
        const response = await apiClient.call('updateEventData', updatePayload)
        const responseData = await response.json()
        if (responseData.error) throw new Error (responseData.error)
        this.showPopup({ info: 'eventUpdated' })
      } catch (err) {
        this.showPopup({ info: 'errorGeneric', isError: true })
      } finally {
        this.toggleLoader()
      }
    },
    async deleteEvent () {
      try {
        this.toggleLoader()
        const response = await apiClient.call('deleteEvent', null, this.userInfo.eventsOwned[this.eventIndex]._id)
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }
        this.getUserData()
        this.showPopup({ info: 'eventDeleted' })
      } catch (err) {
        this.showPopup({ info: 'errorGeneric', isError: true })
      } finally {
        this.toggleLoader()
        this.hideConfirmation()
      }
    },
    hideTooltipOnClick () {
      this.showTooltip = false
    }
  },
  watch: {
    showTooltip (val) {
      val
        ? document.addEventListener('click', this.hideTooltipOnClick)
        : document.removeEventListener('click', this.hideTooltipOnClick)
    }
  }
}
</script>

<style lang="scss">
.owned {
  width: $body-width-sm;
  width: 100%;

  &:not(:last-child)::after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    margin: 2rem auto;
    box-shadow: 0px 8px 10px black;
  }

  &__qm {
    width: 1rem;
    margin: 0 .5rem;
    cursor: help;
  }

  &__element {
    display: flex;
    flex-flow: column;
    margin-bottom: 1rem;
    word-wrap: break-word;
  }

  &__label {
    font-weight: 600;
    font-size: $font-size-lg;
    margin-bottom: .5rem;
    transition: all .1s ease-in-out;
    display: flex;
    align-items: center;

    &--error {
      color: red;
    };
  }

  &__input {
    padding: .2rem .3rem;
    font-size: $font-size;

    &--description {
      min-height: 5rem;
      resize: none;
    }
  }

  &__checkbox-icon {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid $c-dark;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  &__checkbox-icon-img {
    width: 60%;
  }

  &__checkbox-input {
    display: none;
  }

  &__link {
    color: rgba($c-blue, .75);
    @include transition-basic;

    &:hover {
      color: $c-blue;
    }
  }

  &__controls {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  &__button {
    margin: 0 1rem;
    @include btn-reset;
    font-size: $font-size-lg;
    display: flex;
    align-items: center;


    &:hover > span {
      opacity: 1;
    }

    & > span {
      @include transition-basic;
      opacity: .6;
    }
  }

  &__notification-language {
    margin-right: 1rem;
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

.tooltip {
  .tooltip-inner {
    background: $c-dark;
    color: white;
    border-radius: $br;
    padding: 1.5rem 2rem;
    word-wrap: pre;
    max-width: 25rem;
    text-align: center;
    line-height: 1.5;
  }
  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }
  &[x-placement^="top"] {
    margin-bottom: 5px;
    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  &[x-placement^="bottom"] {
    margin-top: 5px;
    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>