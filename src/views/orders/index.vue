<template>
  <div class="lend">
    <van-tabs v-model="active" sticky>
      <van-tab v-for="(item, index) in bbTitles" :title="item.title" :key="index">
        <div v-if="index === 0" class="bb_otc">
          <bb_order></bb_order>
        </div>
        <div v-else class="bb_otc">
          <otc_details></otc_details>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Tab, Tabs } from 'vant'
import bb from './bb_order'
import otc from './otc_details'
export default {
  name: 'orders',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    'bb_order': bb,
    'otc_details': otc
  },
  data () {
    return {
      active: 0,
      bbTitles: [
        {
          title: '币币'
        },
        {
          title: '法币'
        }
      ]
    }
  },
  mounted () {
    // document.body.scrollTop = 0
    // document.documentElement.scrollTop = 0
    this.setActiveTab(4)
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    })
  }
}
</script>

<style lang="less">
  .lend{
    margin-bottom: 30px;
  }
  /*底部改变*/
  .md-icon.icon-font.md{
    font-size: 16px;
  }
  .custom-tab-bar{
    z-index: 999;
  }
</style>
