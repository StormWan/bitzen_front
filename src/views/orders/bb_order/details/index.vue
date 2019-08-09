<template>
  <div class="bb-order">
    <!--标题-->
      <van-nav-bar
        :title="symbol + ' ' + side"
        left-text="返回"
        left-arrow
        @click-left="toClickRight"
      />
    <div class="order-box">
      <!--订单详情-->
      <div class="md-example-child md-example-child-detail-item md-example-child-detail-item-0">
        <md-field>
          <md-detail-item :content="orderTime" :title="'No.' + orderNumber" bold class="order-number" />

          <md-detail-item :content="average_price + ' ' + pair" title="成交均价" />

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
      <div class="progress-bar-box">
        <div class="progress-bar">
          <van-steps :active="active" direction="vertical">
            <van-step :class="{active: title_state}">
              <h3>{{title}}</h3>
            </van-step>
            <van-step :class="{active: pending_order_state}">
              <h3>{{pendingOrder}}</h3>
            </van-step>
            <van-step :class="{active: process_result_state}">
              <h3>{{processResult}}</h3>
            </van-step>
          </van-steps>
        </div>
      </div>

      <!--说明-->
      <div class="explain-tip">如需帮助请联系BlockPay客服，Mixin ID：28749，微信：jc_castle</div>
    </div>
  </div>
</template>

<script>
import { Field, DetailItem } from 'mand-mobile'
import { Icon, Progress, Step, Steps, NavBar, Toast } from 'vant'
export default {
  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      active: 0,
      pair: '',
      side: '',
      pay_asset: '',
      symbol: '',
      title: '支付状态',
      pendingOrder: '订单处理状态',
      processResult: '处理结果',
      title_state: false,
      pending_order_state: false,
      process_result_state: false,
      orderList: [],
      // 数据状态
      data_item: true
    }
  },
  computed: {
    /**
     * 下单号
     * */
    orderNumber () {
      if (this.orderList.length !== 0) {
        let year = this.orderList.created.substring(0, 4)
        let month = this.orderList.created.substring(5, 7)
        let day = this.orderList.created.substring(8, 10)
        return year + month + day + this.orderList.created.substring(11, 13) + this.orderList.created.substring(14, 16) +
          this.orderList.created.substring(17, 19) + this.orderList.created.substring(20, 26)
      } else return ''
    },
    /**
     * 下单时间
     * */
    orderTime () {
      if (this.orderList.length !== 0) {
        return this.orderList.created.substring(0, 10) + ' ' + this.orderList.created.substring(11, 19)
      } else return ''
    },
    /**
     * 交易所手续费
     * */
    fee_cost () {
      if (this.orderList.length !== 0) {
        if (this.orderList.side === 'buy' && this.orderList.exchangeinstantordermodel) {
          return Math.round(this.orderList.exchangeinstantordermodel.fee_cost * 100000000) / 100000000
        } else if (this.orderList.side === 'sell' && this.orderList.exchangeinstantordermodel) {
          return Math.round(this.orderList.exchangeinstantordermodel.fee_cost * 100000000) / 100000000
        } else return ''
      } else return ''
    },
    /**
     * 成交获得
     * */
    pair_price () {
      if (this.orderList.length !== 0) {
        if (this.orderList.side === 'buy' && this.orderList.exchangeinstantordermodel) {
          return Math.floor(this.orderList.exchangeinstantordermodel.filled * 100000000) / 100000000
        } else if (this.orderList.side === 'sell' && this.orderList.exchangeinstantordermodel) {
          return Math.floor((this.orderList.exchangeinstantordermodel.cost - this.orderList.exchangeinstantordermodel.fee_cost - (this.orderList.pair.fee * (this.orderList.exchangeinstantordermodel.cost - this.orderList.exchangeinstantordermodel.fee_cost))) * 100000000) / 100000000
        } else return ''
      } else return ''
    },
    /**
     * 兑换所得
     * */
    all_price () {
      if (this.orderList.length !== 0) {
        if (this.orderList.side === 'buy' && this.orderList.exchangeinstantordermodel) {
          return Math.floor(this.orderList.exchangeinstantordermodel.filled * 100000000) / 100000000
        } else if (this.orderList.side === 'sell' && this.orderList.exchangeinstantordermodel) {
          return Math.floor(this.orderList.exchangeinstantordermodel.cost * 100000000) / 100000000
        } else return ''
      } else return ''
    },
    /**
     * 服务费
     * */
    filled_cost () {
      if (this.orderList.length !== 0) {
        if (this.orderList.side === 'buy' && this.orderList.exchangeinstantordermodel) {
          return Math.floor((this.orderList.pair.fee * (this.orderList.exchangeinstantordermodel.filled - this.orderList.exchangeinstantordermodel.fee_cost)) * 100000000) / 100000000
        } else if (this.orderList.side === 'sell' && this.orderList.exchangeinstantordermodel) {
          return Math.floor((this.orderList.pair.fee * (this.orderList.exchangeinstantordermodel.cost - this.orderList.exchangeinstantordermodel.fee_cost)) * 100000000) / 100000000
        } else return ''
      } else return ''
    },
    /**
     * 兑换价格
     * */
    average_price () {
      if (this.orderList.length !== 0) {
        if (this.orderList.exchangeinstantordermodel) {
          if (!this.orderList.exchangeinstantordermodel.average_price) {
            return '- -'
          } else return Math.round(this.orderList.exchangeinstantordermodel.average_price * 10000) / 10000
        } else return '- -'
      } else return '- -'
    },
    /**
     * 兑换数量
     * */
    pay_amount () {
      if (this.orderList.length !== 0) {
        if (!this.orderList.pay_amount) {
          return '- -'
        } else return Math.round(this.orderList.pay_amount * 100) / 100
      } else return '- -'
    }
  },
  methods: {
    // 点击返回图标返回
    toClickRight () {
      this.$router.go(-1)
    },
    // 数据渲染
    async getOrderDetail () {
      // 数据获取
      const { data } = await this.$api.bb.orders(this.$route.params.id)
      if (data.code === 200) {
        console.log(data.data)
        this.orderList = data.data[0]
        if (this.orderList.transfer_state === 'completed') {
          this.data_item = false
        } else {
          this.data_item = false
        }
      } else {
        Toast('服务器发生错误')
      }
      this.pair = this.orderList.pair.pair
      // 成交方式
      if (this.orderList.side === 'buy') {
        this.side = '买入'
        this.pay_asset = this.orderList.pair.quote.symbol
        this.symbol = this.orderList.pair.base.symbol
      } else if (this.orderList.side === 'sell') {
        this.side = '卖出'
        this.pay_asset = this.orderList.pair.base.symbol
        this.symbol = this.orderList.pair.quote.symbol
      }
      // 成交状态
      this.status()
    },
    // 成交状态
    status () {
      if (this.orderList.state) {
        this.active = 0
        if (this.orderList.state === 'paid') {
          this.title = '已支付'
          this.title_state = false
        } else {
          this.title = '未支付'
          this.title_state = true
        }
      }
      if (this.orderList.exchange_state) {
        this.active = 1
        if (this.orderList.exchange_state === 'pending') {
          this.pendingOrder = '未挂单'
          this.pending_order_state = false
        } else if (this.orderList.exchange_state === 'open') {
          this.pendingOrder = '已挂单'
          this.pending_order_state = false
        } else if (this.orderList.exchange_state === 'closed') {
          this.pendingOrder = '兑换完毕'
          this.pending_order_state = false
        } else if (this.orderList.exchange_state === 'cancled') {
          this.pendingOrder = '已取消'
          this.pending_order_state = true
        } else {
          this.pendingOrder = '挂单失败'
          this.pending_order_state = true
        }
      }
      if (this.orderList.transfer_state) {
        if (this.orderList.transfer_state === 'pending') {
          this.active = 1
          this.processResult = '待转账'
          this.process_result_state = false
        } else if (this.orderList.transfer_state === 'completed') {
          this.processResult = '已完成'
          this.active = 2
          this.process_result_state = false
        } else {
          this.processResult = '挂单失败'
          this.active = 2
          this.process_result_state = true
        }
      }
    }
  },
  async activated () {
    this.getOrderDetail()
    // 数据获取
    let set = setInterval(() => {
      if (this.data_item) {
        this.getOrderDetail()
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
  .bb-order{
    font-size: 18px;
    /*用户购买信息*/
    .order-box{
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
        .order-number{
          .md-detail-title{
            font-size: 13px;
          }
        }
      }
    }
    /*进度条*/
    .progress-bar-box{
      width: 100%;
      background: white;
      padding: 40px 0;
      .progress-bar{
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
    .explain-tip{
      color: #999999;
      font-size: 14px;
      text-align: justify;
      padding: 10px 30px;
      line-height: 18px;
      position: fixed;
      bottom:0px;
    }
  }
</style>
