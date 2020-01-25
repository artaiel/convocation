<template>
  <div class="event">
    <CalendarMonth
      :currentlySelectedDates="currentlySelectedDates"
      :eventData="placeholderData"
      :viewedDate="viewedDate"
      @selectDay="selectDay"
      @viewDate="viewDate"
    />
    <EventControls
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
import EventControls from '@/components/EventControls'
import placeholderData from '@/lib/placeholderData.json'
import { mapMutations } from 'vuex'
import apiClient from '@/lib/APIClient'

export default {
  name: 'EventView',
  components: {
    CalendarMonth,
    EventControls
  },
  data () {
    return {
      placeholderData,
      currentlySelectedDates: {},
      viewedDate: ''
    }
  },
  methods: {
    ...mapMutations(['toggleLoader']),
    async loadEventData () {
      this.toggleLoader()
      try {
        const response = await apiClient.call('getEventData', null, this.$route.params.id)
        const data = await response.json()
        console.log(data)
      } catch (err) {
        console.log(err)
      } finally {
        this.toggleLoader()
      }
    },
    selectDay (id) {
      if (this.currentlySelectedDates[id]) {
        this.$set(this.currentlySelectedDates, id)
      } else {
        this.$set(this.currentlySelectedDates, id, { selected: true })
      }
    },
    viewDate (date) {
      if (this.viewedDate === date) {
        this.viewedDate = ''
      } else {
        this.viewedDate = date
      }
    },
    setAvailability (availability) {
      this.currentlySelectedDates[availability.date].hours = availability.hours
    },
    setName (nickname) {
      this.currentlySelectedDates.nickname = nickname
    }
  },
  mounted () {
    this.loadEventData()
  }
}
</script>