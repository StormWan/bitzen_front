<template>
    <div class="login-phone">
      <van-nav-bar
        title="登陆"
      />
      <!--提示语-->
      <div class="Tips">请输入手机号码</div>
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
      <div style="margin: 0 10px;">
        <van-button type="info" size="large" @click="submit">下一步</van-button>
      </div>
    </div>
</template>

<script>
import { InputItem, Field, Toast, DropMenu } from 'mand-mobile'
import { NavBar, Button } from 'vant'
import { mapMutations } from 'vuex'
import VConsole from 'vconsole'

export default {
  name: 'login-phone',
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [DropMenu.name]: DropMenu
  },
  data () {
    return {
      phone: '',
      areaCode: '+86',
      isError: false,
      data: [
        {
          text: '一级选项1',
          options: [
            {
              value: '0',
              text: '二级选项1'
            },
            {
              value: '1',
              text: '二级选项2'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null &&
      localStorage.getItem('userInfo') !== undefined && localStorage.getItem('userInfo') !== null) {
      this.$router.push({ name: '/' })
    }
  },
  methods: {
    ...mapMutations({
      auth: 'account/auth'
    }),
    async submit () {
      let vconsole = new VConsole()
      Toast.loading('加载中...')
      console.log(this.phone)
      console.log(this.areaCode)
      // try {
      const { data } = await this.$api.account.auth({ phone: this.phone, area_code: this.areaCode })
      console.log(data)
      Toast.hide()

      if (data.code === 200) {
        // localStorage.setItem('key', data.data.key)
        this.auth({
          areaCode: this.areaCode,
          phone: this.phone,
          key: data.data.key
        })
        Toast.succeed('验证码已发送')
        setTimeout(() => {
          this.$router.push({ name: 'login-verify' })
        }, 1000)
        this.phone = ''
      } else {
        Toast.failed('网络错误，请重试')
      }
      // } catch (error) {
      //   console.error(error)
      // }
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
  .login-phone{
    background-color: white;
    .error{
      float: left;
      width: 100%;
      .error-action{
        float: right;
        color: #5878B4;
      }
    }
    .md-field{
      padding-top: 0;
      .md-field-item-content{
        min-height: 0;
      }
      .md-input-item.left .md-input-item-fake, .md-input-item.left .md-input-item-input{
        height: 40px;
        font-size: 20px;
      }
      .md-field-item.is-solid .md-field-item-title{
        width: 50px;
        font-size: 22px;
      }
    }
    .Tips{
      text-align: center;
      font-size: 16px;
      padding: 20px 0;
    }
  }
</style>
