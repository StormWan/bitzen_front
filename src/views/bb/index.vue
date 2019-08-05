<template>
    <div class="Coin">
      <div class="tab">
        <van-tabs class="order-tabs" v-model="active" sticky @click="tabChange">
          <van-tab v-for="(title,title_index) in title" :key="title_index" :title="title.tiele_name">
            <div class="list">
              <!-------标题-------->
              <div class="title">
                <!--市场/成交量-->
                <div class="market">
                  <span>市场</span>
                </div>
                <!--最新价-->
                <div class="cent">最新价</div>
                <!--24小时涨跌-->
                <div class="tail">24h涨跌</div>
              </div>
              <div>
                <!--------数据-------->
                <div v-for="(item,index) in arr" :key="index" @click="onItemClick(item.id)">
                  <div class="data" v-if="item.bestorderbookmodel">
                    <!--市场/成交量-->
                    <div class="market">
                      <span class="name">{{item.base.symbol}}</span>/<span class="market_name">{{item.quote.symbol}}</span>
                    </div>
                    <!--最新价-->
                    <div class="cent">{{item.bestorderbookmodel.best_buy_price}}</div>
                    <!--24小时涨跌-->
                    <div class="tail">
                      <div class="green" v-if="!item.bestorderbookmodel.percentage">- -</div>
                      <div class="green" v-else :class="{red: (item.bestorderbookmodel.percentage).toString().charAt(0) === '-'}">{{(Math.floor(item.bestorderbookmodel.percentage * 1000) / 1000).toFixed(2)}}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Tab, Tabs, Toast } from 'vant'

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data () {
    return {
      active: 1,
      // tab标题名称
      title: [
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
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    }),
    // 交易所导航栏名称筛选
    tabChange (index, title) {
      this.active = index
      this.arr = []
      if (index === 0) {
        this.arr = this.pairs
      } else {
        for (let i = 0; i <= this.pairs.length - 1; i++) {
          if (this.pairs[i].quote.symbol.search(title) !== -1) {
            this.arr.push(this.pairs[i])
          }
        }
      }
    },
    // 获取数据
    async getPairs () {
      const { data } = await this.$api.bb.pairList()
      if (data.code === 200) {
        this.pairs = data.data
        // 原始推值进去arr渲染
        for (let i = 0; i <= this.pairs.length - 1; i++) {
          if (this.pairs[i].quote.symbol.search(this.title[this.active].tiele_name) !== -1) {
            this.arr = []
            this.arr.push(this.pairs[i])
          }
        }
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
  .Coin{
    .tab{
      font-size: 16px;
      /*默认文字颜色*/
      .order-tabs .van-ellipsis {
        font-size: 13px;
        font-weight: bold;
      }
      /*点击导航栏添加颜色*/
      .order-tabs .van-tab--active{
        /*color: #00BFFF;*/
      }
      /*下边索引条*/
      .van-tabs__line{
        /*display: none;*/
        height: 2px;
      }
      /*数据*/
      .list{
        margin-bottom: 50px;
        /*标题*/
        .title{
          width: 90%;
          margin: 0 auto;
          font-size: 0;
          color: #696969;
          line-height: 15px;
          padding-top: 12px;
          .active{
            color: #800000;
            font-weight: 600;
          }
          div{
            font-size: 13px;
            display: inline-block;
            width: 33%;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .cent{
            text-align: center;
          }
          .tail{
            text-align: right;
          }
        }
        /*数据*/
        .data{
          width: 90%;
          margin: 0 auto;
          font-size: 0;
          border-bottom: 1px solid #ccc;
          display: block;
          color: #000;
          /*全据数据*/
          div{
            padding-bottom: 8px;
            padding-top: 8px;
            font-size: 14px;
            display: inline-block;
            width: 33%;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
          }
          /*数据左边*/
          .market{
            .name{
              font-size: 18px;
              margin-right: 2px;
            }
            .market_name{
              font-size: 14px;
              color: #999;
              margin-left: 2px;
            }
          }
          /*数据中间*/
          .cent{
            text-align: center;
            font-size: 17px;
          }
          /*数据右边*/
          .tail{
            text-align: right;
            padding-left: 13.5%;
            .green{
              display: block;
              width: 100%;
              -webkit-border-radius: 5px;
              -moz-border-radius: 5px;
              border-radius: 5px;
              background-color: green;
              color: #F5F5F5;
              text-align: center;
            }
            .red{
              display: block;
              width: 100%;
              -webkit-border-radius: 5px;
              -moz-border-radius: 5px;
              border-radius: 5px;
              background-color:#B22222;
              color: #F5F5F5;
              text-align: center;
            }
          }
        }
      }
    }
  }
  /*底部改变*/
  .md-icon.icon-font.md{
    font-size: 16px;
  }
</style>
