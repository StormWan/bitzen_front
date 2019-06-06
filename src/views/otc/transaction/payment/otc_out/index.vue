<template>
  <div class="otc_out">
    <!--遮罩层-->
    <div :class="{mask: triangle_active}" @click="mask"></div>
    <!--标题-->
    <div class="title">
      <van-nav-bar
        title="卖出"
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
      <div class="turn_name">你出售 1 EOS，价值约 6.28 USDT</div>
      <!--单价-->
      <div class="price">
        <div class="unit">
          <span>单价：</span>
          <span>7.12 CNY/USDT</span>
        </div>
        <div class="total">
          <span>预估到账：</span>
          <span @click="tot_T">
            <van-icon name="question-o" />
          </span>
          <span>10 CNY</span>
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
    <div class="delete" v-else><span><van-icon name="close" /></span><span>已取消</span></div>
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
    <div class="Tips">1.如需帮助请联系 Bit-ox 客服，Mixin ID：28749，微信：jc_castle</div>
    <!--二维码弹出层-->
    <div>
      <van-popup v-model="show">扫描二维码</van-popup>
    </div>
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
import { NavBar, Icon, Popup, Toast } from 'vant'
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      down: '00:14:54',
      keepTime: '',
      // 时间设定
      limittime: 3,
      settime: '',
      flag: false,
      mode: [
        {
          name: '微信支付',
          price: '微信',
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAABiklEQVR4AbWVAWRCURSGf8gIGQyYgUEAgyAAbCCAAAQQGBAYIGAwAAgIwAMJGIsqRTAgQPAQEsKDu//kXHLddV+v+w6f0HnvP/e8/5yLYPzgAXN0yICsSUoyZUeW+l/nlFs45miSRF9scpKRBDM0rhGqacXmRobhE8/wwsQtMZHYyjv/E2swYU9MZPZW1DVGWoLYEQt88ffR/W7DyEIHCn3ab4gVKpjhzbayHlOI9K2QHqZFNsSctKSSCEI78oE17h1PTJy8PnRwjYdNjlanpEdqsLHC04XnltA2+KuWiudoe9y7xQLvWKF6JlSVE5DjxZZf3CRs91nV3zqjXYxw55iuk9PlGQKJGaZ4hoR123lM8cqc3yu+dSqC40BS4lkSdf9zQcY4tSic2LQLQgc5K+jmrl3Wu0DiUkxy4+o72LEJnDISUrDjtKREwTHc0DkalSA2sfPqE62oKWKJDWRmgzd+BKENaUGjLMGjzmbbLoiigmvSk/tMnKa3y0DQ9vdIM9S6gKCK6FqLGX+Ik2Cgy7oRZQAAAABJRU5ErkJggg=='
        },
        {
          name: '收款账号',
          price: '1452871763'
        }
      ],
      item: true,
      show: false,
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
      icon_index: 0
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
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
    // 付款成功
    but_no () {
      Toast('付款成功')
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
  mounted () {
    this.StartCountDown()
    console.log(this.$route.params.id)
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
