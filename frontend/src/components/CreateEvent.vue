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
    <div class="home__event-form">
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
      <div
        class="event-input"
        :class="{ 'form-alert': $v.eventEmail.$error }"
      >
        <input
          id="eventEmail"
          v-model="eventEmail"
          type="text"
          required
          spellcheck="false"
          autocomplete="off"
        >
        <label
          for="eventEmail"
          class="event-input-label"
        >
          Your e-mail
          <span v-if="$v.eventEmail.$error" class="form-error-msg">
            - a valid email required
          </span>
        </label>
      </div>
      <button class="create-event-btn" @click="handleEventCreation">
        <span>
          Create event
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

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
    },
    eventEmail: {
      required,
      email
    },
  },
  data () {
    return {
      eventName: null,
      eventDescription: null,
      eventOwner: null,
      eventEmail: null
    }
  },
  methods: {
    handleEventCreation () {
      if (this.validateFormData()) {
        this.$emit('dataSubmitted', {
          eventName: this.eventName,
          eventDescription: this.eventDescription,
          eventOwner: this.eventOwner,
          eventEmail: this.eventEmail
        })
      }
      console.log(this.validateFormData())
    },
    validateFormData () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        // this.submitStatus = 'ERROR'
        console.log('error')
        return false
      } else {
        // do your submit logic here
        // this.submitStatus = 'PENDING'
        console.log('ready to submit')
        return true
      }
    }
  }
}
</script>

<style lang="scss">
.home {
  width: $body-width;
  margin: 0 auto;

  &__info {
    width: $body-width;
    margin: 0 auto;
    text-align: justify;
  }

  &__header {
    font-size: $font-size-xxl;
    margin-bottom: $spacer * 2;
  }

  &__details {
    font-size: $font-size-lg;

    & > p {
      margin-bottom: $spacer * 2;
    }
  }

  &__event-form {
    & > .event-input {
      margin-bottom: $spacer * 4;
    }
  }
}

.event-input {
  width: 60%;
  margin: 0 auto;
  position: relative;

  & > label {
    font-size: $font-size-xl;
    position: absolute;
    left: $spacer * 1;
    transform: translateY(-50%);
    @include transition-basic;
    cursor: text;
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

.create-event-btn {
  @include btn-reset;
  display: block;
  color: white;
  background: linear-gradient(180deg, #554834 0%, rgba(164, 105, 1, 0) 493.48%, #503F23 493.48%, rgba(255, 255, 255, 0) 493.48%);
  border: 2px solid $c-brown;
  margin: 0 auto;
  padding: $spacer $spacer * 4;
  color: #FFEDCA;
  font-size: $font-size-xxl;
  @include transition-basic;
  position: relative;

  &:hover {
    color: white;
  };

  &:hover::after {
    opacity: .15;
  };

  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 50px;
    background-color: rgb(0, 0, 0);
    left: 0;
    top: 0;
    opacity: 0;
    @include transition-basic;
    z-index: 1;
  }

  & > span {
    position: relative;
    z-index: 2;
  }
}

.form-alert {
  & > input, textarea {
    transition: linear;
    animation: shake .4s;
    border: 1px solid rgb(202, 6, 6);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX($spacer * .5);
  }

  75% {
    transform: translateX(-$spacer * .5);
  }

  100% {
    transform: translateX(0);
  }
}
</style>