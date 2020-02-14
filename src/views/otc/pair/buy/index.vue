<template>
  <div>
    <!--价格-->
    <div class="otc-price">
      <span>￥</span>
      <span>{{buy_price}}</span>
    </div>
    <!--购买金额-->
    <div>
      <md-field :title="exchangeTip">
        <md-input-item
          type="money"
          v-model="amount"
          ref="refAmount"
          title="CNY金额"
          placeholder="CNY金额"
          :maxlength="12"
          is-title-latent
          is-amount
          is-highlight
          clearable
          is-virtual-keyboard
        >
        </md-input-item>
      </md-field>
    </div>
    <van-button type="primary" size="large">普通按钮</van-button>
  </div>
</template>

<script>
import { Toast, Button } from 'vant'
import { InputItem, Field } from 'mand-mobile'

export default {
  name: 'otc-buy',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      amount: ''
    }
  },
  methods: {
  },
  // 计算
  computed: {
    onFakeInputFocus () {
    },
    onFakeInputBlur () {
      this.scrollInputBack && this.scrollInputBack()
    }
  }
}
</script>

<style lang="stylus">
</style>
