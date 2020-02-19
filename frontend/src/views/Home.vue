<template>
  <div>
    <CreateEvent v-if="!eventCreatedSuccessfully" @dataSubmitted="handleSubmittedData" />
    <EventCreated v-if="eventCreatedSuccessfully" :eventId="createdEventId"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CreateEvent from '@/components/CreateEvent'
import EventCreated from '@/components/EventCreated'
import apiClient from '@/lib/APIClient'

export default {
  components: {
    CreateEvent,
    EventCreated
  },
  data () {
    return {
      createdEventId: null,
      eventCreatedSuccessfully: false
    }
  },
  methods: {
    ...mapMutations([
      'toggleLoader',
      'showPopup'
    ]),
    async handleSubmittedData (eventData) {
      try {
        this.toggleLoader()
        const response = await apiClient.call('createEvent', eventData)
        const parsedResponse = await response.json()
        this.createdEventId = parsedResponse.eventId
        this.showPopup({ info: 'eventCreated' })
        this.eventCreatedSuccessfully = true
      } catch (err) {
        this.showPopup({ info: 'errorGeneric', isError: true })
      } finally {
        this.toggleLoader()
      }
    }
  }
}
</script>