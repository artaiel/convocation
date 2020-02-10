<template>
  <div class="settings">
    <div class="settings__element">
      <label class="settings__label" :class="{'settings__label--error': $v.username.$error }">
        Username
        <span v-if="$v.username.$error" class="settings__error-msg">- at least 3 characters</span>
      </label >
      <input class="settings__input" v-model="username" spellcheck="false"/>
    </div>
    <div class="settings__element">
      <label class="settings__label" :class="{'settings__label--error': $v.email.$error }">
        Email
        <span v-if="$v.email.$error" class="settings__error-msg">- has to be a valid email address</span>
      </label >
      <input class="settings__input" v-model="email" spellcheck="false"/>
    </div>
    <div class="settings__element">
      <label class="settings__label" :class="{'settings__label--error': $v.password.$error }">
        New password
        <span v-if="$v.password.$error" class="settings__error-msg">- min. 5 chars, including capital and lowercase letters and a number</span>
      </label >
      <input class="settings__input" v-model="password" spellcheck="false" type="password"/>
    </div>
    <div class="settings__element">
      <label class="settings__label" :class="{'settings__label--error': $v.passwordRepeated.$error }">
        Repeat password
        <span v-if="$v.passwordRepeated.$error" class="settings__error-msg">- passwords do not match</span>
      </label >
      <input class="settings__input" v-model="passwordRepeated" spellcheck="false" type="password"/>
    </div>
    <div class="settings__controls">
      <button class="settings__button" @click="updateData">
        <span>Update</span>
      </button>
      <button class="settings__button" @click="showConfirmation">
        <span>Delete account</span>
      </button>
    </div>
    <transition name="fade">
      <div v-if="confirmationVisible" class="confirmation">
        <div class="confirmation__text">
          Are you certain? This will also delete any existing owned events.
        </div>
        <div class="confirmation__controls">
          <button class="confirmation__btn" @click="deleteUser">
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
import { mapMutations, mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { minLength, email, sameAs } from 'vuelidate/lib/validators'
import apiClient from '@/lib/APIClient'

export default {
  mixins: [validationMixin],
  validations: {
    username: {
      minLength: minLength(3)
    },
    email: {
      email
    },
    password: {
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
      sameAsPassword: sameAs('password')
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
    username: {
      get () {
        return this.userInfo.userData.username
      },
      set (val) {
        this.updateUsername(val)
      }
    },
    email: {
      get () {
        return this.userInfo.userData.email
      },
      set (val) {
        this.updateEmail(val)
      }
    }
  },
  methods: {
    ...mapMutations(['updateUsername', 'updateEmail', 'toggleLoader', 'clearUserData', 'updateUserLoggedInState']),
    async updateData () {
      if (this.validationFailed()) {
        return
      }

      this.toggleLoader()
      try {
        const updatePayload = {
          username: this.username,
          email: this.email,
          password: this.password
        }
        await apiClient.call('updateUserData', updatePayload)
      } catch (err) {
        console.log(err)
      } finally {
        this.toggleLoader()
      }
    },
    async deleteUser () {
      this.toggleLoader()
      try {
        await apiClient.call('deleteUser')
        this.hideConfirmation()
        this.toggleLoader()
        this.clearUserData()
        this.updateUserLoggedInState()
        this.$router.push({ path: '/' })
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
.settings {
  width: $body-width-sm;
  width: 100%;
  height: 10rem;

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

    &--error {
      color: red;
    };
  }

  &__input {
    padding: .2rem .3rem;
    font-size: $font-size;
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