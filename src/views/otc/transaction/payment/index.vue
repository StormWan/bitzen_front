<template>
    <div class="payment">
      <!--标题-->
      <div class="title">
        <van-nav-bar
          :title="title"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>

      <!--收银台-->
      <div class="cashier">
        <!--选择标题提示-->
        <div class="top">请选择{{title}}的方式</div>
        <!--付款方式>>>银行卡-->
        <div class="mode" v-for="(item,index) in mode" :key="index" @click="mode_click(index)">
          <!--付款方式logo-->
          <div class="img">
            <img :src="item.img" alt="">
          </div>
          <!--付款方向-->
          <div class="title">{{item.name}}
            <span class="Bank" v-if="index === 0">推荐</span>
            <span class="WeChat" v-if="index === 1">需 0.1 元转账手续费</span>
          </div>
          <!--付款说明-->
          <div class="explain" v-if="index === 0 && on_hook !== 0">需实名验证</div>
          <div class="hook" v-if="index === on_hook">
            <van-icon name="success" />
          </div>
        </div>

        <!--点击确认按钮-->
        <div class="but" :class="{active: but}" @click="but_click">确认购买</div>
      </div>
    </div>
</template>

<script>
import { NavBar, Icon, Dialog } from 'vant'
export default {
  data () {
    return {
      // 付款选项列表
      mode: [
        {
          name: '银行卡',
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABHklEQVR4Ae2WgUYEURSGh70oQIB6gh6gHmBsqhfqHdq2hAJTUYAACMCytqQISUDAVpsEsWi09TX/XFcxYeJ0E/vzMf4z7uc6cJMQWi6l1egU5AUYkfszXZp8TVFmBfwyWbhZU0UcXKrbdWMJ5ZLwNaIwl5CY1BPen8HgAtoT1dn6pJ/dnRoKn64p01mpztQpj1eGwsNlyuTPsDX92W/P+A70j6FQ3BxR5nI3dP4bNDPeochmYZTD+xvsz8HBvP8evWhmLvScb1Cm3/Mo6sLcXLg5BcMHQhgO1BkL+8fUjP6NLLw9MRB+R0h19h+F4x3WYSystVe/rx/zJ0+MXtxHVNstxBO6ZqKw2tiLINxJQrzULenKxjvVWV3W3GLwfAD9KR4TBA12SgAAAABJRU5ErkJggg=='
        },
        {
          name: '微信',
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAABiklEQVR4AbWVAWRCURSGf8gIGQyYgUEAgyAAbCCAAAQQGBAYIGAwAAgIwAMJGIsqRTAgQPAQEsKDu//kXHLddV+v+w6f0HnvP/e8/5yLYPzgAXN0yICsSUoyZUeW+l/nlFs45miSRF9scpKRBDM0rhGqacXmRobhE8/wwsQtMZHYyjv/E2swYU9MZPZW1DVGWoLYEQt88ffR/W7DyEIHCn3ab4gVKpjhzbayHlOI9K2QHqZFNsSctKSSCEI78oE17h1PTJy8PnRwjYdNjlanpEdqsLHC04XnltA2+KuWiudoe9y7xQLvWKF6JlSVE5DjxZZf3CRs91nV3zqjXYxw55iuk9PlGQKJGaZ4hoR123lM8cqc3yu+dSqC40BS4lkSdf9zQcY4tSic2LQLQgc5K+jmrl3Wu0DiUkxy4+o72LEJnDISUrDjtKREwTHc0DkalSA2sfPqE62oKWKJDWRmgzd+BKENaUGjLMGjzmbbLoiigmvSk/tMnKa3y0DQ9vdIM9S6gKCK6FqLGX+Ik2Cgy7oRZQAAAABJRU5ErkJggg=='
        },
        {
          name: '支付宝',
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAB7ElEQVR4Ac2WA6weQRSFb62gtuPajetGtW0FNcO6cVK7XdRu2Ia149R2Z6bP9r6T+yb5bZ7k/Bh9gzt3l1hXfzUiS+4iU36GK2AnTq6AP/PYJ/42JhZ+oPAp7CTWYDDUVHu4IDneCaD8kkTgV4r4zA5+akBuivhMI56llyLv768wXkpfYNK3NGXAaHQhpxlHY9KAlpwc6Qojt6W2urZYnYoFWA5XhWhTSaf/dmHYDqc2/v+NFPiZDLmKzv7pxAPAZIvWZPwbjrqN8B242LU6edUtgMZGGjS3XI8R6IRTj/yI2xhiPNofA7CPCyiuRAL8wM9FUy6AH8I5urwE/gwb8FSdS311+ldz1KsIgGIpmWpNGEGSQYbaC7f1gWIyPClD3uaJBgWeld3x/S3MyCwkWwz1AfqsWCzV8EIfIAeJqd6GAcuHx7oFylz4AVlqGl116gQ/c3HABTTkFH1pywPD1Esy//V0wdQMlJe6Rex3MtQ2OvO/fRgZXbziGVqqP+CmXm0m/AED2WT9G0GOU4sg/sYVCZLCyngrLTHRJ9K9Gl4jWzShYDoj+5Ih7keQiSQWcwgTHqKBPrP8wanK/D+QLzwOH4DeOgDu+maeiPwmBS9RuFNJA1pyV9JfhF33BHS9vZVxhFTWjCn2kYZVAyRlGm3AoxGeAAAAAElFTkSuQmCC'
        }
      ],
      on_hook: Number,
      but: false,
      index: 0,
      title: '',
      data: []
    }
  },
  methods: {
    // 标题
    onClickLeft () {
      this.$router.go(-1)
    },
    // 选择收款去向
    mode_click (i) {
      this.index = i
      if (i !== 0) {
        this.on_hook = i
        this.but = true
      } else {
        Dialog.confirm({
          title: '提示',
          message: '实名认证'
        }).then(() => {
          // on confirm
          console.log('确定')
          this.$router.push({
            path: '/real_name'
          })
          this.but = true
          // this.on_hook = i
        }).catch(() => {
          // on cancel
          console.log('取消')
        })
      }
    },
    // 点击提交按钮
    async but_click () {
      if (this.but) {
        // eslint-disable-next-line camelcase
        let payment_method = ''
        if (this.index === 0) {
          // eslint-disable-next-line camelcase
          payment_method = 'bank'
        } else if (this.index === 1) {
          // eslint-disable-next-line camelcase
          payment_method = 'wechat'
        } else {
          // eslint-disable-next-line camelcase
          payment_method = 'alipay'
        }
        let Obj = JSON.parse(sessionStorage.getItem('Obj'))
        // 买入时做的事情
        if (sessionStorage.getItem('page') === '0') {
          let { data } = await this.$api.otc.orders_post({ otc_pair: Obj.otc_pair, side: Obj.side, currency_amount: Obj.amount, price: Obj.price, payment_method: payment_method })
          const id = data.data.id
          // 创建订单时的事情
          this.$router.push({
            name: 'otc_order',
            params: {
              id: id
            }
          })
        } else {
          let { data } = await this.$api.otc.orders_post({ otc_pair: Obj.otc_pair, side: Obj.side, asset_amount: Obj.amount, price: Obj.price, payment_method: payment_method })
          const id = data.data.id
          // 卖出时做的事情
          if (this.index === 0) {
            // 银行收款的时候做的事情
            if (this.data.bank_account_name) {
              this.$router.push({
                name: 'otc_out',
                params: {
                  id: id
                }
              })
            } else {
              // 如果没有收款账号，跳转填入信息页面
              this.$router.push({
                path: '/receivables'
              })
            }
          } else if (this.index === 1) {
            // 微信收款时做的事情
            if (this.data.wechat_name) {
              this.$router.push({
                name: 'otc_out',
                params: {
                  id: id
                }
              })
            } else {
              // 如果没有收款账号，跳转填入信息页面
              this.$router.push({
                path: '/receivables'
              })
            }
          } else {
            // 支付宝收款做的事情
            if (this.data.alipay_name) {
              this.$router.push({
                name: 'otc_out',
                params: {
                  id: id
                }
              })
            } else {
              // 如果没有收款账号，跳转填入信息页面
              this.$router.push({
                path: '/receivables'
              })
            }
          }
        }
      }
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog
  },
  async activated () {
    if (sessionStorage.getItem('page') === '0') {
      this.title = '付款方式'
    } else {
      this.title = '收款方式'
    }
    let { data } = await this.$api.otc.payment_patch()
    this.data = data.data
  }
}
</script>

<style scoped lang="less">
  .payment{
    font-size: 16px;
    .cashier{
      width: 90%;
      margin: 0 auto;
      /*说明支付方式*/
      .top{
        line-height: 50px;
        color: #696969;
      }
      /*支付去处*/
      .mode{
        display: flex;
        align-items: center;
        color: #696969;
        border-bottom: 1px solid #F0F8FF;
        padding: 15px 5px;
        position: relative;
        .img{
          width: 9%;
          margin-right: 15px;
          img{
            width: 100%;
          }
        }
        .title{
          width: 70%;
          font-size: 18px;
          .Bank{
            border: 1px solid #00FA9A;
            padding:1px 7px;
            font-size: 12px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            margin-left: 8px;
            color: #00FA9A;
            margin-top: -10px;
          }
          .WeChat{
            border: 1px solid #FF1493;
            padding: 1px 5px;
            font-size: 12px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            color: #F8F8FF;
            margin-top: -10px;
            background-color: #FF1493;
          }
        }
        /*银行卡提示*/
        .explain{
          width: 30%;
          text-align: right;
          font-size: 13px;
          color: #999999;
        }
        /*选择后勾选icon*/
        .hook{
          text-align: right;
          width: 20%;
          color: green;
          font-size: 23px;
        }
      }
      /*支付按钮*/
      .but{
        background-color: rgba(0,0,0,.08);
        text-align: center;
        padding: 13px 0;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        color: white;
      }
      /*支付按钮加颜色*/
      .active{
        background-color: #1E90FF;
      }
    }
  }
</style>
