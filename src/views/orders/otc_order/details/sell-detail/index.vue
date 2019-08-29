<template>
  <div class="otc_out">
    <!--遮罩层-->
    <div :class="{mask: triangle_active}" @click="mask"></div>
    <!--标题-->
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
      />
    <div class="top">
      <!--下单时间-->
      <div class="item">
        <div>No:{{specificTime}}</div>
        <div>{{orderTime}}</div>
      </div>
      <!--购买转账人-->
      <div class="turn_name">你出售 {{data.asset_amount}} {{title}}
        <span v-if="title !== 'USDT'">,价值约 {{Math.floor(best_sell_price_1 * 100) / 100}} {{Fun}}</span>
      </div>
      <!--单价-->
      <div class="price">
        <div class="unit">
          <span>单价：</span>
          <span>{{data.usdt_price}} CNY/{{Fun}}</span>
        </div>
        <div class="total">
          <span>预估到账：</span>
          <span @click="showTips">
            <van-icon name="question-o" />
          </span>
          <span>{{amountArrival}} CNY</span>
        </div>
      </div>
    </div>
    <div class="explain">
      <p>支付时请不要做任何备注</p>
      <p>交易涉及的账户必须是实名本人账号</p>
    </div>
    <!--时间倒计时-->
    <div class="down" v-if="item">
      <span><van-icon name="clock-o" size="22px" color="#00CED1"/></span>
      <span>等待支付</span>
      <van-count-down  :time="CountDownTime" @finish="countTimeFinish"/>
    </div>
    <!--支付方式-->
    <div class="method_bos" v-if="item">
      <!--付款用户信息栏-->
      <div v-for="(item,index) in mode" :key="index">
          <div v-if="index === 0" class="sell-payment-box">
            <van-cell :title="item.name" center>
              <div v-show="mode[0].img == 'card'">
                <van-icon :name="mode[0].img" size="30px" class="logo-card"/>
              </div>
              <div v-show="mode[0].img == 'wechat'">
                <van-icon :name="mode[0].img" size="30px" class="logo-wechat"/>
              </div>
              <div v-show="mode[0].img == 'alipay'">
                <van-icon :name="mode[0].img" size="30px" class="logo-alipay"/>
              </div>
              <span>{{item.price}}</span>
            </van-cell>
          </div>
          <div v-if="index !== 0">
            <van-cell :title="item.name" is-link center>
              <div class="tag-read" :data-clipboard-text="item.price" @click="method_click(index)">
                <span class="method-box">{{item.price}}</span>
              </div>
            </van-cell>
          </div>
      </div>
      <van-button type="info" @click="paymentButton" size="large">支付 EOS </van-button>
      <van-button type="info" @click="cancelOrder" size="large" plain>取消订单</van-button>
    </div>
    <!--取消付款之后显示-->
    <div class="afterPayment" v-if="delete_cre">
      <span><van-icon name="close" /></span><span>已取消</span>
    </div>
    <!--成功付款之后显示-->
    <div class="afterPayment" v-else>
      <div class="status">
        <van-steps direction="vertical" :active="active">
          <van-step><h3>{{transferStatus}}</h3></van-step>
          <van-step><h3>{{releaseStatus}}</h3></van-step>
          <van-step><h3>完成</h3></van-step>
        </van-steps>
      </div>
      <div style="margin: 0px 10px;">
        <van-button type="info" @click="successfulPayment" size="large" v-if="sellSuccess">确认收到款项</van-button>
      </div>
    </div>
    <!--付款方式钱包-->
      <sell_wallet :pair="walletPair" @wallet="walletMessage" :index="1" :symbol="symbol"></sell_wallet>
    <!--说明-->
    <div class="footTips">1.如需帮助请联系 BlockPay 客服，Mixin ID：28749，微信：jc_castle</div>
    <!--预估到账内容-->
    <div class="astimated-popup">
      <van-popup v-model="showAstimated">
        <div>为何是预估到账？</div>
        <div>预估到账金额是根据当前最新挂单价折算的结果，并不代表最终成交价格，它与具体交易队的交易深度和交易数量有关。</div>
        <div>请与最终成交价格为准</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Popup, Toast, Dialog, Step, Steps, Cell, CellGroup, Button, CountDown } from 'vant'
import Clipboard from 'clipboard'
import sellWallet from '../../../../../components/wallet_mode'

// 付款跳转
var msgpack = require('msgpack-lite')
var uuidv4 = require('uuid/v4')

export default {
  name: 'sell-detail',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [CountDown.name]: CountDown,
    // 钱包
    'sell_wallet': sellWallet
  },
  data () {
    return {
      keepTime: '',
      // 时间设定
      flag: false,
      mode: [
        {
          name: '收款方式',
          price: '微信',
          img: ''
        },
        {
          name: '收款账号',
          price: ''
        },
        {
          name: '收款姓名',
          price: ''
        }
      ],
      item: false,
      sellSuccess: false,
      showAstimated: false,
      bank: 'Mixin',
      triangle_active: false,
      // 钱包数据
      wallet: [
        {
          name: 'Mixin',
          icon: 'youzan-shield'
        }
      ],
      icon_index: 0,
      title: '',
      data: '',
      set_item_M: '',
      set_item_F: '',
      Fun: '',
      delete_cre: false,
      active: 0,
      transferStatus: '待转账',
      releaseStatus: '已托管,等待承兑商转账',
      data_item: true,
      wallet_data: '', // 钱包的数据
      newtime: ''
    }
  },
  computed: {
    /**
     * 获取当前时间
     * */
    currentTime () { return new Date(this.data.created) },
    /**
     * 获取下单时间和进入这个页面的时间，计算出需要倒计时多久时间
     * */
    CountDownTime () {
      const counttime = this.newtime.getTime() - this.currentTime.getTime()
      // 计算出相差分钟数
      const minutes = Math.floor(((counttime % (24 * 3600 * 1000)) % (3600 * 1000)) / (60 * 1000))
      // 计算出相差秒数
      const seconds = Math.round((((counttime % (24 * 3600 * 1000)) % (3600 * 1000)) % (60 * 1000)) / 1000)
      // console.log(this.newtime)
      // console.log(this.currentTime)
      // console.log('相差' + minutes + '分钟，' + '相差' + seconds + '秒')
      if (minutes < 15) {
        return 15 * 60 * 1000 - counttime
      } else if (minutes === 0 && seconds === 0) {
        return 15 * 60 * 1000
      } else return ''
    },
    /**
     * 获取具体时间
     * */
    specificTime () {
      // console.log(this.currentTime)
      return this.currentTime.getFullYear() + '' + (this.currentTime.getMonth() + 1) +
        this.currentTime.getDate() + this.currentTime.getHours() + this.currentTime.getMinutes() +
        this.currentTime.getSeconds() + this.currentTime.getMilliseconds()
    },
    /**
     * 下单时间获取
     * */
    orderTime () {
      return this.currentTime.getFullYear() + '/' + (this.currentTime.getMonth() + 1) + '/' +
        this.currentTime.getDate() + ' ' + this.currentTime.getHours() + ':' + this.currentTime.getMinutes()
    },
    best_sell_price_1 () {
      if (this.data !== '' && this.data.otc_pair.pair) {
        return this.data.otc_pair.pair.bestorderbookmodel.best_sell_price
      } else return ''
    },
    /**
     * 预计到账金额
     * */
    amountArrival () {
      if (this.data !== '' && this.data.otc_pair.pair) {
        return ((Math.floor((this.data.usdt_price * this.best_sell_price_1) * 100) / 100) * this.data.asset_amount).toFixed(2)
      } else {
        return (Math.floor((this.data.usdt_price * this.data.asset_amount) * 100) / 100 * this.data.asset_amount).toFixed(2)
      }
    },
    /**
     * 股票类型
     * */
    symbol () {
      if (this.data === '') {
        return ''
      } else return this.data.otc_pair.pair.base.symbol
    },
    walletPair () {
      if (this.data === '') {
        return ''
      } else return this.data.otc_pair.pair
    }
  },
  mounted () {
    this.status()
  },
  methods: {
    async getSellOrderDetail () {
      const { data } = await this.$api.otc.orderDetail(this.$route.params.id)
      if (data.code === 200) {
        this.data = data.data
        this.newtime = new Date()
        this.sellOrderDetail()
        // 订单完成状态
        this.status()
        // 收款方式的 logo
        let mode = this.mode[0]
        // 微信付款
        if (data.data.payment_method === 'wechat') {
          mode.img = 'wechat'
          this.mode[1].price = data.data.merchant.wechat_account
          this.mode[2].price = data.data.merchant.wechat_name
          this.img = 'http://124.156.115.134' + this.data.merchant.wechat_qrcode
        } else if (data.data.payment_method === 'alipay') {
          // 支付宝付款
          mode.img = 'alipay'
          mode.price = '支付宝'
          // this.mode[0].price = '支付宝'
          this.mode[1].price = data.data.merchant.alipay_account
          this.mode[2].price = data.data.merchant.alipay_name
          // this.img = data.data.merchant.alipay_qrcode
          this.img = 'http://124.156.115.134' + this.data.merchant.alipay_qrcode
        } else {
          // 银行卡付款
          mode.img = 'card'
          mode.price = '银行卡'
          this.mode[1].price = data.data.merchant.bank_account_number
          this.mode[2].price = data.data.merchant.bank_account_name
          this.off = false
        }
      } else { Toast('请求错误，请再次重试！') }
    },
    // 开始渲染数据
    sellOrderDetail () {
      // 标题
      if (this.data.otc_pair.pair) {
        // 标题
        this.title = this.data.otc_pair.asset.symbol
        // 标签
        this.Fun = this.data.otc_pair.pair.quote.symbol
      } else {
        this.title = this.data.otc_pair.asset.symbol
        this.Fun = this.data.otc_pair.asset.symbol
      }
    },
    // 判断付款状态
    async status () {
      // 判断状态码
      if (this.data.status === 0) {
        this.item = true
        this.sellSuccess = false
        this.delete_cre = false
        // this.countDown
      } else if (this.data.status === 1) {
        this.item = true
        this.transferStatus = '已确认转账'
        this.delete_cre = false
      } else if (this.data.status === 2) {
        this.item = false
        this.active = 2
        this.transferStatus = '已确认转账'
        this.releaseStatus = '承兑商确认转账'
        this.sellSuccess = false
        // 订单完成停止计时器
        this.data_item = false
        this.delete_cre = false
      } else if (this.data.status === 21) {
        this.active = 1
        this.item = false
        this.transferStatus = '已确认转账'
        this.delete_cre = false
      } else if (this.data.status === 22) {
        this.active = 1
        this.transferStatus = '已确认转账'
        this.releaseStatus = '承兑商已经转账'
        this.sellSuccess = true
        this.delete_cre = false
      } else if (this.data.status === 23) {
        this.active = 1
        this.item = false
        this.transferStatus = '已确认转账'
        this.releaseStatus = '等待承兑商释确认转账'
        this.sellSuccess = true
        this.delete_cre = false
      } else if (this.data.status === 24) {
        this.active = 1
        this.transferStatus = '已确认转账'
        this.releaseStatus = '承兑商确认转账'
        this.sellSuccess = true
        this.delete_cre = false
      } else if (this.data.status === 30) {
        this.delete_cre = true
        this.sellSuccess = true
      } else {
        this.sellSuccess = true
      }
    },
    /**
     * 下单时间控制
     * */
    countTimeFinish () {
      Toast('订单已取消')
      this.$api.otc.orderUpdate(this.$route.params.id, { op_type: 'user_cancel_order' })
    },
    /**
     * 返回上一页
     * */
    onClickLeft () {
      this.$router.push({ name: 'orders' })
    },
    // 弹窗提示
    showTips () {
      this.showAstimated = true
    },
    /**
     *  支付信息复制
     */
    method_click (i) {
      if (i === 1 || i === 2 || i === 3) {
        let clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          clipboard.destroy()
          Toast('复制成功')
        })
        clipboard.on('error', e => {
          Toast('该浏览器不支持自动复制')
          clipboard.destroy()
        })
      }
      if (i === 4) {
        this.show = true
      }
    },
    // 付款
    async paymentButton () {
      Toast('付款成功')
      await this.payment()
    },
    // 付款调用
    async payment () {
      const obj = { service: 'cc', order_id: this.data.id }
      // buy/sell 买和卖; market/limit 市场表; mixin/blockpay 钱包;
      const memo = msgpack.encode(obj).toString('base64')
      const trace = uuidv4()
      // 买入金额
      const amount = this.data.asset_amount
      // 买入的用户ID
      const asset = this.data.otc_pair.asset.asset_id
      // EOS_ASSET_ID = "f8127159-e473-389d-8e0c-9ac5a4dc8cc6"
      const recipient = '28536b52-f840-4366-8619-3872fb5b3164'
      const payUrl = `https://mixin.one/pay?recipient=${recipient}&asset=${asset}&amount=${amount}&trace=${trace}&memo=${memo}`
      window.location.href = payUrl
      // 支付成功提醒
      Dialog.confirm({
        title: '付款结果',
        message: '是否成功支付'
      }).then(async () => {
        this.delete_cre = false
        this.item = false
        this.transferStatus = '已确认转账'
        await this.$api.otc.orderUpdate(this.data.id, { op_type: 'user_paid_confirm' })
        this.active = 1
      }).catch(() => {
        Toast('请稍后重试')
      })
    },
    /**
     * 确认已经收款
     * */
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
    /**
     * 取消订单
     * */
    async cancelOrder () {
      // 支付取消提醒
      Dialog.confirm({
        title: '取消',
        message: '是否取消订单'
      }).then(async () => {
        // on confirm
        await this.$api.otc.orderUpdate(this.$route.params.id, { op_type: 'user_cancel_order' })
        this.item = false
        // this.item = false
        this.delete_cre = true
        this.flag = true
        this.sellSuccess = false
        Toast('取消订单成功')
      }).catch(() => {
        // on cancel
        Toast('取消订单失败')
      })
    },
    // 钱包选择付款
    walletMessage (msg) {
      this.wallet_data = msg
    },
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
    }
  },
  async activated () {
    this.getSellOrderDetail()
    let set = setInterval(() => {
      if (this.data_item) {
        this.getSellOrderDetail()
        // console.log('sell-detail')
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
  // destroyed () {
  //   // 离开页面删除计时器
  //   this.data_item = false
  //   this.$router.push({
  //     path: '/'
  //   })
  // }
}
</script>

<style scoped lang="less">
  .otc_out{
    font-size: 16px;
    height: 100%;
    .van-button{ margin: 5px auto; }
    /*头部订单信息*/
    .top{
      width: 90%;
      margin: 0 auto;
      line-height: 38px;
      padding: 18px 0;
      border-bottom: 8px dotted rgba(0,0,0,.06);
      color: rgba(0,0,0,.8);
      /*下单时间*/
      .item{
        display: flex;
        justify-content: space-between;
        color: #999;
        font-size: 14px;
      }
      /*购买转账人*/
      .turn_name{
        font-size: 15px;
      }
      /*单价*/
      .price{
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        span:nth-child(1){
          color: #999;
        }
        span:nth-child(2){
          i{
            vertical-align: middle;
            color: #ccc;
          }
        }
        .total{
          span:nth-child(2){
            margin-right: 5px;
          }
        }
      }
    }
    /*提示说明*/
    .explain{
      text-align: center;
      padding: 14px 0;
      p{
        font-size: 20px;
        color: #FA8072;
        padding: 5px;
      }
    }
    /*时间倒计时*/
    .down{
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #696969;
      padding-bottom: 10px;
      span{
        vertical-align: middle;
        i{
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .van-count-down { font-size: 18px; }
    }
    /*取消*/
    .afterPayment{
      text-align: center;
      line-height: 50px;
      border-bottom: 15px solid rgba(0,0,0,.05);
      border-top: 15px solid rgba(0,0,0,.05);
      .status{
        width: 55%;
        margin: 0 auto;
        padding: 15px 0;
        text-align: left;
      }
      span{
        vertical-align: middle;
        font-size: 16px;
      }
      span:nth-child(1){
        font-size: 18px;
        margin-right: 5px;
        i{
          vertical-align: middle;
          font-weight: bold;
          color: red;
        }
      }
      .but_success{
        margin: 0px 40px 10px 40px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background-color: #6495ED;
        color: white;
      }
    }
    /*支付方式*/
    .method_bos{
      width: 90%;
      margin: 0 auto;
      line-height: 45px;
      padding-bottom: 20px;
      /* 支付信息 */
      .van-cell{
        padding: 10px;
        font-size: 16px;
        border-bottom: 0.02rem solid rgba(0, 0, 0, 0.05);
        .sell-payment-box{
          position: relative;
          width: 100%;
          height: 100%;
          padding-bottom: 10px;
          span{
            position: absolute;
            right: 0px;
            padding-top: 3%;
          }
        }
      }
      .logo-alipay{
        position: absolute;
        right: 50px;
        color: #1E90FF;
      }
      .logo-wechat{
        position: absolute;
        right: 50px;
        color: #32CD32;
      }
      .logo-card{
        position: absolute;
        right: 50px;
        color: #00CED1;
      }
      /*用户是否成功支付按钮*/
      .but{
        text-align: center;
        color: #6495ED;
        div{
          border: 1px solid #6495ED;
          margin: 13px 0;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
        }
        .but_ok{
          background-color: #6495ED;
          color: white;
        }
      }
    }
    .footTips{
      font-size: 13px;
      padding: 0.76rem 0;
      color: #999;
      text-align: center;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.05);
    }
    .astimated-popup{
      font-size: 16px;
      .van-popup{
        padding: 25px 20px;
        font-size: 16px;
        width: 80%;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        color: #000;
        font-size: 14px;
        div:nth-child(1){
          text-align: center;
          text-indent: 0;
          margin-bottom: 15px;
        }
        div{
          text-indent: 2em;
          line-height: 22px;
        }
      }
    }
  }
</style>
