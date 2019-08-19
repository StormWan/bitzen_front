<template>
    <div class="share">
      <!--标题-->
        <van-nav-bar
          title="邀请好友"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      <div class="content">
        <div class="user">
          <div class="explanation" @click="explanation">
            <van-icon name="question-o" />
          </div>
          <div class="user_box">
            <!--用户图片-->
            <div class="user_img">
              <img src="../../../assets/cat.jpg" alt="">
            </div>
            <div class="user_name">{{user_name}}</div>
            <div class="text">邀您体验 BlockPay</div>
            <div class="code">邀请码： {{code}}</div>
            <!--二维码分享页-->
            <div class="query">
              <canvas class="canvas" ref="canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
      <!--链接复制-->
      <div class="copy">
        <div>
          <van-icon name="cluster" />
        </div>
        <div>
          <button class="tag-read" data-clipboard-text="https://BlockPay.com" @click="copy">复制链接</button>
        </div>
      </div>
    </div>
</template>

<script>
import { NavBar, Icon, Dialog, Toast } from 'vant'
import QRCode from 'qrcode'
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      user_name: '',
      code: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 疑问
    explanation () {
      console.log(123)
      Dialog.alert({
        title: '邀请好友',
        message: '长按图片保存二维码，或者点击复制按钮，即可复制分享'
      }).then(() => {
        // on close
      })
    },
    // 动态生成二维码
    useqrcode () {
      // 生成的二维码内容，可以添加变量
      this.QueryDetail = 'https://BlockPay.com' + this.QueryDetail
      let canvas = this.$refs.canvas
      QRCode.toCanvas(canvas, this.QueryDetail, function (error) {
        if (error) console.error(error)
      })
    },
    // 复制
    copy () {
      let clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        // 释放内存
        clipboard.destroy()
        Toast('复制成功')
      })
      clipboard.on('error', e => {
        // 不支持复制
        Toast('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  activated () {
    this.user_name = JSON.parse(localStorage.getItem('userInfo')).full_name
    this.code = JSON.parse(localStorage.getItem('userInfo')).identity_num
    this.useqrcode()
  }
}
</script>

<style scoped lang="less">
  .share{
    width: 100%;
    height: 100%;
    font-size: 16px;
    /*用户分享信息*/
    .content{
      margin-bottom: 11%;
      position: relative;
      height: 100%;
      width: 100%;
      background: url("../../../assets/share_bg.jpg");
      -webkit-background-size: 100%;
      background-size: 100%;
      background-repeat: no-repeat;
      .user{
        position: absolute;
        color: white;
        width: 100%;
        height: 100%;
        padding: 0;
        /*疑问解答*/
        .explanation{
          color: #FFFAFA;
          font-size: 25px;
          text-align: right;
          padding: 40px 40px 0 0;
        }
        animation: user 1s ease;
        @keyframes user{
          0%{
            width: 0;
            height: 0;
          }
          100%{
            width: 100%;
            height: 100%;
          }
        }
        .user_box{
          position: absolute;
          bottom: 16%;
          left: 50%;
          -webkit-transform: translate(-50%,0);
          -moz-transform: translate(-50%,0);
          -ms-transform: translate(-50%,0);
          -o-transform: translate(-50%,0);
          transform: translate(-50%,0);
          text-align: center;
          color: #FFD700;
          div{
            line-height: 32px;
            font-size: 14px;
            letter-spacing: 2px;
          }
          .user_img{
            width: 38px;
            height: 38%;
            margin: 0 auto;
            img{
              width: 100%;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
            }
          }
          /*二维码*/
          .query{
            position: relative;
            margin-top: 38px;
            .canvas{
              width: 70%!important;
              height: auto!important;
            }
          }
          .query::after{
            content: "";
            width: 80%;
            height: 130%;
            text-align: center;
            line-height: 500px;
            color: white;
            font-size: 20px;
            border-left: 1px white solid;
            border-right: 1px white solid;
            display:inline-block;
            position: absolute;
            font-weight: bold;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%) scale(0) rotateY(-180deg);
            animation-timing-function: cubic-bezier(0.1,-158,.5,-99);
            animation: aa 2S;
          }
          @keyframes aa{
            from{
              width: 80%;
              height: 130%;
            }
            to{
              transform: translate(-50%,-50%) scale(1) rotateY(360deg);
              width: 100%;
              height: 140%;
            }
          }
          .query::before{
            content: "分享!";
            width: 130%;
            height: 120%;
            text-align: center;
            line-height: 115px;
            color: #32CD32;
            font-size: 40px;
            border-top: 1px white solid;
            border-bottom: 1px white solid;
            display:inline-block;
            position: absolute;
            font-weight: bold;
            left: 50%;
            top: 45%;
            transform: translate(-50%,-50%) scale(0) rotateX(-180deg);
            transition: all .8s cubic-bezier(.37,.59,0,1.58);
            animation: bb 2s;
          }
          @keyframes bb{
            from{
              width: 130%;
              height: 100%;
            }
            to{
              transform: translate(-50%,-50%) scale(1) rotateX(360deg);
              width: 130%;
              height: 120%;
            }
          }
        }
      }
    }
    /*复制链接*/
    .copy{
      height: 50px;
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
      background: white;
      padding-top: 10px;
      div:nth-child(1){
        font-size: 16px;
        color: blue;
      }
      div:nth-last-child(1){
        font-size: 13px;
        color: #999999;
      }
      .tag-read{
        background: none;
        border: none;
      }
    }
  }
</style>
