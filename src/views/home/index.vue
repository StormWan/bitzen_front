<template>
  <div>
    <h1>tab home</h1>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'home',
  data () {
    return {}
  },
  async mounted () {
    this.setActiveTab(1)
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
