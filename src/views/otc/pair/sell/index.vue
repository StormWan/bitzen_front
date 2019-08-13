<template>
  <div class="transaction">
    <!--头部标题-->
    <otctitle :title="title" :title_img="symbolIcon"></otctitle>
    <!--买入卖出-->
    <div class="Business">
      <van-tabs @click="onClick" sticky>

        <!--买入-->
        <van-tab title="买入">
          <!--买入信息-->
          <div v-if="activeIndex === 0" class="money_Calcu">
            <!--金额-->
            <div class="money">
              <span>￥</span>
              <span>{{buy_price}}</span>
            </div>
            <!--买入计算-->
            <div class="Calculation">
              <div>至少支付 ￥<span class="red">{{buyMinCny}}</span>,购买<span class="red">{{buyMinAsset}}</span><span>{{symbol}}</span></div>
              <div>至支多付 ￥<span class="red">{{buyMaxCny}}</span>,购买 <span class="red">{{buyMaxAsset}}</span> 个 <span>{{symbol}}</span></div>
            </div>
            <!--金额计算-->
            <div class="md-example-child md-example-child-input-item-1">
              <md-field>
                <!--金额-->
                <md-input-item
                  @focus="foc_CNY"
                  type="Number"
                  v-model="inputCnyAmount"
                  :size="input_monitoring"
                  title="CNY 金额"
                  placeholder="CNY 金额"
                  is-title-latent
                  clearable
                  :maxlength="inputCnyMaxLength"
                ></md-input-item>
                <div class="CNY_money" v-if="beyond">请填入正确金额</div>
                <!--预估到账-->
                <md-input-item
                  type="Number"
                  v-model="inputAssetAmount"
                  :title="'预估到账' + symbol + '数量'"
                  :placeholder="'预估到账' + symbol + '数量'"
                  is-title-latent
                  clearable
                  :size="result_monitoring"
                  :maxlength="inputAssetMaxLength"
                  @focus="foc_market"
                ></md-input-item>
              </md-field>
              <!--下单提示说明-->
              <div class="ts_text">到账<span>{{symbol}}</span>数量以<span>实际交割价</span>为准</div>
            </div>
          </div>
        </van-tab>

        <!--卖出-->
        <van-tab title="卖出">
          <!--买入信息-->
          <div v-if="activeIndex === 1" class="money_Calcu">
            <!--金额-->
            <div class="money">
              <span>￥</span>
              <span>{{sell_price}}</span>
            </div>
            <!--买入计算-->
            <div class="Calculation">
              <div>最小出售 ￥ <span class="red">{{sellMinAsset}}</span> 个 <span>{{symbol}}</span>,约到账￥<span class="red">{{sellMinCny}}</span></div>
              <div>最大出售 ￥ <span class="red">{{sellMaxAsset}}</span> 个 <span>{{symbol}}</span>,约到账 <span class="red">{{sellMaxCny}}</span></div>
            </div>
            <!--金额计算-->
            <div class="md-example-child md-example-child-input-item-1">
              <md-field>
                <!--金额-->
                <md-input-item
                  type="Number"
                  v-model="inputAssetAmount"
                  :size="result_monitoring"
                  :title="'卖出' + symbol + '数量'"
                  :placeholder="'卖出' + symbol + '数量'"
                  is-title-latent
                  clearable
                  @focus="foc_market"
                  :maxlength="inputAssetMaxLength"
                ></md-input-item>
                <div class="CNY_money" v-if="beyond">请输入有效数</div>
                <!--预估到账-->
                <md-input-item
                  type="Number"
                  v-model="inputCnyAmount"
                  title="预估到账 CNY 金额"
                  placeholder="预估到账 CNY 金额"
                  is-title-latent
                  clearable
                  :size="input_monitoring"
                  @focus="foc_CNY"
                  :maxlength="inputCnyMaxLength"
                ></md-input-item>
              </md-field>
              <!--下单提示说明-->
              <div class="ts_text">到账金额以<span>实际交割价</span>为准</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>

      <!--下单-->
      <div class="Place">
        <div @click="but_submit" class="Place_box" :class="{active: buttonActive}">下单</div>
      </div>

      <!--Mixin 钱包-->
      <div v-if="activeIndex === 0">
        <otc_wallet :symbol="symbol"></otc_wallet>
      </div>

      <!--说明-->
      <otc-pair-footer></otc-pair-footer>
    </div>
  </div>
</template>

<script>
import { NumberKeyboard, Tab, Tabs, Toast } from 'vant'
import { InputItem, Field } from 'mand-mobile'
import Footer from './footer'
import otcTitle from '../../../components/otc_title'
import Wallet from '../../../components/otc_wallet'

export default {
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Footer.name]: Footer,
    'otc_wallet': Wallet,
    'otctitle': otcTitle
  },
  data () {
    return {
      // 接收数据
      otcPair: null,
      activeIndex: 0,
      inputCnyAmount: '',
      inputAssetAmount: '',
      // 计算金额
      buyData: false
    }
  },
  methods: {
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
    onClick (index, title) {
      this.inputCnyAmount = ''
      this.inputAssetAmount = ''
      this.activeIndex = index
    },
    // 下单按钮
    but_submit () {
      // quote
      if (this.buttonActive) {
        sessionStorage.setItem('page', this.activeIndex)
        this.$router.push({
          path: '/payment'
        })
        const side = this.activeIndex === 0 ? 'buy' : 'sell'
        const amount = this.activeIndex === 0 ? this.inputCnyAmount : this.inputAssetAmount
        let price = ''
        if (this.otcPair.pair) {
          price = this.buy_price()
        } else {
          if (this.activeIndex === 0) {
            price = this.buy_price
          } else {
            price = this.sell_price
          }
        }
        let order = {
          otc_pair: this.otcPair.id,
          side: side,
          amount: amount,
          price: price
        }
        sessionStorage.setItem('Obj', JSON.stringify(order))
      }
    },
    // input光标
    foc_market () {
      this.buyData = false
    },
    // input光标
    foc_CNY () {
      this.buyData = true
    }
  },
  // 计算
  computed: {
    // input框价格输入判断监听
    // eslint-disable-next-line vue/return-in-computed-property
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
      // if () {
      return (this.otcPair === null ? 0 : this.buy_price * this.otcPair.buy_min).toFixed(2)
      // }
    },
    buyMaxAsset () {
      return this.otcPair === null ? 0 : this.otcPair.buy_max
    },
    buyMaxCny () {
      return (this.otcPair === null ? 0 : this.buy_price * this.otcPair.buy_max).toFixed(2)
    },
    sellMinAsset () {
      return this.otcPair === null ? 0 : this.otcPair.sell_min
    },
    sellMinCny () {
      return (this.otcPair === null ? 0 : this.sell_price * this.otcPair.sell_min).toFixed(2)
    },
    sellMaxAsset () {
      return (this.otcPair === null ? 0 : this.otcPair.sell_max)
    },
    sellMaxCny () {
      return (this.otcPair === null ? 0 : this.sell_price * this.otcPair.sell_max).toFixed(2)
    },
    buy_price () {
      if (this.otcPair === null) {
        return 0
      }
      if (!this.otcPair.is_portfolio) {
        return this.otcPair.setting.usdt_buy_price
      } else {
        return (this.otcPair.pair.bestorderbookmodel.best_buy_price * this.otcPair.setting.usdt_buy_price).toFixed(2)
      }
    },
    sell_price () {
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
    inputCnyMaxLength () {
      if (this.otcPair !== null) {
        if (this.inputCnyAmount.match(/^\d*(\.?\d{0,1})/g)[0].length + 1 === this.inputCnyAmount.length) {
          return this.inputCnyAmount.length
        } else {
          return 9
        }
      }
      return 0
    },
    inputAssetMaxLength () {
      if (this.otcPair !== null) {
        if (this.inputAssetAmount.match(/^\d*(\.?\d{0,3})/g)[0].length + 1 === this.inputAssetAmount.length) {
          return this.inputAssetAmount.length
        } else {
          return 9
        }
      }
      return 0
    },
    input_monitoring (e) {
      let that = this
      if (that.buyData) {
        if (that.inputCnyAmount) {
          // 判断是否USDT
          if (this.otcPair.pair) {
            that.inputAssetAmount = (e.inputCnyAmount / that.buy_Price).toFixed(4)
          } else {
            // USDT
            if (that.activeIndex === 0) {
              that.inputAssetAmount = (e.inputCnyAmount / this.otcPair.setting.usdt_buy_price).toFixed(4)
            } else {
              that.inputAssetAmount = (e.inputCnyAmount / this.otcPair.setting.usdt_sell_price).toFixed(4)
            }
          }
        } else {
          that.inputAssetAmount = ''
        }
      }
    },
    // input框价格计算结果判断监听
    result_monitoring (e) {
      let that = this
      if (!that.buyData) {
        if (that.inputAssetAmount) {
          // 判断是否USDT
          if (this.otcPair.pair) {
            if (e.inputAssetAmount.match(/^\d*(\.?\d{0,3})/g)[0].length + 1 === this.inputAssetAmount.length) {
              e.inputAssetMaxLength = this.inputAssetAmount.length
            } else {
              e.inputAssetMaxLength = 9
            }
            that.inputCnyAmount = (that.buy_Price * e.inputAssetAmount).toFixed(2)
          } else {
            // USDT
            if (that.activeIndex === 0) {
              that.inputCnyAmount = (e.inputAssetAmount * that.otcPair.setting.usdt_buy_price).toFixed(2)
            } else {
              that.inputCnyAmount = (e.inputAssetAmount * that.otcPair.setting.usdt_sell_price).toFixed(2)
            }
          }
        } else {
          that.inputCnyAmount = ''
        }
      }
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
  .transaction{
    font-size: 16px;
    /*买入卖出*/
    .Business{
      padding-bottom: 30px;
      padding-top: 5px;
      font-size: 18px;
      text-align: center;
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
    }
    /*计算*/
    .money_Calcu{
      text-align: center;
      padding-top: 30px;
      /*金额*/
      .money{
        color: #FFA500;
        text-align: center;
        span{
          vertical-align: middle;
        }
        span:nth-child(1){
          font-size: 24px;
        }
        span:nth-last-child(1){
          font-size: 20px;
        }
      }
      /*计算*/
      .Calculation{
        padding: 20px 0;
        div{
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #696969;
          /*text-align: left;*/
          .red{
            color: #FF6347;
            font-size: 12px;
          }
          span:nth-child(2){
            margin-left: 2px;
            margin-right: 2px;
          }
        }
        div:nth-child(1){
          margin-bottom: 10px;
        }
      }
      /*金额计算*/
      .md-example-child-input-item-1{
        padding-top: 20px;
        .CNY_money{
          font-size: 12px;
          text-align: left;
          padding: 5px 0;
          color: #FA8072;
        }
        .md-field{
          padding: 5px 30px;
          .md-field-item-content{
            min-height: 0;
            height: 50px;
            padding: 0;
            margin-top: 10px;
          }
          .md-input-item-input{
            height: 54px;
            font-size: 18px;
          }
          .md-field-item-title{
            font-size: 15px;
            top: 0;
          }
          .md-icon.icon-font.md{
            font-size: 20px;
          }
        }
        .ts_text{
          font-size: 13px;
          color: #ccc;
          padding-top: 28px;
          span{
            color: red;
            margin: 0 5px;
          }
        }
      }
    }
  }
</style>
