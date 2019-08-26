<template>
  <div>
    <!--头部标题-->
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!--买入卖出-->
    <van-tabs @click="onChangeTab" sticky>
      <!--买入-->
      <van-tab title="买入">
          <div class="show-price-info">
            <div class="price-bid">
              <div class="logo-Img" v-if="buyLogo"><img :src="buyLogo" alt=""></div>
              <div class="price-title">{{title}}</div>
              <div class="price-bid">￥{{buyPrice}}/${{bestBuyPrice}}</div>
            </div>
            <div class="price-arrival">预计到账:{{estimatedAsset}}</div>
          </div>
        <p :class="{active: tipsColor}">{{buyTips}}</p>
            <van-field
              readonly
              clickable
              :placeholder="placeholderBuy"
              :value="amountBuy"
              @touchstart.native.stop="clickBuyfield"
            />
            <van-number-keyboard
              :show="buyKeyboardShow"
              :maxlength="12"
              theme="custom"
              extra-key="."
              close-button-text="完成"
              @blur="buyKeyboardShow = false"
              @input="onInputBuyKeyBoard"
              @delete="onDeleteBuyKeyBoard"
            />

            <van-field
              readonly
              clickable
              :placeholder="placeholderBuyAmountArrival"
              :value="buyAmountArrival"
              @touchstart.native.stop="clickBuyfield_1"
            />
            <van-number-keyboard
              :show="buyArrivalKeyboardShow"
              :maxlength="12"
              theme="custom"
              extra-key="."
              close-button-text="完成"
              @blur="buyArrivalKeyboardShow = false"
              @input="onInputBuyAmountKeyBoard"
              @delete="onDeleteBuyAmountKeyBoard"
            />
        <div style="margin: 0 10px;">
          <van-button type="primary" size="large" v-on:click="submitOrder">提交订单</van-button>
        </div>
      </van-tab>

      <!--卖出-->
      <van-tab title="卖出">
        <div class="show-price-info">
          <div class="price-bid">
            <div class="logo-Img" v-if="sellLogo"><img :src="sellLogo" alt=""></div>
            <div class="price-title">{{title}}</div>
            <div class="price-bid" style="color: red">￥{{sellPrice}}/${{bestSellPrice}}</div>
          </div>
          <div class="price-arrival">预计到账:{{estimatedCny}}</div>
        </div>
        <p :class="{active: tipsColor}">{{sellTips}}</p>
          <!--购买金额-->
            <van-field
              :placeholder="placeholderSell"
              readonly
              clickable
              :value="amountSell"
              @touchstart.native.stop="clickSellfield"
            />
            <van-number-keyboard
              :show="sellKeyboardShow"
              :maxlength="12"
              theme="custom"
              extra-key="."
              close-button-text="完成"
              @blur="sellKeyboardShow = false"
              @input="onInputSellKeyBoard"
              @delete="onDeleteSellKeyBoard"
            />

        <van-field
          :placeholder="placeholderSellAmountArrival"
          readonly
          clickable
          :value="sellAmountArrival"
          @touchstart.native.stop="clickSellfield_1"
        />
        <van-number-keyboard
          :show="sellArrivalKeyboardShow"
          :maxlength="12"
          theme="custom"
          extra-key="."
          close-button-text="完成"
          @blur="sellArrivalKeyboardShow = false"
          @input="onInputSellAmountKeyBoard"
          @delete="onDeleteSellAmountKeyBoard"
        />
        <div style="margin: 0 10px;">
          <van-button type="danger" size="large" v-on:click="submitOrder">提交订单</van-button>
        </div>
      </van-tab>
    </van-tabs>
    <!--Mixin 钱包-->
    <div v-if="activeIndex === 0">
      <otc_wallet :symbol="symbol" :pair="walletOtcPair" @wallet="walletMessage" :index="0"></otc_wallet>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, NavBar, Button, NumberKeyboard, Field, Toast, Row, Col } from 'vant'
import Footer from './footer'
import Wallet from '../../../components/wallet_mode'
import { mapMutations } from 'vuex'

export default {
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NumberKeyboard.name]: NumberKeyboard,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Footer.name]: Footer,
    [Row.name]: Row,
    [Col.name]: Col,
    'otc_wallet': Wallet
  },
  data () {
    return {
      // 接收数据
      otcPair: null,
      activeIndex: 0,
      amountBuy: '',
      amountSell: '',
      buyAmountArrival: '',
      sellAmountArrival: '',
      buyKeyboardShow: false,
      buyArrivalKeyboardShow: false,
      sellArrivalKeyboardShow: false,
      sellKeyboardShow: false,
      walletData: '', // 钱包的数据
      tipsColor: false
    }
  },
  methods: {
    ...mapMutations({
      setBuyOrder: 'otc/setBuyOrder',
      setSellOrder: 'otc/setSellOrder',
      clearOrder: 'otc/clearOrder'
    }),
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取数据
    async getPair () {
      const { data } = await this.$api.otc.otcPairDetail(this.$route.params.id)
      if (data.code !== 200) {
        Toast('网络异常,请刷新重试')
      } else {
        this.otcPair = data.data
      }
    },
    /**
     * 切换买入卖出 tab
     * */
    onChangeTab (index, title) {
      this.amountBuy = ''
      this.amountSell = ''
      this.buyAmountArrival = ''
      this.sellAmountArrival = ''
      this.clearOrder()
      this.activeIndex = index
    },
    clickBuyfield () {
      this.buyKeyboardShow = true
      this.buyArrivalKeyboardShow = false
    },
    clickBuyfield_1 () {
      this.buyKeyboardShow = false
      this.buyArrivalKeyboardShow = true
    },
    clickSellfield () {
      this.sellKeyboardShow = true
      this.sellArrivalKeyboardShow = false
    },
    clickSellfield_1 () {
      this.sellKeyboardShow = false
      this.sellArrivalKeyboardShow = true
    },
    changeTipsColor () {
      if (this.buyTips === '输入' + this.placeholderBuy + '超出范围' ||
      this.sellTips === '输入' + this.placeholderSell + '超出范围') {
        this.tipsColor = true
      } else this.tipsColor = false
    },
    /**
     * 限制第一个输入框的输入
     * */
    onInputBuyKeyBoard (value) {
      this.sellKeyboardShow = false
      this.amountBuy += value
      // 限制只能输入一个小数点及两位小数
      if (this.amountBuy.toString().split('.')[1]) {
        if (this.amountBuy.toString().split('.')[1].length > 2) { Toast('只能输入两位小数！') }
      }
      console.log(this.amountBuy.toString().match(/^\d*(\.?\d{0,2})/g)[0])
      this.amountBuy = this.amountBuy.toString().match(/^\d*(\.?\d{0,2})/g)[0] || null
      this.buyAmountArrival = (this.amountBuy / this.buyPrice).toString().match(/^\d*(\.?\d{0,4})/g)[0] || null
      this.changeTipsColor()
    },
    /**
     * 模拟键盘删除时触发的函数
     */
    onDeleteBuyKeyBoard () {
      let flag = true
      if (flag) {
        // 删除掉字符串最后一个
        this.amountBuy = this.amountBuy.substring(0, this.amountBuy.length - 1)
        this.buyAmountArrival = (this.amountBuy / this.buyPrice).toString().match(/^\d*(\.?\d{0,4})/g)[0] || null
        // console.log(this.buyAmountArrival)
        // if (parseInt(this.buyAmountArrival) === 0) this.buyAmountArrival = ''
        this.changeTipsColor()
        if (this.amountBuy.length === 0) {
          flag = false
          return false
        }
      }
    },
    /**
     * 限制第二个输入框的输入，根据输入预算转出金额来推测金钱数
     * */
    onInputBuyAmountKeyBoard (value) {
      if (value === '') {
        this.amountBuy = ''
      } else {
        this.buyAmountArrival += value
        // 限制只能输入一个小数点及四位小数
        if (this.buyAmountArrival.toString().split('.')[1]) {
          if (this.buyAmountArrival.toString().split('.')[1].length > 4) { Toast('只能输入四位小数！') }
        }
        this.buyAmountArrival = this.buyAmountArrival.toString().match(/^\d*(\.?\d{0,4})/g)[0] || null
        this.amountBuy = this.buyCny
        this.changeTipsColor()
      }
    },
    /**
     * 模拟键盘删除时触发的函数，删除字符串的最后一个
     */
    onDeleteBuyAmountKeyBoard () {
      let flag = true
      if (flag) {
        // 删除掉字符串最后一个
        this.buyAmountArrival = this.buyAmountArrival.substring(0, this.buyAmountArrival.length - 1)
        this.amountBuy = this.buyCny
        this.changeTipsColor()
        if (this.buyAmountArrival.length === 0) {
          flag = false
          return false
        }
      }
    },
    /**
     * 卖出
     * */
    onInputSellKeyBoard (value) {
      this.buyKeyboardShow = false
      this.amountSell += value
      // 限制只能输入一个小数点及两位小数
      if (this.amountSell.toString().split('.')[1]) {
        if (this.amountSell.toString().split('.')[1].length > 2) { Toast('只能输入两位小数！') }
      }
      this.amountSell = this.amountSell.toString().match(/^\d*(\.?\d{0,2})/g)[0] || null
      this.sellAmountArrival = (this.amountSell * this.sellPrice).toString().match(/^\d*(\.?\d{0,4})/g)[0] || null
      this.changeTipsColor()
    },
    onDeleteSellKeyBoard () {
      let flag = true
      if (flag) {
        // 删除掉字符串最后一个
        this.amountSell = this.amountSell.substring(0, this.amountSell.length - 1)
        this.sellAmountArrival = (this.amountSell * this.sellPrice).toString().match(/^\d*(\.?\d{0,4})/g)[0] || null
        this.changeTipsColor()
        if (this.amountSell.length === 0) {
          flag = false
          return false
        }
      }
    },
    onInputSellAmountKeyBoard (value) {
      if (value === '') {
        this.sellAmountArrival = ''
      } else {
        this.sellAmountArrival += value
        // 限制只能输入一个小数点及两位小数
        if (this.sellAmountArrival.toString().split('.')[1]) {
          if (this.sellAmountArrival.toString().split('.')[1].length > 4) { Toast('只能输入四位小数！') }
        }
        this.sellAmountArrival = this.sellAmountArrival.toString().match(/^\d*(\.?\d{0,4})/g)[0] || null
        this.amountSell = this.sellCny
        this.changeTipsColor()
        // this.checkSellArrival()
      }
    },
    onDeleteSellAmountKeyBoard () {
      let flag = true
      if (flag) {
        // 删除掉字符串最后一个
        this.sellAmountArrival = this.sellAmountArrival.substring(0, this.sellAmountArrival.length - 1)
        this.amountSell = this.sellCny
        this.changeTipsColor()
        if (this.sellAmountArrival.length === 0) {
          flag = false
          return false
        }
      }
    },
    /**
     * 下单按钮，保存数据到state
     * */
    submitOrder () {
      // quote
      if (this.checkAmountBuy(this.amountBuy) === true || this.checkAmountSell(this.amountSell)) { // 验证输入数据是否超出范围
        const side = this.activeIndex === 0 ? 'buy' : 'sell'
        const amount = this.activeIndex === 0 ? this.amountBuy : this.amountSell
        const price = this.activeIndex === 0 ? this.buyPrice : this.sellPrice
        if (side === 'buy') {
          this.setBuyOrder({
            otc_pair: this.otcPair.id,
            currency_amount: amount,
            price: price,
            payment_method: ''
          })
        } else {
          this.setSellOrder({
            otc_pair: this.otcPair.id,
            asset_amount: amount,
            price: price,
            payment_method: ''
          })
        }
        this.$router.push({
          path: '/payment'
        })
      }
    },
    /**
     * 检测输入数据是否超出范围
     * */
    checkAmountBuy (amount) {
      if (amount < this.buyMinCny & amount !== '') {
        this.amount = ''
        Toast('输入数据超出范围！请再次输入')
        return false
      } else if (amount > this.buyMaxCny & amount !== ''){
        this.amount = ''
        Toast('输入数据超出范围！请再次输入')
        return false
      } else return true
    },
    checkAmountSell (amount) {
      if (amount < this.sellMinCny & amount !== '') {
        this.amountSell = ''
        Toast('输入数据超出范围！请再次输入')
        return false
      } else if (amount > this.sellMaxCny & amount !== '') {
        this.amountSell = ''
        Toast('输入数据超出范围！请再次输入')
        return false
      } else return true
    },
    successfulPayment () {
      if (this.data.status !== 22) {
        if (this.data.status === 1) {
          this.item = true
          Toast('请付款之后再操作')
          this.sellSuccess = false
        } else {
          Toast('请等待商家完成操作')
        }
      } else {
        // 收款
        Dialog.confirm({
          title: '收款状态',
          message: '是否收到款项'
        }).then(async () => {
          const { data } = await this.$api.otc.orderUpdate(this.data.id, { op_type: 'user_received_confirm' })
          if (data) {
            if (data.code === 200) {
              this.sellSuccess = false
              this.active = 2
            } else {
              Toast('数据获取有误，请稍后再试')
            }
          } else {
            Toast('网络错误，请稍后再试')
          }
        }).catch(() => {
          Toast('请稍后重试')
        })
      }
    },
    // 钱包选择付款
    walletMessage (msg) {
      this.walletData = msg
    }
  },
  // 计算
  computed: {
    buyTips () {
      if (this.otcPair !== null) {
        if (parseInt(this.buyAmountArrival) > this.buyPrice) {
          return '输入' + this.placeholderBuy + '超出范围'
        } else return this.otcPair.asset.symbol + '最小下单' + this.otcPair.buy_min + ',最大下单' + this.buyPrice
      } else return '资金池不足'
    },
    sellTips () {
      if (this.otcPair !== null) {
        if (parseInt(this.sellAmountArrival) > this.sellPrice) {
          return '输入' + this.placeholderSell + '超出范围'
        } else return this.otcPair.asset.symbol + '最小下单' + this.otcPair.sell_min + ',最大下单' + this.sellPrice
      } else return '资金池不足'
    },
    placeholderBuy () {
      return this.otcPair === null ? '资金池不足' : 'CNY 数量'
    },
    placeholderSell () {
      return this.otcPair === null ? '资金池不足' : this.otcPair.asset.symbol + ' 数量'
    },
    placeholderBuyAmountArrival () {
      return this.otcPair === null ? '资金池不足' : this.otcPair.asset.symbol + ' 到账'
    },
    placeholderSellAmountArrival () {
      return this.otcPair === null ? '资金池不足' : 'CNY 到账'
    },
    estimatedAsset () {
      return this.amountBuy === '' ? '0' : (parseFloat(this.amountBuy) / this.buyPrice).toFixed(4)
    },
    estimatedCny () {
      return this.amountSell === '' ? '0' : (parseFloat(this.amountSell) * this.sellPrice).toFixed(4)
    },
    title () {
      return this.otcPair === null ? '' : this.otcPair.pair.pair
    },
    symbol () {
      return this.otcPair === null ? '' : this.otcPair.asset.symbol
    },
    symbolIcon () {
      return this.otcPair === null ? '' : this.otcPair.asset.icon_url
    },
    buyCny () {
      return (this.buyAmountArrival * this.buyPrice).toString().match(/^\d*(\.?\d{0,2})/g)[0] || null
    },
    sellCny () {
      return (this.sellAmountArrival / this.sellPrice).toString().match(/^\d*(\.?\d{0,2})/g)[0] || null
    },
    buyMinAsset () {
      return this.otcPair === null ? 0 : this.otcPair.buy_min
    },
    buyMinCny () {
      return (this.otcPair === null ? 0 : this.buyPrice * this.otcPair.buy_min).toFixed(2)
    },
    buyMaxAsset () {
      return this.otcPair === null ? 0 : this.otcPair.buy_max
    },
    buyMaxCny () {
      return (this.otcPair === null ? 0 : this.buyPrice * this.otcPair.buy_max).toFixed(2)
    },
    sellMinAsset () {
      return this.otcPair === null ? 0 : this.otcPair.sell_min
    },
    sellMinCny () {
      return (this.otcPair === null ? 0 : this.sellPrice * this.otcPair.sell_min).toFixed(2)
    },
    sellMaxAsset () {
      return (this.otcPair === null ? 0 : this.otcPair.sell_max)
    },
    sellMaxCny () {
      return (this.otcPair === null ? 0 : this.sellPrice * this.otcPair.sell_max).toFixed(2)
    },
    buyPrice () {
      if (this.otcPair === null) {
        return 0
      }
      if (!this.otcPair.is_portfolio) {
        return this.otcPair.setting.usdt_buy_price
      } else {
        return (this.otcPair.pair.bestorderbookmodel.best_buy_price * this.otcPair.setting.usdt_buy_price).toFixed(2)
      }
    },
    bestBuyPrice () {
      return this.otcPair === null ? 0 : (this.otcPair.pair.bestorderbookmodel.best_buy_price).toFixed(2)
    },
    bestSellPrice () {
      return this.otcPair === null ? 0 : (this.otcPair.pair.bestorderbookmodel.best_sell_price).toFixed(2)
    },
    sellPrice () {
      if (this.otcPair === null) {
        return 0
      }
      if (!this.otcPair.is_portfolio) {
        return this.otcPair.setting.usdt_sell_price
      } else {
        return (this.otcPair.pair.bestorderbookmodel.best_sell_price * this.otcPair.setting.usdt_sell_price).toFixed(2)
      }
    },
    beyond () {
      if (this.otcPair === null) {
        return false
      }
      return !(this.inputAssetAmount >= (Math.round(this.otcPair.buy_min * 100) / 100) && this.inputAssetAmount <= (Math.round(this.otcPair.buy_max * 100) / 100))
    },
    buttonActive () {
      return !this.beyond
    },
    // 币的 logo
    buyLogo () {
      if (this.otcPair === null) return ''
      else return this.otcPair.asset.icon_url ? this.otcPair.asset.icon_url : ''
    },
    sellLogo () {
      if (this.otcPair === null) return ''
      else return this.otcPair.asset.icon_url ? this.otcPair.asset.icon_url : ''
    },
    walletOtcPair () {
      if (this.otcPair === null) {
        return ''
      } else return this.otcPair.pair
    }
  },
  async activated () {
    await this.getPair()
    // 设置定时器，每隔2秒获取数据
    let timer = await setInterval(() => {
      this.getPair()
    }, 4000)
    // 在离开页面时清楚定时器
    this.$once('hook:deactivated', () => {
      clearInterval(timer)
    })
  }
}
</script>

<style lang="less">
  /*金额*/
  .show-price-info{
    font-weight: bold;
    font-size: 27px;
    padding: 30px 0px;
    .price-bid{
      /*width: 150px;*/
      border-radius: 50%;
      margin: 0 auto;
      color: #FFFAFA;
      text-align: center;
      .logo-Img{
        display: flex;
        width: 35px;
        margin: 3px auto;
        padding-bottom: 5px;
        /*margin-left: 35%;*/
        img{
          width: 100%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
      }
      .price-title{
        font-size: 18px;
        color: #4682B4;
        display: flex;
        justify-content: center;
      }
      .price-bid{
        margin: 10px 0;
        color: #228B22;
      }
      .active{
        color: #FF6347;
      }
    }
    .price-arrival{
      padding-top: 10px;
      font-size: 15px;
      font-weight: normal;
      color: #32CD32;
      position: absolute;
      left: 50%;
      transform: translate(-50%,0);
    }
  }
  p{
    font-size: 12px;
    padding: 15px;
    color: #1989fa;
  }
  .active{ color: red; }
</style>
