<template>
  <div class="Place">
    <div @click="but_submit" class="Place_box" :class="{active: Place}">下单{{symbol}}</div>
  </div>
</template>

<script>
// 付款跳转
import { Dialog } from 'vant'

var msgpack = require('msgpack-lite')
var uuidv4 = require('uuid/v4')
export default {
  name: 'index',
  data () {
    return {
      title: '',
      side: '',
      type: ''
    }
  },
  updated () {
  },
  methods: {
    // 下单按钮
    but_submit () {
      if (this.Place === true) {
        if (this.wallet.search('BlockPay') !== -1) {
          if (localStorage.getItem('user_pas')) {
            this.verification = true
          } else {
            this.$router.push({
              path: '/password'
            })
          }
        } else {
          if (this.index === 0) {
            this.side = 'buy'
            this.type = 'market'
          } else {
            this.side = 'sell'
            this.type = 'limit'
          }
          this.payment()
        }
      }
    },
    // 调用
    payment () {
      const obj = { service: 'bb', side: this.side, type: this.type, pair_id: this.id, wallet: this.wallet }
      // buy/sell 买和卖; market/limit 市场表; mixin/blockpay 钱包;
      const memo = msgpack.encode(obj).toString('base64')
      const trace = uuidv4()
      // 买入金额
      const amount = this.value
      // 买入的用户ID
      // const asset = this.pair.base.asset_id
      const asset = this.asset_id
      // EOS_ASSET_ID = "f8127159-e473-389d-8e0c-9ac5a4dc8cc6"
      const recipient = '28536b52-f840-4366-8619-3872fb5b3164'
      const payUrl = `https://mixin.one/pay?recipient=${recipient}&asset=${asset}&amount=${amount}&trace=${trace}&memo=${memo}`
      window.location.href = payUrl
      // 支付成功提醒
      Dialog.confirm({
        title: '付款结果',
        message: '是否成功支付'
      }).then(() => {
        // on confirm
        console.log('成功')
        this.value = ''
        this.Place = false
      }).catch(() => {
        // on cancel
        console.log('失败')
      })
    }
  },
  components: {
    [Dialog.name]: Dialog
  },
  props: [
    'Place',
    'index',
    'symbol',
    'wallet',
    'id',
    'asset_id',
    'value'
  ]
}
</script>

<style scoped lang="less">
  .Place{
    width: 100%;
    padding-top: 30px;
    .Place_box{
      width: 80%;
      margin: 0 auto;
      background-color: #DCDCDC;
      text-align: center;
      line-height: 50px;
      color: white;
      font-weight: bold;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      display: block;
      border: none;
    }
    .active{
      background-color: #6495ED;
    }
  }
</style>
