<template>
    <div class="Coin">
      <div class="tab">
        <van-tabs class="order-tabs" v-model="active" sticky background="#ccc">
          <van-tab v-for="(title,title_index) in title" :title="title.tiele_name">
            <div v-for="(list,index) in list" :ket="index" v-if="index==title_index">
              <!--市场，成交量，最新价-->
              <div class="market">
                <!--市场-成交量-最新价-->
                <div class="volume">
                  <!--市场-成交量-->
                  <div></div>
                  <!--最新价-->
                  <div></div>
                </div>
                <!--24小时涨跌幅-->
                <div></div>
              </div>
              {{list.name}}
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Tab, Tabs } from 'vant'

export default {
  data(){
    return {
      // tab标题名称
      title: [
        {
          tiele_name: '首选'
        },
        {
          tiele_name: 'BNB'
        },
        {
          tiele_name: 'BTC'
        },
        {
          tiele_name: 'ALTS'
        },
        {
          tiele_name: 'USD'
        }
      ],
      // 数据
      list: [
        // 首选
        {
          name: '首选',
          title: '选项4'
        },
        // BNB
        {
          name: 1,
          title: '选项1'
        },
        // BTC
        {
          name: 2,
          title: '选项2'
        },
        // ALTS
        {
          name: 3,
          title: '选项3'
        },
        // USD
        {
          name: 4,
          title: '选项4'
        }
      ]
    }
  },
  async mounted () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.setActiveTab(3)
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    })
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
}
</script>

<style lang="less">
  /*默认文字颜色*/
  .order-tabs .van-ellipsis {
    font-size: 25px;
    font-weight: bold;
  }
  /*点击添加颜色*/
  .order-tabs .van-tab--active{
    color: #00BFFF;
  }
  /*下边索引条*/
  .van-tabs__line{
    display: none;
  }
</style>
