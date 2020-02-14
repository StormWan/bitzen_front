<template>
    <div class="payment">
      <!--标题-->
        <van-nav-bar
          :title="title"
          left-arrow
          @click-left="onClickLeft"
        />

      <!--收银台-->
      <div class="cashier">
        <!--选择标题提示-->
        <div class="top">请选择{{title}}的方式</div>
        <!--点击确认按钮-->
      </div>
      <van-radio-group v-model="paymentMethod">
        <van-cell-group class="payment-box">
          <van-cell title="银行卡" value="需要实名认证" clickable icon="card" @click="click_bank">
            <van-radio slot="right-icon" name="bank"/>
          </van-cell>
          <van-cell title="支付宝" clickable icon="alipay" @click="click_alipay">
            <van-radio slot="right-icon" name="alipay"/>
          </van-cell>
          <van-cell title="微信" clickable icon="wechat" @click="click_wechat">
            <van-radio slot="right-icon" name="wechat"/>
          </van-cell>
          <van-tag size="medium" type="success" class="bank-tag" plain>推荐</van-tag>
          <van-tag size="medium" type="danger" class="wechat-tag">需 0.001 元转账手续费</van-tag>
        </van-cell-group>
      </van-radio-group>
      <div style="margin: 10px;">
        <van-button size="large" type="info" :disabled="buttonDisable"  @click="submitButton">确认购买</van-button>
      </div>
    </div>
</template>

<script>
import { NavBar, Icon, Dialog, Toast, RadioGroup, Radio, Cell, CellGroup, Tag, Button } from 'vant'
import { mapState } from 'vuex'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tag.name]: Tag,
    [Button.name]: Button
  },
  computed: {
    ...mapState({
      order_otc_pair: state => state.otc.otc_pair,
      order_price: state => state.otc.price,
      order_side: state => state.otc.side,
      order_currency_amount: state => state.otc.currency_amount,
      order_asset_amount: state => state.otc.asset_amount
    })
  },
  async activated () {
    this.paymentMethod = 'bank'
    if (this.paymentMethod === 'bank') { this.click_bank() }
    if (sessionStorage.getItem('page') === '0') {
      this.title = '付款方式'
    } else {
      this.title = '收款方式'
    }
    const { data } = await this.$api.otc.paymentUpdate()
    this.data = data.data
  },
  data () {
    return {
      // 付款选项列表
      on_hook: Number,
      buttonDisable: true,
      paymentMethod: 'bank',
      index: 0,
      title: '',
      data: []
    }
  },
  methods: {
    /**
     * 导航栏，返回上一页面
     * */
    onClickLeft () {
      this.$router.go(-1)
    },
    /**
     * 选择收款方式，如果是选中银行卡，需要直接跳转到实名认证
     * */
    click_alipay () {
      this.paymentMethod = 'alipay'
      this.buttonDisable = false
    },
    click_wechat () {
      this.paymentMethod = 'wechat'
      this.buttonDisable = false
    },
    async click_bank () {
      const { data } = await this.$api.kyc.kyc_get()
      if (data.code === 200) {
        if (data.data.verified_state !== 1) {
          // 要实名认证
          Dialog.confirm({
            title: '提示',
            message: '去实名认证'
          }).then(() => {
            // on confirm
            console.log('确定')
            this.$router.push({
              path: '/realname_verified'
            })
            this.buttonDisable = false
          }).catch(() => {
            // on cancel
            console.log('取消')
          })
        }
      } else {
        Toast('发生错误啦，请稍后重试')
      }
    },
    /**
     *  点击提交按钮
     * */
    async submitButton () {
      if (this.buttonDisable === false) {
        if (this.order_side === 'buy') {
          const params = {
            otc_pair: this.order_otc_pair,
            side: this.order_side,
            currency_amount: this.order_currency_amount,
            price: this.order_price,
            payment_method: this.paymentMethod
          }
          console.log('buy: ' + JSON.stringify(params))
          let { data } = await this.$api.otc.orderCreate(params)
          if (data.code === 200) {
            const id = data.data.id
            this.data = data.data.merchant
            this.checkPaymentAccount(id, 'buy-detail')
          } else { Toast('请求错误，请再次重试') }
        } else if (this.order_side === 'sell') {
          const params = {
            otc_pair: this.order_otc_pair,
            side: this.order_side,
            asset_amount: this.order_asset_amount,
            price: this.order_price,
            payment_method: this.paymentMethod
          }
          console.log('sell: ' + JSON.stringify(params))
          let { data } = await this.$api.otc.orderCreate(params)
          if (data.code === 200) {
            // console.log(data.data.merchant)
            const id = data.data.id
            this.data = data.data.merchant
            // 判断是否为银行卡选项，如果为银行卡选项，就查看后台是否有收款账号，没有就转入信息页面添加
            this.checkPaymentAccount(id, 'sell-detail')
          } else { Toast('请求错误，请再次重试！') }
        }
      }
    },
    /**
     * 检查后台是否有账号
     * */
    checkPaymentAccount (id, otcOrder) {
      if (this.paymentMethod === 'bank') {
        if (this.data.bank_account_name !== null) {
          this.$router.push({
            name: otcOrder,
            params: { id: id }
          })
        } else {
          this.$router.push({ path: '/payment-method' })
        }
      } else if (this.index === 'wechat') {
        // 微信收款时做的事情
        if (this.data.wechat_account !== null) {
          this.$router.push({
            name: otcOrder,
            params: { id: id }
          })
        } else {
          // 如果没有收款账号，跳转填入信息页面
          this.$router.push({ path: '/payment-method' })
        }
      } else {
        // 支付宝收款做的事情
        if (this.data.alipay_account !== null) {
          this.$router.push({
            name: otcOrder,
            params: { id: id }
          })
        } else {
          // 如果没有收款账号，跳转填入信息页面
          this.$router.push({ path: '/payment-method' })
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  .payment{
    font-size: 16px;
    .van-icon-card{ color: #00CED1; }
    .van-icon-wechat{color: #32CD32; }
    .van-icon-alipay{ color: #1E90FF; }
    .van-cell__left-icon{ font-size: 35px; }
    /*用于tips 消息定位*/
    .payment-box{
      position: relative;
      width: 100%;
      height: 100%;
      padding-bottom: 10px;
      .bank-tag{
        position: absolute;
        top: 8%;
        left: 28%;
      }
      .wechat-tag{
        position: absolute;
        top: 70%;
        left: 25%;
      }
    }
    .cashier{
      width: 90%;
      margin: 0 auto;
      .van-icon-card{ color: #00CED1; }
      .van-icon-wechat{color: #32CD32; }
      .van-icon-alipay{ color: #1E90FF; }
      .van-cell__left-icon{ font-size: 35px; }
      /*说明支付方式*/
      .top{
        line-height: 50px;
        color: #696969;
      }
    }
  }
</style>
