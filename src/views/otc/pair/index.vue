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
        <div>
          <div class="otc-price">
            <span>￥</span>
            <span>{{buyPrice}}</span>
          </div>
          <!--购买金额-->
          <span>预计到账:{{estimatedAsset}}</span>
          <div>
            <van-field
              readonly
              clickable
              :placeholder="placeholderBuy"
              :value="amountBuy"
              @touchstart.native.stop="buyKeyboardShow = true"
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
          </div>
        </div>
      </van-tab>

      <!--卖出-->
      <van-tab title="卖出">
        <div>
          <div class="otc-price">
            <span>￥</span>
            <span>{{sellPrice}}</span>
          </div>
          <span>预计到账:{{estimatedCny}}</span>
          <!--购买金额-->
          <div>
            <van-field
              :placeholder="placeholderSell"
              readonly
              clickable
              :value="amountSell"
              @touchstart.native.stop="sellKeyboardShow = true"
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
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-button type="primary" size="large" v-on:click="submitOrder">提交订单</van-button>
    <!--Mixin 钱包-->
    <div v-if="activeIndex === 0">
      <otc_wallet :symbol="symbol"></otc_wallet>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, NavBar, Button, NumberKeyboard, Field, Toast } from 'vant'
import Footer from './footer'
import Wallet from '../../../components/otc_wallet'
import {mapMutations} from "vuex";

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
    'otc_wallet': Wallet
  },
  data () {
    return {
      // 接收数据
      otcPair: null,
      activeIndex: 0,
      amountBuy: '',
      amountSell: '',
      buyKeyboardShow: false,
      sellKeyboardShow: false
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
    // 买入卖出点击
    onChangeTab (index, title) {
      this.amountBuy = ''
      this.amountSell = ''
      this.clearOrder()
      this.activeIndex = index
    },
    onInputBuyKeyBoard (value) {
      this.amountBuy += value
      // 限制只能输入一个小数点及两位小数
      this.amountBuy = this.amountBuy.toString().match(/^\d*(\.?\d{0,2})/g)[0] || null
    },
    /**
     * 模拟键盘删除时触发的函数
     */
    onDeleteBuyKeyBoard () {
      let flag = true
      if (flag) {
        // 删除掉字符串最后一个
        this.amountBuy = this.amountBuy.substring(0, this.amountBuy.length - 1)
        if (this.amountBuy.length === 0) {
          flag = false
          return false
        }
      }
    },
    onInputSellKeyBoard (value) {
      this.amountSell += value
      // 限制只能输入一个小数点及两位小数
      this.amountSell = this.amountSell.toString().match(/^\d*(\.?\d{0,2})/g)[0] || null
    },
    onDeleteSellKeyBoard () {
      let flag = true
      if (flag) {
        // 删除掉字符串最后一个
        this.amountSell = this.amountSell.substring(0, this.amountSell.length - 1)
        if (this.amountSell.length === 0) {
          flag = false
          return false
        }
      }
    },
    // 下单按钮
    submitOrder () {
      // quote
      if (true) {
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
          this.setBuyOrder({
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
    }
  },
  // 计算
  computed: {
    placeholderBuy () {
      return this.otcPair === null ? '资金池不足' : 'CNY 数量'
    },
    placeholderSell () {
      return this.otcPair === null ? '资金池不足' : this.otcPair.asset.symbol + ' 数量'
    },
    estimatedAsset () {
      return this.amountBuy === '' ? '0' : (parseFloat(this.amountBuy) / this.buyPrice).toFixed(4)
    },
    estimatedCny () {
      return this.amountSell === '' ? '0' : (parseFloat(this.amountSell) * this.sellPrice).toFixed(4)
    },
    title () {
      return this.otcPair === null ? '' : this.otcPair.asset.symbol
    },
    symbol () {
      return this.otcPair === null ? '' : this.otcPair.asset.symbol
    },
    symbolIcon () {
      return this.otcPair === null ? '' : this.otcPair.asset.icon_url
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
</style>
