<template>
  <div class="sign-in">
    <transition name="fade">
      <div v-if="isRestorePasswordVisible" class="sign-in__restore">
        <button class="sign-in__restore-close" @click="toggleRestorePassword">
          <img
            src="@/assets/images/exit.png"
            alt="Close sign up modal window"
          >
        </button>
        <div class="sign-in__restore-title">
          {{ $t('signIn.passwordRestoreTitle') }}
        </div>
        <input v-model="restorePasswordIdentifier" type="text" class="sign-in__restore-input" placeholder="Your username or email" spellcheck="false"/>
        <button class="sign-in__restore-btn" @click="initiateForgottenPassword">
          {{ $t('signIn.passwordRestoreAction') }}
        </button>
      </div>
    </transition>
    <div class="sign-in__left">
      <img src="@/assets/images/warrior.png" alt="An armored warrior standing with a shield and spear, looking at the login form to the right">
    </div>
    <div class="sign-in__right">
      <img
        src="@/assets/images/exit.png"
        alt="Close sign up modal window"
        class="sign-in__exit"
        @click="$emit('close')"
      >
      <div class="sign-in__modes">
        <button class="sign-in__mode" :class="{ 'sign-in__mode--selected': modeSignIn }" @click="selectMode('signIn')">
          {{ $t('action.signIn') }}
        </button>
        <span class="sign-in__mode-separator">
          {{ $t('signIn.or') }}
        </span>
        <button class="sign-in__mode" :class="{ 'sign-in__mode--selected': modeSignUp }" @click="selectMode('signUp')">
          {{ $t('action.signUp') }}
        </button>
      </div>
      <div class="sign-in__form">
        <div
          class="sign-in__input"
          :class="{ 'sign-in__input--alert': $v.username.$error }"
        >
          <input
            id="username"
            v-model="username"
            type="text"
            required
            spellcheck="false"
            autocomplete="off"
          >
          <label
            for="username"
            class="event-input-label"
          >
            {{ modeSignIn ? $t('signIn.labelUsernameOrEmail') : $t('signIn.labelUsername') }}
            <span v-if="$v.username.$error">
              {{ $t('validations.usernameMin') }}
            </span>
          </label>
        </div>
        <div
          v-if="modeSignUp"
          class="sign-in__input"
          :class="{ 'sign-in__input--alert': $v.email.$error }"
        >
          <input
            id="email"
            v-model="email"
            type="text"
            required
            spellcheck="false"
            autocomplete="off"
          >
          <label
            for="email"
            class="event-input-label"
          >
            {{ $t('signIn.labelEmail') }}
            <span v-if="$v.email.$error">
              {{ $t('validations.emailInvalid') }}
            </span>
          </label>
        </div>
        <div
          class="sign-in__input"
          :class="{ 'sign-in__input--alert': $v.password.$error }"
        >
          <input
            id="password"
            v-model="password"
            type="password"
            required
            spellcheck="false"
            autocomplete="off"
          >
          <label
            for="password"
            class="event-input-label"
          >
            {{ $t('signIn.labelPassword') }}
            <span v-if="$v.password.$error">
              {{ $t('validations.passwordMin') }}
            </span>
          </label>
        </div>
        <button v-if="modeSignIn" class="sign-in__forgot-btn" @click="toggleRestorePassword">
          {{ $t('signIn.forgotPassword') }}
        </button>
        <div
          v-if="modeSignUp"
          class="sign-in__input"
          :class="{ 'sign-in__input--alert': $v.passwordRepeated.$error }"
        >
          <input
            id="passwordRepeated"
            v-model="passwordRepeated"
            type="password"
            required
            spellcheck="false"
            autocomplete="off"
          >
          <label
            for="passwordRepeated"
            class="event-input-label"
          >
            {{ $t('signIn.labelConfirmPassword') }}
            <span v-if="$v.passwordRepeated.$error">
              {{ $t('validations.passwordMismatch') }}
            </span>
          </label>
        </div>
      </div>
      <button class="main-btn" @click="handleLoginAction">
        <span>
          {{ modeSignIn ? $t('action.signIn') : $t('action.signUp') }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import apiClient from '@/lib/APIClient'
import { mapMutations } from 'vuex'
import { EventBus } from '@/lib/EventBus'

export default {
  mixins: [validationMixin],
  validations: {
    username: {
      required,
      minLength: minLength(3)
    },
    password: {
      required,
      strong: p => {
        if (p) {
          return p.length >= 5 &&
            /[0-9]/.test(p) &&
            /[A-Z]/.test(p) &&
            /[a-z]/.test(p)
        }

        return true
      }
    },
    passwordRepeated: {
      required,
      sameAsPassword: sameAs('password')
    },
    email: {
      required,
      email
    }
  },
  data () {
    return {
      username: null,
      password: null,
      passwordRepeated: null,
      email: null,
      mode: 'signIn',
      isRestorePasswordVisible: false,
      restorePasswordIdentifier: null
    }
  },
  computed: {
    modeSignIn () {
      return this.mode === 'signIn'
    },
    modeSignUp () {
      return this.mode === 'signUp'
    }
  },
  methods: {
    ...mapMutations(['toggleLoader', 'showPopup']),
    selectMode (mode) {
      this.mode = mode
      this.$v.$reset()
    },
    toggleRestorePassword () {
      this.isRestorePasswordVisible = !this.isRestorePasswordVisible
    },
    async handleLoginAction () {
      if (!this.validationFailed()) {
        const callType = this.modeSignIn ? 'login' : 'signup'
        let callPayload
        if (this.modeSignIn) {
          callPayload = {
            userIdentifier: this.username,
            password: this.password
          }
        } else {
          callPayload = {
            username: this.username,
            email: this.email,
            password: this.password,
            passwordRepeated: this.passwordRepeated
          }
        }
        this.toggleLoader()
        try {
          const response = await apiClient.call(callType, callPayload)
          const parsedResponse = await response.json()
          if (parsedResponse.error) throw new Error(parsedResponse.error)
          this.$emit('closeSignIn')
          this.showPopup({ info: 'signedIn' })
        } catch (error) {
          // console.log(error)
          this.showPopup({ info: error.message || 'errorGeneric', isError: true })
        } finally {
          this.$emit('checkIfLoggedIn')
          this.toggleLoader()
        }
        if (
          callType === 'login' &&
          this.$route.name ==='eventView'
        ) {
          EventBus.$emit('login')
        }
      }

      return
    },
    validationFailed () {
      this.$v.$touch()
      if (this.modeSignIn) {
        return this.$v.username.$error || this.$v.password.$error
      } else {
        return this.$v.$invalid
      }
    },
    async initiateForgottenPassword () {
      try {
        this.toggleLoader()
        const response = await apiClient.call('forgotPassword', { restorePasswordIdentifier: this.restorePasswordIdentifier })
        const parsedResponse = await response.json()
        if (parsedResponse.error) throw new Error(parsedResponse.error)
        this.showPopup({ info: 'passwordRestore' })
      } catch (err) {
        // console.log(err)
        this.showPopup({ info: err.message || 'errorGeneric', isError: true })
      } finally {
        this.toggleRestorePassword()
        this.toggleLoader()
      }
    },
    listenForEnter (e) {
      if (e.code === "Enter") {
        this.handleLoginAction()
      }
    }
  },
  mounted () {
    document.addEventListener('keypress', this.listenForEnter)
  },
  beforeDestroy () {
    document.removeEventListener('keypress', this.listenForEnter)
  }
}
</script>

<style lang="scss" scoped>
.sign-in {
  background-image: url('~@/assets/images/background.jpg');
  position: fixed;
  background-size: cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  width: 80vw;
  height: 80vh;

  &__left {
    display: none;

    @media screen and (min-width: $size-md) {
      display: flex;
    }
  }

  &__right {
    display: flex;
  }

  @media screen and (min-width: $size-md) {
    width: 1000px;
    height: 665px;
    background-image: url('~@/assets/images/book.png');
  }

  &__left, &__right {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-end;

    @media screen and (min-width: $size-md) {
      width: 50%;
    }
  }

  &__left > img {
    width: 80%;
    @include blend-darken;
  }

  &__right {
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: $spacer * 7;

    & > button {
      margin-top: auto;
      margin-bottom: 10%;
      font-size: $font-size-lg;

      @media screen and (min-width: $size-md) {
        margin-bottom: 20%;
        font-size: $font-size-xl;
      }
    }

    @media screen and (min-width: $size-md) {
      padding-top: $spacer * 7.5;
      padding-right: $spacer * 5;
    }
  }

  &__form {
    display: flex;
    flex-flow: column;
    width: 80%;

    & > button {
      margin-top: $spacer * 3;
    }
  }

  &__exit {
    width: $spacer * 3;
    height: $spacer * 3;
    position: absolute;
    top: $spacer * 2.5;
    right: $spacer * 2.5;
    cursor: pointer;

    @media screen and (min-width: $size-md) {
      width: $spacer * 4;
      height: $spacer * 4;
      top: $spacer * 7.5;
      right: $spacer * 7.5;
    }
  }

  &__modes {
    display: flex;
    align-items: flex-end;
    margin-bottom: $spacer * 4;
  }

  &__mode {
    @include btn-reset;
    font-size: $font-size-xl;
    border-bottom: 1px solid transparent;
    @include transition-basic;

    &--selected {
      border-bottom: 1px solid $c-blue;
    }
  }

  &__mode-separator {
    margin: 0 $spacer;
    font-size: $font-size-xl;
    border-bottom: 1px solid transparent;
  }

  &__input {
    position: relative;
    margin-bottom: $spacer * 1.5;

    @media screen and (min-width: $size-md) {
      margin-bottom: $spacer * 3;
    }

    & > label {
      font-size: $font-size-lg;
      position: absolute;
      left: 0;
      transform: translateY(-50%);
      @include transition-basic;
      cursor: text;
      display: flex;
      align-items: center;

      & > span {
        font-size: $font-size-sm;
      }
    }

    & > .event-input-label {
      top: 70%;
    }

    & > input, textarea {
      border: none;
      border-bottom: 1px solid $c-dark;
      width: 100%;
      padding: $spacer * .3 0;

      &:focus {
        border-bottom: 1px solid $c-blue;
      }

      &:focus + label,
      &:valid + label {
        font-size: $font-size-sm;
        transform: translateY(110%);
        left: 0;
      }
    }

    &--alert {
      & > input, textarea {
        transition: linear;
        animation: shake .4s;
        border-bottom: 1px solid rgb(202, 6, 6);
      }
    }
  }

  &__forgot-btn {
    @include btn-reset;
    @include transition-basic;
    margin-top: 0rem !important;
    width: fit-content;

    &:hover {
      color: $c-blue;
    }
  }

  &__restore {
    background-color: $c-light;
    box-shadow: 1px 1px 6px rgba($c-dark, .5);
    border-radius: $br;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: $c-brown;
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 2rem 4rem;
    text-align: center;
  }

  &__restore-close {
    position: absolute;
    @include btn-reset;
    width: 1.5rem;
    height: 1.5rem;
    right: 1rem;
    top: 1rem;

    & img {
      width: 100%;
      height: 100%;
    }
  }

  &__restore-title {
    font-size: $font-size-lg;
  }

  &__restore-input {
    margin: 1rem 0;
    background-color: $c-brown;
    color: $c-light;
    font-size: $font-size;
    padding: .5rem;

    &::placeholder {
      color: $c-light;
    }
  }

  &__restore-btn {
    @include btn-reset;
    @include transition-basic;
    border: 1px solid $c-brown;
    padding: .5rem;
    font-size: $font-size;

    &:hover {
      background-color: $c-brown;
      color: $c-light;
    }
  }
}
</style>
