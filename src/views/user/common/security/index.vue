<template>
  <div class="security">
    <!--头部标题-->
    <div class="head">
      <div class="Arrow" @click="Arrow">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="title">使用 Bit-Ox 交易安全吗?会不会跑路?</div>
    </div>
    <div class="content">
      <p>事实上 Bit-OX 是这个世界上最安全的交易平台之一，因为 Bit-OX 不托管用户资产，每一笔交易都是从用户自己的钱包转给 Bit-OX,交易完成后立即将币转到用户自己的钱包，真正实现去中心化交易，用户自己保管自己的资产。所以 Bit-OX 跑路能得到什么好处呢？带着空气跑吗？目前 Bit-OX 支持 ExinPay 钱包和 Mixin Messenger 钱包，未来将会支持更多基于 Mixin Network 的钱包，无论使用哪种钱包，用户都将自己保管 PIN码，使用 Bit-OX 的交易，用户不需要由信任成本。</p>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
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
    [Icon.name]: Icon
  }
}
</script>

<style scoped lang="less">
  .security{
    font-size: 17px;
    /*头部标题*/
    .head{
      position: relative;
      text-align: center;
      line-height: 80px;
      font-size: 15px;
      .Arrow{
        position: absolute;
        left: 10%;
        font-size: 17px;
        .icon{
          /*vertical-align: middle;*/
        }
      }
    }
    /*内容*/
    .content{
      width: 92%;
      margin: 0 auto;
      p{
        line-height: 20px;
        font-size: 14px;
        text-align: justify;
      }
    }
  }
</style>
