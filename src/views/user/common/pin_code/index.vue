<template>
  <div class="Price">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="忘记了 PIN 码怎么办?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>PIN 码即为私钥，一旦丢失无法找回，只能通过自己不断尝试，每天可以尝试 5 次，建议用户将自己常用的密码写下来，每天 5 次尝试；</p>
      <p>PIN 码在初次设置的时候，需要连续输入4次，且不能有误才算设置成功，每天登陆钱包也会提示用户输入，便于加强记忆；</p>
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
  .Price{
    font-size: 17px;
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
