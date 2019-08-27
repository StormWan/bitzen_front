<template>
    <div class="receivables">
      <!--标题-->
        <van-nav-bar
          title="收款方式"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      <div class="content">
        <!--头部收款账号说明-->
        <header>绑定 <span>{{paymentInfo[index].name}}</span> 收款账号</header>
        <!--收款logo与信息-->
        <div class="logo_info">
          <!--收款logo-->
          <div class="logo">
          <div :class="{active: index === logoIndex}" v-for="(item,index) in paymentInfo"
                 :key="index" @click="paymentMethods(index)">
              <div v-show="item.img == 'card'">
                <van-icon :name="item.img" size="40px" class="logo-card"/>
              </div>
              <div v-show="item.img == 'wechat'">
                <van-icon :name="item.img" size="40px" class="logo-wechat"/>
              </div>
              <div v-show="item.img == 'alipay'">
                <van-icon :name="item.img" size="40px" class="logo-alipay"/>
              </div>
            </div>
          </div>
          <div class="info">
            <!--收款名字-->
            <div class="name">
              <input type="text" placeholder="姓名" v-model="user_name" @input="monitorInput">
            </div>
            <!--收款账号-->
            <div class="account">
              <input type="text" :placeholder="paymentInfo[index].name" v-model="user_account" @input="monitorInput">
            </div>
            <!--银行名称-->
            <div class="bank_name" v-if="index === 2">
              <input type="text" placeholder="银行名称" v-model="user_bankname" @change="monitorInput">
            </div>
            <!--开户支行名称-->
            <div class="bank_account" v-if="index === 2">
              <input type="text" placeholder="开户支行名称(选填)" v-model="user_branchname" @input="monitorInput">
            </div>
          </div>
        </div>
        <!--绑定按钮-->
        <div class="binding_button">
          <button type="submit" :class="{active: submit}" @click="bindingButton">绑定</button>
        </div>
        <!--说明-->
        <div class="tips" v-for="(item,index) in tipsList" :key="index">
          <div>{{index+1}}.</div>
          <div>{{item.text}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import { NavBar, Toast, Icon, Tabs, Tab } from 'vant'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
  },
  data () {
    return {
      tipsList: [
        {
          text: '支持微信、支付宝、银行卡三种支付方式，至少绑定一种'
        },
        {
          text: '绑定的账号必须为本人真是账号'
        },
        {
          text: '付款账号必须为已绑定账号，否则原路返回，不予放币'
        }
      ],
      paymentInfo: [
        {
          name: '微信账号',
          img: 'wechat'
        },
        {
          name: '支付宝账号',
          img: 'alipay'
        },
        {
          name: '银行卡账号',
          img: 'card'
        }
      ],
      index: 0,
      choosePayment: '', // 选择收款方式
      submit: false,
      // 用户名
      user_name: '',
      // 用户账号
      user_account: '',
      // 用户银行卡名称
      user_bankname: '',
      // 用户支行名称
      user_branchname: '',
      paymentData: '',
      logoIndex: 0
    }
  },
  methods: {
    /**
     * 返回上页面
     */
    onClickLeft () {
      this.$router.go(-1)
      this.logoIndex = 0
      this.index = 0
    },
    /**
     * 切换收款方式
     */
    paymentMethods (i) {
      this.index = i
      this.logoIndex = i
      this.user()
    },
    user () {
      this.submit = false
      if (this.index === 0) {
        if (this.paymentData.wechat_name && this.paymentData.wechat_account) {
          this.user_name = this.paymentData.wechat_name
          this.user_account = this.paymentData.wechat_account
        } else {
          this.user_name = ''
          this.user_account = ''
          this.user_bankname = ''
          this.user_branchname = ''
        }
      }
      if (this.index === 1) {
        if (this.paymentData.alipay_name && this.paymentData.alipay_account) {
          this.user_name = this.paymentData.alipay_name
          this.user_account = this.paymentData.alipay_account
        } else {
          this.user_name = ''
          this.user_account = ''
          this.user_bankname = ''
          this.user_branchname = ''
        }
      }
      if (this.index === 2) {
        if (this.paymentData.bank_account_name && this.paymentData.bank_account_number && this.paymentData.bank_branch_name) {
          this.user_name = this.paymentData.bank_account_name
          this.user_account = this.paymentData.bank_account_number
          this.user_bankname = this.paymentData.bank_branch_name
          if (this.paymentData.bank_name) {
            this.user_branchname = this.paymentData.bank_name
          }
        } else {
          this.user_name = ''
          this.user_account = ''
          this.user_bankname = ''
          this.user_branchname = ''
        }
      }
    },
    // 提交按钮
    async bindingButton () {
      if (this.submit) {
        if (this.index !== 2) {
          if (!this.user_account || !this.user_name) {
            Toast('信息不完整')
          } else {
            if (this.index === 0) {
              await this.$api.otc.paymentUpdate({ wechat_name: this.user_name, wechat_account: this.user_account })
              Toast('添加成功')
            } else {
              await this.$api.otc.paymentUpdate({ alipay_name: this.user_name, alipay_account: this.user_account })
              Toast('添加成功')
            }
          }
        } else {
          if (!this.user_account || !this.user_name || !this.user_bankname) {
            Toast('信息不完整')
          } else {
            await this.$api.otc.paymentUpdate({ bank_account_name: this.user_name, bank_account_number: this.user_account, bank_branch_name: this.user_bankname, bank_name: this.user_branchname })
            Toast('添加成功')
          }
        }
        const { data } = await this.$api.otc.paymentUpdate()
        this.paymentData = data.data
        this.user()
      }
    },
    // 监听输入框
    monitorInput () {
      if (this.index !== 2) {
        if (this.user_name && this.user_account) {
          this.submit = true
        } else {
          this.submit = false
        }
      } else {
        if (this.user_name && this.user_account && this.user_bankname) {
          this.submit = true
        } else {
          this.submit = false
        }
      }
    }
  },
  async activated () {
    const { data } = await this.$api.otc.paymentUpdate()
    if (data.code === 200) {
      this.paymentData = data.data
    }
    // 用户名
    if (this.paymentData.wechat_name) {
      this.user_name = this.paymentData.wechat_name
    }
    // 用户账号
    if (this.paymentData.wechat_account) {
      this.user_account = this.paymentData.wechat_account
    }
    if (sessionStorage.getItem('state')) {
      if (sessionStorage.getItem('state') === '0') {
        this.index = 2
        this.logoIndex = 2
      } else if (sessionStorage.getItem('state') === '1') {
        this.index = 0
        this.logoIndex = 0
      } else {
        this.index = 1
        this.logoIndex = 1
      }
    }
  }
}
</script>

<style scoped lang="less">
  .receivables{
    font-size: 16px;
    .content{
      width: 90%;
      margin: 0 auto;
      /*收款说明*/
      header{
        line-height: 60px;
        font-size: 20px;
        span{
          font-size: 18px;
          color: red;
        }
      }
      /*logo与信息*/
      .logo_info{
        /*logo*/
        .logo{
          display: flex;
          justify-content: space-around;
          align-items: center;
          .van-tabs {
            position: relative;
            width: 100%;
          }
          .logo-alipay{
            color: #1E90FF;
          }
          .logo-wechat{
            color: #32CD32;
          }
          .logo-card{
            color: #00CED1;
          }
          .active{
            border: 1px solid rgba(0,0,0,.07);
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
          }
        }
        /*信息*/
        .info{
          line-height: 50px;
          font-size: 15px;
          div{
            border-bottom: 1px solid #cccccc;
            padding: 0 8px;
          }
          input{
            border: none;
            width: 100%;
          }
        }
      }
      /*绑定按钮*/
      .binding_button{
        margin-top: 20px;
        margin-bottom: 40px;
        button{
          width: 100%;
          line-height: 50px;
          border: none;
          background-color: #DCDCDC;
          color: #F8F8FF;
          font-size: 18px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
        .active{
          background-color: #1E90FF;
        }
      }
      /*提示说明*/
      .tips{
        margin-top: 20px;
        display: flex;
        font-size: 14px;
        color: #999;
        div:nth-child(1){
          margin-right: 5px;
        }
      }
    }
  }
</style>
