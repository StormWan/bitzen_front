<template>
  <div class="Price">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="提现或充值到错误地方怎么办?"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>如果您的币提现或充值到错误的地址，由于区块链的匿名性，一旦交易上链，将无法找回，建议你通过其他方式找到对应地址的所有者协商找回。</p>
      <p>但其中有如下几种情况需要注意</p>
      <p>1、从交易所地址提币出来，填错地址；</p>
      <p>第一时间联系交易所客服，交易所的提现订单一般需要客服审核才能汇出，如果提现订单还未审核，则可在交易所客服的协助下拦截订单，避免亏损，而如果一旦交易所已审核汇出，就意味着币已经上链，无法追回。</p>
      <p>2、EOS 提现，备注写错；</p>
      <p>联系到账平台客服协助处理，比如从 Mixin 提 EOS 代币到币安交易所，提现的账户名正确，备注写错，可联系币安交易所的客服协助助理，币会充值到币安交易所的 EOS 总账户中，但因为备注名错误，无法正确充值到你指定的币安账户，不会造成币的丢失，但如果账户名错误，则无法找回。</p>
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
      }
    }
  }
</style>
