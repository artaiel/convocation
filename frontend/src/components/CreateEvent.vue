<template>
  <div class="home">
    <div class="home__info">
      <div class="home__header">
        {{ $t('homeHeader')[0] }}
        <span class="bold">
          {{ $t('homeHeader')[1] }}
        </span>
        {{ $t('homeHeader')[2] }}
      </div>
      <div class="home__details">
        <p>
          {{ $t('homeInfo')[0] }}
        </p>
        <p>
          {{ $t('homeInfo')[1] }}
        </p>
      </div>
    </div>
    <div v-if="userLoggedIn" class="home__event-form">
      <div
        class="event-input"
        :class="{ 'form-alert': $v.eventName.$error }"
      >
        <input
          id="eventName"
          v-model="eventName"
          type="text"
          required
          spellcheck="false"
          autocomplete="off"
          maxlength="30"
        >
        <label
          for="eventName"
          class="event-input-label"
        >
          Event title
          <span v-if="$v.eventName.$error">
            - at least 3 characters required
          </span>
        </label>
      </div>
      <div
        class="event-input"
      >
        <textarea
          id="eventDescription"
          v-model="eventDescription"
          type="text"
          required
          spellcheck="false"
          autocomplete="off"
          maxlength="250"
        />
          <label
            for="eventDescription"
            class="event-textarea-label"
          >
            Event description (optional)
          </label>
      </div>
      <div
        class="event-input"
        :class="{ 'form-alert': $v.eventOwner.$error }"
      >
        <input
          id="eventOwner"
          v-model="eventOwner"
          type="text"
          required
          spellcheck="false"
          autocomplete="off"
          maxlength="25"
        >
        <label
          for="eventOwner"
          class="event-input-label"
        >
          Your name
          <span v-if="$v.eventOwner.$error">
            - at least 2 characters required
          </span>
        </label>
      </div>
      <button class="main-btn" @click="handleEventCreation">
        <span>
          Create event
        </span>
      </button>
    </div>
    <div v-else class="home__cta">
      Sign in to create and participate in events!
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    eventName: {
      required,
      minLength: minLength(3)
    },
    eventOwner: {
      required,
      minLength: minLength(2)
    }
  },
  data () {
    return {
      eventName: null,
      eventDescription: null,
      eventOwner: null
    }
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    handleEventCreation () {
      if (this.validateFormData()) {
        this.$emit('dataSubmitted', {
          eventName: this.eventName,
          eventDescription: this.eventDescription,
          eventOwner: this.eventOwner
        })
      }
    },
    validateFormData () {
      // console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        // this.submitStatus = 'ERROR'
        // console.log('error')
        return false
      } else {
        // do your submit logic here
        // this.submitStatus = 'PENDING'
        // console.log('ready to submit')
        return true
      }
    }
  }
}
</script>

<style lang="scss">
.home {
  width: $body-width-sm;
  margin: 0 auto;

  @media screen and (min-width: $size-lg) {
    width: $body-width-lg;
  }

  @media screen and (min-width: $size-xxl) {
    width: $body-width-xl;
  }

  &__info {
    margin: 0 auto;
    text-align: justify;
  }

  &__header {
    font-size: $font-size-lg;
    margin-bottom: $spacer * 2;

    @media screen and (min-width: $size-md) {
      font-size: $font-size-xxl;
    }
  }

  &__details {
    font-size: $font-size;

    @media screen and (min-width: $size-md) {
      font-size: $font-size-lg;
    }

    & > p {
      margin-bottom: $spacer * 2;
    }
  }

  &__event-form {
    & > .event-input {
      margin-bottom: $spacer * 4;
    }
  }

  &__cta {
    text-align: center;
    margin-top: 3rem;
    font-weight: 600;
    font-size: $font-size-xl;
    padding: 0 2rem;
  }
}

.event-input {
  margin: 0 auto;
  position: relative;

  & > label {
    font-size: $font-size-lg;
    position: absolute;
    left: $spacer * 1;
    transform: translateY(-50%);
    @include transition-basic;
    cursor: text;

    @media screen and (min-width: $size-md) {
      font-size: $font-size-xl;
    }
  }

  & > .event-input-label {
    top: 50%;
  }
  & > .event-textarea-label {
    top: 20px;
  }

  & > input, textarea {
    width: 100%;
    padding: $spacer * .3 $spacer;
    font-size: $font-size-lg;

    @media screen and (min-width: $size-md) {
      font-size: $font-size-xl;
    }

    &:focus {
      border: 1px solid $c-blue;
    }

    &:focus + label,
    &:valid + label {
      font-size: $font-size-lg;
      transform: translateY(100%);
      left: 0;
    }

    &:focus + .event-textarea-label,
    &:valid + .event-textarea-label {
      font-size: $font-size-lg;
      transform: translateY($spacer * 8.5);
      left: 0;
    }
  }

  & > textarea {
    height: $spacer * 10;
    resize: none;
  }
}

.form-alert {
  & > input, textarea {
    transition: linear;
    animation: shake .4s;
    border: 1px solid rgb(202, 6, 6);
  }
}
</style>