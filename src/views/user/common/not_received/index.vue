<template>
  <div class="not_received">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="付款了没有收到币怎么办?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>ExinOne 平台 C2C 买入订单，需要用户手动线下完成转账付款，完成之后切记要点一下：【我已付款】按钮；</p>
      <p>如你已完成转账，并确认点击按钮，正常放币时间在 5-10 分钟，如果你长时间未收到放币，请通过以下方式联系平台：</p>
      <p>小助手微信：exin512；</p>
      <p>Mixin ID：37026545；</p>
      <p>电话：13106634462；</p>
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
  .not_received{
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
