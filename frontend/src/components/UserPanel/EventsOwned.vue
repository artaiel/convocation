<template>
  <div class="events-attending">
    {{ userInfo.eventsOwned }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    // ...mapMutations(['toggleLoader', 'saveEventData', 'updateUsernameInEvent', 'updateTimeAvailability', 'saveMeetingDate']),
    // otherUserNickname (userId) {
    //   return this.eventData.attendees.find(attendee => attendee.userId === userId).name
    // },
    // selectMeetingDay () {
    //   this.saveMeetingDate(this.viewedDate)
    // },
    // updateHours (input) {
    //   this.$emit('setAvailability', {
    //     date: this.viewedDate,
    //     hours: input.target.value
    //   })
    // },
    // async updateEvent () {
    //   this.toggleLoader()
    //   try {
    //     const response = await apiClient.call('updateEvent', {
    //       eventId: this.eventData._id,
    //       userAvailability: this.eventData.userDates,
    //       usernameInEvent: this.usernameInEvent
    //     })
    //     const data = await response.json()
    //     this.saveEventData(data)
    //   } catch (err) {
    //     console.log(err)
    //   } finally {
    //     this.toggleLoader()
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.events-attending {
  width: $body-width-sm;
  width: 100%;
  height: 10rem;
  // margin: 0 auto;
  // padding-bottom: 2rem;

  // @media screen and (min-width: $size-lg) {
  //   max-width: $body-width-lg;
  // }

  // @media screen and (min-width: $size-xxl) {
  //   max-width: $body-width-xl;
  // }
}
</style>