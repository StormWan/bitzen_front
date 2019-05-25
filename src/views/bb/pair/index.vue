<template>
    <div class="Currency">
      <!--遮罩层-->
      <div :class="{mask: triangle_active}" @click="mask"></div>

      <!--头部标题-->
      <div class="top">
        <!--返回-->
        <div class="Arrow" @click="Arrow">
          <van-icon name="arrow-left"></van-icon>
        </div>
        <div class="title">
          <span>
            <van-icon name="fire"></van-icon>
          </span>
          <span>{{pair.pair}}</span>
        </div>
      </div>

      <!--金额-->
      <div class="price">
        <div class="price_bg">
          <div class="price_img">
            <img :src="price_img" alt="">
          </div>
          <div>{{price_bg}}</div>
          <div class="price_title">{{price_title}}</div>
        </div>
      </div>

      <!--买入卖出-->
      <div class="Business">
        <div class="Purchase" :class="{active: active_index === 0}" @click="active_click(0)">买入</div>
        <div class="Sell_out" :class="{active: active_index === 1}" @click="active_click(1)">卖出</div>
      </div>

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
            is-virtual-keyboard
            clearable
            :maxlength="input_size"
          >
            <div class="input-operator" slot="right">
              <div>
                <van-switch
                  v-model="checked"
                  size="24px"
                />
              </div>
              <div class="title">
                <span :class="{active: checked === false}" v-if="checked === false">市价单</span><span :class="{active: checked === true}" v-if="checked === true">限价单</span>
              </div>
            </div>
          </md-input-item>
        </md-field>
        <!--定点买入金额-->
        <div class="fixed">
          <md-input-item
            type="money"
            v-model="money"
            :placeholder="pla_money"
            v-if="checked"
            :size="fixed"
          ></md-input-item>
        </div>
        <!--下单按钮-->
        <div class="Place">
          <div @click="but_submit" class="Place_box" :class="{active: Place_active}">下单{{quote_symbol}}</div>
        </div>
      </div>
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
            is-virtual-keyboard
            clearable
          >
            <div class="input-operator" slot="right">
              <div>
                <van-switch
                  v-model="checked"
                  size="24px"
                />
              </div>
              <div class="title">
                <span :class="{active: checked === false}" v-if="checked === false">市价单</span><span :class="{active: checked === true}" v-if="checked === true">限价单</span>
              </div>
            </div>
          </md-input-item>
        </md-field>
        <!--买入金额-->
        <div class="fixed">
          <md-input-item
            type="money"
            v-model="money"
            :placeholder="pla_money"
            v-if="checked"
            :size="fixed"
          ></md-input-item>
        </div>
        <!--下单-->
        <div class="Place">
          <div @click="but_submit" class="Place_box" :class="{active: Place_active}">下单{{base_symbol}}</div>
        </div>
      </div>

      <!--付款方式-->
      <div class="wallet_box" @click="wallet_box">
        <div class="wallet">
          <div class="Bank">
            <div class="left">
              <van-icon name="youzan-shield"></van-icon>
            </div>
            <div class="right">{{bank}} 钱包</div>
          </div>
          <div class="balance">
            <div class="left">
              <div>{{base_symbol}} 余额</div>
              <div>{{Math.floor(pair.buy_price * 100) / 100}}</div>
            </div>
            <!--三角形-->
            <div class="right" :class="{active: triangle_active}"></div>
          </div>
        </div>
      </div>

      <!--付款方式钱包-->
      <div class="dis_but" :class="{display: triangle_active}">
        <div class="title">请选择钱包</div>
        <!--钱包选择-->
        <div class="Choice">
          <div class="wallet_box" v-for="(item,index) in wallet" :key="index" @click="wallet_click(index)">
            <div class="wallet">
              <div class="Bank">
                <div class="left">
                  <van-icon :name="item.icon"></van-icon>
                </div>
                <div class="right">{{item.name}} 钱包</div>
              </div>
              <div class="balance">
                <div class="left">
                  <div>{{base_symbol}} 余额</div>
                  <div>{{Math.floor(pair.buy_price * 100) / 100}}</div>
                </div>
                <!--三角形-->
                <div class="right" :class="{active: index === icon_index}">
                  <van-icon name="passed"></van-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
</template>

<script>
import { Icon, Toast, Switch } from 'vant'
import { InputItem, Field, NumberKeyboard } from 'mand-mobile'
var msgpack = require('msgpack-lite')
var uuidv4 = require('uuid/v4')

// import '@examples/assets/images/bank-zs.svg'
export default {
  data () {
    return {
      // 接收数据
      pair: [],
      active_index: 0,
      value: '',
      brief: '',
      placeholder: '',
      Place_active: false,
      md_title: '',
      triangle_active: false,
      // 钱包数据
      wallet: [
        {
          name: 'Mixin',
          icon: 'youzan-shield'
        },
        {
          name: 'BlockPay',
          icon: 'youzan-shield'
        }
      ],
      icon_index: 0,
      bank: '',
      input_size: 9,
      Explain: [
        {
          text: 'Bit-OX提供交易所实时代交易服务。'
        },
        {
          text: '您在Bit-OX提交的BTC/USDT交易订单将会提交到相应交易所以市价单成交，当前显示价格仅代表最新成交价，不代表交易价格，如果买卖价差较大，实际成交价可能和显示价格误差较大。'
        },
        {
          text: '估算价具有微小延迟，以实际成交价为准。'
        },
        {
          text: '在交易下单和Bit-OX转账的数字货币均为Bit-OX自有，为了服务更多用户，Bit-OX可能限制最大可交易数量。'
        },
        {
          text: '如果您不能完全理解Bit-OX提供的服务，建议下小订单尝试。'
        },
        {
          text: '如需帮助请联系Bit-OX客服，Mixin ID：37026545，微信：ggyy'
        }
      ],
      buy_price: '',
      checked: false,
      money: '',
      quote_symbol: '',
      base_symbol: '',
      price_bg: '0',
      price_img: require('../../../assets/cat_top.jpg'),
      price_title: '',
      pla_money: '0',
      // 定时器
      set: false
    }
  },
  async mounted () {
  },
  methods: {
    // 箭头
    Arrow () {
      this.$router.go(-1)
      localStorage.removeItem('Currency')
    },
    // 买入卖出点击
    active_click (e) {
      this.active_index = e
      // 红点提示
      if (e === 1) {
        this.brief = '最小下单 ' + (Math.floor(this.pair.sell_min * 100)) / 100 + ' ' + this.pair.base.symbol + ', 最大下单 ' + ((Math.floor(this.pair.sell_max * 100)) / 100).toFixed(this.pair.sell_decimal_digit) + ' ' + this.pair.base.symbol
        this.value = ''
        this.price_bg = Math.floor(this.pair.bestorderbookmodel.best_sell_price * 10000) / 10000
        // input框提示
        this.placeholder = '请输入兑换数量'
        if (this.pair.quote.icon_url) {
          this.price_img = this.pair.quote.icon_url
        }
        this.price_title = this.pair.bestorderbookmodel.best_sell_exchange.name
        this.pla_money = (Math.floor(this.pair.bestorderbookmodel.best_sell_price * 10000) / 10000).toString()
      } else {
        this.brief = '最小下单 ' + (Math.floor(this.pair.buy_min * 100)) / 100 + ' ' + this.pair.quote.symbol + ', 最大下单 ' + ((Math.floor(this.pair.buy_max * 100)) / 100).toFixed(this.pair.buy_decimal_digit) + ' ' + this.pair.quote.symbol
        this.value = ''
        this.price_bg = Math.floor(this.pair.bestorderbookmodel.best_buy_price * 10000) / 10000
        // input框提示
        this.placeholder = '请输入兑换数量'
        if (this.pair.base.icon_url) {
          this.price_img = this.pair.base.icon_url
        }
        this.price_title = this.pair.bestorderbookmodel.best_buy_exchange.name
        this.pla_money = (Math.floor(this.pair.bestorderbookmodel.best_buy_price * 10000) / 10000).toString()
      }
    },
    // 下单按钮
    but_submit (e) {
      if (this.Place_active === true) {
        // this.value为0
        if (this.active_index === 0) {
          const obj = { service: 'bb', side: 'buy', type: 'market', pair_id: this.pair.id, wallet: this.bank }
          // buy/sell 买和卖; market/limit 市场表; mixin/blockpay 钱包;
          const memo = msgpack.encode(obj).toString('base64')
          const trace = uuidv4()
          // 买入金额
          const amount = this.value
          // 买入的用户ID
          // const asset = this.pair.base.asset_id
          const asset = this.pair.quote.asset_id
          // EOS_ASSET_ID = "f8127159-e473-389d-8e0c-9ac5a4dc8cc6"
          const recipient = '28536b52-f840-4366-8619-3872fb5b3164'
          const payUrl = `https://mixin.one/pay?recipient=${recipient}&asset=${asset}&amount=${amount}&trace=${trace}&memo=${memo}`
          window.location.href = payUrl
        } else {
          // this.value为1
          const obj = { service: 'bb', side: 'sell', type: 'limit', pair_id: this.pair.id, wallet: this.bank }
          // buy/sell 买和卖; market/limit 市场表; mixin/blockpay 钱包;
          const memo = msgpack.encode(obj).toString('base64')
          const trace = uuidv4()
          // 卖出金额
          const amount = this.value
          // 卖出的用户ID
          // const asset = this.pair.quote.asset_id
          const asset = this.pair.base.asset_id
          // EOS_ASSET_ID = "f8127159-e473-389d-8e0c-9ac5a4dc8cc6"
          const recipient = '28536b52-f840-4366-8619-3872fb5b3164'
          const payUrl = `https://mixin.one/pay?recipient=${recipient}&asset=${asset}&amount=${amount}&trace=${trace}&memo=${memo}`
          window.location.href = payUrl
        }
      }
    },
    // 钱包选择付款
    wallet_box () {
      if (!this.triangle_active) {
        this.triangle_active = true
      }
    },
    // 钱包选择点击添加动画手
    wallet_click (e) {
      this.bank = this.wallet[e].name
      setTimeout(() => {
        this.triangle_active = false
      }, 100)
      this.icon_index = e
    },
    // 遮罩层
    mask () {
      this.triangle_active = false
    },
    async api () {
      const { data } = await this.$api.bb.pairDetail(this.$route.params.id)
      console.log(data.data)
      if (data.code === 200) {
        this.pair = data.data
        this.base_symbol = data.data.base.symbol
        this.quote_symbol = data.data.quote.symbol
        console.log(this.pair)
        if (this.active_index === 0) {
          // 渲染
          if (this.pair.base.icon_url) {
            this.price_img = this.pair.base.icon_url
          }
          this.price_title = this.pair.bestorderbookmodel.best_buy_exchange.name
          this.price_bg = Math.floor(this.pair.bestorderbookmodel.best_buy_price * 10000) / 10000
        } else {
          // 渲染
          if (this.pair.quote.icon_url) {
            this.price_img = this.pair.quote.icon_url
          }
          this.price_title = this.pair.bestorderbookmodel.best_sell_exchange.name
          this.price_bg = Math.floor(this.pair.bestorderbookmodel.best_sell_price * 10000) / 10000
        }
      } else {
        Toast('获取数据失败，请刷新页面')
      }
    }
  },
  computed: {
    // input框value值监听
    size (e) {
      let that = this
      if (e.value.match(/^\d*(\.?\d{0,3})/g)[0].length + 1 === this.value.length) {
        that.input_size = that.value.length
      } else {
        that.input_size = 9
      }
      // 判断active_index为0时的事件
      if (this.active_index === 0) {
        if (this.value) {
          that.md_title = '请输入正确金额'
          if (this.value === '0' || this.value === '.') {
            that.Place_active = false
          } else {
            that.Place_active = true
            that.md_title = '大约可以兑换' + ' ' + (this.value / this.pair.bestorderbookmodel.best_buy_price).toFixed(5) + ' ' + this.pair.base.symbol
            // 计算超出金额
            if (parseFloat(this.value) > parseFloat(this.pair.sell_max)) {
              that.Place_active = false
              that.brief = '你已超出约' + ' ' + (this.value - this.pair.buy_max).toFixed(3) + ' ' + this.pair.quote.symbol
            } else {
              that.brief = '最小下单 ' + Math.floor(this.pair.buy_min * 100) / 100 + ' ' + this.pair.quote.symbol + ', 最大下单 ' + ((Math.floor(this.pair.buy_max * 100)) / 100).toFixed(this.pair.buy_decimal_digit) + ' ' + this.pair.quote.symbol
            }
          }
        } else {
          that.Place_active = false
          that.md_title = '兑换数量'
        }
      }
      // 判断active_index为1时的事件
      if (this.active_index === 1) {
        that.md_title = ''
        if (this.value) {
          that.md_title = '请输入正确金额'
          if (this.value === '0' || this.value === '.') {
            that.Place_active = false
          } else {
            that.Place_active = true
            that.md_title = '大约可以兑换' + ' ' + (this.value * this.pair.bestorderbookmodel.best_sell_price).toFixed(3) + ' ' + this.pair.quote.symbol
            // 计算超出金额
            if (parseFloat(this.value) > parseFloat(this.pair.buy_max)) {
              that.Place_active = false
              that.brief = '你已超出约' + ' ' + (this.value - this.pair.buy_max).toFixed(2) + ' ' + this.pair.base.symbol
            } else {
              that.brief = '最小下单 ' + Math.floor(this.pair.buy_min * 100) / 100 + ' ' + this.pair.base.symbol + ', 最大下单 ' + (Math.floor(this.pair.buy_max * 100) / 100).toFixed(this.pair.sell_decimal_digit) + ' ' + this.pair.base.symbol
            }
          }
        } else {
          that.Place_active = false
          that.md_title = '兑换数量'
        }
      }
      return this.value.length > 10 ? 'xx-small' : 'small'
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
    },
    // 付款方式
    cashier () {
      return this.$refs.cashier
    }
  },
  // keep-alive 组件激活时调用
  async activated () {
    this.set = false
    await this.api()
    let set = await setInterval(() => {
      if (this.set === true) {
        clearInterval(set)
      } else {
        this.api()
      }
    }, 1500)
    this.pla_money = (Math.floor(this.pair.bestorderbookmodel.best_buy_price * 10000) / 10000).toString()
    // 红点提示
    if (this.active_index === 0) {
      this.brief = '最小下单 ' + (Math.floor(this.pair.buy_min * 100)) / 100 + ' ' + this.pair.quote.symbol + ', 最大下单 ' + ((Math.floor(this.pair.buy_max * 100)) / 100).toFixed(this.pair.buy_decimal_digit) + ' ' + this.pair.quote.symbol
    } else {
      this.brief = '最小下单 ' + (Math.floor(this.pair.buy_min * 100)) / 100 + ' ' + this.pair.base.symbol + ', 最大下单 ' + ((Math.floor(this.pair.buy_max * 100)) / 100).toFixed(this.pair.buy_decimal_digit) + ' ' + this.pair.base.symbol
    }

    // input框提示
    this.placeholder = '请输入兑换数量'
    this.bank = this.wallet[0].name
  },
  components: {
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [NumberKeyboard.name]: NumberKeyboard,
    [Switch.name]: Switch
  },
  // 监听离开页面
  watch: {
    '$route' (to, from) {
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
        span:nth-child(1){
          color: blue;
          font-size: 18px;
          margin-right: 5px;
        }
      }
    }
    /*金额*/
    .price{
      font-weight: bold;
      font-size: 27px;
      padding: 18px 0;
      .price_bg{
        width: 110px;
        height: 110px;
        border-radius: 50%;
        margin: 0 auto;
        color: #FFFAFA;
        background-color: #FF8C00;
        text-align: center;
        padding: 5px 5px;
        .price_img{
          width: 30px;
          margin: 0 auto;
          img{
            width: 100%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
        }
        div:nth-child(2){
          margin: 3px 0;
          color: #FFD700;
        }
        .price_title{
          font-size: 18px;
          color: #4682B4;
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
        margin-bottom: 5px;
      }
      .md-input-item-fake-placeholder{
        font-size: 18px;
      }
      .md-field{
        padding-bottom: 5px;
        padding-top: 25px;
        .md-field-title{
          font-size: 20px;
        }
        .input-operator{
          font-size: 16px;
          color: #5878B4;
          display: flex;
          align-items: center;
          .title{
            color: #000;
            font-size: 14px;
            .active{
              color: red;
            }
          }
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
    /*付款方式*/
    .wallet_box{
      padding: 15px 0;
      margin-top: 15px;
      font-size: 15px;
      .wallet{
        width: 90%;
        border-bottom: 1px solid rgba(0,0,0,.05);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        /*全局*/
        .Bank,.balance{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        /*银行*/
        .Bank{
          color: #696969;
          .left{
            font-size: 20px;
            color: #00BFFF;
          }
          .right{
            font-size: 15px;
            padding-left: 5px;
          }
        }
        /*余额*/
        .balance{
          .left{
            font-size: 13px;
            color: #999;
            text-align: right;
            div:nth-last-child(1){
              padding-top: 5px;
            }
          }
          .right{
            border: 10px solid transparent;
            border-top-color: black;
            margin-left: 10px;
            -webkit-transition: .1s;
            -moz-transition: .1s;
            -ms-transition: .1s;
            -o-transition: .1s;
            transition: .1s;
          }
          .active{
            border: 10px solid transparent;
            border-bottom-color: black;
          }
        }
      }
    }
    /*付款方式钱包*/
    .dis_but{
      position: fixed;
      z-index: 6;
      bottom: 0;
      background-color: white;
      width: 100%;
      text-align: center;
      -webkit-transition: .3s;
      -moz-transition: .3s;
      -ms-transition: .3s;
      -o-transition: .3s;
      transition: .3s;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      height: 0;
      .title{
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        border-bottom: 1px solid rgba(0,0,0,.05);
      }
      /*隐藏滚轮条*/
      .Choice::-webkit-scrollbar {
        display: none;
      }
      /*钱包列表*/
      .Choice{
        height: 100%;
        overflow: auto;
        .wallet_box{
          font-size: 15px;
          margin: 0;
          padding: 6px 0;
          /*padding: 0;*/
          .wallet{
            width: 90%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 20px;
            /*全局*/
            .Bank,.balance{
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #696969;
            }
            /*付款*/
            .Bank{
              .left{
                font-size: 20px;
                color: #00BFFF;
              }
              .right{
                font-size: 15px;
                padding-left: 5px;
              }
            }
            /*余额*/
            .balance{
              .left{
                font-size: 13px;
                color: #999;
                text-align: right;
                div:nth-last-child(1){
                  padding-top: 5px;
                }
              }
              .right{
                border: none;
                margin-left: 5px;
                -webkit-transition: .1s;
                -moz-transition: .1s;
                -ms-transition: .1s;
                -o-transition: .1s;
                transition: .1s;
                width: 30px;
                font-size: 0px;
                color: #32CD32;
              }
              .active{
                font-size: 20px;
              }
            }
          }
        }
      }
    }
    /*弹出钱包选择框*/
    .display{
      height: 40%;
    }
    /*遮罩层*/
    .mask{
      left: 0;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.3);
      z-index: 5;
    }
    /*说明*/
    .Explain{
      width: 100%;
      padding: 20px 0;
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
  }
  /*弹起键盘*/
  .md-number-keyboard-container{
    height: 250px;
    .keyboard-number .keyboard-number-list .keyboard-number-item{
      height: 60px;
      line-height: 60px;
    }
  }
</style>
