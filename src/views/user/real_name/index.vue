<template>
    <div class="Real_name">
      <!--头部标题-->
      <div class="head">
        <div class="Arrow" @click="Arrow">
          <van-icon name="arrow-left"></van-icon>
        </div>
        <div class="title">Face ID 验证</div>
      </div>
      <div class="title_Explain">
        <!--实名验证文本-->
        <div class="title_name">实名验证</div>
        <!--说明-->
        <div class="Explain">Face ID, 一种安全、快速地通过实名认证的方式。</div>
        <!--说明-->
        <div class="Explain fontSize">你可以尝试在浏览器中打开以下链接（点击复制）进行Face ID实名认证，然后再返回查看认证后果</div>
        <!--认证链接跳转-->
        <div class="click" data-clipboard-text="https://baidu.con" @click="copy">https://baidu.con</div>
        <!--我已完成实名认证-->
        <div class="bot">
          <a>我已完成实名认证</a>
        </div>
        <!--提交久版实名认证-->
        <div class="Subm"><a>提交旧版实名认证</a></div>
      </div>
      <!--弹出内容-->
      <van-popup v-model="show">复制成功</van-popup>
    </div>
</template>

<script>
import { Icon, Popup } from 'vant'
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    Arrow () {
      this.$router.go(-1)
    },
    copy () {
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 300)
      let clipboard = new Clipboard('.click')
      clipboard.on('success', e => {
        console.log('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    }
  },
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup
  }
}
</script>

<style scoped lang="less">
  .Real_name{
    .van-popup{
      font-size: 38px;
      background-color: transparent;
      color: white;
    }
    font-size: 17px;
    /*头部标题*/
    .head{
      position: relative;
      text-align: center;
      line-height: 80px;
      font-size: 20px;
      .Arrow{
        position: absolute;
        left: 10%;
        font-size: 20px;
        .icon{
          /*vertical-align: middle;*/
        }
      }
    }
    /*标题加说明*/
    .title_Explain{
      width: 90%;
      margin: 0 auto;
      /*实名验证*/
      .title_name{
        font-size: 18px;
      }
      /*说明*/
      .Explain{
        padding-top: 20px;
      }
      .fontSize{
        font-size: 16px;
      }
      /*认证链接*/
      .click{
        margin: 15px 0;
        border: 1px dashed #696969;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        padding: 5px 8px;
        color: #999;
      }
      /*已认证*/
      .bot{
        text-align: center;
        background-color: #7B68EE;
        line-height: 50px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        font-size: 17px;
        a{
          color: white;
          display: block;
        }
      }
      .Subm{
        text-align: center;
        font-size: 15px;
        color: #0000CD;
        line-height: 50px;
      }
    }
  }
</style>
