<template>
  <div class="Legal_currency">
    <van-row type="flex"  class="otc_title">
      <van-col span="8">市场</van-col>
      <van-col span="8" offset="2">最新价</van-col>
      <van-col span="6"><div class="otc_title_name">24h涨跌</div></van-col>
    </van-row>
    <!--趋势-->
    <div v-for="(item,index) in pairs" :key="index" @click="onItemClick(item.id)">
      <van-row type="flex" class="otc-data-list" justify="center">
        <van-col span="8">
          <div class="otc-title">
            <img :src="item.asset.icon_url" alt="">
            <span>{{item.asset.symbol}}</span>
          </div>
        </van-col>
        <van-col span="8" :offset="2">
          <p class="price-up">
            <span v-if="item.asset.symbol.search('USDT') !== -1">
              {{Math.round(item.setting.usdt_buy_price * 100) / 100}}
            </span>
            <span v-else>
              {{Math.round((item.pair.bestorderbookmodel.best_buy_price * item.setting.usdt_buy_price) * 100) / 100}}
            </span>
            <span class="name">{{item.mode}}</span>
          </p>
          <p class="price-down">
            <span class="icon_fire" v-if="item.pair">
              <img :src="item.pair.bestorderbookmodel.best_buy_exchange.logo_32"
                   v-if="item.pair.bestorderbookmodel.best_buy_exchange.logo_32">
            </span>
            <span class="name" v-if="item.pair">{{item.pair.pair}}</span>
            <span class="name" v-else>{{item.asset.symbol}}</span>
          </p>
        </van-col>
        <van-col span="6">
          <div class="up_or_down">
            <div class="go_up_green" v-if="!item.pair">购买</div>
            <div class="go_up_green" v-else
                 :class="{go_down_red: (item.pair.bestorderbookmodel.percentage).toString().charAt(0) === '-'}">
              {{(Math.floor(item.pair.bestorderbookmodel.percentage * 1000) / 1000).toFixed(2)}}%</div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Tab, Tabs, Toast, Row, Col, Button } from 'vant'

export default {
  name: 'otc-list',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button
  },
  data () {
    return {
      // 行情标签涨幅
      pairs: []
    }
  },
  // async mounted () {
  //   this.setActiveTab(2)
  // },
  async activated () {
    this.setActiveTab(2)
    await this.getOtcPairs()
    // 设置定时器，每隔2秒获取数据
    let timer = await setInterval(() => {
      this.getOtcPairs()
    }, 4000)
    // 在离开页面时清楚定时器
    this.$once('hook:deactivated', () => {
      clearInterval(timer)
    })
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    }),
    // 点击跳转
    onItemClick (id) {
      this.$router.push({
        name: 'otc-pair',
        params: {
          id: id
        }
      })
    },
    // 数据获取
    async getOtcPairs () {
      const { data } = await this.$api.otc.otcPairList()
      if (data.code !== 200) {
        Toast('服务器异常,请稍后再试')
      } else {
        this.pairs = data.data
      }
    }
  }
}
</script>

<style lang="less">
  /*底部改变*/
  .md-icon.icon-font.md{
    font-size: 16px;
  }
  /*菜单栏*/
  .Legal_currency{
    margin-bottom: 65px;
    /*标题*/
    .otc_title{
      padding-top: 12px;
      padding-left: 20px;
      font-size: 14px; // 标题的字体的样式
      color: #696969;
      .otc_title_name{
        padding-left: 17px;
      }
    }
    /*行情标签*/
    .Mala{
      width: 95%;
      margin: 10px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 17px 10px;
      color: #000;
      font-size: 13px;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      border: 2px solid rgba(0,0,0,.04);
      div{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 500;
      }
      /*名称*/
      .Market{
        display: flex;
        align-items: center;
        width: 33%;
        .img{
          width: 35px;
          height: 35px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .title{
          font-size: 15px;
          color: #708090;
          padding-left: 15px;
        }
      }
      /*价格*/
      .Price_icon{
        font-size: 14px;
        width: 28%;
        /*价格详情*/
        .Price{
          margin-bottom: 5px;
          text-align: left;
          .Price_box{
            color: #FF4500;
            font-size: 18px;
          }
          .name{
            font-size: 12px;
            color: #999;
            margin-left: 8px;
          }
        }
        /*币币名称图标*/
        .icon{
          font-size: 15px;
          text-align: left;
          .icon_fire{
            font-size: 0;
            vertical-align: middle;
            img{
              width: 15px;
              height: 15px;
            }
          }
          .name{
            font-size: 12px;
            color: #ccc;
          }
        }
      }
      /*交易按钮*/
      .Fall_rise{
        width: 62px;
        background-color: green;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        color: white;
        padding: 8px 0;
        font-size: 12px;
        text-align: center;
      }
      .active{
        background: #B22222;
      }
    }
    p{ padding: 0px; }
    .otc-data-list{
      height: 59.2px;
      padding: 10px 0px;
      padding-left: 5px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;

      margin: 0px 15px;
      display:flex;/*Flex布局*/
      display: -webkit-flex; /* Safari */
      align-items:center;/*指定垂直居中*/

      .otc-title{
        position: relative;
        img{
          width: 35px;
          height: 35px;
        }
        span{
          position: absolute;
          top: 25%;
          left: 50%;
          color: #708090;
        }
      }
      .price-up{
        color: red;
        font-size: 20px;
      }
      .price-down{
        color: #ccc;
        font-size: small;
      }
      /*上涨/下降 24h 涨跌的样式*/
      .up_or_down{
        margin-left: 15px;
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
</style>
