<template>
    <div class="fixed">
      <!--头部标题-->
      <div class="head">
        <div class="Arrow" @click="Arrow">
          <van-icon name="arrow-left"></van-icon>
        </div>
        <div class="title">关于 BlockPay 钱包的说明</div>
      </div>
      <!--内容-->
      <div class="content">

        <div>
          <h5>一、首先，要明白定投的概念是什么？</h5>
          <p>定投：“定期定额投资”的简称，即指在固定的时间以固定的金额分批次购买指定的币种。</p>
        </div>
        <div>
          <h5>二、定投有什么特色？</h5>
          <p>1、弱化入场时机的重要性</p>
          <p>定投是分批次分时间段的购买，在看不准行情的情况下，最大程    度的降低了风险，弱化入场时机的重要性，币跌了，同样的价格可以买到数量更多的币，降低持仓成本，行情波动时回本更快，同样价格收益率会更高。</p>
          <p>2、投资方式简单</p>
          <p>相对于自己购买或者一次性投资，定投可以自定义投资组合和比例，一次性缴费即可一键购买放币，操作更加简单易用。哪怕没有时间去研究行情涨跌和投资技巧，一周或者一个月一次定投也只需要两分钟就可以搞定了。</p>
          <p>3、门槛低</p>
          <p>定投降低了数字货币入场的门槛，定投的特色是用未来的收入来投资，资金是分批次入场，不会一次有很大的压力，而且定投更看重长期收益，是个细水长流、积少成多的过程。</p>
        </div>
        <div>
          <h5>三、定投案例分享：</h5>
          <p>
            <img src="../../../../assets/map.jpg" alt="">
          </p>
          <p>实际上，只要市场下跌，原有的持仓都是亏损的。但是如果使用定投，在下跌中你能买到更多的份额，从而摊薄平均持仓成本。</p>
          <p>一旦价格回升，你赚钱的几率更大，就像上面的“微笑曲线”一样，在 BTC 价格还没有回到 8000 时，用定投的你已经回本并且享受收益了。</p>
        </div>
        <div>
          <h5>四、定投小建议：</h5>
          <p>1、关注长期收益，而不是眼前的得失。</p>
          <p>2、从长远投资的角度看，定投建议投资主流币价值币。</p>
          <p>3、定投被称为熊市最佳伴侣，越是熊市越不能放弃，熊市是低价吸筹最好的时候，也是分摊持仓成本最佳时机。</p>
          <p>4、定投不需要止损，但需要止盈，设置合适的心理止盈价，在牛市时分批出仓。</p>
        </div>
        <div>
          <p>根据定投的原理，以固定金额投资，低价位时购入更多份额，高价位购入较少份额，以此降低平均持仓成本。</p>
          <p>相比于“一次性投资”，定投具有分散单一时点高位买入风险的特点。</p>
        </div>
        <div>
          <p>特别是在震荡市和“不轻言底”的熊市，定投能帮助投资者在低点积累到更多廉价筹码，从而摊薄资金成本。当市场向好时，定投能更快获益。</p>
        </div>
        <div>
          <p>非洲经济学家 Dambisa Moyo 曾说过：种一棵树最好的时间是十年前，其次是现在。而定投最佳的时机就是现在！</p>
        </div>

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
  .fixed{
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
    .content{
      width: 92%;
      margin: 0 auto;
      div{
        margin: 20px 0;
        overflow: hidden;
        p{
          margin: 3px 0;
          font-size: 16px;
          img{
            width: 100%;
          }
        }
        h5{
          margin: 5px 0;
        }
      }
    }
  }
</style>
