<template>
  <div class="not_received">
    <!--头部标题-->
    <div class="head">
      <van-nav-bar
        title="各种充值一般大概多久到账"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
    </div>
    <div class="content">
      <p>不同币种到账时间都不一样，需要的确认数也不一样，并且不能以确认数的数量来简单判断到账时间，比如 ETH 虽然需要 100 个确认数，但是每个确认都很快，实际到账时间比只需要 12 个确认数的 BTC 快多了。以下是我们提供的一些主流币种的区块确认数查询地址，大家有需要可以自主查询。</p>
      <div class="flex">
        <div>Blockchain</div>
        <div>Token/Coin name</div>
        <div>block confirmations</div>
        <div>explorer address</div>
      </div>
      <div class="flex">
        <div>Bitcoin</div>
        <div>BTC</div>
        <div>12</div>
        <div>https://btc.com</div>
      </div>
      <div class="flex">
        <div>Ethereum</div>
        <div>ETH</div>
        <div>100</div>
        <div>https://etherscan.io/</div>
      </div>
      <div class="flex">
        <div>Bitcoin Cash</div>
        <div>BCH</div>
        <div>256</div>
        <div>https://explorer.bitcoin.com/bch</div>
      </div>
      <div class="flex">
        <div>Ethereum Classic</div>
        <div>ETC</div>
        <div>200</div>
        <div>https://gastracker.io</div>
      </div>
      <div class="flex">
        <div>Litecoin</div>
        <div>LTC</div>
        <div>64</div>
        <div>http://explorer.litecoin.net</div>
      </div>
      <div class="flex">
        <div>Sia classic</div>
        <div>SC</div>
        <div>32</div>
        <div>https://explore.sia.tech/</div>
      </div>
      <div class="flex">
        <div>Ripple</div>
        <div>XRP</div>
        <div>12</div>
        <div>https://bithomp.com/explorer/</div>
      </div>
      <div class="flex">
        <div>EOS</div>
        <div>EOS</div>
        <div>64</div>
        <div>https://eostracker.io</div>
      </div>
      <div class="flex">
        <div>Dash</div>
        <div>DASH</div>
        <div>64</div>
        <div>https://explorer.dash.org/chain/Dash</div>
      </div>
      <div class="flex">
        <div>ZCash</div>
        <div>ZEC</div>
        <div>64</div>
        <div>https://explorer.zcha.in</div>
      </div>
      <div class="flex">
        <div>DOGECoin</div>
        <div>Doge</div>
        <div>120</div>
        <div>https://dogechain.info</div>
      </div>
      <div class="flex">
        <div>NEM</div>
        <div>XEM</div>
        <div>72</div>
        <div>http://chain.nem.ninja/#/blocks/0</div>
      </div>
      <div class="flex">
        <div>Horizen</div>
        <div>ZEN</div>
        <div>64</div>
        <div>https://explorer.zen-solutions.io</div>
      </div>
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
  .not_received{
    font-size: 17px;
    /*内容*/
    .content{
      width: 92%;
      margin: 0 auto;
      /*overflow: hidden;*/
      p{
        font-size: 14px;
        text-align: justify;
        line-height: 20px;
        margin: 16px 0;
      }
      .flex{
        display: flex;
        align-items: center;
        margin: 20px 0;
        div{
          font-size: 14px;
          margin: 0 3px;
          white-space: revert;
          /*overflow: hidden;*/
          /*-ms-text-overflow: ellipsis;*/
          /*text-overflow: ellipsis;*/
        }
        div:nth-child(1){
          width: 20%;
        }
        div:nth-child(2){
          width: 20%;
        }
        div:nth-child(3){
          width: 20%;
        }
        div:nth-child(4){
          width: 30%;
        }
      }
    }
  }
</style>
