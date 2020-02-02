<template>
  <div class="events-owned">
    <EventOwned
      v-for="(event, index) in userInfo.eventsOwned"
      :key="`event-${index}`"
      :eventIndex="index"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventOwned from '@/components/UserPanel/EventOwned.vue'

export default {
  components: {
    EventOwned
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.events-owned {
  width: $body-width-sm;
  width: 100%;
}
</style>