<template>
  <div class="service">
    <!--头部标题-->
    <div class="head">
      <div class="Arrow" @click="Arrow">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="title">卖出数字货币时如何收款?</div>
    </div>
    <div class="content">
      <p>Bit-OX 服务最后一页【我的】，有一个【收款账户】，用户下卖单必须先绑定至少一种收款方式才可以下单，目前平台支持三种收款方式：微信、支付宝和银行卡。比如是用户的实名收款账户。</p>
      <p>当你卖出数字货币时，我们将通过这三种支付方式的其中一种转账给你。如果你只绑定了其中一种支付方式，比如微信，那么毫无疑问我们会转账到你的微信。如果绑定了其中两种或三种支付方式，那么我们转账的优先级为小额优先支付宝，大额优先银行卡，一般3000以内判断为小额，3000以上判断为大额，有特殊转账需求可以微信跟承兑商联系。</p>
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
  .service{
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
        margin: 16px 0;
      }
    }
  }
</style>
