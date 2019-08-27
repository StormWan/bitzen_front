<template>
    <div class="password">
      <!--标题-->
        <van-nav-bar
          :title="title"
          left-text="返回"
          left-arrow
          @click-left="onClick"
        />
      <!--输入密码-->
      <div class="input-password">
        <!-- 密码输入框 -->
        <van-password-input
          :value="passwordValue"
          :info="passwordInfo"
          @focus="showKeyboard = true"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="inputNumber"
          @delete="deleteNumber"
          @blur="showKeyboard = false"
        />
      </div>
      <!--提示语-->
      <div class="tips" :class="{active: Tips}">{{Tips_title}}</div>
    </div>
</template>

<script>
import { PasswordInput, NumberKeyboard, Icon, NavBar, Toast } from 'vant'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'password',
  components: {
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      title: '修改 BlockPay 密码',
      // 密码输入框
      passwordValue: '',
      showKeyboard: true,
      Tips: false,
      passwordInfo: '',
      Tips_title: '',
      old_password: '',
      new_password: '',
      again_password: ''
    }
  },
  computed: {
    ...mapState({
      is_set_password: state => state.account.is_setup_pin
    })
  },
  async mounted () {
    console.log(this.is_set_password)
    if (this.is_set_password === true) {
      this.passwordInfo = '请输入原密码'
      this.title = '修改 BlockPay 密码'
    } else {
      this.passwordInfo = '创建新密码'
      this.title = '创建 BlockPay 新密码'
    }
  },
  methods: {
    // 返回上一页
    ...mapMutations({
      isPassword: 'account/isPassword'
    }),
    onClick () {
      if (this.is_set_password !== true) {
        Toast('请设置密码再离开！')
      } else {
        console.log(this.is_set_password)
        this.$router.push({ path: '/' })
      }
    },
    // 密码输入
    inputNumber (key) {
      this.passwordValue = (this.passwordValue + key).slice(0, 6)
      if (this.is_set_password !== true) {
        this.createPassword()
      } else {
        this.changePassword()
      }
    },
    deleteNumber () {
      this.passwordValue = this.passwordValue.slice(0, this.passwordValue.length - 1)
    },
    /**
     *  创建新密码,第一次创建密码时候，第一次输入密码将密码存储在本地，再次输入密码时候获取本地密码数据匹配
     *  匹配不成功就再次输入新密码，成功就将数据传到后台，并将本地的密码数据清除
     */
    async createPassword () {
      // 没有设置密码(新建密码)
      if (this.passwordValue.length >= 6) {
        if (localStorage.getItem('New_password')) {
          if (this.passwordValue !== localStorage.getItem('New_password')) {
            this.Tips = true
            this.Tips_title = '请重新输入新密码'
            this.passwordInfo = '重新输入新密码'
            // localStorage.removeItem('New_password')
            setTimeout(() => {
              this.passwordValue = ''
              this.Tips = false
            }, 800)
          } else {
            const { data } = await this.$api.password.setup_pin({ pin: this.passwordValue })
            if (data.code === 200) {
              localStorage.removeItem('New_password')
              setTimeout(async () => {
                this.$router.push({ path: '/' })
                // this.$router.go(-1)
                this.isPassword({ is_setup_pin: true })
                this.passwordValue = ''
              }, 800)
            } else Toast(data.desc)
          }
        } else {
          localStorage.setItem('New_password', this.passwordValue)
          setTimeout(() => {
            this.passwordValue = ''
            this.passwordInfo = '确认新密码'
          }, 800)
        }
      }
    },
    /**
     *修改旧密码
     * 先获取state 存储的  is_setup_pin 是否存在,如果存在
     * 存在输入旧密码,和新密码,然后向后台传送数据
     */
    async changePassword () {
      // 修改密码
      if (this.passwordValue.length >= 6) {
        console.log(this.passwordValue)
        console.log(this.old_password + '---' + this.new_password + '---' + this.again_password)
        if (this.old_password !== '' && this.new_password === '' && this.again_password === '') {
          this.new_password = this.passwordValue
          setTimeout(() => {
            this.passwordValue = ''
            this.passwordInfo = '请再次输入新密码'
          }, 1500)
        } else if (this.old_password !== '' && this.new_password !== '' && this.again_password === '') {
          this.again_password = this.passwordValue
          if (this.new_password !== this.again_password) {
            Toast('两次输入新密码不一致!')
            this.again_password = ''
            setTimeout(() => {
              this.passwordValue = ''
              this.passwordInfo = '请再输入新密码'
            }, 1500)
          } else {
            const { data } = await this.$api.password.update_pin({ old_pin: this.old_password, pin: this.again_password })
            if (data.code === 200) {
              Toast('修改密码成功!')
              // let { dataAccount } = await this.$api.account.oauth({ code: localStorage.getItem('code') })
              // if (dataAccount.code === 200) {
              //   console.log(dataAccount)
              //   localStorage.setItem('userInfo', JSON.stringify(dataAccount.data))
                setTimeout(() => {
                  this.passwordValue = ''
                  this.old_password = ''
                  this.again_password = ''
                  this.new_password = ''
                  this.$router.push({ path: '/' })
                }, 1500)
              // } else Toast(data.desc)
            } else {
              Toast(data.desc)
              this.passwordValue = ''
            }
          }
        } else {
          this.old_password = this.passwordValue
          setTimeout(() => {
            this.passwordValue = ''
            this.passwordInfo = '输入新的密码'
          }, 1500)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  .password{
    font-size: 18px;
    /*密码输入框*/
    .input-password{
      padding-top: 30px;
    }
    /*提示语*/
    .tips{
      text-align: center;
      font-size: 20px;
      overflow: hidden;
      line-height: 50px;
      height: 50px;
      color: red;
      padding: 1px;
      display: none;
    }
    /*密码错误提示*/
    .active{
      display: block;
      -webkit-animation:  shaky-slow .3s ease .0s running;
      -o-animation:  shaky-slow .3s ease .0s running;
      animation: shaky-slow .3s ease .0s running;

      -webkit-animation-iteration-count: inherit;
      -ms-animation-iteration-count: inherit;
      animation-iteration-count: inherit;
    }
    @-webkit-keyframes shaky-slow {
      0% {
        -webkit-transform: translate(0px, 0px) rotate(0deg)
      }
      2% {
        -webkit-transform: translate(-1px, 1.5px) rotate(1.5deg)
      }
      4% {
        -webkit-transform: translate(1.3px, 0px) rotate(-0.5deg)
      }
      6% {
        -webkit-transform: translate(1.4px, 1.4px) rotate(-2deg)
      }
      8% {
        -webkit-transform: translate(-1.3px, -1px) rotate(-1.5deg)
      }
      10% {
        -webkit-transform: translate(1.4px, 0px) rotate(-2deg)
      }
      12% {
        -webkit-transform: translate(-1.3px, -1px) rotate(-2deg)
      }
      14% {
        -webkit-transform: translate(1.5px, 1.3px) rotate(1.5deg)
      }
      16% {
        -webkit-transform: translate(1.5px, -1.5px) rotate(-1.5deg)
      }
      18% {
        -webkit-transform: translate(1.3px, -1.3px) rotate(-2deg)
      }
      20% {
        -webkit-transform: translate(1px, 1px) rotate(-0.5deg)
      }
      22% {
        -webkit-transform: translate(1.3px, 1.5px) rotate(-2deg)
      }
      24% {
        -webkit-transform: translate(-1.4px, -1px) rotate(2deg)
      }
      26% {
        -webkit-transform: translate(1.3px, -1.3px) rotate(0.5deg)
      }
      28% {
        -webkit-transform: translate(1.6px, -1.6px) rotate(-2deg)
      }
      30% {
        -webkit-transform: translate(-1.3px, -1.3px) rotate(-1.5deg)
      }
      32% {
        -webkit-transform: translate(-1px, 0px) rotate(2deg)
      }
      34% {
        -webkit-transform: translate(1.3px, 1.3px) rotate(-0.5deg)
      }
      36% {
        -webkit-transform: translate(1.3px, 1.6px) rotate(1.5deg)
      }
      38% {
        -webkit-transform: translate(1.3px, -1.6px) rotate(1.5deg)
      }
      40% {
        -webkit-transform: translate(-1.4px, -1px) rotate(-0.5deg)
      }
      42% {
        -webkit-transform: translate(-1.4px, 1.3px) rotate(-0.5deg)
      }
      44% {
        -webkit-transform: translate(-1.6px, 1.4px) rotate(0.5deg)
      }
      46% {
        -webkit-transform: translate(-2.1px, -1.3px) rotate(-0.5deg)
      }
      48% {
        -webkit-transform: translate(1px, 1.6px) rotate(1.5deg)
      }
      50% {
        -webkit-transform: translate(1.6px, 1.6px) rotate(1.5deg)
      }
      52% {
        -webkit-transform: translate(-1.4px, 1.6px) rotate(0.5deg)
      }
      54% {
        -webkit-transform: translate(1.6px, -1px) rotate(-2deg)
      }
      56% {
        -webkit-transform: translate(1.3px, -1.6px) rotate(-2deg)
      }
      58% {
        -webkit-transform: translate(-1.3px, -1.6px) rotate(0.5deg)
      }
      60% {
        -webkit-transform: translate(1.3px, 1.6px) rotate(-0.5deg)
      }
      62% {
        -webkit-transform: translate(0px, 0px) rotate(-1.5deg)
      }
      64% {
        -webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg)
      }
      66% {
        -webkit-transform: translate(1.6px, -1.6px) rotate(0.5deg)
      }
      68% {
        -webkit-transform: translate(0px, -1.6px) rotate(-2deg)
      }
      70% {
        -webkit-transform: translate(-1.6px, 1px) rotate(1.5deg)
      }
      72% {
        -webkit-transform: translate(-1.6px, 1.6px) rotate(2deg)
      }
      74% {
        -webkit-transform: translate(1.3px, -1.6px) rotate(-0.5deg)
      }
      76% {
        -webkit-transform: translate(1.4px, 1px) rotate(-0.5deg)
      }
      78% {
        -webkit-transform: translate(-1px, 1.4px) rotate(2deg)
      }
      80% {
        -webkit-transform: translate(1.4px, 1.6px) rotate(2deg)
      }
      82% {
        -webkit-transform: translate(-1.6px, -1.6px) rotate(-0.5deg)
      }
      84% {
        -webkit-transform: translate(-1.4px, 1.4px) rotate(-2deg)
      }
      86% {
        -webkit-transform: translate(1px, 1.4px) rotate(-2deg)
      }
      88% {
        -webkit-transform: translate(-1.4px, 1.4px) rotate(-1.5deg)
      }
      90% {
        -webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg)
      }
      92% {
        -webkit-transform: translate(-1.6px, 1.6px) rotate(2deg)
      }
      94% {
        -webkit-transform: translate(-1.6px, -1.6px) rotate(-2deg)
      }
      96% {
        -webkit-transform: translate(-1.4px, 1.3px) rotate(-2deg)
      }
      98% {
        -webkit-transform: translate(1.3px, 1px) rotate(-0.5deg)
      }
    }
    @keyframes shaky-slow {
      0% {
        transform: translate(0px, 0px) rotate(0deg)
      }
      2% {
        transform: translate(-1px, 1.5px) rotate(1.5deg)
      }
      4% {
        transform: translate(1.3px, 0px) rotate(-0.5deg)
      }
      6% {
        transform: translate(1.4px, 1.4px) rotate(-2deg)
      }
      8% {
        transform: translate(-1.3px, -1px) rotate(-1.5deg)
      }
      10% {
        transform: translate(1.4px, 0px) rotate(-2deg)
      }
      12% {
        transform: translate(-1.3px, -1px) rotate(-2deg)
      }
      14% {
        transform: translate(1.5px, 1.3px) rotate(1.5deg)
      }
      16% {
        transform: translate(1.5px, -1.5px) rotate(-1.5deg)
      }
      18% {
        transform: translate(1.3px, -1.3px) rotate(-2deg)
      }
      20% {
        transform: translate(1px, 1px) rotate(-0.5deg)
      }
      22% {
        transform: translate(1.3px, 1.5px) rotate(-2deg)
      }
      24% {
        transform: translate(-1.4px, -1px) rotate(2deg)
      }
      26% {
        transform: translate(1.3px, -1.3px) rotate(0.5deg)
      }
      28% {
        transform: translate(1.6px, -1.6px) rotate(-1.5deg)
      }
      30% {
        transform: translate(-1.3px, -1.3px) rotate(-1.5deg)
      }
      32% {
        transform: translate(-1px, 0px) rotate(2deg)
      }
      34% {
        transform: translate(1.3px, 1.3px) rotate(-0.5deg)
      }
      36% {
        transform: translate(1.3px, 1.6px) rotate(1.5deg)
      }
      38% {
        transform: translate(1.3px, -1.6px) rotate(1.5deg)
      }
      40% {
        transform: translate(-1.4px, -1px) rotate(-0.5deg)
      }
      42% {
        transform: translate(-1.4px, 1.3px) rotate(-0.5deg)
      }
      44% {
        transform: translate(-1.6px, 1.4px) rotate(0.5deg)
      }
      46% {
        transform: translate(-2.1px, -1.3px) rotate(-0.5deg)
      }
      48% {
        transform: translate(1px, 1.6px) rotate(1.5deg)
      }
      50% {
        transform: translate(1.6px, 1.6px) rotate(1.5deg)
      }
      52% {
        transform: translate(-1.4px, 1.6px) rotate(0.5deg)
      }
      54% {
        transform: translate(1.6px, -1px) rotate(-2deg)
      }
      56% {
        transform: translate(1.3px, -1.6px) rotate(-2deg)
      }
      58% {
        transform: translate(-1.3px, -1.6px) rotate(0.5deg)
      }
      60% {
        transform: translate(1.3px, 1.6px) rotate(-0.5deg)
      }
      62% {
        transform: translate(0px, 0px) rotate(-1.5deg)
      }
      64% {
        transform: translate(-1.6px, -1.6px) rotate(-2deg)
      }
      66% {
        transform: translate(1.6px, -1.6px) rotate(0.5deg)
      }
      68% {
        transform: translate(0px, -1.6px) rotate(-2deg)
      }
      70% {
        transform: translate(-1.6px, 1px) rotate(1.5deg)
      }
      72% {
        transform: translate(-1.6px, 1.6px) rotate(2deg)
      }
      74% {
        transform: translate(1.3px, -1.6px) rotate(-0.5deg)
      }
      76% {
        transform: translate(1.4px, 1px) rotate(-0.5deg)
      }
      78% {
        transform: translate(-1px, 1.4px) rotate(2deg)
      }
      80% {
        transform: translate(1.4px, 1.6px) rotate(2deg)
      }
      82% {
        transform: translate(-1.6px, -1.6px) rotate(-0.5deg)
      }
      84% {
        transform: translate(-1.4px, 1.4px) rotate(-2deg)
      }
      86% {
        transform: translate(1px, 1.4px) rotate(-2deg)
      }
      88% {
        transform: translate(-1.4px, 1.4px) rotate(-1.5deg)
      }
      90% {
        transform: translate(-1.6px, -1.6px) rotate(-2deg)
      }
      92% {
        transform: translate(-1.4px, 1.6px) rotate(2deg)
      }
      94% {
        transform: translate(-1.6px, -1.6px) rotate(-2deg)
      }
      96% {
        transform: translate(-1.4px, 1.3px) rotate(-2deg)
      }
      98% {
        transform: translate(1.3px, 1px) rotate(-0.5deg)
      }
    }
  }
</style>
