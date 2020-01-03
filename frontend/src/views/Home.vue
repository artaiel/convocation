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
      eventCreatedSuccessfully: true
    }
  },
  methods: {
    handleSubmittedData (dat) {
      this.eventData = dat
    }
  }
}
</script>

<style lang="scss" scoped>
</style>