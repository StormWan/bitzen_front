<template>
  <div>
    <h1>tab user</h1>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'user',
  async mounted () {
    this.setActiveTab(4)
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
