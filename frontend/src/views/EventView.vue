<template>
  <div class="event">
    <template v-if="!eventData._id">
      no event found
    </template>
    <template v-else>
      <CalendarMonth
        :currentlySelectedDates="currentlySelectedDates"
        :viewedDate="viewedDate"
        @selectDay="selectDay"
        @viewDate="viewDate"
      />
      <EventControls
        :viewedDate="viewedDate"
        :currentlySelectedDates="currentlySelectedDates"
        @setAvailability="setAvailability"
      />
    </template>
  </div>
</template>

<script>
import CalendarMonth from '@/components/Calendar/CalendarMonth'
import EventControls from '@/components/EventControls'
import { mapMutations, mapState } from 'vuex'
import apiClient from '@/lib/APIClient'
import { EventBus } from '@/lib/EventBus'

export default {
  name: 'EventView',
  components: {
    CalendarMonth,
    EventControls
  },
  data () {
    return {
      currentlySelectedDates: {},
      viewedDate: ''
    }
  },
  computed: {
    ...mapState(['eventData'])
  },
  methods: {
    ...mapMutations(['toggleLoader', 'saveEventData', 'clearEventData']),
    async loadEventData () {
      this.toggleLoader()
      try {
        const response = await apiClient.call('getEventData', null, this.$route.params.id)
        const data = await response.json()
        if (data.message) {
          throw new Error(data.message)
        }
        this.saveEventData(data)
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
    }
  },
  mounted () {
    this.clearEventData()
    this.loadEventData()
    EventBus.$once('login', this.loadEventData)
  }
}
</script>