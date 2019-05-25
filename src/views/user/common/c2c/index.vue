<template>
    <div class="c2c">
      <!--头部标题-->
      <div class="head">
        <div class="Arrow" @click="Arrow">
          <van-icon name="arrow-left"></van-icon>
        </div>
        <div class="title">什么是 C2C (场外) 交易?</div>
      </div>
      <div class="content">
        <p>由于监管问题，在 2017 年 9 月 4 日之后，在中国境内并不允许直接提供法币充值交易，因此现在所有交易的法币交易区均为 C2C 交易，即由平台担保，用户和商户之间通过手动转账进行交易。</p>
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
  .c2c{
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
      p{
        font-size: 15px;
        line-height: 23px;
      }
    }
  }
</style>
