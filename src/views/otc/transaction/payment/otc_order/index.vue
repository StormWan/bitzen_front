<template>
    <div class="otc_order">
      <!--标题-->
      <div class="title">
        <van-nav-bar
          title="订单"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>
      <div class="top">
          <!--下单时间-->
          <div class="item">
            <div>No:201906031524</div>
            <div>2019/0603 15:24</div>
          </div>
          <!--购买转账人-->
          <div class="turn_name">你向 {{data.merchant.alipay_name}} 购买 {{data.price}} USDT</div>
          <!--单价-->
          <div class="price">
            <div class="unit">
              <span>单价：</span>
              <span>7.12 CNY/USDT</span>
            </div>
            <div class="total">
              <span>总价：</span>
              <span>10 CNY</span>
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
        <div class="method" v-for="(item,index) in mode" :key="index">
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
        <!--付款确认-->
        <div class="but">
          <div class="but_ok">我已付款</div>
          <div class="but_no" @click="but_no">取消订单</div>
        </div>
      </div>
      <div class="delete" v-else><span><van-icon name="close" /></span><span>已取消</span></div>
      <!--说明-->
      <div class="Tips">1.如需帮助请联系 Bit-ox 客服，Mixin ID：28749，微信：jc_castle</div>
      <!--弹出层-->
      <div>
        <van-popup v-model="show">扫描二维码</van-popup>
      </div>
    </div>
</template>

<script>
import { NavBar, Icon, Popup, Toast } from 'vant'
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      down: '00:14:54',
      keepTime: '',
      // 时间设定
      limittime: 15,
      settime: '',
      flag: false,
      mode: [
        {
          name: '微信支付',
          price: '微信',
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAABiklEQVR4AbWVAWRCURSGf8gIGQyYgUEAgyAAbCCAAAQQGBAYIGAwAAgIwAMJGIsqRTAgQPAQEsKDu//kXHLddV+v+w6f0HnvP/e8/5yLYPzgAXN0yICsSUoyZUeW+l/nlFs45miSRF9scpKRBDM0rhGqacXmRobhE8/wwsQtMZHYyjv/E2swYU9MZPZW1DVGWoLYEQt88ffR/W7DyEIHCn3ab4gVKpjhzbayHlOI9K2QHqZFNsSctKSSCEI78oE17h1PTJy8PnRwjYdNjlanpEdqsLHC04XnltA2+KuWiudoe9y7xQLvWKF6JlSVE5DjxZZf3CRs91nV3zqjXYxw55iuk9PlGQKJGaZ4hoR123lM8cqc3yu+dSqC40BS4lkSdf9zQcY4tSic2LQLQgc5K+jmrl3Wu0DiUkxy4+o72LEJnDISUrDjtKREwTHc0DkalSA2sfPqE62oKWKJDWRmgzd+BKENaUGjLMGjzmbbLoiigmvSk/tMnKa3y0DQ9vdIM9S6gKCK6FqLGX+Ik2Cgy7oRZQAAAABJRU5ErkJggg=='
        },
        {
          name: '总金额',
          price: '10.01'
        },
        {
          name: '姓名',
          price: '廖梅'
        },
        {
          name: '账号',
          price: 'lemoo220'
        },
        {
          name: '收款码',
          price: '点击展示'
        }
      ],
      item: true,
      show: false,
      data: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
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
    // 取消订单
    but_no () {
      this.item = false
      this.flag = true
      Toast('取消成功')
    }
  },
  async mounted () {
    this.StartCountDown()
    console.log(this.$route.params.id)
    const { data } = await this.$api.otc.orders_get(this.$route.params.id)
    this.data = data.data
    console.log(this.data)
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  }
}
</script>

<style scoped lang="less">
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
          }
          .img{
            width: 20px;
            margin-right: 8px;
            color: #7FFFAA;
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
    .Tips{
      font-size: 13px;
      width: 90%;
      margin: 0 auto;
      padding: 38px 0;
      color: #999;
    }
  }
</style>
