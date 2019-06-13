<template>
  <div class="bb_order">
    <!--标题-->
    <div class="head">
      <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="BG">
      <!--订单详情-->
      <div class="md-example-child md-example-child-detail-item md-example-child-detail-item-0">
        <md-field>
          <md-detail-item :content="item_pow" :title="'No.' + item_pure" bold class="title" />
          <md-detail-item :content="price + ' ' + pair" title="兑换价格" />
          <md-detail-item :content="pay_amount + ' ' + pay_asset" title="兑换数量" />
          <md-detail-item :content="pair_price + ' ' + symbol" title="成交获得" />
        </md-field>
      </div>
      <!--进度条-->
      <div class="go_box">
        <div class="go">
          <van-steps :active="active" direction="vertical">
            <van-step :class="{active: title_st}">
              <h3>{{title}}</h3>
            </van-step>
            <van-step :class="{active: ex_st}">
              <h3>{{ex_state}}</h3>
            </van-step>
            <van-step :class="{active: tr_st}">
              <h3>{{tr_state}}</h3>
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
import { Icon, Progress, Step, Steps, NavBar } from 'vant'
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
      title: '支付状态',
      pair_price: '',
      ex_state: '订单处理状态',
      tr_state: '处理结果',
      title_st: false,
      ex_st: false,
      tr_st: false
    }
  },
  methods: {
    Arrow () {
      this.$router.go(-1)
    }
  },
  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [NavBar.name]: NavBar
  },
  activated () {
    // eslint-disable-next-line camelcase
    let obj_data = JSON.parse(localStorage.getItem('obj_data'))
    this.item_pure = obj_data.item
    this.item_pow = obj_data.item_pow
    this.pair = obj_data.pair
    this.pay_asset = obj_data.pay_asset
    this.symbol = obj_data.symbol
    // 成交方式
    if (obj_data.side === 'buy') {
      this.side = '买入'
    } else if (obj_data.side === 'sell') {
      this.side = '卖出'
    }
    // 兑换价格
    if (!obj_data.price) {
      this.price = '- -'
    } else {
      this.price = Math.round(obj_data.price * 100) / 100
    }
    // 兑换数量
    if (!obj_data.pay_amount) {
      this.pay_amount = '- -'
    } else {
      this.pay_amount = Math.round(obj_data.pay_amount * 100) / 100
    }
    // 成交状态
    if (obj_data.state) {
      this.active = 0
      if (obj_data.state === 'paid') {
        this.title = '已支付'
        this.title_st = false
      } else {
        this.title = '未支付'
        this.title_st = true
      }
    }
    if (obj_data.exchange_state) {
      this.active = 1
      if (obj_data.exchange_state === 'pending') {
        this.ex_state = '未挂单'
        this.ex_st = false
      } else if (obj_data.exchange_state === 'open') {
        this.ex_state = '已持单'
        this.ex_st = false
      } else if (obj_data.exchange_state === 'closed') {
        this.ex_state = '兑换完毕'
        this.ex_st = false
      } else if (obj_data.exchange_state === 'cancled') {
        this.ex_state = '已取消'
        this.ex_st = true
      } else {
        this.ex_state = '挂单失败'
        this.ex_st = true
      }
    }
    if (obj_data.transfer_state) {
      if (obj_data.transfer_state === 'pending') {
        this.active = 1
        this.tr_state = '待转账'
        this.tr_st = false
      } else if (obj_data.transfer_state === 'completed') {
        this.tr_state = '已完成'
        this.active = 2
        this.tr_st = false
      } else {
        this.tr_state = '支付失败'
        this.active = 2
        this.tr_st = true
      }
    }
    // 成交获得
    if (obj_data.pair_price === 'null') {
      this.pair_price = '- -'
    } else {
      this.pair_price = obj_data.pair_price
    }
  }
}
</script>

<style lang="less">
  .bb_order{
    font-size: 18px;
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
        .van-step--vertical{
          padding: 25px 0;
          .van-step__circle-container > i{
            top: 30px;
          }
          .van-step__line{
            top: 30px;
          }
        }
        .active{
          h3{
            color: red;
          }
          .van-icon-checked:before{
            color: red;
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
