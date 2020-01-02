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
        :class="{ 'form-alert': false }"
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
        </label>
      </div>
      <div
        class="event-input"
        :class="{ 'form-alert': false }"
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
            Event description
          </label>
      </div>
      <div
        class="event-input"
        :class="{ 'form-alert': false }"
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
        </label>
      </div>
      <div
        class="event-input"
        :class="{ 'form-alert': false }"
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
        </label>
      </div>
      <button class="create-event-btn">
        <span>
          Create event
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      eventName: null,
      eventDescription: null,
      eventOwner: null,
      eventEmail: null
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: $grid-width;
  margin: 0 auto;

  &__info {
    width: 60%;
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
    font-size: $font-size-xxl;
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
      border-bottom: 1px solid #4D4D4D;
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
  border: 2px solid #4D4D4D;
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
    border-bottom: 1px solid red;
  }
}
</style>