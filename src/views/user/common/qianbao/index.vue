<template>
    <div class="qianbao">
      <!--头部标题-->
      <div class="head">
        <van-nav-bar
          title="关于 BlockPay 钱包的说明"
          left-text="返回"
          left-arrow
          @click-left="Arrow"
        />
      </div>
      <div class="content">
        <p>首先声明，BlockPay 是去中心化的投资平台，不托管用户资产，本身没有钱包。</p>
        <p>但平台应用默认内置了 BlockPay 钱包，具体的相关场景如下：</p>
        <p>1、定投编辑页面，用户在进行一系列定投设置时，可以选择将数字币放入的钱包，目前默认支持 BlockPay 钱包和 Mixin 钱包，后续会陆续支持其他基于 Mixin Network 开发的钱包。</p>
        <p>
          <img src="../../../../assets/qianbao.jpg" alt="">
        </p>
        <p>2、目前的邀请返现活动中，用户在 Mixin 中完成实名认证，BTC 奖励会默认发放到用户的 Mixin 钱包，如果在 BlockPay 的网页版完成实名认证，BTC 奖励会默认发放到用户的 BlockPay 钱包。</p>
        <p>3、点卡 EPC 的奖励默认发放到手续费点卡余额中，用户可以选择划转到自己的 Mixin 或者 BlockPay 钱包，但划转出去的 EPC 无法抵扣手续费，只有在手续费点卡处显示的 EPC 会默认用来抵扣手续费。</p>
      </div>
    </div>
</template>

<script>
import { Icon, NavBar } from 'vant'
export default {
  data () {
    return {

    }
  },
  methods: {
    Arrow () {
      this.$router.go(-1)
    }
  },
  components: {
    [Icon.name]: Icon,
    [NavBar.name]: NavBar
  }
}
</script>

<style scoped lang="less">
  .qianbao{
    font-size: 17px;
    /*头部标题*/
    .head{
      position: relative;
      text-align: center;
      line-height: 80px;
      font-size: 18px;
      .Arrow{
        position: absolute;
        left: 10%;
        font-size: 20px;
        .icon{
          /*vertical-align: middle;*/
        }
      }
    }
    /*内容*/
    .content{
      width: 92%;
      margin: 0 auto;
      overflow: hidden;
      p{
        font-size: 16px;
        margin: 15px 0;
        img{
          width: 100%;
        }
      }
    }
  }
</style>
