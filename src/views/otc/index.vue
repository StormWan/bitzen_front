<template>
  <div class="Legal_currency">
<!--    <div class="header"> 法 币 </div>-->
    <div class="title_bos">
      <div>市场</div>
      <div>最新价</div>
      <div>涨跌幅</div>
    </div>
    <!--趋势-->
    <div class="Mala" v-for="(item,index) in Market_label" :key="index" @click="text_click(item.id)">
      <!--名称-->
      <div class="Market">
        <div class="img" v-if="item">
          <img :src="item.asset.icon_url" alt="">
        </div>
        <div class="title">{{item.asset.symbol}}</div>
      </div>
      <!--价格-->
      <div class="Price_icon">
        <p class="Price">
          <span class="Price_box" v-if="item.asset.symbol.search('USDT') !== -1">{{Math.round(item.setting.usdt_buy_price * 100) / 100}}</span>
          <span class="Price_box" v-else>{{Math.round((item.pair.bestorderbookmodel.best_buy_price * item.setting.usdt_buy_price) * 100) / 100}}</span>
          <span class="name">{{item.mode}}</span>
        </p>
        <p class="icon">
          <span class="icon_fire" v-if="item.pair">
              <img :src="item.pair.bestorderbookmodel.best_buy_exchange.logo_32" v-if="item.pair.bestorderbookmodel.best_buy_exchange.logo_32">
          </span>
          <span class="name" v-if="item.pair">{{item.pair.pair}}</span>
          <span class="name" v-else>{{item.asset.symbol}}</span>
        </p>
      </div>
      <!--按钮-->
      <div class="Fall_rise" v-if="item.pair" :class="{active: item.pair.bestorderbookmodel.percentage.toString().charAt(0) === '-'}">{{Math.floor(item.pair.bestorderbookmodel.percentage * 1000) / 1000}}%</div>
      <div class="Fall_rise" v-else>购买</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Icon, Toast } from 'vant'
export default {
  data () {
    return {
      // 行情标签涨幅
      Market_label: [],
      set: true
    }
  },
  async mounted () {
    this.setActiveTab(2)
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    }),
    // 点击跳转
    text_click (id) {
      this.$router.push({
        name: 'transaction',
        params: {
          id: id
        }
      })
    },
    // 数据获取
    async api () {
      const { data } = await this.$api.otc.currency()
      if (data.code !== 200) {
        Toast('服务器异常,请稍后再试')
      } else {
        this.Market_label = data.data
      }
    }
  },
  components: {
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  // router-link触发
  async activated () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.set = true
    await this.api()
    let set = await setInterval(() => {
      if (this.set) {
        this.api()
      } else {
        clearInterval(set)
      }
    }, 5000)
  },
  watch: {
    '$route' () {
      this.set = false
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
    .header{
      text-align: center;
      font-size: 18px;
      line-height: 40px;
      padding-top: 15px;
      color: #696969;
    }
    /*标题*/
    .title_bos{
      font-size: 13px;
      display: flex;
      color: #696969;
      justify-content: space-between;
      width: 80%;
      margin: 0 auto;
      padding-top: 15px;
      padding-bottom: 5px;
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
  }
</style>
