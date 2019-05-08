<template>
  <div>
    <h1>tab reward</h1>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'user',
  async mounted () {
    this.setActiveTab(3)
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
