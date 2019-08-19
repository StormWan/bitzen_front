<template>
    <!--说明-->
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
  name: 'tips',
  data () {
    return {
      Explain: [
        {
          text: 'BlockPay提供交易所实时代交易服务。'
        },
        {
          text: '您在BlockPay提交的BTC/USDT交易订单将会提交到相应交易所以市价单成交，当前显示价格仅代表最新成交价' +
            '不代表交易价格，如果买卖价差较大，实际成交价可能和显示价格误差较大。'
        },
        {
          text: '估算价具有微小延迟，以实际成交价为准。'
        },
        {
          text: '在交易下单和BlockPay转账的数字货币均为BlockPay自有，为了服务更多用户，BlockPay可能限制最大可交易数量。'
        },
        {
          text: '如果您不能完全理解BlockPay提供的服务，建议下小订单尝试。'
        },
        {
          text: '如需帮助请联系BlockPay客服，Mixin ID：28749'
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
    .Explain_text{
      width: 85%;
      margin: 0 auto;
      ol{
        li{
          line-height: 16px;
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
