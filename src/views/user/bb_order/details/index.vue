<template>
  <div class="bb_order">
    <!--标题-->
    <div class="head">
      <!--箭头-->
      <div class="left_arrow" @click="Arrow">
        <van-icon class="icon" name="arrow-left"></van-icon>
      </div>
      <!--title表头-->
      <div class="title">{{pair}} <span>{{side}}</span></div>
    </div>
    <div class="BG">
      <!--订单详情-->
      <div class="md-example-child md-example-child-detail-item md-example-child-detail-item-0">
        <md-field>
          <md-detail-item class="title" :title="'No.' + item_pure" :content="item_pow" bold />
          <md-detail-item title="兑换价格" :content="Math.round(price * 100) / 100 + ' ' + pair" />
          <md-detail-item title="兑换数量" :content="Math.round(pay_amount * 100) / 100 + ' ' + pay_asset" />
          <md-detail-item title="成交获得" :content="pair_price + ' ' + symbol" />
        </md-field>
      </div>
      <!--进度条-->
      <div class="go_box">
        <div class="go">
          <van-steps direction="vertical" :active="active">
            <van-step>
              <h3 :class="{active: title_sta}">{{title}}</h3>
            </van-step>
            <van-step>
              <h3>正在处理</h3>
            </van-step>
            <van-step>
              <h3>已完成</h3>
            </van-step>
          </van-steps>
        </div>
      </div>

      <!--说明-->
      <div class="Explain">如需帮助请联系Bit-OX客服，Mixin ID：28749，微信：jc_castle</div>
    </div>
  </div>
</template>

<script>
import { Field, DetailItem } from 'mand-mobile'
import { Icon, Progress, Step, Steps } from 'vant'
export default {
  data () {
    return {
      active: 0,
      item_pure: '',
      item_pow: '',
      pair: '',
      side: '',
      price: Number,
      pay_amount: Number,
      pay_asset: '',
      symbol: '',
      title: '',
      pair_price: '',
      title_sta: false
    }
  },
  methods: {
    Arrow () {
      this.$router.go(-1)
    },
    async api () {
      // const { data } = await this.$api.bb.orders()
      // console.log(data)
    }
  },
  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    [Step.name]: Step,
    [Steps.name]: Steps
  },
  async activated () {
    await this.api()
    this.item_pure = localStorage.getItem('item_pure')
    this.item_pow = localStorage.getItem('item_pow')
    this.pair = localStorage.getItem('pair')
    this.price = localStorage.getItem('price')
    this.pay_amount = localStorage.getItem('pay_amount')
    this.pay_asset = localStorage.getItem('pay_asset')
    this.symbol = localStorage.getItem('symbol')
    // 成交方式
    if (localStorage.getItem('side') === 'buy') {
      this.side = '买入'
    } else if (localStorage.getItem('side') === 'sell') {
      this.side = '卖出'
    }

    // 成交状态
    if (localStorage.getItem('value') === '0') {
      this.title = '支付成功'
      this.title_sta = false
    } else if (localStorage.getItem('value') === '50') {
      this.active = 1
      this.title = '支付成功'
    } else if (localStorage.getItem('value') === '100') {
      this.active = 2
      this.title = '支付成功'
    } else {
      this.title = '已取消'
      this.active = 0
      this.title_sta = true
    }

    // 成交获得
    if (localStorage.getItem('pair_price') === 'null') {
      this.pair_price = '- -'
    } else {
      this.pair_price = localStorage.getItem('pair_price')
    }
  }
}
</script>

<style lang="less">
  .bb_order{
    font-size: 18px;
    /*标题头部*/
    .head{
      position: relative;
      text-align: center;
      line-height: 80px;
      font-size: 19px;
      /*返回箭头*/
      .left_arrow{
        position: absolute;
        left: 10%;
        font-size: 20px;
        .icon{
          /*vertical-align: middle;*/
        }
      }
    }
    /*用户购买信息*/
    .BG{
      background: rgba(0,0,0,.02);
      /*订单详情*/
      .md-example-child-detail-item-0{
        font-size: 16px;
        padding: 15px 0;
        border-bottom: 5px solid rgba(0,0,0,.01);
        /*进度条*/
        .progress{
          padding: 15px 0;
        }
        .md-field{
          padding: 0 15px;
          margin: 0 15px;
          .md-detail-item{
            font-size: 16px;
            .md-detail-content{
              font-size: 14px;
            }
          }
          .md-detail-item.is-bold{
            .md-detail-content{
              font-size: 13px;
            }
          }
        }
        .md-detail-item{
          padding: 0;
          line-height: 30px;
        }
        .title{
          .md-detail-title{
            font-size: 13px;
          }
        }
        .tit{
          .md-detail-title{
            color: red;
          }
        }
      }
    }
    /*进度条*/
    .go_box{
      width: 100%;
      background: white;
      padding: 40px 0;
      .go{
        width: 40%;
        margin: 0 auto;
        .active{
          color: red;
        }
        .van-step--vertical{
          padding: 25px 0;
          .van-step__circle-container > i{
            top: 30px;
          }
          .van-step__line{
            top: 30px;
          }
        }
        .van-step--finish{
          color: #969799;
        }
      }
    }
    /*说明*/
    .Explain{
      color: #999999;
      font-size: 14px;
      text-align: justify;
      padding: 30px 30px;
      line-height: 20px;
    }
  }
</style>
