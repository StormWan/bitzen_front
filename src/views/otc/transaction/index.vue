<template>
  <div class="transaction">
    <!--头部标题-->
    <otctitle :title="title" :title_img="title_img"></otctitle>
    <!--买入卖出-->
    <div class="Business">
      <van-tabs @click="onClick" sticky>

        <!--买入-->
        <van-tab title="买入">
          <!--买入信息-->
          <div v-if="active_index === 0" class="money_Calcu">
            <!--金额-->
            <div class="money">
              <span>￥</span>
              <span>{{buy_price}}</span>
            </div>
            <!--买入计算-->
            <div class="Calculation">
              <div>至少支付 ￥<span class="red">{{Math.round((buy_price * Receive.buy_min) * 100) / 100}}</span>,购买<span class="red">{{Math.round(Receive.buy_min * 100) / 100}}</span><span>{{symbol_name}}</span></div>
              <div>至支多付 ￥<span class="red">{{Math.round((buy_price * Receive.buy_max) * 100) / 100}}</span>,购买 <span class="red">{{Math.round(Receive.buy_max * 100) / 100}}</span> 个 <span>{{symbol_name}}</span></div>
            </div>
            <!--金额计算-->
            <div class="md-example-child md-example-child-input-item-1">
              <md-field>
                <!--金额-->
                <md-input-item
                  @focus="foc_CNY"
                  type="Number"
                  v-model="inp_CNY"
                  :size="input_monitoring"
                  title="CNY 金额"
                  placeholder="CNY 金额"
                  is-title-latent
                  clearable
                  :maxlength="input_mon_size"
                ></md-input-item>
                <div class="CNY_money" v-if="beyond">请填入正确金额</div>
                <!--预估到账-->
                <md-input-item
                  type="Number"
                  v-model="inp_market"
                  :title="'预估到账' + symbol_name + '数量'"
                  :placeholder="'预估到账' + symbol_name + '数量'"
                  is-title-latent
                  clearable
                  :size="result_monitoring"
                  :maxlength="input_res_size"
                  @focus="foc_market"
                ></md-input-item>
              </md-field>
              <!--下单提示说明-->
              <div class="ts_text" v-if="Receive.pair">到账<span>{{symbol_name}}</span>数量以<span>实际交割价</span>为准</div>
            </div>
          </div>
        </van-tab>

        <!--卖出-->
        <van-tab title="卖出">
          <!--买入信息-->
          <div v-if="active_index === 1" class="money_Calcu">
            <!--金额-->
            <div class="money">
              <span>￥</span>
              <span>{{sell_price}}</span>
            </div>
            <!--买入计算-->
            <div class="Calculation">
              <div>最小出售 ￥ <span class="red">{{Math.round(Receive.sell_min * 100) / 100}}</span> 个 <span>{{symbol_name}}</span>,约到账￥<span class="red">{{Math.round((sell_price * Receive.sell_min) * 100) / 100}}</span></div>
              <div>最大出售 ￥ <span class="red">{{Math.round(Receive.sell_max * 100) / 100}}</span> 个 <span>{{symbol_name}}</span>,约到账 <span class="red">{{Math.round((sell_price * Receive.sell_max) * 100) / 100}}</span></div>
            </div>
            <!--金额计算-->
            <div class="md-example-child md-example-child-input-item-1">
              <md-field>
                <!--金额-->
                <md-input-item
                  type="Number"
                  v-model="inp_market"
                  :size="result_monitoring"
                  :title="'卖出' + symbol_name + '数量'"
                  :placeholder="'卖出' + symbol_name + '数量'"
                  is-title-latent
                  clearable
                  @focus="foc_market"
                  :maxlength="input_res_size"
                ></md-input-item>
                <div class="CNY_money" v-if="beyond">请输入有效数</div>
                <!--预估到账-->
                <md-input-item
                  type="Number"
                  v-model="inp_CNY"
                  title="预估到账 CNY 金额"
                  placeholder="预估到账 CNY 金额"
                  is-title-latent
                  clearable
                  :size="input_monitoring"
                  @focus="foc_CNY"
                  :maxlength="input_mon_size"
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
        <div @click="but_submit" class="Place_box" :class="{active: Place_active}">下单</div>
      </div>

      <!--Mixin 钱包-->
      <div v-if="active_index === 0">
        <otc_wallet :symbol="symbol_name"></otc_wallet>
      </div>

      <!--说明-->
      <Tisp></Tisp>
    </div>
  </div>
</template>

<script>
import { NumberKeyboard, Tab, Tabs, Toast } from 'vant'
import { InputItem, Field } from 'mand-mobile'
import Tisp from './Tisp'
import otctitle from '../../../components/otc_title'
// eslint-disable-next-line camelcase
import otc_wallet from '../../../components/otc_wallet'
export default {
  data () {
    return {
      // 接收数据
      Receive: [],
      active_index: 0,
      inp_CNY: '',
      inp_market: '',
      beyond: false,
      Place_active: false,
      set: false,
      // 获取到数据
      title: '',
      title_img: '',
      buy_price: '',
      // 计算金额
      buy_Price: '',
      sell_price: '',
      symbol_name: '',
      input_mon_size: '',
      input_res_size: '',
      buyData: false
    }
  },
  methods: {
    // 获取数据
    async currency_id () {
      const { data } = await this.$api.otc.currency_id(this.$route.params.id)
      if (data.code !== 200) {
        Toast('服务器异常,请稍后再试')
      } else {
        this.Receive = data.data
        this.title_img = this.Receive.asset.icon_url
        this.symbol_name = this.Receive.asset.symbol
        // 标题判断是否相同
        if (this.Receive.asset.name === this.Receive.asset.symbol) {
          this.title = this.Receive.asset.symbol
        } else {
          this.title = this.Receive.asset.name + ' ' + '(' + this.Receive.asset.symbol + ')'
        }
        if (!this.Receive.pair) {
          this.buy_price = this.Receive.setting.usdt_buy_price
          this.sell_price = this.Receive.setting.usdt_sell_price
        } else {
          this.buy_price = (this.Receive.pair.bestorderbookmodel.best_buy_price * this.Receive.setting.usdt_buy_price).toFixed(2)
          this.sell_price = (this.Receive.pair.bestorderbookmodel.best_sell_price * this.Receive.setting.usdt_sell_price).toFixed(2)
          this.buy_money()
        }
        // 买入
        if (this.active_index === 0) {
        } else {
          // 卖出
        }
      }
    },
    // 买入卖出点击
    onClick (index, title) {
      this.inp_CNY = ''
      this.inp_market = ''
      this.active_index = index
      this.buy_money()
    },
    // 下单按钮
    but_submit () {
      // quote
      if (this.Place_active) {
        sessionStorage.setItem('page', this.active_index)
        this.$router.push({
          path: '/payment'
        })
        let side = ''
        // eslint-disable-next-line no-unused-vars
        let price = ''
        // eslint-disable-next-line camelcase
        let inp_data = ''
        if (this.active_index === 0) {
          side = 'buy'
          // eslint-disable-next-line camelcase
          inp_data = this.inp_CNY
        } else {
          side = 'sell'
          // eslint-disable-next-line camelcase
          inp_data = this.inp_market
        }
        if (this.Receive.pair) {
          price = this.buy_Price
        } else {
          if (this.active_index === 0) {
            price = this.buy_price
          } else {
            price = this.sell_price
          }
        }
        let Obj = {
          otc_pair: this.Receive.id,
          side: side,
          amount: inp_data,
          price: price
        }
        sessionStorage.setItem('Obj', JSON.stringify(Obj))
      }
    },
    // input光标
    foc_market () {
      this.buyData = false
      document.body.scrollTop = 170
      document.documentElement.scrollTop = 170
    },
    // input光标
    foc_CNY () {
      this.buyData = true
      document.body.scrollTop = 170
      document.documentElement.scrollTop = 170
    },
    buy_money () {
      if (this.Receive.pair) {
        // 判断买入卖出
        if (this.active_index === 0) {
          // 计算金额
          this.buy_Price = (this.Receive.pair.bestorderbookmodel.best_buy_price * this.Receive.setting.usdt_buy_price).toFixed(2)
        } else {
          // 计算金额
          this.buy_Price = (this.Receive.pair.bestorderbookmodel.best_sell_price * this.Receive.setting.usdt_sell_price).toFixed(2)
        }
      }
    }
  },
  // 计算
  computed: {
    // input框价格输入判断监听
    // eslint-disable-next-line vue/return-in-computed-property
    input_monitoring (e) {
      let that = this
      if (that.buyData) {
        if (that.inp_CNY) {
          // 判断是否USDA
          if (this.Receive.pair) {
            if (that.inp_CNY.match(/^\d*(\.?\d{0,1})/g)[0].length + 1 === this.inp_CNY.length) {
              that.input_mon_size = this.inp_CNY.length
            } else {
              that.input_mon_size = 9
            }
            that.inp_market = (e.inp_CNY / that.buy_Price).toFixed(4)
            if (that.inp_market >= (Math.round(that.Receive.buy_min * 100) / 100) && that.inp_market <= (Math.round(that.Receive.buy_max * 100) / 100)) {
              that.Place_active = true
              that.beyond = false
            } else {
              // 输入提示提示
              that.beyond = true
              that.Place_active = false
            }
          } else {
            // USDA
            if (that.active_index === 0) {
              that.inp_market = (e.inp_CNY / this.Receive.setting.usdt_buy_price).toFixed(4)
              if (that.inp_market >= (Math.round(that.Receive.buy_min * 100) / 100) && that.inp_market <= (Math.round(that.Receive.buy_max * 100) / 100)) {
                that.Place_active = true
                that.beyond = false
              } else {
                that.Place_active = false
                that.beyond = true
              }
            } else {
              that.inp_market = (e.inp_CNY / this.Receive.setting.usdt_sell_price).toFixed(4)
              if (that.inp_market >= (Math.round(that.Receive.sell_min * 100) / 100) && that.inp_market <= (Math.round(that.Receive.sell_max * 100) / 100)) {
                that.Place_active = true
              } else {
                that.Place_active = false
              }
            }
          }
        } else {
          that.inp_market = ''
          // 输入提示提示
          that.beyond = false
        }
      }
    },
    // input框价格计算结果判断监听
    // eslint-disable-next-line vue/return-in-computed-property
    result_monitoring (e) {
      let that = this
      if (!that.buyData) {
        if (that.inp_market) {
          // 判断是否USDT
          if (this.Receive.pair) {
            if (e.inp_market.match(/^\d*(\.?\d{0,3})/g)[0].length + 1 === this.inp_market.length) {
              e.input_res_size = this.inp_market.length
            } else {
              e.input_res_size = 9
            }
            that.inp_CNY = (that.buy_Price * e.inp_market).toFixed(2)
            if (that.inp_market >= (Math.round(that.Receive.buy_min * 100) / 100) && that.inp_market <= (Math.round(that.Receive.buy_max * 100) / 100)) {
              that.Place_active = true
              that.beyond = false
            } else {
              // 输入提示提示
              that.beyond = true
              that.Place_active = false
            }
          } else {
            // USDT
            if (that.active_index === 0) {
              that.inp_CNY = (e.inp_market * that.Receive.setting.usdt_buy_price).toFixed(2)
              if (that.inp_market >= (Math.round(that.Receive.buy_min * 100) / 100) && that.inp_market <= (Math.round(that.Receive.buy_max * 100) / 100)) {
                that.Place_active = true
                that.beyond = false
              } else {
                that.Place_active = false
                that.beyond = true
              }
            } else {
              that.inp_CNY = (e.inp_market * that.Receive.setting.usdt_sell_price).toFixed(2)
              if (that.inp_market >= (Math.round(that.Receive.sell_min * 100) / 100) && that.inp_market <= (Math.round(that.Receive.sell_max * 100) / 100)) {
                that.Place_active = true
                that.beyond = false
              } else {
                that.Place_active = false
                that.beyond = true
              }
            }
          }
        } else {
          that.inp_CNY = ''
          that.Place_active = false
          that.beyond = false
        }
      }
    }
  },
  components: {
    [NumberKeyboard.name]: NumberKeyboard,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Toast.name]: Toast,
    'Tisp': Tisp,
    'otc_wallet': otc_wallet,
    'otctitle': otctitle
  },
  // keep-alive 组件激活时调用
  async activated () {
    await this.currency_id()
    this.set = true
    let set = await setInterval(() => {
      if (this.set) {
        this.currency_id()
      } else {
        clearInterval(set)
      }
    }, 3000)
  },
  watch: {
    '$route' () {
      this.set = false
      this.inp_market = ''
      this.inp_CNY = ''
    }
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
