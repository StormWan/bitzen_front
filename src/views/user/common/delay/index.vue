<template>
    <div class="delay">
      <!--头部标题-->
      <div class="head">
        <van-nav-bar
          title="关于延迟放币的说明"
          left-text="返回"
          left-arrow
          @click-left="Arrow"
        />
      </div>
      <div class="content">
        <h5>亲爱的用户</h5>
        <p>Bit-OX 的 C2C 服务，本质上是加密数字货币代购，平台承兑商承兑 USDT，其他币种是通过交易所接口 API 实现的币币兑换，跟交易所共享深度，我们称之为 One-Step 功能，Bit-OX 资金池均为自有资金，当突然行情波动时，用户集中消耗单一资金池，调币来不及到账，可能出现资金池不足的情况，延迟放币指当资金池突然不足时仍可下单购买成交，交易后对应的币种需要延迟一段时间才会到账；</p>
        <p>目前提供延迟放币功能，即资金池不足时，用户仍然可以按照当前市场价下单并完成成交，对应的交易详情仍然可以在页面查看，但币种可能需要延迟一段时间才能到钱包，具体到账时间根据不同币种的网络打包和确认数情况，稍有不同，如下所示，仅供参考：</p>
          <p>
            <span>USDT</span>
            <span>4个小时</span>
          </p>
          <p>
            <span>BTC</span>
            <span>4个小时</span>
          </p>
          <p>
            <span>ETH</span>
            <span>1个小时</span>
          </p>
          <p>
            <span>BCH</span>
            <span>2-3天</span>
          </p>
          <p>
            <span>EOS</span>
            <span>半个小时</span>
          </p>
          <p>
            <span>XRP</span>
            <span>半个小时</span>
          </p>
          <p>
            <span>LTC</span>
            <span>6个小时</span>
          </p>
          <p>
            <span>XIN</span>
            <span>1个小时</span>
          </p>
          <p>
            <span>BNB</span>
            <span>1个小时</span>
          </p>
          <p>
            <span>ETC</span>
            <span>1个小时</span>
          </p>
          <p>
            <span>HT</span>
            <span>1个小时</span>
          </p>
          <p>
            <span>ZEC</span>
            <span>6个小时</span>
          </p>
          <p>
            <span>ZEN</span>
            <span>3个小时</span>
          </p>
          <p>
            <span>DOGE</span>
            <span>3个小时</span>
          </p>
          <p>
            <span>KEY</span>
            <span>1个小时</span>
          </p>
          <p>
            <span>PRS</span>
            <span>1个小时</span>
          </p>
          <p>
            <span>CANDY</span>
            <span>1个小时</span>
          </p>
          <p>
            <span>SC</span>
            <span>6个小时</span>
          </p>
        <p>目前 C2C 区提供买入的延时到账功能，币币区提供买入/卖出的延时到账功能，Bit-OX 会致力于解决资金池不足问题出现的情况，但受某些不可抗力的影响，当出现这种情况时，为不影响用户使用，提供延时到账功能选择，以满足用户紧急交易的诉求。</p>
        <p>感谢对 Bit-OX 团队的支持！</p>
        <h6>Bit-OX 团队</h6>
        <h6>2019 年 5 月 23 日</h6>
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
  .delay{
    font-size: 17px;
    /*内容*/
    .content{
      width: 92%;
      margin: 0 auto;
      font-size: 17px;
      h5{
        margin-bottom: 20px;
      }
      h6{
        font-size: 15px;
        margin: 20px 0;
      }
      p{
        text-align: justify;
        text-indent: 2em;
        margin: 20px 0;
        span{
          font-size: 16px;
        }
        span:nth-child(1){
          margin: 0 40px 0 20%;
        }
      }
    }
  }
</style>
