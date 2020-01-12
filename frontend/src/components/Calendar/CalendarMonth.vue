<template>
  <div class="calendar">
    <div class="calendar__controls">
      <button
        class="calendar__month-change"
        @click="previousMonth"
      >
        <img src="@/assets/images/arrow-left.png" alt="Previous month">
      </button>
      <h5 class="calendar__month-name">
        {{ monthName }} {{ selectedYear }}
      </h5>
      <button
        class="calendar__month-change"
        @click="nextMonth"
      >
        <img src="@/assets/images/arrow-right.png" alt="Previous month">
      </button>
    </div>
    <div class="calendar__weekdays">
      <div
        v-for="day in days"
        :key="`${day}-key`"
        class="calendar__day-name"
      >
        {{ day }}
      </div>
    </div>
    <div class="calendar__container">
      <CalendarDay
        v-for="(n, index) in daysFromPreviousMonth"
        :key="`days-previous-${index}`"
        :day="n"
      />
      <CalendarDay
        v-for="(n, index) in selectedMonthLength"
        :key="`day-${index + 1}`"
        :day="n"
        :month="selectedMonth"
        :year="selectedYear"
        :active="true"
        :dayPassed="dayPassed(n)"
        :eventData="eventData"
        :currentlySelectedDates="currentlySelectedDates"
        :viewedDate="viewedDate"
        @selectDay="selectDay"
        @viewDay="viewDate"
      />
    </div>

  </div>
</template>
<script>
const months = require('@/lib/months')
const days = require('@/lib/days')
import CalendarDay from '@/components/Calendar/CalendarDay'

export default {
  name: 'monthSelection',
  components: {
    CalendarDay
  },
  props: {
    eventData: {
      type: Object,
      default: () => {}
    },
    currentlySelectedDates: {
      type: Object,
      default: () => {}
    },
    viewedDate: {
      type: String
    }
  },
  data () {
    return {
      selectedMonth: '',
      selectedYear: '',
      selectedMonthLength: '',
      days
    }
  },
  computed: {
    dateNow () {
      return new Date(new Date().setHours(0,0,0,0))
    },
    monthName () {
      return months[this.selectedMonth]
    },
    daysFromPreviousMonth () {
      const firstDayWeekdayNumber = new Date(this.selectedYear, this.selectedMonth, 1).getDay()
      return firstDayWeekdayNumber === 0 ? 6 : firstDayWeekdayNumber - 1
    },
    remainingDaysToFit () {
      const currentAndPreviousMonth = this.selectedMonthLength + this.daysFromPreviousMonth
      const remainingDays = 7 - (currentAndPreviousMonth % 7)

      return remainingDays !== 7 ? remainingDays : null
    }
  },
  methods: {
    dayPassed(day) {
      return new Date(this.selectedYear, this.selectedMonth, day) < this.dateNow
    },
    previousMonth () {
      if (this.selectedMonth === 0) {
        this.selectedYear = this.selectedYear - 1
        this.selectedMonth = 11
      } else {
        this.selectedMonth = this.selectedMonth - 1
      }
      this.selectedMonthLength = new Date(this.dateNow.getFullYear(), this.selectedMonth + 1, 0).getDate()
    },
    nextMonth () {
      if (this.selectedMonth === 11) {
        this.selectedYear = this.selectedYear + 1
        this.selectedMonth = 0
      } else {
        this.selectedMonth = this.selectedMonth + 1
      }
      this.selectedMonthLength = new Date(this.dateNow.getFullYear(), this.selectedMonth + 1, 0).getDate()
    },
    selectDay (day) {
      const id = `${day}-${this.selectedMonth}-${this.selectedYear}`
      this.$emit('selectDay', id)
    },
    viewDate (day) {
      this.$emit('viewDate', `${day}-${this.selectedMonth}-${this.selectedYear}`)
    }
  },
  created () {
    this.selectedMonth = this.dateNow.getMonth()
    this.selectedYear = this.dateNow.getFullYear()
    this.selectedMonthLength = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth() + 1, 0).getDate()
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  max-width: $body-width-sm;
  margin: 0 auto;
  display: relative;
  z-index: 1;

  @media screen and (min-width: $size-lg) {
    max-width: $body-width-lg;
  }

  @media screen and (min-width: $size-xxl) {
    max-width: $body-width-xl;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: 0 auto;
    margin-bottom: 3rem;
  }

  &__month-change {
    display: block;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;

    & > img {
      width: 16px;
      mix-blend-mode: hard-light;
      transition: all .3s ease-in-out;
    }

    &:active > img {
      transform: translateX(2px);
    }
  }

  &__month-name {
    display: flex;
    font-size: 24px;
    justify-content: center;
    align-items: center;
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 1rem 0;
    text-align: center;
  }

  &__day-name {
    font-weight: 600;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 1fr;

    &::before {
      content: '';
      width: 0;
      padding-bottom: 100%;
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }

    & > *:first-child {
      grid-row: 1 / 1;
      grid-column: 1 / 1;
    }
  }
}
</style>