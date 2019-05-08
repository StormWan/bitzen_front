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
import { mapState } from 'vuex'

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
    async onSend () {
      if (this.phone === '' || this.areaCode === '' || this.key === '') {
        this.$router.replace({ name: 'login' })
      }
      Toast.loading('加载中...')
      const { data } = await this.$api.account.auth({ phone: this.phone, area_code: this.areaCode })
      Toast.hide()
      if (data.code === 200) {
        this.$store.commit({ type: 'account/auth', areaCode: this.areaCode, phone: this.phone, key: data.data.key })
        Toast.succeed('验证码已发送')
      } else {
        console.log(data)
        Toast.failed('网络错误，请重试')
      }
    },
    submit (code) {
      console.log(code)
      this.verifyCode = code
    },
    async login () {
      console.log({ key: this.key, verify_code: this.verifyCode })
      const { data } = await this.$api.account.verify({ key: this.key, verify_code: this.verifyCode })
      if (data.code === 200) {
        console.log(data)
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('userInfo', JSON.stringify(data.data))
        this.$router.go(-2)
        // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      } else {
        Toast.failed(data.desc)
        console.log(data)
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

<style lang="stylus">
  .login-verify
    height 650px
    padding 30px 0
    .md-number-keyboard
      margin-top 30px
</style>
