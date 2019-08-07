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
import { PasswordInput, NumberKeyboard, Icon, NavBar } from 'vant'
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
      again_password: false,
      New_password: false,
      passwordInfo: '',
      Tips_title: ''
    }
  },
  methods: {
    // 返回上一页
    onClick () {
      this.$router.go(-1)
    },
    // 密码输入
    inputNumber (key) {
      this.passwordValue = (this.passwordValue + key).slice(0, 6)
      if (!JSON.parse(localStorage.getItem('userInfo')).is_setup_pin) {
        this.createPassword()
      } else {
        this.changePassword()
      }
    },
    deleteNumber () {
      this.passwordValue = this.passwordValue.slice(0, this.passwordValue.length - 1)
    },
    // 创建新密码
    async createPassword () {
      // 没有设置密码(新建密码)
      if (this.passwordValue.length >= 6) {
        if (localStorage.getItem('New_password')) {
          if (this.passwordValue !== localStorage.getItem('New_password')) {
            this.Tips = true
            this.Tips_title = '请重新输入新密码'
            this.passwordInfo = '重新输入新密码'
            localStorage.removeItem('New_password')
            setTimeout(() => {
              this.passwordValue = ''
              this.Tips = false
            }, 800)
          } else {
            await this.$api.pass.setup_pin({ 'pin': this.passwordValue })
            localStorage.removeItem('New_password')
            setTimeout(async () => {
              this.$router.go(-1)
              this.passwordValue = ''
            }, 800)
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
    // 修改旧密码
    async changePassword () {
      // 修改密码
      if (this.passwordValue.length >= 6) {
        const { data } = await this.$api.pass.update_pin({ 'pin': this.passwordValue })
        console.log(data)
        // 旧密码
        if (this.passwordValue === localStorage.getItem('user_pas') && this.New_password === false) {
          setTimeout(() => {
            this.passwordValue = ''
            this.New_password = true
            this.again_password = false
            this.passwordInfo = '输入新的密码'
          }, 500)
        } else if (this.again_password === false && this.New_password === true && localStorage.getItem('user_pas') !== this.passwordValue) {
          // 新密码
          this.passwordInfo = '请再次输入'
          localStorage.setItem('New_password', this.passwordValue)
          setTimeout(() => {
            this.passwordValue = ''
            this.again_password = true
          }, 500)
        } else if (this.again_password === true && this.passwordValue === localStorage.getItem('New_password')) {
          // 再次输入
          this.passwordInfo = '修改成功'
          localStorage.setItem('user_pas', this.passwordValue)
          localStorage.removeItem('New_password')
          setTimeout(() => {
            this.passwordValue = ''
            this.$router.go(-1)
          }, 1500)
        } else {
          this.Tips = true
          this.Tips_title = '请重新输入原密码'
          this.New_password = false
          this.again_password = false
          setTimeout(() => {
            this.passwordValue = ''
            this.Tips = false
          }, 1000)
        }
      }
    }
  },
  async activated () {
    if (JSON.parse(localStorage.getItem('userInfo')).is_setup_pin) {
      this.passwordInfo = '请输入原密码'
      this.title = '修改 BlockPay 密码'
    } else {
      this.passwordInfo = '创建新密码'
      this.title = '创建 BlockPay 新密码'
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
