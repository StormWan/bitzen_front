<template>
    <div class="transaction">
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
            <img :src="title_img" alt="">
          </span>
          <span>{{title}}</span>
        </div>
      </div>
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
                    type="money"
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
                    type="money"
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
                    type="money"
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
                    type="money"
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
              <!--到账 {{Receive.market_name}}-->
            </div>
          </van-tab>
        </van-tabs>

        <!--下单-->
        <div class="Place">
          <div @click="but_submit" class="Place_box" :class="{active: Place_active}">下单</div>
        </div>

        <!--Mixin 钱包-->
        <!--付款方式-->
        <div v-if="active_index === 0" class="wallet_box" @click="wallet_box">
          <div class="wallet">
            <div class="Bank">
              <div class="left">
                <van-icon name="youzan-shield"></van-icon>
              </div>
              <div class="right">{{bank}} 钱包</div>
            </div>
            <div class="balance">
              <div class="left">
                <div> 余额</div>
                <div>0</div>
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
                    <div>BCT 余额</div>
                    <div>0</div>
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
    </div>
</template>

<script>
import { Icon, NumberKeyboard, Tab, Tabs, Toast } from 'vant'
import { InputItem, Field } from 'mand-mobile'
export default {
  data () {
    return {
      // 接收数据
      Receive: [],
      active_index: 0,
      inp_CNY: '',
      inp_market: '',
      Tips: '',
      beyond: false,
      Place_active: false,
      triangle_active: false,
      // 钱包数据
      wallet: [
        {
          name: 'Mixin',
          icon: 'youzan-shield'
        }
        // {
        //   name: 'BlockPay',
        //   icon: 'youzan-shield'
        // }
      ],
      bank: 'Mixin',
      icon_index: 0,
      // 说明
      Explain: [
        {
          text: 'Bit-OXC2C交易除了USDT为直接交易，其它均为币币交易多步并一步，比如购买XIN，实际为先兑换为USDT，再兑换为BTC，再兑换为XIN，当前价格仅供参考，以实际交割价为准。'
        },
        {
          text: 'C2C总交易额超过 1000 USDT必须先进行实名认证。'
        },
        {
          text: '如有大额交易需求可直接联系 ExinOne 客服如果您不能完全理解 ExinOne 提供的服务，建议下小订单尝试。'
        },
        {
          text: 'C2C交易服务时间为早上7点到晚上12点如需帮助请联系 Bit-ox 客服，Mixin ID：28749，微信：jc_castle'
        },
        {
          text: '所有承兑商均已通过 Bit-ox 认证，您每次兑换会冻结承兑商资产，承兑商无法在资产不够时接单，请放心兑换。'
        },
        {
          text: '所有承兑商均需提供保证金并已实名认证，请放心兑换'
        }
      ],
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
        this.Tips_name = ''
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
    // 箭头点击回退一页
    Arrow () {
      this.$router.go(-1)
      localStorage.removeItem('Send_out')
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
    // 钱包选择付款
    wallet_box () {
      if (!this.triangle_active) {
        this.triangle_active = true
      }
    },
    // 遮罩层
    mask () {
      this.triangle_active = false
    },
    // 钱包选择点击添加动画手
    wallet_click (e) {
      this.bank = this.wallet[e].name
      setTimeout(() => {
        this.triangle_active = false
      }, 100)
      this.icon_index = e
    },
    // input光标
    foc_market () {
      this.buyData = false
    },
    // input光标
    foc_CNY () {
      this.buyData = true
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
            if (e.inp_CNY.match(/^\d*(\.?\d{0,1})/g)[0].length + 1 === this.inp_CNY.length) {
              e.input_mon_size = this.inp_CNY.length
            } else {
              e.input_mon_size = 9
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
    [Icon.name]: Icon,
    [NumberKeyboard.name]: NumberKeyboard,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Toast.name]: Toast
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
    /*头部标题*/
    .top{
      position: relative;
      text-align: center;
      /*箭头*/
      .Arrow{
        position: absolute;
        left: 7%;
        color: #696969;
        font-size: 20px;
        top: 50%;
        transform: translate(0,-50%);
      }
      /*产品标题*/
      .title{
        color: #999;
        font-size: 16px;
        padding: 13px 0;
        span{
          vertical-align: middle;
        }
        span:nth-child(1){
          display: inline-block;
          width: 20px;
          img{
            width: 100%;
          }
        }
        span:nth-child(2){
          margin: 0 4px;
          font-size: 15px;
        }
      }
    }
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
    /*付款方式*/
    .wallet_box{
      padding: 15px 0 0 0;
      margin-top: 15px;
      font-size: 15px;
      .wallet{
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px 0 20px;
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
      z-index: 1001;
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
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.3);
      z-index: 1000;
    }
    /*说明*/
    .Explain{
      width: 100%;
      padding: 20px 0;
      margin-top: 20px;
      border-top: 10px solid rgba(0,0,0,.05);
      text-align: left;
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
</style>
