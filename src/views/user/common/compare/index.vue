<template>
  <div class="service">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="为什么 BlockPay 的 C2C 价格与行情软件显示的价格不一致,有时候甚至相差比较大?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <h5>有两个原因：</h5>
      <p>由于国内不允许交易所开通法币通道，所以一般通过 USDT 购买数字货币，USDT 兑 CNY价格相比美元汇率会有波动，行情软件一般以美元汇率显示兑 CNY 价，并不会考虑 USDT 的波动。</p>
      <p>有一些币流动性较差，买一和卖一价差较大，行情软件会显示最新成交价，如果最后一笔交易是卖单，显示的价格就会比较低，但是实际上这个价格是无法成交的，为了用户能够清楚的计算成本，ExinOne 显示的价格为市价，即买入显示卖一价，卖出显示买一价，会更加接近于用户实际去购买的成交价。</p>
    </div>
  </div>
</template>

<script>
import { Icon, NavBar } from 'vant'
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
    [Icon.name]: Icon,
    [NavBar.name]: NavBar
  }
}
</script>

<style scoped lang="less">
  .service{
    font-size: 17px;
    /*头部标题*/
    .head{
      position: relative;
      text-align: center;
      padding: 20px 0;
      font-size: 18px;
      .Arrow{
        position: absolute;
        left: 10%;
        font-size: 20px;
      }
      .title{
        width: 200px;
        margin: 0 auto;
        font-size: 13px;
        text-align: justify;
      }
    }
    /*内容*/
    .content{
      width: 92%;
      margin: 0 auto;
      p{
        font-size: 14px;
        text-align: justify;
        line-height: 20px;
        text-indent: 2em;
        margin: 20px 0;
      }
      h5{
        margin: 20px 0;
      }
    }
  }
</style>
