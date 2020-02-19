<template>
  <div class="event">
    <template v-if="fetchFailed">
      <div class="event__not-found">
        <p>
          {{ $t('noEvent') }}
        </p>
        <img src="@/assets/images/rat.png" alt="">
      </div>
    </template>
    <template v-else-if="eventData._id">
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
      viewedDate: '',
      fetchFailed: false
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
        if (data.error) {
          throw new Error(data.error)
        }
        this.saveEventData(data)
      } catch (err) {
        console.log(err)
        this.fetchFailed = true
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

<style lang="scss" scoped>
.event__not-found {
  max-width: $body-width-sm;
  margin: 10rem auto 0 auto;
  display: flex;
  align-items: center;
  flex-flow: column;

  @media screen and (min-width: $size-lg) {
    max-width: $body-width-lg;
  }

  @media screen and (min-width: $size-xxl) {
    max-width: $body-width-xl;
  }

  & > p {
    font-size: $font-size-lg;
  }

  & > img {
    @include blend-darken;
    max-width: 15rem;
    margin-top: 1.5rem;
  }
}
</style>