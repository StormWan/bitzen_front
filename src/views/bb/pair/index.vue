<template>
    <div class="Currency">
      <!--头部标题-->
      <van-nav-bar
        :title=pair.pair
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <!--详情-->
      <detail :sellerInfo="sellerInfo" :buyerInfo="buyerInfo"></detail>

      <van-tabs @click="tabChange" sticky>
        <!--金额-->
        <div class="showPriceInfo">
          <div class="price_bid">
            <div class="logo_title">
              <div class="logoImg" v-if="price_logoImg">
                <img :src="price_logoImg" alt="">
              </div>
              <div class="price_title">{{price_title}}</div>
            </div>
            <div class="price_bid" :class="{active: active_index === 1}">{{price_bg}}</div>
          </div>
        </div>
<!--        买入-->
        <van-tab title="买入">
          <!--数量价格0-->
          <div class="md-example-child md-example-child-input-item-3" v-if="active_index === 0">
            <md-field :title="md_title">
              <md-input-item
                type="money"
                v-model="value"
                :brief="brief"
                :placeholder="placeholder"
                :size="size"
                is-amount
                is-highlight
                ref="input10"
                clearable
                is-virtual-keyboard
                :maxlength="input_size"
                @focus="foc_market"
              >
              </md-input-item>
            </md-field>
          </div>
        </van-tab>

<!--        卖出-->
        <van-tab title="卖出">
          <!--数量价格1-->
          <div class="md-example-child md-example-child-input-item-3" v-if="active_index === 1">
            <md-field :title="md_title">
              <md-input-item
                type="money"
                v-model="value"
                :brief="brief"
                :placeholder="placeholder"
                :size="size"
                is-amount
                is-highlight
                ref="input10"
                clearable
                is-virtual-keyboard
                :maxlength="input_size"
                @focus="foc_market"
              >
              </md-input-item>
            </md-field>
          </div>
        </van-tab>
      </van-tabs>
      <!--按钮-->
      <orderButton :index="active_index" @value_but="value_but" :Order="Order_active" :symbol="symbol" :wallet="wallet_data" :id="pair.id" :asset_id="asset_id" :value="value"></orderButton>
      <!--钱包-->
      <bb_wallet :pair="pair" @wallet="wallet" :index="active_index" :symbol="symbol"></bb_wallet>
      <!--说明-->
      <Tips></Tips>
    </div>
</template>

<script>
import { Icon, Toast, Switch, Tab, Tabs, NavBar } from 'vant'
import { InputItem, Field } from 'mand-mobile'
// eslint-disable-next-line camelcase
import bb_wallet from '../../../components/wallet_mode'
import Tips from './Tips_com'
import details from './details_com'
import orderButton from './order_but_com'

export default {
  components: {
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Switch.name]: Switch,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    // 钱包
    'bb_wallet': bb_wallet,
    // 提示
    'Tips': Tips,
    // 标题数据
    'detail': details,
    // 下单按钮
    'orderButton': orderButton
  },
  data () {
    return {
      buyerInfo: [],
      sellerInfo: [],
      best_buy_depth: [],
      best_sell_depth: [],
      // 接收数据
      pair: [],
      active_index: 0,
      value: '',
      brief: '',
      placeholder: '',
      Order_active: false,
      md_title: '',
      input_size: 9,
      buy_price: '',
      money: '',
      price_bg: '0',
      price_logoImg: '',
      price_title: '',
      pla_money: '0',
      // 定时器
      set: false,
      show: false,
      time: 10,
      wallet_data: '',
      symbol: '',
      asset_id: ''
    }
  },
  methods: {
    // input光标
    foc_market () {
      document.body.scrollTop = 300
      document.documentElement.scrollTop = 300
    },
    wallet (msg) {
      this.wallet_data = msg
    },
    // 返回上一页
    onClickLeft () {
      this.$router.go(-1)
      localStorage.removeItem('Currency')
    },
    // 买入卖出点击点击
    tabChange (e) {
      this.active_index = e
      this.price_logoImg = ''
      // 红点提示
      if (e === 1) {
        this.symbol = this.pair.base.symbol
        this.asset_id = this.pair.base.asset_id
        this.brief = '最小下单 ' + (Math.floor(this.pair.sell_min * 100)) / 100 + ' ' + this.pair.base.symbol + ', 最大下单 ' + ((Math.floor(this.pair.sell_max * 100)) / 100).toFixed(this.pair.sell_decimal_digit) + ' ' + this.pair.base.symbol
        this.value = ''
        this.price_bg = Math.floor(this.pair.bestorderbookmodel.best_sell_price * 10000) / 10000
        // input框提示
        this.placeholder = '请输入兑换数量'
        if (this.pair.bestorderbookmodel.best_sell_exchange.logo_32) {
          this.price_logoImg = this.pair.bestorderbookmodel.best_sell_exchange.logo_32
        }
        this.price_title = this.pair.bestorderbookmodel.best_sell_exchange.name
        this.pla_money = (Math.floor(this.pair.bestorderbookmodel.best_sell_price * 10000) / 10000).toString()
      } else {
        this.symbol = this.pair.quote.symbol
        this.asset_id = this.pair.quote.asset_id
        this.brief = '最小下单 ' + (Math.floor(this.pair.buy_min * 100)) / 100 + ' ' + this.pair.quote.symbol + ', 最大下单 ' + ((Math.floor(this.pair.buy_max * 100)) / 100).toFixed(this.pair.buy_decimal_digit) + ' ' + this.pair.quote.symbol
        this.value = ''
        this.price_bg = Math.floor(this.pair.bestorderbookmodel.best_buy_price * 10000) / 10000
        // input框提示
        this.placeholder = '请输入兑换数量'
        if (this.pair.bestorderbookmodel.best_buy_exchange.logo_32) {
          this.price_logoImg = this.pair.bestorderbookmodel.best_buy_exchange.logo_32
        }
        this.price_title = this.pair.bestorderbookmodel.best_buy_exchange.name
        this.pla_money = (Math.floor(this.pair.bestorderbookmodel.best_buy_price * 10000) / 10000).toString()
      }
    },
    // 钱包选择付款
    wallet_box () {
      if (!this.triangle_active) {
        this.triangle_active = true
      }
    },
    async api () {
      const { data } = await this.$api.bb.pairDetail(this.$route.params.id)
      if (data.code === 200) {
        this.pair = data.data
        if (this.active_index === 0) {
          this.symbol = data.data.quote.symbol
          this.asset_id = this.pair.quote.asset_id
          // 渲染
          if (this.pair.bestorderbookmodel.best_buy_exchange.logo_32) {
            this.price_logoImg = this.pair.bestorderbookmodel.best_buy_exchange.logo_32
          }
          this.pla_money = (Math.floor(this.pair.bestorderbookmodel.best_buy_price * 10000) / 10000).toString()
          this.price_title = this.pair.bestorderbookmodel.best_buy_exchange.name
          this.price_bg = Math.floor(this.pair.bestorderbookmodel.best_buy_price * 10000) / 10000
          this.best_buy_depth = JSON.parse(data.data.bestorderbookmodel.best_buy_depth)
          this.buyerInfo = this.best_buy_depth.bids.slice(this.item - 10, this.time)
          this.sellerInfo = this.best_buy_depth.asks.slice(this.item - 10, this.time)
        } else {
          this.asset_id = this.pair.base.asset_id
          this.symbol = data.data.base.symbol
          // 渲染
          if (this.pair.bestorderbookmodel.best_sell_exchange.logo_32) {
            this.price_logoImg = this.pair.bestorderbookmodel.best_sell_exchange.logo_32
          }
          this.pla_money = (Math.floor(this.pair.bestorderbookmodel.best_sell_price * 10000) / 10000).toString()
          this.price_title = this.pair.bestorderbookmodel.best_sell_exchange.name
          this.price_bg = Math.floor(this.pair.bestorderbookmodel.best_sell_price * 10000) / 10000
          this.best_sell_depth = JSON.parse(data.data.bestorderbookmodel.best_sell_depth)
          this.buyerInfo = this.best_sell_depth.bids.slice(this.item - 10, this.time)
          this.sellerInfo = this.best_sell_depth.asks.slice(this.item - 10, this.time)
        }
      } else {
        Toast('获取数据失败，请刷新页面')
      }
    },
    value_but (msg) {
      this.value = ''
    }
  },
  computed: {
    // input框value值监听
    // eslint-disable-next-line vue/return-in-computed-property
    size (e) {
      let that = this
      // 判断active_index为0时的事件
      if (this.active_index === 0) {
        if (e.value.match(/^\d*(\.?\d{0,3})/g)[0].length + 1 === this.value.length) {
          that.input_size = that.value.length
        } else {
          that.input_size = 9
        }
        if (this.value) {
          that.md_title = '请输入正确金额'
          if (this.value === '0' || this.value === '.' || Math.floor(this.pair.buy_min * 100) / 100 > this.value) {
            that.Order_active = false
          } else {
            that.Order_active = true
            that.md_title = '大约可以兑换' + ' ' + (this.value / this.pair.bestorderbookmodel.best_buy_price).toFixed(5) + ' ' + this.pair.base.symbol
            // 计算超出金额
            if (parseFloat(this.value) > parseFloat(this.pair.buy_max)) {
              that.Order_active = false
              that.brief = '你已超出约' + ' ' + (this.value - this.pair.buy_max).toFixed(3) + ' ' + this.pair.quote.symbol
            } else {
              that.brief = '最小下单 ' + Math.floor(this.pair.buy_min * 100) / 100 + ' ' + this.pair.quote.symbol + ', 最大下单 ' + ((Math.floor(this.pair.buy_max * 100)) / 100).toFixed(this.pair.buy_decimal_digit) + ' ' + this.pair.quote.symbol
            }
          }
        } else {
          that.Order_active = false
          that.md_title = '兑换数量'
        }
      }
      // 判断active_index为1时的事件
      if (this.active_index === 1) {
        if (e.value.match(/^\d*(\.?\d{0,1})/g)[0].length + 1 === this.value.length) {
          that.input_size = that.value.length
        } else {
          that.input_size = 9
        }
        that.md_title = ''
        if (this.value) {
          that.md_title = '请输入正确金额'
          if (this.value === '0' || this.value === '.' || Math.floor(this.pair.sell_min * 100) / 100 > this.value) {
            that.Order_active = false
          } else {
            that.Order_active = true
            that.md_title = '大约可以兑换' + ' ' + (this.value * this.pair.bestorderbookmodel.best_sell_price).toFixed(4) + ' ' + this.pair.quote.symbol
            // 计算超出金额
            if (parseFloat(this.value) > parseFloat(this.pair.sell_max)) {
              that.Order_active = false
              that.brief = '你已超出约' + ' ' + (this.value - this.pair.sell_max).toFixed(2) + ' ' + this.pair.base.symbol
            } else {
              that.brief = '最小下单 ' + Math.floor(this.pair.sell_min * 100) / 100 + ' ' + this.pair.base.symbol + ', 最大下单 ' + (Math.floor(this.pair.sell_max * 100) / 100).toFixed(this.pair.sell_decimal_digit) + ' ' + this.pair.base.symbol
            }
          }
        } else {
          that.Order_active = false
          that.md_title = '兑换数量'
        }
      }
    },
    fixed () {
      let that = this
      if (this.money) {
        if (that.value) {
          if (this.active_index === 0) {
            that.md_title = '大约可以兑换' + ' ' + (that.value / this.money).toFixed(5) + ' ' + that.pair.base.symbol
          }
          if (this.active_index === 1) {
            that.md_title = '大约可以兑换' + ' ' + (this.money / this.value).toFixed(5) + ' ' + that.pair.base.symbol
          }
        }
      }
      return that.md_title
    }
  },
  // keep-alive 组件激活时调用
  async activated () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.set = false
    await this.api()
    let set = await setInterval(() => {
      if (this.set === true) {
        clearInterval(set)
      } else {
        this.api()
      }
    }, 3000)
    // 红点提示
    if (this.active_index === 0) {
      this.brief = '最小下单 ' + (Math.floor(this.pair.buy_min * 100)) / 100 + ' ' + this.pair.quote.symbol + ', 最大下单 ' + ((Math.floor(this.pair.buy_max * 100)) / 100).toFixed(this.pair.buy_decimal_digit) + ' ' + this.pair.quote.symbol
    } else {
      this.brief = '最小下单 ' + (Math.floor(this.pair.buy_min * 100)) / 100 + ' ' + this.pair.base.symbol + ', 最大下单 ' + ((Math.floor(this.pair.buy_max * 100)) / 100).toFixed(this.pair.buy_decimal_digit) + ' ' + this.pair.base.symbol
    }

    // input框提示
    this.placeholder = '请输入兑换数量'
  },
  // 监听离开页面
  watch: {
    '$route' (to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.set = true
    }
  }
}
</script>

<style lang="less">
  .Currency{
    font-size: 16px;
    /*头部标题*/
    .top{
      border-bottom: 1px solid rgba(0,0,0,.07);
      position: relative;
      text-align: center;
      /*箭头*/
      .Arrow{
        position: absolute;
        left: 7%;
        color: #696969;
        font-size: 23px;
        top: 50%;
        transform: translate(0,-50%);
      }
      /*标题*/
      .title{
        color: #999;
        font-size: 18px;
        padding: 13px 0;
        span{
          vertical-align: middle;
        }
      }
    }
    /*金额*/
    .showPriceInfo{
      font-weight: bold;
      font-size: 27px;
      padding-top: 30px;
      .price_bid{
        width: 110px;
        border-radius: 50%;
        margin: 0 auto;
        color: #FFFAFA;
        /*background-color: #FF8C00;*/
        text-align: center;
        padding: 5px 5px;
        .logo_title{ // 币名字 + logo
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          .logoImg{
            width: 23px;
            margin: 0 3px 0 0px;
            img{
              width: 100%;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
            }
          }
          .price_title{
            font-size: 18px;
            color: #4682B4;
          }
        }
        .price_bid{
          margin: 5px 0;
          color: #228B22;
        }
        .active{
          color: #FF6347;
        }
      }
    }
    /*买入卖出*/
    .Business{
      display: flex;
      justify-content: center;
      color: #1E90FF;
      line-height: 40px;
      font-size: 18px;
      text-align: center;
      div{
        width: 120px;
        border: 1px solid #1E90FF;
      }
      .Purchase{
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .Sell_out{
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      .active{
        background-color: #1E90FF;
        color: white;
      }
    }
    /*计算大约可以买卖*/
    .Calculation{
      padding: 10px 0;
      text-align: center;
      font-size: 12px;
      color: #696969;
      span{
        color: #FF4500;
      }
    }
    /*数量价格*/
    .md-example-child-input-item-3{
      font-size: 16px;
      .md-field-header{
        margin-bottom: 50px;
      }
      .md-icon.icon-font.md{
        font-size: 20px;
      }
      .md-input-item .md-field-item-control{
        /*width: 100px;*/
        font-size: 18px;
        span:nth-child(1){
          font-size: 25px;
        }
      }
      .md-input-item-fake-placeholder{
        font-size: 18px;
      }
      .md-field{
        padding-bottom: 5px;
        padding-top: 5px;
        .md-field-title{
          font-size: 20px;
          width: 100%;
          text-align: center;
        }
        .md-field-item-content::before{
          background-color: #C5CAD5;
        }
        .md-field-item-children{
          margin-top: 8px;
          .md-input-item-brief{
            font-size: 12px;
            color: #6495ED;
          }
        }
        .md-field-item-content{
          min-height: 0px;
          height: 40px;
          margin-top: 40px;
          margin-bottom: 10px;
        }
        .md-field-title{
          font-size: 15px;
          color: #32CD32;
          position: absolute;
          left: 50%;
          transform: translate(-50%,0);
          padding: 10px;
        }
      }
      input{
        font-size: 20px;
      }
      /*下单*/
      .Place{
        width: 100%;
        padding-top: 30px;
        .Place_box{
          width: 80%;
          margin: 0 auto;
          background-color: #DCDCDC;
          text-align: center;
          line-height: 50px;
          color: white;
          font-weight: bold;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          display: block;
          border: none;
        }
        .active{
          background-color: #6495ED;
        }
      }
      /*定投*/
      .fixed{
        width: 80%;
        margin: 0 auto;
        .md-input-item .md-field-item-content{
          height: 40px;
          min-height: 0;
        }
        .md-input-item-fake, .md-input-item-input{
          height: 28px;
          font-size: 18px;
        }
      }
    }
  }
  /*弹起键盘*/
  .md-number-keyboard-container{
    height: 250px;
    .keyboard-number .keyboard-number-list .keyboard-number-item{
      height: 60px;
      line-height: 60px;
      font-size: 20px;
    }
    .keyboard-number .keyboard-number-list .keyboard-number-item.slidedown{
      -webkit-background-size: 25px;
      background-size: 25px;
    }
  }
</style>
