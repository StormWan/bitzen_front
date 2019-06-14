<template>
  <div class="service">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="为什么通过 C2C 买入非 USDT 数字货币的时候会收到 UDST ?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>因为 ExinOne 在 C2C 区提供的除 USDT 之外的交易对实际上是 One-Step 功能，调深度最好交易对的交易所接口完成成交的，受交易所接口 API 的影响，在对应交易所的 API 不稳定，挂掉等情况下，用户购买指定数字货币时，ExinOne 承兑的 USDT 可以完成交易，后面的币币交易可能失败，会退回 USDT，此时用户只需要在 ExinOne 币币交易区手动提交交易即可。</p>
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
    /*内容*/
    .content{
      width: 92%;
      margin: 0 auto;
      p{
        font-size: 14px;
        text-align: justify;
        line-height: 20px;
      }
    }
  }
</style>
