<template>
  <div class="service">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="卖出数字货币时如何收款?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>Bit-OX 服务最后一页【我的】，有一个【收款账户】，用户下卖单必须先绑定至少一种收款方式才可以下单，目前平台支持三种收款方式：微信、支付宝和银行卡。比如是用户的实名收款账户。</p>
      <p>当你卖出数字货币时，我们将通过这三种支付方式的其中一种转账给你。如果你只绑定了其中一种支付方式，比如微信，那么毫无疑问我们会转账到你的微信。如果绑定了其中两种或三种支付方式，那么我们转账的优先级为小额优先支付宝，大额优先银行卡，一般3000以内判断为小额，3000以上判断为大额，有特殊转账需求可以微信跟承兑商联系。</p>
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
        margin: 16px 0;
      }
    }
  }
</style>
