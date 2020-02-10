<template>
  <div class="owned">
    <div class="owned__element">
      <label class="owned__label" :class="{'owned__label--error': $v.title.$error }">
        Title
        <span v-if="$v.title.$error" class="owned__error-msg">- at least 3 characters</span>
      </label >
      <input class="owned__input" v-model="title" spellcheck="false"/>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        Description
      </label >
      <textarea class="owned__input owned__input--description" v-model="description" spellcheck="false"/>
    </div>
    <div class="owned__element">
      <label class="owned__label" :class="{'owned__label--error': $v.webhook.$error }">
        Webhook
        <img
          src="@/assets/images/questionmark.png"
          class="owned__qm"
        >
        <span v-if="$v.webhook.$error" class="owned__error-msg">- must be a valid URL</span>
      </label >
      <input class="owned__input" v-model="webhook" spellcheck="false"/>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        URL
      </label >
      <router-link class="owned__event-url" :to="{ path: routerUrl }">
        {{ eventUrl }}
      </router-link>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        Email notification on user updates
      </label >
      <label :for="`emailNotificationCheckbox-${eventIndex}`" class="owned__checkbox-icon">
        <img v-if="emailNotifications" src="@/assets/images/exit.png" alt="Icon marking email notification on attendee updates as active" class="owned__checkbox-icon-img">
      </label>
      <input type="checkbox" :id="`emailNotificationCheckbox-${eventIndex}`" v-model="emailNotifications" class="owned__checkbox-input">
    </div>
    <div class="owned__element">
      <label class="owned__label">
        Attending
      </label >
      <p class="owned__attending">
        {{ attendees }}
      </p>
    </div>
    <div class="owned__controls">
      <button class="owned__button" @click="updateEvent">
        <span>Update</span>
      </button>
      <button class="owned__button" @click="showConfirmation">
        <span>Delete event</span>
      </button>
    </div>
    <transition name="fade">
      <div v-if="confirmationVisible" class="confirmation">
        <div class="confirmation__text">
          Are you sure you want to delete this event?
        </div>
        <div class="confirmation__controls">
          <button class="confirmation__btn" @click="deleteEvent">
            Confirm
          </button>
          <button class="confirmation__btn" @click="hideConfirmation">
            Cancel
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
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
      confirmationVisible: false
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
      'updateEventData'
    ]),
    ...mapActions(['getUserData']),
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
          webhookUrl: this.webhook
        }
        const response = await apiClient.call('updateEventData', updatePayload)
        const responseData = await response.json()
        if (responseData.msg) throw new Error ('no update')
      } catch (err) {
        console.log(err)
      } finally {
        this.toggleLoader()
      }
    },
    async deleteEvent () {
      try {
        this.toggleLoader()
        const response = await apiClient.call('deleteEvent', null, this.userInfo.eventsOwned[this.eventIndex]._id)
        const responseData = await response.json()
        console.log(responseData)
        this.getUserData()
      } catch (err) {
        console.log(err)
      } finally {
        this.toggleLoader()
        this.hideConfirmation()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.owned {
  width: $body-width-sm;
  width: 100%;

  &::after {
    content: "";
    display: block;
    width: 15%;
    height: 2px;
    background-color: $c-dark;
    margin: 3rem auto 2rem auto;
  }

  &__qm {
    width: 1rem;
    margin: 0 .5rem;
  }

  &__element {
    display: flex;
    flex-flow: column;
    margin-bottom: 1rem;
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
    margin-top: 2rem;
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
}

.confirmation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $c-dark;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  padding: 2rem;

  &__text {
    text-align: center;
    padding: 0 2rem;
  }

  &__controls {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  &__btn {
    @include btn-reset;
    @include transition-basic;
    margin: 0 1rem;
    font-size: inherit;
    color:rgba(white, .75);

    &:hover {
      color: white;
    }
  }
}
</style>