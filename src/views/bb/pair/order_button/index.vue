<template>
  <div class="Order">
    <div @click="but_submit" class="Order_box" :class="{active: order}">下单{{symbol}}</div>
  </div>
</template>

<script>
// 付款跳转
import { Dialog, Toast } from 'vant'

var msgpack = require('msgpack-lite')
var uuidv4 = require('uuid/v4')
export default {
  name: 'order-button',
  components: {
    [Dialog.name]: Dialog
  },
  props: [
    'order',
    'index',
    'symbol',
    'wallet',
    'id',
    'asset_id',
    'value'
  ],
  data () {
    return {
      title: '',
      side: ''
    }
  },
  beforeUpdate () {
  },
  methods: {
    // 下单按钮
    but_submit () {
      console.log(JSON.parse(localStorage.getItem('userInfo')).is_setup_pin)
      if (this.order === true) {
        if (this.wallet.search('BlockPay') !== -1) {
          if (!JSON.parse(localStorage.getItem('userInfo')).is_setup_pin) {
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
            // this.type = 'limit'
            this.type = 'market'
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
      const recipient = '6161a89b-795d-4cd8-b198-eccf0feb6f02'
      const payUrl = `https://mixin.one/pay?recipient=${recipient}&asset=${asset}&amount=${amount}&trace=${trace}&memo=${memo}`
      window.location.href = payUrl
      // 支付成功提醒
      Dialog.confirm({
        title: '付款结果',
        message: '是否成功支付'
      }).then(() => {
        // on confirm
        console.log('成功')
        Toast('付款成功')
        this.$emit('value_but', this.value)
      }).catch(() => {
        // on cancel
        console.log('失败')
        Toast('付款取消')
      })
    }
  }
}
</script>

<style scoped lang="less">
  .Order{
    width: 100%;
    padding-top: 30px;
    .Order_box{
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
