<template>
  <div class="otc_out">
    <!--遮罩层-->
    <div :class="{mask: triangle_active}" @click="mask"></div>
    <!--标题-->
    <div class="title">
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="top">
      <!--下单时间-->
      <div class="item">
        <div>No:{{set_item_M}}</div>
        <div>{{set_item_F}}</div>
      </div>
      <!--购买转账人-->
      <div class="turn_name">你出售 {{data.asset_amount}} {{title}}<span v-if="title !== 'USDT'">,价值约 {{Math.floor(best_sell_price * 100) / 100}} {{Fun}}</span></div>
      <!--单价-->
      <div class="price">
        <div class="unit">
          <span>单价：</span>
          <span>{{data.usdt_price}} CNY/{{Fun}}</span>
        </div>
        <div class="total">
          <span>预估到账：</span>
          <span @click="tot_T">
            <van-icon name="question-o" />
          </span>
          <span>{{price}} CNY</span>
        </div>
      </div>
    </div>
    <!--时间倒计时-->
    <div class="down" v-if="item">
        <span>
          <van-icon name="clock-o" />
        </span>
      <span>等待支付 {{keepTime}}</span>
    </div>
    <!--支付方式-->
    <div class="method_bos" v-if="item">
      <!--付款用户信息栏-->
      <div class="method" v-for="(item,index) in mode" :key="index">
        <div class="mode">{{item.name}}</div>
        <div class="style" :class="{active: item.img}">
          <div class="img" v-if="item.img">
            <img :src="mode[0].img" alt="">
          </div>
          <div class="tag-read" :data-clipboard-text="item.price" @click="method_click(index)">{{item.price}}<span v-if="index !== 0">
              <van-icon name="arrow" />
            </span></div>
        </div>
      </div>
      <!--付款确认-->
      <div class="but">
        <div class="but_ok" @click="but_no">支付 EOS</div>
      </div>
    </div>
    <!--取消付款之后显示-->
    <div class="delete" v-if="delete_cre"><span><van-icon name="close" /></span><span>已取消</span></div>
    <!--成功付款之后显示-->
    <div class="delete" v-else>
      <div class="status">
        <van-steps direction="vertical" :active="active">
          <van-step>
            <h3>{{status_t}}</h3>
          </van-step>
          <van-step>
            <h3>{{status_c}}</h3>
          </van-step>
          <van-step>
            <h3>{{status_b}}</h3>
          </van-step>
        </van-steps>
      </div>
    </div>
    <!--付款方式-->
    <div class="wallet_box" @click="wallet_box" v-if="item">
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
    <div class="Tips">1.如需帮助请联系 BlockPay 客服，Mixin ID：28749，微信：jc_castle</div>
    <!--预估到账内容-->
    <div class="tot_popup">
      <van-popup v-model="show_tot">
        <div>为何是预估到账？</div>
        <div>预估到账金额是根据当前最新挂单价折算的结果，并不代表最终成交价格，它与具体交易队的交易深度和交易数量有关。</div>
        <div>请与最终成交价格为准</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Popup, Toast, Dialog, Step, Steps } from 'vant'
import Clipboard from 'clipboard'
// 付款跳转
var msgpack = require('msgpack-lite')
var uuidv4 = require('uuid/v4')
export default {
  data () {
    return {
      keepTime: '',
      // 时间设定
      limittime: 0,
      settime: '',
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
      show_tot: false,
      bank: 'Mixin',
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
      icon_index: 0,
      title: '',
      data: [],
      set_item_M: '',
      set_item_F: '',
      Fun: '',
      best_sell_price: '',
      price: '',
      delete_cre: false,
      active: 0,
      status_t: '待转账',
      status_c: '已托管,等待承兑商转账',
      status_b: '完成'
    }
  },
  methods: {
    async api () {
      const { data } = await this.$api.otc.orders_get(this.$route.params.id)
      this.data = data.data
      this.style()
      // 付款方式logo图片
      this.logo_img()
      // 时间控制
      this.Setitem()
      this.status()
    },
    // 开始渲染数据
    style () {
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
      // 价格大约
      if (this.data.otc_pair.pair) {
        this.best_sell_price = this.data.otc_pair.pair.bestorderbookmodel.best_sell_price
        this.price = (Math.floor((this.data.usdt_price * this.best_sell_price) * 100) / 100) * this.data.asset_amount
      } else {
        this.price = Math.floor((this.data.usdt_price * this.data.asset_amount) * 100) / 100 * this.data.asset_amount
      }
    },
    // 判断付款状态
    status () {
      // 判断状态码
      if (this.data.status === 0) {
        this.item = true
        this.StartCountDown()
      } else if (this.data.status === 1) {
        this.limittime = 0
        this.item = false
        this.status_t = '已确认转账'
      } else if (this.data.status === 2) {
        this.limittime = 0
        this.item = false
        this.active = 2
        this.status_t = '已确认转账'
        this.status_c = '承兑商确认转账'
      } else if (this.data.status === 21) {
        this.limittime = 0
        this.active = 1
        this.item = false
        this.status_t = '已确认转账'
      } else if (this.data.status === 22) {
        this.limittime = 0
        this.active = 1
        this.status_t = '已确认转账'
        this.status_c = '承兑商已经转账'
      } else if (this.data.status === 23) {
        this.limittime = 0
        this.active = 1
        this.item = false
        this.status_t = '已确认转账'
        this.status_c = '等待承兑商释确认转账'
      } else if (this.data.status === 24) {
        this.limittime = 0
        this.active = 1
        this.status_t = '已确认转账'
        this.status_c = '承兑商确认转账'
      } else if (this.data.status === 30) {
        this.limittime = 0
        this.delete_cre = true
      } else {
        this.limittime = 0
      }
    },
    // 付款logo图片
    async logo_img () {
      const { data } = await this.$api.otc.payment_patch()
      console.log(data)
      // 付款方式图片显示说明
      let mode = this.mode[0]
      // 微信付款
      if (this.data.payment_method === 'wechat') {
        mode.img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAABiklEQVR4AbWVAWRCURSGf8gIGQyYgUEAgyAAbCCAAAQQGBAYIGAwAAgIwAMJGIsqRTAgQPAQEsKDu//kXHLddV+v+w6f0HnvP/e8/5yLYPzgAXN0yICsSUoyZUeW+l/nlFs45miSRF9scpKRBDM0rhGqacXmRobhE8/wwsQtMZHYyjv/E2swYU9MZPZW1DVGWoLYEQt88ffR/W7DyEIHCn3ab4gVKpjhzbayHlOI9K2QHqZFNsSctKSSCEI78oE17h1PTJy8PnRwjYdNjlanpEdqsLHC04XnltA2+KuWiudoe9y7xQLvWKF6JlSVE5DjxZZf3CRs91nV3zqjXYxw55iuk9PlGQKJGaZ4hoR123lM8cqc3yu+dSqC40BS4lkSdf9zQcY4tSic2LQLQgc5K+jmrl3Wu0DiUkxy4+o72LEJnDISUrDjtKREwTHc0DkalSA2sfPqE62oKWKJDWRmgzd+BKENaUGjLMGjzmbbLoiigmvSk/tMnKa3y0DQ9vdIM9S6gKCK6FqLGX+Ik2Cgy7oRZQAAAABJRU5ErkJggg=='
        mode.price = '微信'
        this.mode[1].price = data.data.wechat_account
        this.mode[2].price = data.data.wechat_name
        this.img = 'http://124.156.115.134' + this.data.merchant.wechat_qrcode
      } else if (this.data.payment_method === 'alipay') {
        // 支付宝付款
        mode.img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAB7ElEQVR4Ac2WA6weQRSFb62gtuPajetGtW0FNcO6cVK7XdRu2Ia149R2Z6bP9r6T+yb5bZ7k/Bh9gzt3l1hXfzUiS+4iU36GK2AnTq6AP/PYJ/42JhZ+oPAp7CTWYDDUVHu4IDneCaD8kkTgV4r4zA5+akBuivhMI56llyLv768wXkpfYNK3NGXAaHQhpxlHY9KAlpwc6Qojt6W2urZYnYoFWA5XhWhTSaf/dmHYDqc2/v+NFPiZDLmKzv7pxAPAZIvWZPwbjrqN8B242LU6edUtgMZGGjS3XI8R6IRTj/yI2xhiPNofA7CPCyiuRAL8wM9FUy6AH8I5urwE/gwb8FSdS311+ldz1KsIgGIpmWpNGEGSQYbaC7f1gWIyPClD3uaJBgWeld3x/S3MyCwkWwz1AfqsWCzV8EIfIAeJqd6GAcuHx7oFylz4AVlqGl116gQ/c3HABTTkFH1pywPD1Esy//V0wdQMlJe6Rex3MtQ2OvO/fRgZXbziGVqqP+CmXm0m/AED2WT9G0GOU4sg/sYVCZLCyngrLTHRJ9K9Gl4jWzShYDoj+5Ih7keQiSQWcwgTHqKBPrP8wanK/D+QLzwOH4DeOgDu+maeiPwmBS9RuFNJA1pyV9JfhF33BHS9vZVxhFTWjCn2kYZVAyRlGm3AoxGeAAAAAElFTkSuQmCC'
        this.mode[0].price = '支付宝'
        this.mode[1].price = data.data.alipay_account
        this.mode[2].price = data.data.alipay_name
        // this.img = data.data.merchant.alipay_qrcode
        this.img = 'http://124.156.115.134' + this.data.merchant.alipay_qrcode
      } else {
        // 银行卡付款
        mode.img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABHklEQVR4Ae2WgUYEURSGh70oQIB6gh6gHmBsqhfqHdq2hAJTUYAACMCytqQISUDAVpsEsWi09TX/XFcxYeJ0E/vzMf4z7uc6cJMQWi6l1egU5AUYkfszXZp8TVFmBfwyWbhZU0UcXKrbdWMJ5ZLwNaIwl5CY1BPen8HgAtoT1dn6pJ/dnRoKn64p01mpztQpj1eGwsNlyuTPsDX92W/P+A70j6FQ3BxR5nI3dP4bNDPeochmYZTD+xvsz8HBvP8evWhmLvScb1Cm3/Mo6sLcXLg5BcMHQhgO1BkL+8fUjP6NLLw9MRB+R0h19h+F4x3WYSystVe/rx/zJ0+MXtxHVNstxBO6ZqKw2tiLINxJQrzULenKxjvVWV3W3GLwfAD9KR4TBA12SgAAAABJRU5ErkJggg=='
        mode.price = '银行卡'
        this.mode[1].price = data.data.bank_account_number
        this.mode[2].price = data.data.bank_account_name
        this.off = false
      }
    },
    // 时间控制
    async Setitem () {
      // 下单时间
      let item = new Date(this.data.created)
      // 时间详细显示
      this.set_item_M = item.getFullYear() + '' + (item.getMonth() + 1) + item.getDate() + item.getHours() + item.getMinutes() + item.getSeconds() + item.getMilliseconds()
      // 时间下单时间
      this.set_item_F = item.getFullYear() + '/' + (item.getMonth() + 1) + '/' + item.getDate() + ' ' + item.getHours() + ':' + item.getMinutes()
      // 当前时间
      // eslint-disable-next-line camelcase
      let item_hours = item.getHours() > 9 ? item.getHours() : '0' + item.getHours()
      // eslint-disable-next-line camelcase
      let item_minutes = item.getMinutes() > 9 ? item.getMinutes() : '0' + item.getMinutes()
      // eslint-disable-next-line camelcase
      let item_date = item.getDate() > 9 ? item.getDate() : '0' + item.getDate()
      // eslint-disable-next-line camelcase
      let item_month = (item.getMonth() + 1) > 9 ? (item.getMonth() + 1) : '0' + (item.getMonth() + 1)
      // eslint-disable-next-line camelcase
      let set = item.getFullYear() + '' + item_month + item_date + item_hours + item_minutes
      // 本地时间
      let date = new Date()
      // eslint-disable-next-line camelcase
      let itemSet_hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
      // eslint-disable-next-line camelcase
      let itemSet_minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
      // eslint-disable-next-line camelcase
      let itemSet_date = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      // eslint-disable-next-line camelcase
      let itemSet_month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
      // eslint-disable-next-line camelcase
      let itemSet = date.getFullYear() + '' + itemSet_month + itemSet_date + itemSet_hours + itemSet_minutes
      if ((itemSet - set) <= 15) {
        this.limittime = 15 - (itemSet - set)
        this.StartCountDown()
      } else {
        this.limittime = 0
        await this.$api.otc.orders_patch(this.$route.params.id, { op_type: 'user_cancel_order' })
      }
    },
    // title放回按钮
    onClickLeft () {
      this.$router.push({
        path: '/lend'
      })
    },
    // 弹窗提示
    tot_T () {
      this.show_tot = true
    },
    // 时间开始倒计时
    StartCountDown () {
      let mydate = new Date()
      mydate.setMinutes(mydate.getMinutes() + this.limittime)
      this.settime = mydate

      let time = setInterval(() => {
        if (this.flag === true) {
          clearInterval(time)
        }
        this.timeDown()
      }, 100)
    },
    // 分钟
    async timeDown () {
      const endTime = new Date(this.settime)
      const nowTime = new Date()
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
      // let d = parseInt(leftTime / (24 * 60 * 60))
      let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
      let m = this.formate(parseInt(leftTime / 60 % 60))
      let s = this.formate(parseInt(leftTime % 60))
      if (leftTime <= 0) {
        await this.$api.otc.orders_patch(this.$route.params.id, { op_type: 'user_cancel_order' })
        this.flag = true
        this.item = false
        this.delete_cre = true
        Toast('订单已自动取消')
      }
      this.keepTime = `${h}:${m}:${s}`
    },
    // 秒钟
    formate (time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
    },
    // 支付方式复制
    method_click (i) {
      if (i === 1 || i === 2 || i === 3) {
        let clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          // 释放内存
          clipboard.destroy()
          Toast('复制成功')
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      }
      if (i === 4) {
        this.show = true
      }
    },
    // 付款
    async but_no () {
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
      // const asset = this.pair.base.asset_id
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
        // on confirm
        console.log('成功')
        this.delete_cre = false
        this.item = false
        this.status_t = '已确认转账'
        await this.$api.otc.orders_patch(this.$route.params.id, { op_type: 'user_paid_confirm' })
      }).catch(() => {
        // on cancel
        console.log('失败')
      })
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
    }
  },
  async mounted () {
    await this.api()
  },
  destroyed () {
    this.$router.push({
      path: '/lend'
    })
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Step.name]: Step,
    [Steps.name]: Steps
  }
}
</script>

<style scoped lang="less">
  .otc_out{
    font-size: 16px;
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
    /*时间倒计时*/
    .down{
      text-align: center;
      line-height: 70px;
      font-size: 18px;
      color: #696969;
      span{
        vertical-align: middle;
        i{
          vertical-align: middle;
          font-size: 22px;
          color: #00CED1;
        }
      }
      span:nth-child(1){
        margin-right: 12px;
      }
    }
    /*取消*/
    /*取消*/
    .delete{
      text-align: center;
      line-height: 50px;
      border-bottom: 15px solid rgba(0,0,0,.05);
      border-top: 15px solid rgba(0,0,0,.05);
      .status{
        width: 60%;
        margin: 0 auto;
        padding: 15px 0;
        text-align: left;
        h3{
          line-height: 25px;
          font-size: 14px;
          text-align: justify;
        }
        .van-step--vertical {
          .van-step__circle{
            top: 21px;
          }
          .van-step__line{
            top: 21px;
          }
        }
        .van-step--vertical.van-step--process .van-icon{
          top: 16px;
        }
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
      width: 85%;
      margin: 0 auto;
      line-height: 45px;
      /*用户付款后的信息*/
      .method{
        display: flex;
        border-bottom: 1px solid rgba(0,0,0,.05);
        justify-content: space-between;
        padding: 0 5px;
        .style{
          display: flex;
          align-items: center;
          color: #696969;
          /*vertical-align: middle;*/
          span{
            color: #999;
            /*vertical-align: middle;*/
          }
          i{
            vertical-align: middle;
          }
          .img{
            width: 20px;
            margin-right: 8px;
            color: #7FFFAA;
            padding-top: 5px;
            img{
              width: 100%;
            }
          }
        }
        .active{
          color: #999;
        }
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
    .Tips{
      font-size: 13px;
      width: 90%;
      margin: 0 auto;
      padding: 38px 0;
      color: #999;
    }
    .tot_popup{
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
          /*margin: 8px 0;*/
          line-height: 22px;
        }
      }
    }
  }
</style>
