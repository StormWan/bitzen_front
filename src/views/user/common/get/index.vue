<template>
  <div class="Price">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="实际到手的币的数量和预估的不一样?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>ExinOne 是数字币投资工具，本身并非交易所，用户在 ExinOne 下单并支付后，ExinOne 将用户的订单提交到相应交易所以市价单成交，以下三个原因可能导致实际成交数量与预估值不一致：</p>
      <ul>
        <li>下单和提交订单之间会有时间差，数字币价格可能发生波动</li>
        <li>ExinOne 以最优价格进行预估，但是最优价的深度可能不够，市价成交可能导致更高的成本</li>
        <li>交易所将扣除成交后的币相应的手续费，如果点卡 EPC 余额不足，ExinOne 也将扣除相应的技术服务费</li>
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
  .Price{
    font-size: 17px;
    /*内容*/
    .content{
      width: 92%;
      margin: 0 auto;
      p{
        font-size: 15px;
        line-height: 20px;
      }
      ul{
        margin-left: 22px;
        li{
          font-size: 14px;
          list-style-type: disc;
          margin: 20px 0;
        }
      }
    }
  }
</style>
