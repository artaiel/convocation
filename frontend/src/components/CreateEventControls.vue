<template>
  <div class="event-controls">
    <div class="event-controls__info">
      <div class="event-controls__event-name">
        {{ eventData.name }}
      </div>
      <h4 class="event-controls__date">
        {{ date }}
      </h4>
    </div>
    <div class="event-controls__attentees">
      <div v-if="isUserAttending" class="event-controls__user">
        <!-- {{ currentlySelectedDates[viewedDate] }} -->
        <input
          class="event-controls__user-nickname"
          type="text"
          @input="$emit('setName', $event.target.value)"
          :value="translatedNickname"
        >
        <input
          type="text"
          class="event-controls__user-hours"
          :value="translatedUserHours"
          @input="updateHours"
        >
      </div>
      <div class="event-controls__others">
        <div v-for="(person, index) in attendees" :key="`${person.name}-${index}`" class="event-controls__person">
          {{ person. name }} {{ person.time }}
        </div>
      </div>
    </div>
    <div class="event-controls__info-action">

    </div>
  </div>
</template>

<script>
export default {
  props: {
    eventData: {
      type: Object,
      default: () => {}
    },
    viewedDate: {
      type: String
    },
    currentlySelectedDates: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      userNickname: null,
      userHours: null
    }
  },
  computed: {
    date () {
      let date = null
      if (this.viewedDate) {
        date = this.viewedDate.split('-')
        date[1] = Number(date[1]) + 1
      }

      return date ? date.join('-') : ''
    },
    isUserAttending () {
      return !!this.currentlySelectedDates[this.viewedDate]
    },
    translatedNickname () {
      let nickname = null
      if (this.currentlySelectedDates.nickname) nickname = this.currentlySelectedDates.nickname

      return nickname ? nickname : this.$t('name')
    },
    translatedUserHours () {
      return this.userHours || this.$t('defaultAvailability')
    },
    attendees () {
      const date = this.viewedDate.split('-')
      return this.eventData.dates[date[2]][date[1]][date[0]]
    }
  },
  methods: {
    updateHours (input) {
      this.$emit('setAvailability', {
        date: this.viewedDate,
        hours: input.target.value
      })
    }
  },
  created () {
    if (this.currentlySelectedDates[this.viewedDate]?.hours) {
      this.userHours = this.currentlySelectedDates[this.viewedDate].hours
    }
    if (this.currentlySelectedDates.nickname) {
      this.userNickname = this.currentlySelectedDates.nickname
    }
  },
  watch: {
    viewedDate: function () {
      if (this.currentlySelectedDates[this.viewedDate]?.hours) {
        this.userHours = this.currentlySelectedDates[this.viewedDate].hours
      } else {
        this.userHours = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.event-controls {
  width: $body-width;
  margin: 0 auto;

  &__info {
    display: flex;
    justify-content: space-between;
    margin-top: $spacer * 4;
    align-items: center;
  }


  &__event-name {
    font-size: $font-size-xxl;
    font-weight: 700;
  }

  &__date {
    font-size: $font-size-xxl;
  }
}
</style>