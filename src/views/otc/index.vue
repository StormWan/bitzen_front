<template>
  <div>
    <h3>tab marketing</h3>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'user',
  async mounted () {
    this.setActiveTab(2)
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    })
  }
}
</script>

<style scoped>

</style>
