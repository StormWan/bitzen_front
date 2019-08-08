<template>
    <div class="Sign_in">
      <div class="head">
        <div class="Arrow" @click="Arrow">
          <van-icon name="arrow-left"></van-icon>
        </div>
        <div class="title_name">ExinOne</div>
      </div>
      <div class="information">
        <!--个人信息资料-->
        <div class="personal">
          <!--填写个人信息标题-->
          <div class="fill_in">
            <div>请填写个人信息</div>
          </div>
          <!--用户信息-->
          <div class="md-example-child md-example-child-input-item-2">
            <md-field>
              <md-input-item
                title="手机号"
                type="phone"
                v-model="phone"
                placeholder="xxx xxxx xxxx"
              ></md-input-item>
              <md-input-item
                title="用户名 "
                type="text"
                v-model="name"
                placeholder="昵称"
                @change="onnameChange"
              ></md-input-item>
              <md-input-item
                title="账号 "
                type="digit"
                v-model="digit"
                placeholder="0123456789"
                @change="onIDChange"
              ></md-input-item>
              <md-input-item
                title="密码"
                type="digit"
                placeholder="*********"
                @change="onpasChange"
              ></md-input-item>
              <md-input-item
                title="确认密码"
                type="password"
                placeholder="*********"
              ></md-input-item>
            </md-field>
          </div>
        </div>
      </div>
      <!--确定按钮-->
      <div class="but">
        <button>注册</button>
      </div>
    </div>
</template>

<script>
import { Icon } from 'vant'
import { InputItem, Field } from 'mand-mobile'

export default {
  data () {
    return {
      // 表单控件
      phone: '',
      money: '',
      digit: '',
      name: '',
      user: []
    }
  },
  methods: {
    // 返回箭头
    Arrow () {
      this.$router.go(-1)
    },
    // 表单控件
    onInputKeydown (name, event) {
      // 获取键盘
      // console.log(event)
    },
    onnameChange (name, value) {
      setTimeout(() => {
        localStorage.setItem('user_name', value)
      }, 1500)
    },
    onIDChange (name, value) {
      setTimeout(() => {
        localStorage.setItem('user_ID', value)
      }, 1500)
    },
    onpasChange (name, value) {
      setTimeout(() => {
        localStorage.setItem('user_pas', value)
      }, 1500)
    }
  },
  components: {
    [Icon.name]: Icon,
    [InputItem.name]: InputItem,
    [Field.name]: Field
  }
}
</script>

<style lang="less">
  .Sign_in{
    font-size: 16px;
    .head {
      position: relative;
      text-align: center;
      line-height: 80px;
      font-size: 20px;
      .Arrow {
        position: absolute;
        left: 10%;
        font-size: 20px;
        .icon {
          /*vertical-align: middle;*/
        }
      }
    }
    /*填写信息*/
    .information{
      width: 90%;
      margin: 0 auto;
      background-color: #FFFAFA;
      padding: 25px 0;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      /*个人信息资料*/
      .personal{
        font-size: 22px;
        .fill_in{
          width: 90%;
          margin: 0 auto;
          text-align: center;
          border-bottom: 8px solid rgba(0,0,0,.02);
          padding-bottom: 10px;
        }
        /*昵称*/
        .md-example-child-input-item-2{
          .md-field{
            background: none;
          }
          .md-field-item-content{
            min-height: 0;
          }
          .md-input-item-fake, .md-input-item-input{
            height: 50px;
            font-size: 16px;
          }
          .md-field-item.is-solid .md-field-item-title{
            font-size: 16px;
            width: 30%;
          }
        }
      }
    }
    /*确认按钮*/
    .but{
      width: 80%;
      margin: 30px auto;
      height: 50px;
      line-height: 50px;
      bottom: 5px;
      left: 50%;
      text-align: center;
      button{
        width: 80%;
        border: none;
        background-color: #00BFFF;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        color: white;
      }
    }
  }
</style>
