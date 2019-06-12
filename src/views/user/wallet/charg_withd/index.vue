<template>
    <div class="charg_withd">
      <div class="fixed"></div>
      <!--头部标题-->
      <div class="title">
        <van-nav-bar
          :title="title"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>
      <div class="bgCloro">
        <!--内容-->
        <div class="content">
          <!--图片-->
          <div class="img">
            <img :src="img" alt="">
          </div>
          <div class="data">
            <div class="data_top">
              <span v-cloak>{{price_btc}}</span>
              <span v-cloak>{{title}}</span>
            </div>
            <div class="data_bot">
              <span>≈ {{price_usd}}</span>
              <span>{{name}}</span>
            </div>
          </div>
        </div>
        <!--提现充值-->
        <div class="Thrust">
          <div>
            <router-link to="/withdrawal">提现</router-link>
          </div>
          <div>
            <router-link to="/wallet_recharge">充值</router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
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
  },
  components: {
    [NavBar.name]: NavBar
  }
}
</script>

<style scoped lang="less">
  [v-cloak]{
    display: none;
  }
  .charg_withd{
    font-size: 18px;
    height: 100%;
    .bgCloro{
      height: 100%;
      background-color: #F5F5F5;
      /*标题*/
      .title{
        padding-top: 10px;
      }
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
        .data{
          text-align: center;
          .data_top{
            span:nth-child(1){
              font-size: 28px;
              margin-right: 8px;
            }
            span:nth-child(2){
              color: #808080;
              font-size: 22px;
            }
          }
          .data_bot{
            margin-top: 5px;
            font-size: 16px;
            color: #C0C0C0;
            span:nth-child(1){
              margin-right: 3px;
            }
          }
        }
      }
      /*提现充值*/
      .Thrust{
        display: flex;
        text-align: center;
        background-color: #F8F8FF;
        border-top: 1px solid rgba(0,0,0,.05);
        border-bottom: 1px solid rgba(0,0,0,.05);
        div{
          width: 50%;
          line-height: 60px;
          height: 60px;
          a{
            font-size: 16px;
          }
        }
        div:nth-child(1){
          border-right: 1px solid rgba(0,0,0,.05);
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
