<template>
  <div id="query">
    <div class="title">
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <!--用户信息-->
      <div class="user">
        <div class="user_img">
          <img :src="img" alt="">
        </div>
        <div class="user_naID">
          <p>{{user_name}}</p>
          <p>Bit-OX ID: {{user_ID}}</p>
        </div>
      </div>
      <!--二维码-->
      <div class="code">
        <canvas class="canvas" ref="canvas"></canvas>
      </div>
      <!--二维码ID号-->
      <div class="code_ID">{{code_ID}}</div>
    </div>
    <div class="text">充值至少需要 100 个区块确认</div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { NavBar } from 'vant'
export default {
  data () {
    return {
      title: '- -',
      canvas: '',
      img: require('../../../../../assets/cat.jpg'),
      user_name: '- -',
      user_ID: '- -',
      code_ID: '- -'
    }
  },
  methods: {
    // 二维码
    useqrcode () {
      let canvas = this.$refs.canvas
      QRCode.toCanvas(canvas, JSON.parse(localStorage.getItem('lists')).chain_id, function (error) {
        if (error) console.error(error)
        // console.log('QRCode success!')
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  computed: {
  },
  activated () {
    this.useqrcode()
    // console.log(JSON.parse(localStorage.getItem('lists')))
    console.log(JSON.parse(localStorage.getItem('lists')).chain_id)
    this.title = JSON.parse(localStorage.getItem('lists')).symbol
    this.user_name = JSON.parse(localStorage.getItem('userInfo')).full_name
    this.user_ID = JSON.parse(localStorage.getItem('userInfo')).identity_num
    this.code_ID = JSON.parse(localStorage.getItem('lists')).chain_id
  },
  components: {
    [NavBar.name]: NavBar
  }
}
</script>

<style scoped lang="less">
  #query{
    font-size: 16px;
    height: 100%;
    background-color: #F5F5F5;
    .content{
      width: 93%;
      margin: 20px auto;
      background-color: white;
      padding: 20px 20px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      /*用户信息*/
      .user{
        display: flex;
        align-items: center;
        font-size: 13px;
        padding-left: 5px;
        padding-top: 5px;
        .user_img{
          width: 40px;
          img{
            width: 100%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
        }
        .user_naID{
          padding-left: 8px;
          p:nth-child(1){
            font-size: 14px;
          }
          p:nth-child(2){
            font-size: 12px;
          }
        }
      }
      /*二维码*/
      .code{
        text-align: center;
        margin: 15px 0 10px 0;
        .canvas{
          width: 80%!important;
          height: auto!important;
        }
      }
      /*二维码ID信息*/
      .code_ID{
        width: 90%;
        margin: 0 auto;
        text-align: center;
        font-size: 13px;
        padding: 10px 0;
        color: #999;
        background-color: #F5F5F5;
        line-height: 30px;
      }
    }
    /*提示充值内容*/
    .text{
      font-size: 13px;
      text-align: center;
      padding-top: 10px;
    }
  }
</style>
