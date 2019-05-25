<template>
  <div class="Price">
    <!--头部标题-->
    <div class="head">
      <div class="Arrow" @click="Arrow">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="title">忘记了 PIN 码怎么办?</div>
    </div>
    <div class="content">
      <p>PIN 码即为私钥，一旦丢失无法找回，只能通过自己不断尝试，每天可以尝试 5 次，建议用户将自己常用的密码写下来，每天 5 次尝试；</p>
      <p>PIN 码在初次设置的时候，需要连续输入4次，且不能有误才算设置成功，每天登陆钱包也会提示用户输入，便于加强记忆；</p>
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
