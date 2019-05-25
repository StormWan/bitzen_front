<template>
  <div class="Price">
    <!--头部标题-->
    <div class="head">
      <div class="Arrow" @click="Arrow">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="title">提币时提示区块同步异常改怎么做?</div>
    </div>
    <div class="content">
      <p>区块同步异常时，钱包会提不了币，充值也会延迟。不过不是所有币种都会同时异常，通常只是个别币种提示区块同步异常，只能耐心等待 Mixin Network 恢复了，具体要等多久可以打开下方的网址查询，红色小点表示异常，当红色小点变成绿色时就表示恢复正常了，也就可以提币了，充值进来的币也会陆续到账。</p>
      <p><a href="https://mixin.one/network/chains">https://mixin.one/network/chains</a></p>
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
  .Price{
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
        font-size: 15px;
        line-height: 20px;
        margin: 20px 0;
        text-align: justify;
      }
    }
  }
</style>
