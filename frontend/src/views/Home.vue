<template>
  <router-view @dataSubmitted="handleSubmittedData" :eventId="createdEventId"/>
</template>

<script>
import { mapMutations } from 'vuex'
import apiClient from '@/lib/APIClient'

export default {
  data () {
    return {
      createdEventId: null
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
        this.$router.push({ path: '/created' })
      } catch (err) {
        this.showPopup({ info: 'errorGeneric', isError: true })
      } finally {
        this.toggleLoader()
      }
    }
  }
}
</script>