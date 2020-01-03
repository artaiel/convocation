<template>
  <div>
    <CreateEvent v-if="!eventCreatedSuccessfully" @dataSubmitted="handleSubmittedData" />
    <EventCreated v-if="eventCreatedSuccessfully"/>
  </div>
</template>

<script>
import CreateEvent from '@/components/CreateEvent'
import EventCreated from '@/components/EventCreated'

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
    handleSubmittedData (eventData) {
      this.eventData = eventData
      this.eventCreatedSuccessfully = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>