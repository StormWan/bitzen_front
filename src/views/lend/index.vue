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
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.setActiveTab(4)
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    })
  }
}
</script>

<style>
  /*底部改变*/
  .md-icon.icon-font.md{
    font-size: 16px;
  }
</style>
