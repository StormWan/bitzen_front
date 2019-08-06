<template>
  <div class="bb">
    <van-tabs class="order-tabs" v-model="active" sticky @click="tabChange">
      <van-tab v-for="(title,title_index) in bbTabTitle" :key="title_index" :title="title.tiele_name">
        <!-------标题-------->
        <van-row type="flex"  class="bb_title">
          <van-col span="8">市场</van-col>
          <van-col span="8" offset="2">最新价</van-col>
          <van-col span="6"><div class="bb_title_name">24h涨跌</div></van-col>
        </van-row>
        <!--------数据-------->
        <div v-for="(item,index) in pairs" :key="index" @click="onItemClick(item.id)">
          <div v-if="item.bestorderbookmodel">
            <van-row type="flex" class="bbdata_list">
              <van-col span="10"><span>{{item.base.symbol}}</span>/<span class="second_marketname">{{item.quote.symbol}}</span></van-col>
              <van-col span="7">{{item.bestorderbookmodel.best_buy_price}}</van-col>
              <van-col span="6" offset="1">
                <div class="up_or_down">
                  <div class="go_up_green" v-if="!item.bestorderbookmodel.percentage">- -</div>
                  <div class="go_up_green" v-else :class="{go_down_red: (item.bestorderbookmodel.percentage).toString().charAt(0) === '-'}">
                    {{(Math.floor(item.bestorderbookmodel.percentage * 1000) / 1000).toFixed(2)}}%</div>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Tab, Tabs, Toast, Row, Col, Button } from 'vant'

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button
  },
  data () {
    return {
      active: 1,
      // tab标题名称
      bbTabTitle: [
        {
          tiele_name: '全部'
        },
        {
          tiele_name: 'USDT'
        },
        {
          tiele_name: 'BTC'
        },
        {
          tiele_name: 'EOS'
        }
      ],
      // 数据
      pairs: [],
      arr: []
    }
  },
  async mounted () {
    // tabbar导航位置
    this.setActiveTab(3)
    await this.getPairs()
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    }),
    // 交易所导航栏名称筛选
    tabChange (index, title) {
      this.active = index
      if (index !== 0) {
        this.pairs.filter(item => {
          return item.quote.symbol.search(title) !== -1
        })
      }
    },
    // 获取数据
    async getPairs () {
      const { data } = await this.$api.bb.pairList()
      if (data.code === 200) {
        this.pairs = data.data
        this.pairs.filter(a => {
          return a.quote.symbol.search(this.bbTabTitle[this.active].tiele_name) !== -1
        })
        // console.log(this.pairs[0].active)
      } else {
        Toast('获取数据失败，请刷新')
      }
    },
    // 传值
    onItemClick (id) {
      this.$router.push({
        name: 'pair', params: { id: id }
      })
    }
  },
  computed: {
  },
  // keep-alive 组件激活时调用
  async activated () {
    await this.getPairs()
    // 设置定时器，每隔2秒获取数据
    let timer = await setInterval(() => {
      this.getPairs()
    }, 4000)
    // 在离开页面时清楚定时器
    this.$once('hook:deactivated', () => {
      clearInterval(timer)
    })
  }
}
</script>

<style lang="less">
    .bb{
      /*默认文字颜色*/
      .order-tabs .van-ellipsis {
        font-size: 13px;
        font-weight: bold;
      }
      /*tab 下边索引条*/
      .van-tabs__line{
        /*display: none;*/
        height: 2px;
      }
      /*标题*/
      .bb_title{
          padding-top: 12px;
          padding-left: 20px;
          font-size: 14px; // 标题的字体的样式
          color: #696969;
          .bb_title_name{
            padding-left: 17px;
          }
        }
      .bbdata_list{
        padding: 8px 0px;
        padding-left: 5px;
        font-size: 18px;
        border-bottom: 1px solid #ccc;

        margin: 0px 15px;
        display:flex;/*Flex布局*/
        display: -webkit-flex; /* Safari */
        align-items:center;/*指定垂直居中*/
        .second_marketname{
          font-size: 14px;
          color: #000;
        }
        /*上涨/下降 24h 涨跌的样式*/
        .up_or_down{
          margin-left: 10px;
          width: 80%;
          font-size: 14px;
          text-align: center;
          color: #F5F5F5;
          .go_up_green{
            border-radius: 5px;
            padding: 8px 0px;
            background-color: green;
          }
          .go_down_red{
            border-radius: 5px;
            padding: 8px 0px;
            background-color:#B22222;
          }
        }
      }
    }
  /*底部 tabbar 字体改变*/
  .md-icon.icon-font.md{
    font-size: 16px;
  }
</style>
