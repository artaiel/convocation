<template>
  <div class="events-attending">
    <div
      v-for="(event, index) in userInfo.eventsAttending"
      :key="index"
      class="events-attending__event"
    >
      <div class="events-attending__title">
        {{ event.eventName }}
      </div>
      <div class="events-attending__description">
        {{ event.description || '-' }}
      </div>
      <router-link class="events-attending__link" :to="{ path: `/event/${event._id}`}">
        {{ getFullEventUrl(event._id) }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    getFullEventUrl (eventId) {
      const base = `${window.location.protocol}//${window.location.host}`
      return `${base}/event/${eventId}`
    }
  }
}
</script>

<style lang="scss" scoped>
.events-attending {
  width: $body-width-sm;
  width: 100%;
  height: 10rem;
  text-align: center;

  &__event {
    margin-bottom: 3rem;
  }

  &__title {
    font-weight: 600;
    margin-bottom: .5rem;
  }

  &__description {
    margin-bottom: 1rem;
  }

  &__link {
    color: rgba($c-blue, .75);
    word-break: break-all;
    @include transition-basic;

    &:hover {
      color: $c-blue;
    }
  }
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