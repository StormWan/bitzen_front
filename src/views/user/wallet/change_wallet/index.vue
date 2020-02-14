<template>
    <div class="change_wallet">
      <div class="fixed"></div>
      <!--头部标题-->
        <van-nav-bar
          :title="title"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      <div class="content-box">
        <!--内容-->
        <div class="content">
          <!--图片-->
          <div class="img">
            <img :src="img" alt="">
          </div>
          <div class="wallet-message">
            <div class="message-top">
              <span v-cloak>{{price_btc}}</span>
              <span v-cloak>{{title}}</span>
            </div>
            <div class="message-bottom">
              <span>≈ {{price_usd}}</span>
              <span>{{name}}</span>
            </div>
          </div>
        </div>
        <!--提现充值-->
        <van-row type="flex" justify="space-between">
          <van-col span="12">
            <van-button type="default" to="/withdrawal" size="large">提现</van-button>
          </van-col>
          <van-col span="12">
            <van-button type="default" to="/wallet_recharge" size="large">充值</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
</template>

<script>
import { NavBar, Row, Col, Button } from 'vant'
export default {
  name: 'change_wallet',
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button
  },
  data () {
    return {
      lists: Object,
      title: '- -',
      img: '',
      price_btc: '- -',
      price_usd: '- -',
      name: '- -'
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  activated () {
    this.lists = JSON.parse(localStorage.getItem('lists'))
    console.log(this.lists)
    // 标题
    this.title = this.lists.symbol
    this.img = this.lists.icon_url
    this.price_btc = this.lists.balance * this.lists.price_btc
    this.price_usd = this.lists.price_usd * this.lists.balance
    this.name = this.lists.name
  }
}
</script>

<style scoped lang="less">
  [v-cloak]{
    display: none;
  }
  .change_wallet{
    font-size: 18px;
    height: 100%;
    .content-box{
      height: 100%;
      background-color: #F5F5F5;
      /*内容*/
      .content{
        background-color:#F8F8FF;
        padding: 48px 0;
        .img{
          width: 40px;
          margin: 0 auto;
          padding-bottom: 20px;
          img{
            width: 100%;
          }
        }
        .wallet-message{
          text-align: center;
          .message-top{
            span:nth-child(1){
              font-size: 28px;
              margin-right: 8px;
            }
            span:nth-child(2){
              color: #808080;
              font-size: 22px;
            }
          }
          .message-bottom{
            margin-top: 5px;
            font-size: 16px;
            color: #C0C0C0;
            span:nth-child(1){
              margin-right: 3px;
            }
          }
        }
      }
    }
  }
</style>
