<template>
  <div class="Explain">
    <div class="Explain_text">
      <ol type="1">
        <li v-for="(item,index) in Explain" :key="index">
          <div>{{index + 1}}、</div>
          <div>{{item.text}}</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      // 说明
      Explain: [
        {
          text: 'Bit-OX C2C交易除了USDT为直接交易，其它均为币币交易多步并一步，比如购买XIN，实际为先兑换为USDT，再兑换为BTC，再兑换为XIN，当前价格仅供参考，以实际交割价为准。'
        },
        {
          text: 'C2C总交易额超过 1000 USDT必须先进行实名认证。'
        },
        {
          text: '如有大额交易需求可直接联系 ExinOne 客服如果您不能完全理解 ExinOne 提供的服务，建议下小订单尝试。'
        },
        {
          text: 'C2C交易服务时间为早上7点到晚上12点如需帮助请联系 Bit-OX 客服，Mixin ID：28749，微信：jc_castle'
        },
        {
          text: '所有承兑商均已通过 Bit-ox 认证，您每次兑换会冻结承兑商资产，承兑商无法在资产不够时接单，请放心兑换。'
        },
        {
          text: '所有承兑商均需提供保证金并已实名认证，请放心兑换'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
  /*说明*/
  .Explain{
    width: 100%;
    padding: 20px 0;
    margin-top: 20px;
    border-top: 10px solid rgba(0,0,0,.05);
    text-align: left;
    .Explain_text{
      width: 85%;
      margin: 0 auto;
      ol{
        li{
          display: flex;
          font-size: 12px;
          margin: 5px 0px;
          div:nth-child(1){
            /*padding-right: 3px;*/
            color: #A9A9A9;
          }
          div:nth-child(2){
            color: #808080;
          }
        }
      }
    }
  }
</style>
