<template>
  <div
    class="day"
    :class="{ 'day--placeholder': !active, 'day--passed': dayPassed }"
  >
    <template v-if="active">
      <div class="day__number">
        <img :src="require(`@/assets/images/numbers/${digitFirst}.png`)" alt="">
        <img v-if="digitSecond" :src="require(`@/assets/images/numbers/${digitSecond}.png`)" alt="">
      </div>
      <button class="day__select" :class="{ 'day__selected': daySelected, 'day__select--hoverable': !dayPassed }" @click="selectDay">
        <transition>
          <img v-if="userAvailable" :src="require(`@/assets/images/corner.png`)" alt="" class="day__user-available">
        </transition>
      </button>
      <div v-if="shouldDisplayFullView" class="day__attendees" :class="{ 'day__attendees--selected': isDayCurrentlyViewed }" @click="viewDay">
        <div
          v-for="person in attendeesSum"
          :key="person"
          class="day__person"
        />
      </div>
      <div v-else-if="attendeesSum > 0" class="day__person-count" :class="{ 'day__attendees--selected': isDayCurrentlyViewed }" @click="viewDay">
        <img src="@/assets/images/helmet.png" alt="" class="day__person-one">
        <div class="day__person-text">
          {{ attendeesSum }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    day: {
      type: Number,
      required: true
    },
    month: {
      type: Number
    },
    year: {
      type: Number
    },
    dayPassed: {
      type: Boolean
    },
    eventData: {
      type: Object,
      default: () => {}
    },
    currentlySelectedDates: {
      type: Object,
      default: () => {}
    },
    viewedDate: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    daySelected () {
      return this?.eventData?.dates[this.year]?.[this.month]?.[this.day]?.selected
    },
    digitFirst () {
      return String(this.day)[0]
    },
    digitSecond () {
      return String(this.day)[1]
    },
    attendees () {
      return this?.eventData?.dates[this.year]?.[this.month]?.[this.day]?.attendees.length || 0
    },
    attendeesSum () {
      return this.userAvailable ? this.attendees + 1 : this.attendees
    },
    userAvailable () {
      const id = `${this.day}-${this.month}-${this.year}`

      return !!this.currentlySelectedDates[id]
    },
    isDayCurrentlyViewed () {
      return `${this.day}-${this.month}-${this.year}` === this.viewedDate
    },
    shouldDisplayFullView () {
      return this.attendees < 9 && window.innerWidth > 600
    }
  },
  methods: {
    selectDay () {
      if (!this.dayPassed) {
        this.$emit('selectDay', this.day)
      }
    },
    viewDay () {
      this.$emit('viewDay', this.day)
      this.attendeesSelected = true
    }
  }
}
</script>

<style lang="scss" scoped>
.day {
  display: flex;
  flex-flow: column;
  border: 1px dotted rgba(116, 116, 116, 0.505);
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &--passed {
    background-color: rgba(77, 77, 77, 0.15);
  }

  &__number {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 5px;
    left: 5px;

    & > img {
      height: 10px;
      mix-blend-mode: hard-light;
    }

    @media screen and (min-width: $size-sm) {
      & > img {
        height: 15px;
      }
    }

    @media screen and (min-width: $size-xxl) {
      top: 8px;
      left: 8px;
    }
  }

  &__select {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60%;
    @include btn-reset;

    & > input {
      display: none;
    }

    &--hoverable:hover {
      background-color: rgba(49, 49, 49, 0.05);
      box-shadow: 0px 2px 10px $c-dark;
    }
  }

  &__selected {
    background-image: url('~@/assets/images/rose.png');
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;
    mix-blend-mode: hard-light;
  }

  &__user-available {
    position: absolute;
    top: 0;
    right: 0;
    transform: rotate(90deg);
    width: 15px;
    height: 15px;

    @media screen and (min-width: $size-sm) {
      width: 25px;
      height: 25px;
    }

    @media screen and (min-width: $size-xxl) {
      width: 30px;
      height: 30px;
    }
  }

  &__attendees {
    height: 40%;
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    transition: all .3s ease-in-out;
    padding: 5px;

    &:hover, &:focus {
      background-color: rgba(49, 49, 49, 0.05);
      box-shadow: 0px 2px 10px $c-dark;
    }

    &--selected {
      background-color: rgba(49, 49, 49, 0.05);
      box-shadow: 0px 2px 10px $c-dark;
    }
  }

  &__person {
    height: 100%;
    background-image: url('~@/assets/images/helmet.png');
    background-size: 75%;
    background-repeat: no-repeat;
    background-position: center;
    mix-blend-mode: hard-light;
  }

  &__person-count {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
  }

  &__person-one {
    width: $spacer * 1.5;
    @include blend-hard-light;

    @media screen and (min-width: $size-sm) {
      width: $spacer * 2;
    }

    @media screen and (min-width: $size-lg) {
      width: $spacer * 3;
    }
  }

  &__person-text {
    font-size: $font-size-lg;
    margin-left: 3px;
    transform: translateY(-1px);

    @media screen and (min-width: $size-sm) {
      font-size: $font-size-xxl;
      transform: translateY(-3px);
      margin-left: 7px;
    }
  }

  &--placeholder {
    border: none;
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }
}
</style>