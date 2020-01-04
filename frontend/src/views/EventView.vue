<template>
  <div class="event">
    <CalendarMonth :eventData="placeholderData"/>
    <CreateEventControls :eventData="placeholderData"/>
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
      placeholderData
    }
  }
}
</script>