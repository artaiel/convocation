<template>
  <div class="event">
    <CalendarMonth
      :currentlySelectedDates="currentlySelectedDates"
      :eventData="placeholderData"
      @selectDay="selectDay"
      @viewDate="viewDate"
    />
    <CreateEventControls
      :viewedDate="viewedDate"
      :eventData="placeholderData"
      :currentlySelectedDates="currentlySelectedDates"
      @setAvailability="setAvailability"
      @setName="setName"
    />
  </div>
</template>

<script>
import CalendarMonth from '@/components/Calendar/CalendarMonth'
import CreateEventControls from '@/components/CreateEventControls'

import placeholderData from '@/lib/placeholderData.json'

export default {
  name: 'EventView',
  components: {
    CalendarMonth,
    CreateEventControls
  },
  data () {
    return {
      placeholderData,
      currentlySelectedDates: {},
      viewedDate: null
    }
  },
  methods: {
    selectDay (id) {
      if (this.currentlySelectedDates[id]) {
        this.$set(this.currentlySelectedDates, id)
      } else {
        this.$set(this.currentlySelectedDates, id, { selected: true })
      }
      console.log(this.currentlySelectedDates)
    },
    viewDate (date) {
      this.viewedDate = date
    },
    setAvailability (availability) {
      this.currentlySelectedDates[availability.date].hours = availability.hours
    },
    setName (nickname) {
      this.currentlySelectedDates.nickname = nickname
    }
  }
}
</script>