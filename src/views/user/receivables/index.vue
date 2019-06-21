<template>
    <div class="receivables">
      <!--标题-->
      <div class="title">
        <van-nav-bar
          title="收款方式"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>
      <div class="content">
        <!--头部收款账号说明-->
        <header>绑定 <span>{{info[index].name}}</span> 收款账号</header>
        <!--收款logo与信息-->
        <div class="logo_info">
          <!--收款logo-->
          <div class="logo">
            <div class="img" :class="{active: index === act_index}" v-for="(item,index) in info" :key="index" @click="account(index)">
              <img :src="item.img" alt="">
            </div>
          </div>
          <div class="info">
            <!--收款名字-->
            <div class="name">
              <input type="text" placeholder="姓名" v-model="user_name" @input="submit_inp">
            </div>
            <!--收款账号-->
            <div class="account">
              <input type="text" :placeholder="info[index].name" v-model="user_acc" @input="submit_inp">
            </div>
            <!--银行名称-->
            <div class="bank_name" v-if="index === 2">
              <input type="text" placeholder="银行名称" v-model="user_bankname" @change="submit_inp">
            </div>
            <!--开户支行名称-->
            <div class="bank_account" v-if="index === 2">
              <input type="text" placeholder="开户支行名称(选填)" v-model="user_bacname" @input="submit_inp">
            </div>
          </div>
        </div>
        <!--绑定按钮-->
        <div class="but">
          <button type="submit" :class="{active: submit}" @click="but">绑定</button>
        </div>
        <!--说明-->
        <div class="tips" v-for="(item,index) in li" :key="index">
          <div>{{index+1}}.</div>
          <div>{{item.text}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
export default {
  data () {
    return {
      li: [
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
      info: [
        {
          name: '微信账号',
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAABiklEQVR4AbWVAWRCURSGf8gIGQyYgUEAgyAAbCCAAAQQGBAYIGAwAAgIwAMJGIsqRTAgQPAQEsKDu//kXHLddV+v+w6f0HnvP/e8/5yLYPzgAXN0yICsSUoyZUeW+l/nlFs45miSRF9scpKRBDM0rhGqacXmRobhE8/wwsQtMZHYyjv/E2swYU9MZPZW1DVGWoLYEQt88ffR/W7DyEIHCn3ab4gVKpjhzbayHlOI9K2QHqZFNsSctKSSCEI78oE17h1PTJy8PnRwjYdNjlanpEdqsLHC04XnltA2+KuWiudoe9y7xQLvWKF6JlSVE5DjxZZf3CRs91nV3zqjXYxw55iuk9PlGQKJGaZ4hoR123lM8cqc3yu+dSqC40BS4lkSdf9zQcY4tSic2LQLQgc5K+jmrl3Wu0DiUkxy4+o72LEJnDISUrDjtKREwTHc0DkalSA2sfPqE62oKWKJDWRmgzd+BKENaUGjLMGjzmbbLoiigmvSk/tMnKa3y0DQ9vdIM9S6gKCK6FqLGX+Ik2Cgy7oRZQAAAABJRU5ErkJggg=='
        },
        {
          name: '支付宝账号',
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAB7ElEQVR4Ac2WA6weQRSFb62gtuPajetGtW0FNcO6cVK7XdRu2Ia149R2Z6bP9r6T+yb5bZ7k/Bh9gzt3l1hXfzUiS+4iU36GK2AnTq6AP/PYJ/42JhZ+oPAp7CTWYDDUVHu4IDneCaD8kkTgV4r4zA5+akBuivhMI56llyLv768wXkpfYNK3NGXAaHQhpxlHY9KAlpwc6Qojt6W2urZYnYoFWA5XhWhTSaf/dmHYDqc2/v+NFPiZDLmKzv7pxAPAZIvWZPwbjrqN8B242LU6edUtgMZGGjS3XI8R6IRTj/yI2xhiPNofA7CPCyiuRAL8wM9FUy6AH8I5urwE/gwb8FSdS311+ldz1KsIgGIpmWpNGEGSQYbaC7f1gWIyPClD3uaJBgWeld3x/S3MyCwkWwz1AfqsWCzV8EIfIAeJqd6GAcuHx7oFylz4AVlqGl116gQ/c3HABTTkFH1pywPD1Esy//V0wdQMlJe6Rex3MtQ2OvO/fRgZXbziGVqqP+CmXm0m/AED2WT9G0GOU4sg/sYVCZLCyngrLTHRJ9K9Gl4jWzShYDoj+5Ih7keQiSQWcwgTHqKBPrP8wanK/D+QLzwOH4DeOgDu+maeiPwmBS9RuFNJA1pyV9JfhF33BHS9vZVxhFTWjCn2kYZVAyRlGm3AoxGeAAAAAElFTkSuQmCC'
        },
        {
          name: '银行卡账号',
          img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABHklEQVR4Ae2WgUYEURSGh70oQIB6gh6gHmBsqhfqHdq2hAJTUYAACMCytqQISUDAVpsEsWi09TX/XFcxYeJ0E/vzMf4z7uc6cJMQWi6l1egU5AUYkfszXZp8TVFmBfwyWbhZU0UcXKrbdWMJ5ZLwNaIwl5CY1BPen8HgAtoT1dn6pJ/dnRoKn64p01mpztQpj1eGwsNlyuTPsDX92W/P+A70j6FQ3BxR5nI3dP4bNDPeochmYZTD+xvsz8HBvP8evWhmLvScb1Cm3/Mo6sLcXLg5BcMHQhgO1BkL+8fUjP6NLLw9MRB+R0h19h+F4x3WYSystVe/rx/zJ0+MXtxHVNstxBO6ZqKw2tiLINxJQrzULenKxjvVWV3W3GLwfAD9KR4TBA12SgAAAABJRU5ErkJggg=='
        }
      ],
      index: 0,
      submit: false,
      // 用户名
      user_name: '',
      // 用户账号
      user_acc: '',
      // 用户银行卡名称
      user_bankname: '',
      // 用户支行名称
      user_bacname: '',
      data: [],
      act_index: 0
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 切换收款方式
    account (i) {
      this.index = i
      this.act_index = i
      this.user()
    },
    user () {
      this.submit = false
      if (this.index === 0) {
        if (this.data.wechat_name && this.data.wechat_account) {
          this.user_name = this.data.wechat_name
          this.user_acc = this.data.wechat_account
        } else {
          this.user_name = ''
          this.user_acc = ''
          this.user_bankname = ''
          this.user_bacname = ''
        }
      }
      if (this.index === 1) {
        if (this.data.alipay_name && this.data.alipay_account) {
          this.user_name = this.data.alipay_name
          this.user_acc = this.data.alipay_account
        } else {
          this.user_name = ''
          this.user_acc = ''
          this.user_bankname = ''
          this.user_bacname = ''
        }
      }
      if (this.index === 2) {
        if (this.data.bank_account_name && this.data.bank_account_number && this.data.bank_branch_name) {
          this.user_name = this.data.bank_account_name
          this.user_acc = this.data.bank_account_number
          this.user_bankname = this.data.bank_branch_name
          if (this.data.bank_name) {
            this.user_bacname = this.data.bank_name
          }
        } else {
          this.user_name = ''
          this.user_acc = ''
          this.user_bankname = ''
          this.user_bacname = ''
        }
      }
    },
    // 提交按钮
    async but () {
      if (this.submit) {
        if (this.index !== 2) {
          if (!this.user_acc || !this.user_name) {
            Toast('信息不完整')
          } else {
            if (this.index === 0) {
              await this.$api.otc.payment_patch({ wechat_name: this.user_name, wechat_account: this.user_acc })
              Toast('添加成功')
            } else {
              await this.$api.otc.payment_patch({ alipay_name: this.user_name, alipay_account: this.user_acc })
              Toast('添加成功')
            }
          }
        } else {
          if (!this.user_acc || !this.user_name || !this.user_bankname) {
            Toast('信息不完整')
          } else {
            await this.$api.otc.payment_patch({ bank_account_name: this.user_name, bank_account_number: this.user_acc, bank_branch_name: this.user_bankname, bank_name: this.user_bacname })
            Toast('添加成功')
          }
        }
        const { data } = await this.$api.otc.payment_patch()
        this.data = data.data
        this.user()
      }
    },
    // 监听输入框
    submit_inp () {
      if (this.index !== 2) {
        if (this.user_name && this.user_acc) {
          this.submit = true
        } else {
          this.submit = false
        }
      } else {
        if (this.user_name && this.user_acc && this.user_bankname) {
          this.submit = true
        } else {
          this.submit = false
        }
      }
    }
  },
  async activated () {
    const { data } = await this.$api.otc.payment_patch()
    if (data.code === 200) {
      this.data = data.data
    }
    // 用户名
    if (this.data.wechat_name) {
      this.user_name = this.data.wechat_name
    }
    // 用户账号
    if (this.data.wechat_account) {
      this.user_acc = this.data.wechat_account
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast
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
          .img{
            width: 58px;
            padding: 5px 10px;
            img{
              width: 100%;
            }
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
      .but{
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
