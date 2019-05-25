<template>
    <div class="transaction">
      <!--头部标题-->
      <div class="top">
        <!--返回-->
        <div class="Arrow" @click="Arrow">
          <van-icon name="arrow-left"></van-icon>
        </div>
        <div class="title">
          <span>Tether</span>
          <span>{{Receive.name}}</span>
          <span>({{Receive.market_name}})</span>
        </div>
      </div>
      <!--买入卖出-->
      <div class="Business">
        <div class="Purchase" :class="{active: active_index === 0}" @click="active_click(0)">买入</div>
        <div class="Sell_out" :class="{active: active_index === 1}" @click="active_click(1)">卖出</div>
      </div>
      <form method="get">
        <!--买入信息-->
        <div v-if="active_index === 0" class="money_Calcu">
        <!--金额-->
        <div class="money">
          <span>￥</span>
          <span>{{money}}</span>
        </div>
        <!--买入计算-->
        <div class="Calculation">
          <div>至少支付 ￥ <span>{{money}}</span>,购买 <span>{{least_Number}}</span> 个 <span>{{Receive.market_name}}</span></div>
          <div>至支多付 ￥ <span>{{most_money}}</span>,购买 <span>{{most_Number}}</span> 个 <span>{{Receive.market_name}}</span></div>
        </div>
        <!--金额计算-->
        <div class="Amount_money">
          <div class="CNY_money">{{CNY}} 金额 <span class="Tips">{{Tips}}</span></div>
          <!--弹起数字输入框-->
          <div class="input">
            <input type="number" v-model="inp_CNY" @input="inputFun" />
          </div>
        </div>
        <div class="Amount_money">
          <div class="CNY_money">到账 {{Receive.market_name}} 数量</div>
          <!--弹起数字输入框-->
          <div class="input">
            <input type="number" v-model="inp_market" @input="inputfun" />
          </div>
        </div>
        <!--到账 {{Receive.market_name}}-->
      </div>
        <!--买入信息-->
        <div v-if="active_index === 1" class="money_Calcu">
          <!--金额-->
          <div class="money">
            <span>￥</span>
            <span>{{money}}</span>
          </div>
          <!--买入计算-->
          <div class="Calculation">
            <div>最小出售 ￥ <span>{{money}}</span>,约到账 <span>{{least_Number}}</span> 个 <span>{{Receive.market_name}}</span></div>
            <div>最大出售 ￥ <span>{{most_money}}</span>,约到账 <span>{{most_Number}}</span> 个 <span>{{Receive.market_name}}</span></div>
          </div>
          <!--金额计算-->
          <div class="Amount_money">
            <div class="CNY_money">卖出 {{Receive.market_name}} 数量</div>
            <!--弹起数字输入框-->
            <div class="input">
              <input type="number" v-model="inp_market" @input="inputfun" />
            </div>
          </div>
          <div class="Amount_money">
            <div class="CNY_money">预估到账 {{CNY}} 金额<span class="Tips">{{Tips}}</span></div>
            <!--弹起数字输入框-->
            <div class="input">
              <input type="number" v-model="inp_CNY" @input="inputFun" />
            </div>
          </div>
          <!--到账 {{Receive.market_name}}-->
        </div>
      </form>
    </div>
</template>

<script>
import { Icon, NumberKeyboard } from 'vant'
export default {
  data () {
    return {
      // 接收数据
      Receive: [],
      active_index: 0,
      money: 6.8,
      least_Number: 1,
      most_Number: 5000,
      most_money: 34000.00,
      CNY: 'CNY',
      inp_CNY: '',
      inp_market: '',
      aa: [],
      Tips: ''
    }
  },
  methods: {
    // 箭头点击回退一页
    Arrow () {
      this.$router.go(-1)
      localStorage.removeItem('Send_out')
    },
    // 买入卖出点击
    active_click (e) {
      this.active_index = e
    },
    // input框监听
    inputFun () {
      if (!this.inp_CNY) {
        this.inp_market = ''
        this.Tips = ''
      } else {
        this.inp_market = (this.inp_CNY / this.money).toFixed(4)
        if (this.inp_CNY < this.money) {
          this.inp_market = ''
          this.Tips = '(请输入正确' + this.CNY + '金额)'
        } else {
          this.Tips = ''
        }
      }
    },
    inputfun () {
      if (!this.inp_market) {
        this.inp_CNY = ''
      } else {
        this.inp_CNY = (this.inp_market * this.money).toFixed(2)
      }
    }
  },
  components: {
    [Icon.name]: Icon,
    [NumberKeyboard.name]: NumberKeyboard
  },
  // keep-alive 组件激活时调用
  activated () {
    this.Receive = JSON.parse(localStorage.getItem('Send_out'))
  }
}
</script>

<style scoped lang="less">
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
      /*标题*/
      .title{
        color: #999;
        font-size: 16px;
        padding: 13px 0;
        span{
          vertical-align: middle;
        }
        span:nth-child(1){
        }
        span:nth-child(2){
          margin: 0 4px;
          font-size: 15px;
        }
        span:nth-last-child(1){
          font-size: 15px;
        }
      }
    }
    /*买入卖出*/
    .Business{
      display: flex;
      justify-content: center;
      padding: 35% 0 30px 0;
      color: #1E90FF;
      line-height: 40px;
      font-size: 18px;
      text-align: center;
      div{
        width: 120px;
        border: 1px solid #1E90FF;
      }
      .Purchase{
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .Sell_out{
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      .active{
        background-color: #1E90FF;
        color: white;
      }
    }
    .money_Calcu{
      text-align: center;
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
          font-size: 12px;
          color: #696969;
          /*text-align: left;*/
          span:nth-child(1),span:nth-child(2){
            color: #FF6347;
            font-size: 11px;
          }
        }
        div:nth-child(1){
          margin-bottom: 10px;
        }
      }
      /*金额计算*/
      .Amount_money{
        color: #696969;
        font-size: 15px;
        border-bottom: 1px solid #DCDCDC;
        width: 70%;
        margin: 20px auto;
        text-align: left;
        .Tips{
          color: red;
          font-size: 10px;
          margin-left: 5px;
        }
        .input{
          color: #DCDCDC;
          margin: 5px 0;
          input{
            border: none;
            color: #000;
          }
        }
      }
    }
  }
</style>
