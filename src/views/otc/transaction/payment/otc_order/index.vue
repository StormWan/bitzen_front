<template>
    <div class="otc_order">
      <!--标题-->
      <div class="title">
        <van-nav-bar
          :title='title'
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
        <span>
          <van-icon name="clock-o" />
        </span>
        <span>等待支付 {{keepTime}}</span>
      </div>
      <!--支付方式-->
      <div class="method_bos" v-if="item">
        <!--付款用户信息栏-->
        <div v-for="(item,index) in mode" :key="index">
          <div class="method" v-if="off">
            <div class="mode">{{item.name}}</div>
            <div class="style" :class="{active: index === 0}">
              <div class="img" v-if="index === 0">
                <img :src="mode[0].img" alt="">
              </div>
              <div class="tag-read" :data-clipboard-text="item.price" @click="method_click(index)">{{item.price}}<span v-if="index !== 0">
              <van-icon name="arrow" />
            </span></div>
            </div>
          </div>
        </div>
        <!--付款确认-->
        <div class="but">
          <div class="but_ok" @click="but_ok">我已付款</div>
          <div class="but_no" @click="but_no">取消订单</div>
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
      <!--说明-->
      <div class="Tips">1.如需帮助请联系 BlockPay 客服，Mixin ID：28749，微信：jc_castle</div>
      <!--弹出层-->
      <div class="Tip">
        <van-popup v-model="show">
          <div class="Tip_img">
            <img :src="img" alt="">
          </div>
        </van-popup>
      </div>
    </div>
</template>

<script>
import { NavBar, Icon, Popup, Toast, Step, Steps, Dialog } from 'vant'
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      title: '',
      keepTime: '',
      // 时间设定
      limittime: 0,
      settime: '',
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
      show: false,
      data: [],
      // 收款人信息
      alipay_name: '',
      // 时间
      set_item_M: '',
      set_item_F: '',
      Fun: '',
      usdt_amount: '',
      currency_amount: '',
      img: '',
      off: true,
      delete_cre: false,
      active: 0,
      status_t: '待转账',
      status_c: '等待承兑商释放USDT',
      status_b: '完成'
    }
  },
  methods: {
    async api () {
      const { data } = await this.$api.otc.orders_get(this.$route.params.id)
      this.data = data.data
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
      await this.Setitem()
      this.status()
      // 付款方式图片显示说明
      let mode = this.mode[0]
      // 微信付款
      if (data.data.payment_method === 'wechat') {
        mode.img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAABiklEQVR4AbWVAWRCURSGf8gIGQyYgUEAgyAAbCCAAAQQGBAYIGAwAAgIwAMJGIsqRTAgQPAQEsKDu//kXHLddV+v+w6f0HnvP/e8/5yLYPzgAXN0yICsSUoyZUeW+l/nlFs45miSRF9scpKRBDM0rhGqacXmRobhE8/wwsQtMZHYyjv/E2swYU9MZPZW1DVGWoLYEQt88ffR/W7DyEIHCn3ab4gVKpjhzbayHlOI9K2QHqZFNsSctKSSCEI78oE17h1PTJy8PnRwjYdNjlanpEdqsLHC04XnltA2+KuWiudoe9y7xQLvWKF6JlSVE5DjxZZf3CRs91nV3zqjXYxw55iuk9PlGQKJGaZ4hoR123lM8cqc3yu+dSqC40BS4lkSdf9zQcY4tSic2LQLQgc5K+jmrl3Wu0DiUkxy4+o72LEJnDISUrDjtKREwTHc0DkalSA2sfPqE62oKWKJDWRmgzd+BKENaUGjLMGjzmbbLoiigmvSk/tMnKa3y0DQ9vdIM9S6gKCK6FqLGX+Ik2Cgy7oRZQAAAABJRU5ErkJggg=='
        mode.price = '微信'
        this.mode[3].price = data.data.merchant.wechat_account
        this.img = 'http://124.156.115.134' + data.data.merchant.wechat_qrcode
      } else if (data.data.payment_method === 'alipay') {
        // 支付宝付款
        mode.img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAB7ElEQVR4Ac2WA6weQRSFb62gtuPajetGtW0FNcO6cVK7XdRu2Ia149R2Z6bP9r6T+yb5bZ7k/Bh9gzt3l1hXfzUiS+4iU36GK2AnTq6AP/PYJ/42JhZ+oPAp7CTWYDDUVHu4IDneCaD8kkTgV4r4zA5+akBuivhMI56llyLv768wXkpfYNK3NGXAaHQhpxlHY9KAlpwc6Qojt6W2urZYnYoFWA5XhWhTSaf/dmHYDqc2/v+NFPiZDLmKzv7pxAPAZIvWZPwbjrqN8B242LU6edUtgMZGGjS3XI8R6IRTj/yI2xhiPNofA7CPCyiuRAL8wM9FUy6AH8I5urwE/gwb8FSdS311+ldz1KsIgGIpmWpNGEGSQYbaC7f1gWIyPClD3uaJBgWeld3x/S3MyCwkWwz1AfqsWCzV8EIfIAeJqd6GAcuHx7oFylz4AVlqGl116gQ/c3HABTTkFH1pywPD1Esy//V0wdQMlJe6Rex3MtQ2OvO/fRgZXbziGVqqP+CmXm0m/AED2WT9G0GOU4sg/sYVCZLCyngrLTHRJ9K9Gl4jWzShYDoj+5Ih7keQiSQWcwgTHqKBPrP8wanK/D+QLzwOH4DeOgDu+maeiPwmBS9RuFNJA1pyV9JfhF33BHS9vZVxhFTWjCn2kYZVAyRlGm3AoxGeAAAAAElFTkSuQmCC'
        this.mode[0].price = '支付宝'
        this.mode[3].price = data.data.merchant.alipay_account
        // this.img = data.data.merchant.alipay_qrcode
        this.img = 'http://124.156.115.134' + data.data.merchant.alipay_qrcode
      } else {
        // 银行卡付款
        mode.img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABHklEQVR4Ae2WgUYEURSGh70oQIB6gh6gHmBsqhfqHdq2hAJTUYAACMCytqQISUDAVpsEsWi09TX/XFcxYeJ0E/vzMf4z7uc6cJMQWi6l1egU5AUYkfszXZp8TVFmBfwyWbhZU0UcXKrbdWMJ5ZLwNaIwl5CY1BPen8HgAtoT1dn6pJ/dnRoKn64p01mpztQpj1eGwsNlyuTPsDX92W/P+A70j6FQ3BxR5nI3dP4bNDPeochmYZTD+xvsz8HBvP8evWhmLvScb1Cm3/Mo6sLcXLg5BcMHQhgO1BkL+8fUjP6NLLw9MRB+R0h19h+F4x3WYSystVe/rx/zJ0+MXtxHVNstxBO6ZqKw2tiLINxJQrzULenKxjvVWV3W3GLwfAD9KR4TBA12SgAAAABJRU5ErkJggg=='
        mode.price = '银行卡'
        this.mode[3].price = data.data.merchant.bank_account_number
        this.off = false
      }
    },
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
        this.status_t = '已确认转账'
        this.status_c = '承兑商已经释放USDT'
        this.active = 2
      } else if (this.data.status === 11) {
        this.limittime = 0
        this.active = 1
        this.item = false
        this.status_t = '已确认转账'
      } else if (this.data.status === 12) {
        this.limittime = 0
        this.item = false
        this.active = 1
        this.status_t = '已确认转账'
        this.status_c = '承兑商已经释放USDT'
      } else if (this.data.status === 30) {
        this.limittime = 0
        this.item = false
        this.delete_cre = true
      } else {
        this.limittime = 0
        this.item = false
        Toast('数据错误')
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
      } else {
        this.limittime = 0
        await this.$api.otc.orders_patch(this.$route.params.id, { op_type: 'user_cancel_order' })
      }
    },
    onClickLeft () {
      this.$router.push({
        path: '/lend'
      })
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
    timeDown () {
      const endTime = new Date(this.settime)
      const nowTime = new Date()
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
      // let d = parseInt(leftTime / (24 * 60 * 60))
      let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
      let m = this.formate(parseInt(leftTime / 60 % 60))
      let s = this.formate(parseInt(leftTime % 60))
      if (leftTime <= 0) {
        this.flag = true
        this.item = false
        Toast('订单已取消')
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
    // 取消订单
    async but_no () {
      // 支付取消提醒
      Dialog.confirm({
        title: '取消',
        message: '是否取消订单'
      }).then(async () => {
        // on confirm
        await this.$api.otc.orders_patch(this.$route.params.id, { op_type: 'user_cancel_order' })
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
    async but_ok () {
      // 支付成功提醒
      Dialog.confirm({
        title: '付款结果',
        message: '是否成功支付'
      }).then(async () => {
        // on confirm
        await this.$api.otc.orders_patch(this.$route.params.id, { op_type: 'user_paid_confirm' })
        this.item = false
        this.status_t = '已确认转账'
        Toast('确认付款')
      }).catch(() => {
        // on cancel
        Toast('请转账后再试')
      })
    }
  },
  async mounted () {
    this.api()
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Dialog.name]: Dialog
  },
  destroyed () {
    this.$router.push({
      path: '/lend'
    })
  }
}
</script>

<style lang="less">
  .otc_order{
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
      }
    }
    /*提示说明*/
    .explain{
      text-align: center;
      line-height: 30px;
      padding: 13px 0;
      color: #FA8072;
      p:nth-last-child(1){
        font-size: 13px;
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
    .delete{
      text-align: center;
      line-height: 50px;
      border-bottom: 15px solid rgba(0,0,0,.05);
      border-top: 15px solid rgba(0,0,0,.05);
      .status{
        width: 55%;
        margin: 0 auto;
        padding: 15px 0;
        text-align: left;
        h3{
          line-height: 25px;
          font-size: 15px;
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
          span{
            color: #999;
            vertical-align: middle;
          }
          .img{
            width: 20px;
            margin-right: 8px;
            color: #7FFFAA;
            img{
              width: 100%;
              vertical-align: middle;
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
    /*说明*/
    .Tips{
      font-size: 13px;
      width: 90%;
      margin: 0 auto;
      padding: 38px 0;
      color: #999;
    }
    /*弹出层*/
    .Tip{
      .Tip_img{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        img{
          width: 100%;
          height: 99%;
        }
      }
    }
    .van-popup{
      width: 80%;
      height: 60%;
    }
  }
</style>
