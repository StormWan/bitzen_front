<template>
  <div class="security">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="为什么有时候 WxinOne 会资金不足?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>ExinOne 交易使用的对冲资金池为自有资金，正常情况可以调拨供用户交易使用，当突然行情波动，用户集中买入或者卖出时，会短时间迅速消耗其中某一制定资金池，可能会导致单个资金池不足，在调币来不及到账的情况下，为不影响用户使用，建议用户接受延迟到账功能，可以最大程度满足用户的交易诉求。</p>
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
