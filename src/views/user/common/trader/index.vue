<template>
  <div class="delay">
    <!--头部标题-->
    <div class="head">
      <div class="Arrow" @click="Arrow">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="title">关于 Bit-Ox 平台承兑商的说明</div>
    </div>
    <div class="content">
      <h5>亲爱的用户</h5>
      <p>Bit-OX 给用户提供简单易用的便捷的场外平台，所有的买入和卖出的 C2C 交易区，平台统一定价，无溢价，承兑商仅负责做市商，完成交易。</p>
      <p>目前，Bit-OX 平台上线了商家系统，会根据用户下单金额及收付款方式，自动分配订单给承兑商，能够最大效率的提高用户体验，优化流程。后台认证的承兑商，都是平台合作很多年，且经过 Bit-OX 严格的商家培训，并有着丰富经验，也签订了承兑商服务协议的商家。对于安全性、服务效果和体验都有保证，如果出现交易纠纷，可直接联系 Bit-OX 小助手，平台担保负责，请放心。</p>
      <p>为了统一服务入口，所有有关平台使用的问题，以及订单疑问，用户可直接联系 Bit-OX 小助手，微信：exin512，小助手会统一跟承兑商沟通处理。</p>
      <p>感谢你对 Bit-OX 的支持！</p>
      <h6>Bit-OX 团队</h6>
      <h6>2019 年 5 月 23 日</h6>
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
  .delay{
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
    }
  }
</style>
