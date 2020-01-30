<template>
  <div class="about">
    <h1>This is the user settings panel</h1>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import apiClient from '@/lib/APIClient'

export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations(['toggleLoader']),
  },
  async mounted () {
    this.toggleLoader()
    try {
      const response = await apiClient.call('getUserData')
      const responseData = await response.json()
      console.log(responseData)
    } catch (err) {
      console.log(err)
    } finally {
      this.toggleLoader()
    }
  }
}
</script>
