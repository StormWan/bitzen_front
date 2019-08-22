<template>
  <div class="login-verify">
    <md-captcha
      :maxlength="6"
      :isView="true"
      brief="最新验证码依然有效，请勿重发"
      @submit="submit"
      @send="onSend"
    >
      验证码已发送至{{maskedPhone}}
    </md-captcha>
    <md-button type="primary" v-on:click="login">登录</md-button>
  </div>
</template>

<script>
import { Captcha, Button, Toast } from 'mand-mobile'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'login-verify',
  components: {
    [Captcha.name]: Captcha,
    [Button.name]: Button
  },
  mounted () {
  },
  data () {
    return {
      verifyCode: ''
    }
  },
  methods: {
    ...mapMutations({
      auth: 'account/auth'
    }),
    async onSend () {
      if (this.phone === '' || this.areaCode === '' || this.key === '') {
        this.$router.replace({ name: '/' })
      } else {
        Toast.loading('加载中...')
        // const { data } = await this.$api.account.verify({ verify_code: this.verifyCode, key: localStorage.getItem('key') })
        console.log(this.verifyCode)
        console.log(this.key)
        const { data } = await this.$api.account.verify({ verify_code: this.verifyCode, key: this.key })
        Toast.hide()
        // console.log(localStorage.getItem('key'))
        if (data.code === 200) {
          this.auth({
            type: 'account/auth',
            areaCode: this.areaCode,
            phone: this.phone,
            key: data.data.key
          })
          // this.$store.commit({ type: 'account/auth', areaCode: this.areaCode, phone: this.phone, key: data.data.key })
          Toast.succeed('验证码已发送')
        } else {
          // console.log(data)
          Toast.info('请输入验证码')
        }
      }
    },
    submit (code) {
      // console.log(code)
      this.verifyCode = code
    },
    async login () {
      console.log(this.verifyCode)
      console.log(this.key)
      // console.log({ key: this.key, verify_code: this.verifyCode })
      const { data } = await this.$api.account.verify({ key: this.key, verify_code: this.verifyCode })
      // console.log(data)
      if (data.code === 200) {
        // console.log(data)
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('userInfo', JSON.stringify(data.data))
        this.$router.push({
          path: '/otc'
        })
        // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      } else {
        Toast.failed(data.desc)
        // console.log(data)
      }
    }
  },
  computed: {
    maskedPhone () {
      return this.phone ? this.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : ''
    },
    ...mapState({
      areaCode: state => state.account.areaCode,
      phone: state => state.account.phone,
      key: state => state.account.key
    })
  }
}

</script>

<style lang="less">
  .login-verify{
    width: 100%;
    overflow: hidden;
    padding-top: 30px;
    .md-number-keyboard{
      margin-top: 30px;
    }
    .md-captcha-content{
      font-size: 16px;
    }
    .md-captcha-footer{
      padding: 14px 10px;
      .md-captcha-brief{
        font-size: 16px;
      }
      .md-captcha-btn{
        font-size: 16px;
      }
    }
    .md-number-keyboard-container .keyboard-number .keyboard-number-list .keyboard-number-item{
      height: 80px;
      line-height: 80px;
      font-size: 28px;
    }
    .md-number-keyboard-container{
      height: 320px;
    }
    .md-button.block{
      height: 72px;
      .md-button-content{
        height: 70px;
        font-size: 28px;
      }
    }
  }
</style>
