<template>
  <div>
    <CreateEvent v-if="!eventCreatedSuccessfully" @dataSubmitted="handleSubmittedData" />
    <EventCreated v-if="eventCreatedSuccessfully"/>
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
      eventData: null,
      eventCreatedSuccessfully: false
    }
  },
  methods: {
    async handleSubmittedData (eventData) {
      this.eventData = eventData
      await apiClient.call('createEvent', eventData)
      this.eventCreatedSuccessfully = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>