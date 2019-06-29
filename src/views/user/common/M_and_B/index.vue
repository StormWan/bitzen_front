<template>
  <div class="M_and_B">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="关于 Mixin 和 BlockPay 的关系"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <h5>亲爱的用户</h5>
      <p>Mixin Network 官网对于 Mixin 的定义是：“Mixin is a publicly distributed ledger aimed to help other publicly distributed ledgers gain trillions of TPS, achieve sub second final confirmations, zero transaction fees, enhanced privacy, and unlimited extensibility.”</p>
      <p>大家常见的 APP 叫：Mixin Messenger，是 Mixin 团队开发的 DAPP，支持全币种钱包，同时也是端对端加密的聊天工具。</p>
      <p>而 BlockPay 是基于 Mixin Network 开发的 DAPP，一站式数字货币投资工具，最方便易用的场外入口，也是目前 Mixin 网络中最大的流量生态入口，BlockPay APP 的下载地址。（提供安卓和IOS版本）。同时 BlockPay 也跟很多团队合作，提供交易入口，可以同样访问 BlockPay 的主页，享受服务，其中包括：</p>
      <ul>
        <li>1、Mixin Messenger 上搜索机器人ID：7000101276；</li>
        <li>2、CoinView 中第三方DAPP 中 Exchange；</li>
        <li>3、Candy 中 BlockPay 的部落，交易入口；</li>
        <li>……</li>
      </ul>
      <p>由上可见，BlockPay 和 Mixin 网络是相互依存，共同发展的协作关系，共同繁荣 Mixin Network 的生态。</p>
      <p>感谢你对 BlockPay 的支持！</p>
      <h6>BlockPay 团队</h6>
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
  .M_and_B{
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
      }
      ul{
        font-size: 14px;
        li{
          margin: 10px 0;
        }
      }
    }
  }
</style>
