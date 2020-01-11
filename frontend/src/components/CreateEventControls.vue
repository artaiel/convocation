<template>
  <div class="event-controls">
    <div class="event-controls__info">
      <div class="event-controls__event-name">
        {{ eventData.name }}
      </div>
      <h4 class="event-controls__date">
        {{ date }}
      </h4>
    </div>
    <div class="event-controls__attendees">
      <div v-if="viewedDate" class="event-controls__table-info">
        Attendees and their availability
      </div>
      <div v-if="isUserAttending" class="event-controls__user">
        <input
          class="event-controls__user-nickname"
          type="text"
          @input="$emit('setName', $event.target.value)"
          :value="translatedNickname"
          spellcheck="false"
          maxlength="15"
        >
        <input
          type="text"
          class="event-controls__user-hours"
          :value="translatedUserHours"
          @input="updateHours"
          spellcheck="false"
          maxlength="20"
        >
      </div>
      <div class="event-controls__others">
        <div v-for="(person, index) in attendees" :key="`${person.name}-${index}`" class="event-controls__person">
          <div class="event-controls__person-name">
            {{ person.name }}
          </div>
          <div class="event-controls__person-time">
            {{ person.time || $t("defaultAvailability") }}
          </div>
        </div>
      </div>
      <button class="event-controls__save">
        <div class="event-controls__scroll">
          <img src="@/assets/images/feather.png" alt="">
        </div>
        <div class="event-controls__label">
          Zapisz
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    eventData: {
      type: Object,
      default: () => {}
    },
    viewedDate: {
      type: String
    },
    currentlySelectedDates: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      userNickname: null,
      userHours: null
    }
  },
  computed: {
    date () {
      let date = null
      if (this.viewedDate) {
        date = this.viewedDate.split('-')
        date[1] = Number(date[1]) + 1
      }

      return date ? date.join('-') : ''
    },
    isUserAttending () {
      return !!this.currentlySelectedDates[this.viewedDate]
    },
    translatedNickname () {
      return this.currentlySelectedDates.nickname ? this.currentlySelectedDates.nickname : this.$t('name')
    },
    translatedUserHours () {
      return this.userHours || this.$t('defaultAvailability')
    },
    attendees () {
      let date
      if (this.viewedDate) date = this.viewedDate.split('-')
      return date ? this.eventData?.dates[date[2]]?.[date[1]]?.[date[0]] : null
    }
  },
  methods: {
    updateHours (input) {
      this.$emit('setAvailability', {
        date: this.viewedDate,
        hours: input.target.value
      })
    }
  },
  created () {
    if (this.currentlySelectedDates[this.viewedDate]?.hours) {
      this.userHours = this.currentlySelectedDates[this.viewedDate].hours
    }
    if (this.currentlySelectedDates.nickname) {
      this.userNickname = this.currentlySelectedDates.nickname
    }
  },
  watch: {
    viewedDate: function () {
      if (this.currentlySelectedDates[this.viewedDate]?.hours) {
        this.userHours = this.currentlySelectedDates[this.viewedDate].hours
      } else {
        this.userHours = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.event-controls {
  width: $body-width;
  margin: 0 auto;
  padding-bottom: 2rem;

  &__info {
    display: flex;
    justify-content: space-between;
    margin: $spacer * 3 0;
    align-items: center;
  }

  &__table-info {
    // text-align: center;
    font-size: $font-size-xl;
    font-weight: 400;
    margin-bottom: $spacer * .5;
  }

  &__user {
    margin: 0 auto;
    margin-bottom: $spacer * .8;
    display: flex;
    justify-content: space-between;
    position: relative;

    &::after {
      content: "";
      display: block;
      height: 1px;
      width: 100%;
      background-color: rgba($c-dark, .25);
      position: absolute;
      bottom: -5%;
    }
  }

  &__user-nickname,
  &__user-hours {
    width: 45%;
    border: none;
    font-size: $font-size-xl;
    color: $c-blue;
    padding: 0;

    &:focus {
      color: $c-blue-dark;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  &__user-hours {
    text-align: right;
  }


  &__event-name {
    font-size: $font-size-xxl;
    font-weight: 700;
  }

  &__date {
    font-size: $font-size-xxl;
  }

  &__person {
    font-size: $font-size-xl;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: $spacer * .8;
    position: relative;

    &::after {
      content: "";
      display: block;
      height: 1px;
      width: 100%;
      background-color: rgba($c-dark, .25);
      position: absolute;
      bottom: -5%;
    }
  }

  &__person-name {
    width: 50%;
  }

  &__person-time {
    width: 50%;
    text-align: right;
  }

  &__scroll {
    background-image: url('~@/assets/images/scroll.png');
    background-size: 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    width: 100px;
    height: 150px;
    @include blend-hard-light;
    @include transition-long;

    &:hover {
      filter: drop-shadow(2px 4px 6px black);
    }

    &:hover > img {
      opacity: 1;
      transform: translateY(0);
    }

    & > img {
      width: 24px;
      position: absolute;
      top: 28%;
      left: 40%;
      opacity: 0;
      transform: translateY(5px);
      @include transition-long;
    }
  }

  &__save {
    @include btn-reset;
    position: relative;
    margin: 0 auto;
    margin-top: 3rem;
    display: block;

    &:hover .event-controls__scroll {
      filter: drop-shadow(2px 4px 6px black);
    }

    &:hover .event-controls__scroll > img {
      opacity: 1;
      transform: translateY(0);
    }

    &:hover .event-controls__label {
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }
  }

  &__label {
    font-size: $font-size-lg;
    @include transition-long;
  }
}
</style>