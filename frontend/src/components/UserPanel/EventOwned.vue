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
        <span v-if="$v.webhook.$error" class="owned__error-msg">- at least 3 characters</span>
      </label >
      <input class="owned__input" v-model="webhook" spellcheck="false"/>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        URL
      </label >
      <p class="owned__event-url">
        {{ eventUrl }}
      </p>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        Email notification on user updates
      </label >
      <p class="owned__event-url">
        {{ eventUrl }}
      </p>
    </div>
    <div class="owned__element">
      <label class="owned__label">
        Attending
      </label >
      <p class="owned__attending">
        {{ attendees }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { minLength, url } from 'vuelidate/lib/validators'
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
      minLength: minLength(3)
    },
    webhook: {
      url
    }
  },
  data () {
    return {
      password: '',
      passwordRepeated: '',
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

      return ''
    },
    eventUrl () {
      const base = process.env.NODE_ENV === 'development'
        ? 'https://circle-convocation.herokuapp.com'
        : `${window.location.protocol}//${window.location.host}`
      return `${base}/event/${this.userInfo.eventsOwned[this.eventIndex]._id}`
    },
    title: {
      get () {
        return this.userInfo.eventsOwned[this.eventIndex].eventName
      },
      set (val) {
        this.updateEventTitle(val)
      }
    },
    description: {
      get () {
        return this.userInfo.eventsOwned[this.eventIndex].description
      },
      set (val) {
        this.updateEventDescription(val)
      }
    },
    webhook: {
      get () {
        return this.userInfo.eventsOwned[this.eventIndex].webhookUrl || ''
      },
      set (val) {
        this.updateEventWebhook(val)
      }
    }
  },
  methods: {
    ...mapMutations(['updateEventTitle', 'updateEventDescription', 'updateEventWebhook']),
    updateData () {
      if (this.validationFailed()) {
        return
      }

      try {
        const updatePayload = {
          username: this.username,
          email: this.email,
          password: this.password
        }
        apiClient.call('updateUserData', updatePayload)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteUser () {
      this.toggleLoader()
      try {
        await apiClient.call('deleteUser')
        this.hideConfirmation()
        this.$router.push({ path: '/' })
        this.toggleLoader()
      } catch (err) {
        console.log(err)
        this.toggleLoader()
      }
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
    margin: 2rem auto;
  }

  &__qm {
    width: 1rem;
    margin-left: .5rem;
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
    margin-top: 3rem;
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
</style>