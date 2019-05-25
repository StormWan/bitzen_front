<template>
  <div class="Price">
    <!--头部标题-->
    <div class="head">
      <div class="Arrow" @click="Arrow">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="title">C2C 交易的价格是如何确定的?</div>
    </div>
    <div class="content">
      <h5>ExinOne 的 C2C交易区 分为两种：</h5>
      <ul>
        <li>一种是稳定数字货币 USDT，价格为市场价，良心价；</li>
        <li>另一种是除了 USDT 之外的其它数字货币，这类数字货币的 C2C 交易实际上是 One-Step 功能，并非真正的 C2C 交易，是将 USDT 的 C2C 和币币交易多步并一步的功能，比如买入 1000 元 XIN，实际上是以当前 USDT 的价格比如 6.5 买入相应数量 USDT，然后通过 BTC/USDT 交易对买入相应数量的 BTC，再通过 XIN/BTC 交易对买入 XIN，XIN 的定价就是：USDT 买入价乘以 BTC/USDT 买1价乘以XIN/BTC 买1价，但这个价格仅仅是预估，以实际的成交价为准。</li>
      </ul>
      <h5>说明：One-Step 功能最大程度的和交易所共享深度，为用户提供全网最好的流动性，保证成交价格绝对公平。</h5>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  data () {
    return {

    }
  },
  methods: {
    Arrow () {
      this.$router.go(-1)
    }
  },
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style scoped lang="less">
  .Price{
    font-size: 17px;
    /*头部标题*/
    .head{
      position: relative;
      text-align: center;
      line-height: 80px;
      font-size: 18px;
      .Arrow{
        position: absolute;
        left: 10%;
        font-size: 20px;
        .icon{
          /*vertical-align: middle;*/
        }
      }
    }
    /*内容*/
    .content{
      width: 92%;
      margin: 0 auto;
      h5{
        /*font-size: 18px;*/
        margin: 20px 0;
      }
      ul{
        margin-left: 50px;
        li{
          list-style-type: disc;
          font-size: 15px;
          margin: 20px 0;
          line-height: 22px;
        }
      }
    }
  }
</style>
