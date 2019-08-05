<template>
  <div class="bb_order">
    <!--标题-->
    <div class="head">
      <van-nav-bar
        :title="symbol + ' ' + side"
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

          <md-detail-item :content="price + ' ' + pair" title="成交均价" />

          <md-detail-item :content="pay_amount + ' ' + pay_asset" title="兑换数量" />

          <md-detail-item v-if="!all_price" :content="'- -' + ' ' + symbol" title="兑换所得" />
          <md-detail-item v-else :content="all_price + ' ' + symbol" title="兑换所得" />

          <md-detail-item v-if="!fee_cost" :content="'- -' + ' ' + symbol" title="交易所手续费" />
          <md-detail-item v-else :content="fee_cost + ' ' + symbol" title="交易所手续费" />

          <md-detail-item v-if="!filled_cost" :content="'- -' + ' ' + symbol" title="服务费" />
          <md-detail-item v-else :content="filled_cost + ' ' + symbol" title="服务费" />

          <md-detail-item v-if="!pair_price" :content="'- -' + ' ' + symbol" title="成交获得" />
          <md-detail-item v-else :content="pair_price + ' ' + symbol" title="成交获得" />
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
      <div class="Explain">如需帮助请联系BlockPay客服，Mixin ID：28749，微信：jc_castle</div>
    </div>
  </div>
</template>

<script>
import { Field, DetailItem } from 'mand-mobile'
import { Icon, Progress, Step, Steps, NavBar, Toast } from 'vant'
export default {
  data () {
    return {
      active: 0,
      item_pure: '',
      item_pow: '',
      pair: '',
      side: '',
      price: '- -',
      pay_amount: '- -',
      pay_asset: '',
      symbol: '',
      title: '支付状态',
      pair_price: '',
      ex_state: '订单处理状态',
      tr_state: '处理结果',
      title_st: false,
      ex_st: false,
      tr_st: false,
      // 买入 卖出
      filled_cost: '',
      // 手续费
      fee_cost: '',
      all_price: '',
      lists: [],
      // 数据状态
      data_item: true
    }
  },
  methods: {
    // 点击返回图标返回
    Arrow () {
      this.$router.go(-1)
    },
    // 数据渲染
    async api () {
      // 数据获取
      const { data } = await this.$api.bb.orders(this.$route.params.id)
      if (data.code === 200) {
        this.lists = data.data
        console.log(this.lists)
        if (this.lists.transfer_state === 'completed') {
          this.data_item = false
        } else {
          this.data_item = false
        }
      } else {
        Toast('服务器发生错误')
      }
      // 下单时间渲染管理
      this.item()
      this.pair = this.lists.pair.pair
      // 兑换数量价格
      if (this.lists.side === 'buy' && this.lists.exchangeinstantordermodel) {
        this.fee_cost = Math.round(this.lists.exchangeinstantordermodel.fee_cost * 100000000) / 100000000
        this.pair_price = Math.floor((this.lists.exchangeinstantordermodel.filled - this.lists.exchangeinstantordermodel.fee_cost - (this.lists.pair.fee * (this.lists.exchangeinstantordermodel.filled - this.lists.exchangeinstantordermodel.fee_cost))) * 100000000) / 100000000
        this.all_price = Math.floor(this.lists.exchangeinstantordermodel.filled * 100000000) / 100000000
        this.filled_cost = Math.floor((this.lists.pair.fee * (this.lists.exchangeinstantordermodel.filled - this.lists.exchangeinstantordermodel.fee_cost)) * 100000000) / 100000000
      } else if (this.lists.side === 'sell' && this.lists.exchangeinstantordermodel) {
        this.fee_cost = Math.round(this.lists.exchangeinstantordermodel.fee_cost * 100000000) / 100000000
        this.pair_price = Math.floor((this.lists.exchangeinstantordermodel.cost - this.lists.exchangeinstantordermodel.fee_cost - (this.lists.pair.fee * (this.lists.exchangeinstantordermodel.cost - this.lists.exchangeinstantordermodel.fee_cost))) * 100000000) / 100000000
        this.all_price = Math.floor(this.lists.exchangeinstantordermodel.cost * 100000000) / 100000000
        this.filled_cost = Math.floor((this.lists.pair.fee * (this.lists.exchangeinstantordermodel.cost - this.lists.exchangeinstantordermodel.fee_cost)) * 100000000) / 100000000
      }
      // 成交方式
      if (this.lists.side === 'buy') {
        this.side = '买入'
        this.pay_asset = this.lists.pair.quote.symbol
        this.symbol = this.lists.pair.base.symbol
      } else if (this.lists.side === 'sell') {
        this.side = '卖出'
        this.pay_asset = this.lists.pair.base.symbol
        this.symbol = this.lists.pair.quote.symbol
      }
      // 兑换价格
      if (this.lists.exchangeinstantordermodel) {
        if (!this.lists.exchangeinstantordermodel.average_price) {
          this.price = '- -'
        } else {
          this.price = Math.round(this.lists.exchangeinstantordermodel.average_price * 10000) / 10000
        }
      }
      // 兑换数量
      if (!this.lists.pay_amount) {
        this.pay_amount = '- -'
      } else {
        this.pay_amount = Math.round(this.lists.pay_amount * 100) / 100
      }
      // 成交状态
      this.status()
    },
    // 下单时间渲染管理
    item () {
      let year = this.lists.created.substring(0, 4)
      let month = this.lists.created.substring(5, 7)
      let day = this.lists.created.substring(8, 10)
      this.item_pure = year + month + day + this.lists.created.substring(11, 13) + this.lists.created.substring(14, 16) + this.lists.created.substring(17, 19) + this.lists.created.substring(20, 26)
      this.item_pow = this.lists.created.substring(0, 10) + ' ' + this.lists.created.substring(11, 19)
    },
    // 成交状态
    status () {
      if (this.lists.state) {
        this.active = 0
        if (this.lists.state === 'paid') {
          this.title = '已支付'
          this.title_st = false
        } else {
          this.title = '未支付'
          this.title_st = true
        }
      }
      if (this.lists.exchange_state) {
        this.active = 1
        if (this.lists.exchange_state === 'pending') {
          this.ex_state = '未挂单'
          this.ex_st = false
        } else if (this.lists.exchange_state === 'open') {
          this.ex_state = '已挂单'
          this.ex_st = false
        } else if (this.lists.exchange_state === 'closed') {
          this.ex_state = '兑换完毕'
          this.ex_st = false
        } else if (this.lists.exchange_state === 'cancled') {
          this.ex_state = '已取消'
          this.ex_st = true
        } else {
          this.ex_state = '挂单失败'
          this.ex_st = true
        }
      }
      if (this.lists.transfer_state) {
        if (this.lists.transfer_state === 'pending') {
          this.active = 1
          this.tr_state = '待转账'
          this.tr_st = false
        } else if (this.lists.transfer_state === 'completed') {
          this.tr_state = '已完成'
          this.active = 2
          this.tr_st = false
        } else {
          this.tr_state = '挂单失败'
          this.active = 2
          this.tr_st = true
        }
      }
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
  async activated () {
    this.api()
    // 数据获取
    let set = setInterval(() => {
      if (this.data_item) {
        this.api()
        console.log(456)
      } else {
        clearInterval(set)
      }
    }, 3000)
  },
  watch: {
    '$route' () {
      this.data_item = false
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
          line-height: 33px;
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
    .md-field-content{
      color: red;
      .md-detail-item:nth-last-child(1){
        div{
          color: skyblue;
        }
      }
    }
    /*说明*/
    .Explain{
      color: #999999;
      font-size: 14px;
      text-align: justify;
      padding: 10px 30px;
      line-height: 18px;
    }
  }
</style>
