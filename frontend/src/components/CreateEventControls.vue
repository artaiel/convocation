<template>
  <div class="event-controls">
    {{ eventData.name }}
  </div>
</template>

<script>
export default {
  props: {
    eventData: {
      type: Object,
      default: () => {}
    }
  },
}
</script>

<style lang="scss" scoped>

</style>