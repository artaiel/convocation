<template>
  <div
    class="day"
    :class="{ 'day--placeholder': !active }"
  >
    <template v-if="active">
      <div class="day__number">
        <img :src="require(`@/assets/images/numbers/${digitFirst}.png`)" alt="">
        <img v-if="digitSecond" :src="require(`@/assets/images/numbers/${digitSecond}.png`)" alt="">
      </div>
      <button class="day__select" :class="{ 'day__selected': daySelected }" @click="selectDay">
        <transition>
          <img v-if="userAvailable" :src="require(`@/assets/images/corner.png`)" alt="" class="day__user-available">
        </transition>
      </button>
      <div class="day__attendees" @click="$emit('viewDay', day)">
        <div
          v-for="person in attendeesSum"
          :key="person"
          class="day__person"
        />
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
    daySelected: {
      type: Boolean,
      default: false
    },
    eventData: {
      type: Object,
      default: () => {}
    },
    currentlySelectedDates: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // daySelected: Math.random() > .9,
      // daySelected: true,
      // userAvailable: false
      // people: Math.floor(Math.random() * 6)
      // people: ''
    }
  },
  computed: {
    digitFirst () {
      return String(this.day)[0]
    },
    digitSecond () {
      return String(this.day)[1]
    },
    attendees () {
      return this?.eventData?.dates[this.year]?.[this.month]?.[this.day]?.length || 0
    },
    attendeesSum () {
      return this.userAvailable ? this.attendees + 1 : this.attendees
    },
    userAvailable () {
      const id = `${this.day}-${this.month}-${this.year}`

      return !!this.currentlySelectedDates[id]
    }
  },
  methods: {
    selectDay () {
      this.$emit('selectDay', this.day)
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

  &__number {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10px;
    left: 10px;

    & > img {
      height: 20px;
      mix-blend-mode: hard-light;
    }
  }

  &__select {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60%;
    transition: all .3s ease-in-out;
    @include btn-reset;

    & > input {
      display: none;
    }

    &:hover {
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
    width: 40px;
    height: 40px;
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
  }

  &__person {
    height: 100%;
    background-image: url('~@/assets/images/helmet.png');
    background-size: 75%;
    background-repeat: no-repeat;
    background-position: center;
    mix-blend-mode: hard-light;
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