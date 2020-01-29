<template>
  <div class="sign-in">
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
          Sign in
        </button>
        <span class="sign-in__mode-separator">
          or
        </span>
        <button class="sign-in__mode" :class="{ 'sign-in__mode--selected': modeSignUp }" @click="selectMode('signUp')">
          Sign up
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
            Username
            <span v-if="$v.username.$error">
              - min. 3 characters
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
            E-mail
            <span v-if="$v.email.$error">
              - invalid email
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
            Password
            <span v-if="$v.password.$error">
              - min. 5 characters
            </span>
          </label>
        </div>
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
            Confirm password
            <span v-if="$v.passwordRepeated.$error">
              - passwords do not match
            </span>
          </label>
        </div>
      </div>
      <button class="main-btn" @click="handleLoginAction">
        <span v-if="modeSignIn">
          Sign in
        </span>
        <span v-else>
          Sign up
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
      minLength: minLength(5)
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
      mode: 'signIn'
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
    ...mapMutations(['toggleLoader']),
    selectMode (mode) {
      this.mode = mode
      this.$v.$reset()
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
          await apiClient.call(callType, callPayload)
        } catch (err) {
          console.log(err)
        } finally {
          this.$emit('checkIfLoggedIn')
          this.toggleLoader()
          this.$emit('closeSignIn')
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
    }

    & > .event-input-label {
      top: 60%;
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
        font-size: $font-size;
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
}
</style>