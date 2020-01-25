<template>
  <div>
    <CreateEvent v-if="!eventCreatedSuccessfully" @dataSubmitted="handleSubmittedData" />
    <EventCreated v-if="eventCreatedSuccessfully" :eventId="createdEventId"/>
  </div>
</template>

<script>
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
    async handleSubmittedData (eventData) {
      try {
        const response = await apiClient.call('createEvent', eventData)
        const parsedResponse = await response.json()
        this.createdEventId = parsedResponse.eventId
      } catch (err) {
        console.log(err)
      }
      this.eventCreatedSuccessfully = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>