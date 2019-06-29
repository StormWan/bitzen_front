<template>
  <div class="service">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="BlockPay 是如何收取服务费的?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>关于 ExinOne 的相关费率标准，说明如下：</p>
      <h5>1、ExinOne 的平台服务费</h5>
      <ul>
        <li>ExinOne 平台服务费统一为 0.2%，服务费将从您的成交总额中扣除。若成交后获得比特币资产，则支付比特币平台服务费。</li>
        <li>ExinOne 平台服务费优先使用点卡 EPC 余额扣除。</li>
      </ul>
      <h5>2、币币交易手续费</h5>
      <ul>
        <li>ExinOne 平台的币币交易是直接调取交易所 API 完成真实成交，相关手续费是对应的交易所收取的，具体以交易所的公告为准。《火币费率标准》、《Bigone费率标准》。</li>
        <li>EPC 点卡不能抵扣交易所手续费。</li>
      </ul>
      <h5>3、提币手续费</h5>
      <ul>
        <li>ExinOne 是基于 Mixin Network 开发的，用户从 ExinOne 钱包提币去其他平台或钱包，所需要的手续费是根据网络拥堵程度通过算法自动调整的，收费率略高于正常的矿工费，较高的部分给予结点维护系统，具体的说明参见 Mixin 官方说明：《为什么天然气费高，哪里检查燃气费》。</li>
      </ul>
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
        margin: 15px 0;
      }
      h5{
        margin: 15px 0;
      }
      ul{
        margin-left: 30px;
        text-align: justify;
        li{
          font-size: 15px;
          list-style-type: disc;
        }
      }
    }
  }
</style>
