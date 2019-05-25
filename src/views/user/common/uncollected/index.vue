<template>
  <div class="service">
    <!--头部标题-->
    <div class="head">
      <div class="Arrow" @click="Arrow">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="title">卖出数字货币订单未收到款怎么办?</div>
    </div>
    <div class="content">
      <p>卖出数字货币首先用户需要完成支付对应的币种，支付完成后，正常5-10分钟，承兑商收到订单会处理，如长时间未收到款请通过以下几种方式联系平台。</p>
      <p>小助手微信：exin512；</p>
      <p>Mixin ID：37026545；</p>
      <p>电话：13106634462；</p>
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
      font-size: 16px;
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
