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
        @viewAttendees="viewAttendees"
        @selectDay="selectDay"
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
    }
  },
  data () {
    return {
      selectedMonth: '',
      selectedYear: '',
      selectedMonthLength: '',
      days,
      currentlySelectedDates: {}
    }
  },
  computed: {
    dateNow () {
      return new Date()
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
      this.selectedMonth = this.selectedMonth - 1
      this.selectedMonthLength = new Date(this.dateNow.getFullYear(), this.selectedMonth + 1, 0).getDate()
    },
    nextMonth () {
      this.selectedMonth = this.selectedMonth + 1
      this.selectedMonthLength = new Date(this.dateNow.getFullYear(), this.selectedMonth + 1, 0).getDate()
    },
    viewAttendees (day) {
      console.log(day)
    },
    // selectDay (day) {
    //   console.log('fire 1')
    //   if (!this.currentlySelectedDates[this.selectedYear]) {
    //     this.currentlySelectedDates[this.selectedYear] = {}
    //     console.log('fire 2')
    //   }
    //   if (!this.currentlySelectedDates[this.selectedYear][this.selectedMonth]) {
    //     this.currentlySelectedDates[this.selectedYear][this.selectedMonth] = {}
    //     console.log('fire 3')
    //   }
    //   if (!this.currentlySelectedDates[this.selectedYear][this.selectedMonth][day]) {
    //     this.currentlySelectedDates[this.selectedYear][this.selectedMonth][day] = {}
    //     console.log('fire 4')
    //   }
    //   if (!this.currentlySelectedDates[this.selectedYear][this.selectedMonth][day].selected) {
    //     this.currentlySelectedDates[this.selectedYear][this.selectedMonth][day].selected = true
    //     console.log('fire 5')
    //   } else {
    //     this.currentlySelectedDates[this.selectedYear][this.selectedMonth][day].selected = false
    //     console.log('fire 6')
    //   }
    //   console.log(this.currentlySelectedDates)
    // },
    selectDay (day) {
      const id = `${day}-${this.selectedMonth}-${this.selectedYear}`
      if (this.currentlySelectedDates[id]) {
        this.$set(this.currentlySelectedDates, id)
      } else {
        this.$set(this.currentlySelectedDates, id, { selected: true })
        // this.currentlySelectedDates[id] = {
        //   selected: true
        // }
      }
      console.log(this.currentlySelectedDates)
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
  width: 50%;
  margin: 0 auto;

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