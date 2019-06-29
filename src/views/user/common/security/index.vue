<template>
  <div class="security">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="使用 BlockPay 交易安全吗?会不会跑路?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>事实上 BlockPay 是这个世界上最安全的交易平台之一，因为 BlockPay 不托管用户资产，每一笔交易都是从用户自己的钱包转给 BlockPay,交易完成后立即将币转到用户自己的钱包，真正实现去中心化交易，用户自己保管自己的资产。所以 BlockPay 跑路能得到什么好处呢？带着空气跑吗？目前 BlockPay 支持 ExinPay 钱包和 Mixin Messenger 钱包，未来将会支持更多基于 Mixin Network 的钱包，无论使用哪种钱包，用户都将自己保管 PIN码，使用 BlockPay 的交易，用户不需要由信任成本。</p>
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
  .security{
    font-size: 17px;
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
