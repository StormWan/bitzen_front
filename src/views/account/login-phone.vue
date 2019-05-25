<template>
    <div class="login-phone">
      <van-nav-bar
        title="登陆"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <md-field>
        <md-input-item
          type="phone"
          v-model="phone"
          title="+86"
          clearable
        ></md-input-item>
      </md-field>
      <p
        v-if="isError"
        class="error"
        slot="error"
      >
        手机号错误
      </p>
      <md-button type="primary" v-on:click="submit">下一步</md-button>
    </div>
</template>

<script>
import { InputItem, Field, Button, Toast } from 'mand-mobile'
import { NavBar } from 'vant'

export default {
  name: 'login-phone',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      phone: '',
      areaCode: '+86',
      isError: false
    }
  },
  methods: {
    async submit () {
      Toast.loading('加载中...')
      const { data } = await this.$api.account.auth({ phone: this.phone, area_code: this.areaCode })
      Toast.hide()
      if (data.code === 200) {
        // console.log(data.data)
        localStorage.setItem('key', data.data.key)
        this.$store.commit({ type: 'account/auth', areaCode: this.areaCode, phone: this.phone, key: data.data.key })
        Toast.succeed('验证码已发送')
        setTimeout(() => {
          this.$router.push({ name: 'login-verify' })
        }, 1000)
      } else {
        Toast.failed('网络错误，请重试')
      }
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  .login-phone{
    .error{
      float: left;
      width: 100%;
      .error-action{
        float: right;
        color: #5878B4;
      }
    }
    .md-field-item-content{
      min-height: 0;
    }
    .md-input-item.left .md-input-item-fake, .md-input-item.left .md-input-item-input{
      height: 40px;
      font-size: 20px;
    }
    .md-field-item.is-solid .md-field-item-title{
      width: 100px;
      font-size: 22px;
      text-align: center;
    }
    .md-button.block{
      height: 55px;
    }
    .md-button-content{
      font-size: 18px;
    }
  }
</style>
