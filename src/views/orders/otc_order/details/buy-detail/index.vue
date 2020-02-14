<template>
    <div class="otc_order">
      <!--标题-->
        <van-nav-bar
          :title='title'
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
          <div class="turn_name">你向 {{alipay_name}} 购买 {{data.price}} {{usdt_amount}} {{Fun}}</div>
          <!--单价-->
          <div class="price">
            <div class="unit">
              <span>单价：</span>
              <span>{{data.usdt_price}} CNY/{{Fun}}</span>
            </div>
            <div class="total">
              <span>总价：</span>
              <span>{{currency_amount}} CNY</span>
            </div>
          </div>
        </div>
      <!--说明-->
      <div class="explain">
        <p>转账时请不要做任何备注</p>
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
          <div v-if="off">
            <div v-if="index === 0" class="payment-box">
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
        </div>
        <van-button type="info" @click="successfulPayment" size="large">我已经付款</van-button>
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
            <van-step><h3> {{transferStatus}} </h3></van-step>
            <van-step><h3> {{releaseStatus}} </h3></van-step>
            <van-step><h3> 完成</h3> </van-step>
          </van-steps>
        </div>
      </div>
      <!--说明-->
      <div class="footTips">1.如需帮助请联系 BlockPay 客服，Mixin ID：28749，微信：jc_castle</div>
      <!--收款码弹出层-->
      <van-popup v-model="showCode">
      <div class="code-img">
        <img :src="img" alt="">
      </div>
    </van-popup>
    </div>
</template>

<script>
import { NavBar, Icon, Popup, Toast, Step, Steps, Dialog, Cell, CellGroup, Button, CountDown } from 'vant'

import Clipboard from 'clipboard'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Dialog.name]: Dialog,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [CountDown.name]: CountDown
  },
  data () {
    return {
      timeDown: 15 * 60 * 60,
      title: '',
      keepTime: '',
      flag: false,
      mode: [
        {
          name: '支付方式',
          price: '',
          img: ''
        },
        {
          name: '总金额',
          price: ''
        },
        {
          name: '姓名',
          price: ''
        },
        {
          name: '账号',
          price: ''
        },
        {
          name: '收款码',
          price: '点击展示'
        }
      ],
      item: false,
      item_of: true,
      showCode: false,
      data: {},
      // 收款人信息
      alipay_name: '',
      // 时间
      set_item_M: '',
      setOrderTime: '',
      Fun: '',
      usdt_amount: '',
      currency_amount: '',
      img: '',
      off: true,
      delete_cre: false,
      active: 0,
      transferStatus: '待转账',
      releaseStatus: '等待承兑商释放USDT',
      // 数据状态
      data_item: true,
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
    }
  },
  methods: {
    /**
     * 数据获取
     */
    async getBuyOrderDetail () {
      const { data } = await this.$api.otc.orderDetail(this.$route.params.id)
      if (data.code === 200) {
        this.data = data.data
        this.newtime = new Date()
        // 标题
        this.title = data.data.otc_pair.asset.symbol
        this.alipay_name = data.data.merchant.alipay_name
        if (data.data.otc_pair.pair) {
          this.Fun = data.data.otc_pair.pair.quote.symbol
        } else {
          this.Fun = 'USDT'
        }
        this.usdt_amount = data.data.usdt_amount
        this.currency_amount = data.data.currency_amount
        // 总金额
        this.mode[1].price = data.data.currency_amount
        // 姓名
        this.mode[2].price = data.data.merchant.alipay_name
        // 时间控制
        // await this.setItem()
        // 订单完成状态
        this.status()
        // 付款方式图片显示说明
        let mode = this.mode[0]
        // 微信付款
        if (data.data.payment_method === 'wechat') {
          mode.img = 'wechat'
          mode.price = '微信'
          this.mode[3].price = data.data.merchant.wechat_account
          this.img = 'http://124.156.115.134' + data.data.merchant.wechat_qrcode
        } else if (data.data.payment_method === 'alipay') {
          // 支付宝付款
          mode.img = 'alipay'
          this.mode[0].price = '支付宝'
          this.mode[3].price = data.data.merchant.alipay_account
          this.img = 'http://124.156.115.134' + data.data.merchant.alipay_qrcode
        } else {
          // 银行卡付款
          mode.img = 'card'
          mode.price = '银行卡'
          this.mode[3].price = data.data.merchant.bank_account_number
          this.off = false
        }
      } else { Toast('请求错误，请再次重试！') }
    },
    // 判断状态码
    status () {
      if (this.data.status === 0) {
        this.item = true
      } else if (this.data.status === 1) {
        this.item = false
        this.transferStatus = '已确认转账'
      } else if (this.data.status === 2) {
        this.item = false
        this.transferStatus = '已确认转账'
        this.releaseStatus = '承兑商已经释放USDT'
        this.active = 2
        // 订单成功取消计时器
        this.data_item = false
      } else if (this.data.status === 11) {
        // this.limitTime = 0
        this.active = 1
        this.item = false
        this.transferStatus = '已确认转账'
      } else if (this.data.status === 12) {
        this.item = false
        this.active = 1
        this.transferStatus = '已确认转账'
        this.releaseStatus = '承兑商已经释放USDT'
      } else if (this.data.status === 30) {
        this.item = false
        this.delete_cre = true
      } else {
        this.item = false
        Toast('数据错误')
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
        this.showCode = true
      }
    },
    // 取消订单
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
        Toast('取消订单成功')
      }).catch(() => {
        // on cancel
        Toast('取消订单失败')
      })
    },
    // 确认订单
    async successfulPayment () {
      // 支付成功提醒
      Dialog.confirm({
        title: '付款结果',
        message: '是否成功支付'
      }).then(async () => {
        // on confirm
        await this.$api.otc.orderUpdate(this.$route.params.id, { op_type: 'user_paid_confirm' })
        this.item = false
        this.transferStatus = '已确认转账'
        Toast('确认付款')
        this.active = 1
      }).catch(() => {
        // on cancel
        Toast('请转账后再试')
      })
    }
  },
  async activated () {
    await this.getBuyOrderDetail()
    let set = setInterval(() => {
      if (this.data_item) {
        this.getBuyOrderDetail()
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
  .otc_order{
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
      .status {
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
    }
    /*支付方式*/
    .method_bos{
      width: 90%;
      margin: 0 auto;
      line-height: 45px;
      /*用户付款后的信息*/
      .method{
        display: flex;
        border-bottom: 1px solid rgba(0,0,0,.05);
        justify-content: space-between;
        /*padding: 0 5px;*/
        .style{
          display: flex;
          align-items: center;
          color: #696969;
          span{
            color: #999;
            vertical-align: middle;
          }
          .van-icon{
            margin: 10px auto;
            margin-bottom: 0px;
          }
        }
        .active{
          color: #999;
        }
      }
      /*用户是否成功支付按钮*/
    }
    .van-cell{
      padding: auto 20px;
      font-size: 16px;
      border-bottom: 0.02rem solid rgba(0, 0, 0, 0.05);
      .payment-box{
        position: relative;
        width: 100%;
        height: 100%;
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
    /*说明*/
    .footTips{
      font-size: 13px;
      padding: 0.76rem 0;
      color: #999;
      text-align: center;
      /*height: 100%;*/
      background-color: rgba(0, 0, 0, 0.05);
    }
    /*弹出层*/
      .code-img{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        img{
          width: 100%;
          height: 99%;
        }
      }
    .van-popup{
      width: 80%;
      height: 60%;
    }
  }
</style>
