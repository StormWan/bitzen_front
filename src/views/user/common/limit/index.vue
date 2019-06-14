<template>
  <div class="service">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="为什么限单?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <h5>有两个原因：</h5>
      <p>Bit-OX 以市价单提交到交易所，考虑到流动性问题，大额订单可能吃单严重，导致交易成本较高，为了维护用户利益，Bit-OX 必须限制单笔订单的额度。</p>
      <p>另外，Bit-OX 宗旨是服务散户，对于大额交易需求，建议直接联系客服小助手处理，Bit-OX 提供大额场外撮合服务，避免拉盘砸盘，客服微信：exin512。</p>
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
        text-indent: 2em;
        margin: 20px 0;
      }
      h5{
        margin: 20px 0;
      }
    }
  }
</style>
