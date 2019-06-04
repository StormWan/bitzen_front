<template>
  <div class="custom-tab-bar">
    <md-tab-bar
      v-model="activeTab"
      :items="items"
      :has-ink="false"
      @change="change"
    >
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon"/>
        </div>
          <div class="text">
            <span v-text="item.label"></span>
          </div>
        </div>
      </template>
    </md-tab-bar>
  </div>
</template>

<script>
import { TabBar, Icon } from 'mand-mobile'

export default {
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon
  },
  data () {
    return {
      items: [
        // { name: 1, label: '首页', icon: 'home', path: '/' },
        { name: 2, label: '法币', icon: 'user', path: '/' },
        { name: 3, label: '币币', icon: 'motor-vehicle', path: '/bb' },
        // { name: 4, label: '借贷', icon: 'rmb', path: '/lend' },
        { name: 5, label: '我的', icon: 'setting', path: '/user' }
      ]
    }
  },
  computed: {
    activeTab: {
      get () {
        return this.$store.state.tabbar.activeTab
      },
      set (value) {
        this.$store.commit('tabbar/setActiveTab', value)
      }
    }
  },
  methods: {
    change (item, index, prevIndex) {
      this.$router.replace(item.path)
    }
  }
}

</script>

<style lang="stylus">
  .custom-tab-bar
    position: fixed
    bottom 0px
    left 0px
    width 100%
    .md-tab-bar
      padding: 0
      height: 100px
    .custom-item
      display flex
      flex-direction column
      align-items center
      justify-content center
      height 100%
      flex 1
      .text
        font-size 20px
  .md-tab-bar-item
    min-height: 0
</style>
