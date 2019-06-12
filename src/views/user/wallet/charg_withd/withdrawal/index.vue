<template>
  <div class="withdrawal">
    <!--标题-->
    <div class="title">
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!--选择器-->
    <!--一-->
    <div class="checked">
      <!--地址选择器-->
      <div>
        <van-collapse v-model="activeNames" @change="title_con">
<!--          头-->
          <van-collapse-item :title="title_content" name="1">
            <div class="address_box">
              <div v-for="(item,index) in address" :key="index">
                <div class="address" @click="address_name(index)">提现到我的 {{item.name}} 钱包</div>
              </div>
<!--              <div>+ 添加一个提现地址</div>-->
            </div>
          </van-collapse-item>

<!--          中-->
          <div class="money">
            <div class="md-example-child md-example-child-input-item-3">
              <md-field>
                <md-input-item
                  type="money"
                  v-model="value"
                  :brief="brief"
                  :placeholder="placeholder"
                  :size="size"
                  is-amount
                  is-highlight
                >
                  <div class="input-operator" slot="right" @click="takeAll">全部取出</div>
                </md-input-item>
              </md-field>
            </div>
          </div>

<!--          下-->
          <div class="money">
            <div class="md-example-child md-example-child-input-item-3">
              <md-field>
                <md-input-item
                  type="text"
                  v-model="text"
                  maxlength="20"
                  placeholder="备注（可选）"
                  is-amount
                  is-highlight
                >
                </md-input-item>
              </md-field>
            </div>
          </div>
        </van-collapse>
      </div>
      <!--提示文字-->
      <div class="text">无需手续费</div>
      <!--确认按钮-->
      <div class="but">
        <button @click="active_click" :class="{active: onactive}">提现</button>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Collapse, CollapseItem, Popup } from 'vant'
import { InputItem, Field } from 'mand-mobile'
export default {
  data () {
    return {
      title: '- -',
      activeNames: ['0'],
      title_content: '点击添加收款账号',
      show: false,
      address: [],
      active: 0,
      value: '',
      brief: '',
      placeholder: '',
      money: '',
      text: '',
      onactive: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    // 点击地址
    title_con (index) {
      this.show = true
    },
    // 地址选择器
    address_name (e) {
      this.active = e
      this.title_content = '我的 ' + this.address[e].name + ' 钱包'
      this.show = false
      this.activeNames = ['0']
    },
    takeAll () {
      this.value = this.money
    },
    active_click () {
      if (this.onactive) {
        alert('努力开发中')
      }
    }
  },
  computed: {
    size () {
      const that = this
      console.log(this.value > '0')
      if (that.value && this.value > '0') {
        if (this.value > this.money) {
          that.brief = '你已超出可转金额最大值 ' + (that.value - that.money)
          that.onactive = false
        } else {
          that.onactive = true
        }
      } else {
        that.brief = ''
        that.onactive = false
      }
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Popup.name]: Popup,
    [InputItem.name]: InputItem,
    [Field.name]: Field
  },
  activated () {
    this.title = JSON.parse(localStorage.getItem('lists')).symbol
    this.money = JSON.parse(localStorage.getItem('lists')).price_btc * JSON.parse(localStorage.getItem('lists')).balance
    this.placeholder = '可以转出 ' + this.money + ' ' + this.title
    if (localStorage.getItem('withdrawal')) {
      this.address = JSON.parse(localStorage.getItem('withdrawal'))
    } else {
      const withdrawal = [{ name: 'Mixin', type: 'Mixin', balance: JSON.parse(localStorage.getItem('lists')).balance }]
      localStorage.setItem('withdrawal', JSON.stringify(withdrawal))
      this.address = JSON.parse(localStorage.getItem('withdrawal'))
    }
  }
}
</script>

<style lang="less">
  .withdrawal{
    .checked{
      /*地址选择器*/
      .van-popup--bottom{
        -webkit-border-top-left-radius: 10px;
        -moz-border-top-left-radius: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        -moz-border-top-right-radius: 10px;
        -webkit-border-top-right-radius: 10px;
      }
      /*头*/
      .address_box{
        font-size: 16px;
        .address{
          margin: 0 auto;
        }
      }
      /*提示文本*/
      .text{
        font-size: 12px;
        text-align: center;
      }
      /*提现按钮*/
      .but{
        width: 90%;
        margin: 0 auto;
        font-size: 18px;
        margin-top: 20px;
        button{
          padding: 15px 0;
          width: 100%;
          color: white;
          background-color: rgba(0,0,0,.2);
          border: none;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
        .active{
          background-color: #1E90FF;
        }
      }
    }
    .van-collapse-item__content{
      padding: 5px 0;
      width: 90%;
      margin: 0 auto;
      color: green;
      font-size: 14px;
      line-height: 30px;
    }
    .md-example-child-input-item-3{
      width: 90%;
      margin: 20px auto;
      .md-field{
        padding: 0;
        .md-field-title{
          .value{
            display: flex;;
            align-items: center;
            justify-content: flex-end;
            .field-operator{
              display: flex;
              align-items: center;
            }
          }
        }
        .md-field-item-content::before{
          background-color: #C5CAD5;
        }
        .input-operator{
          font-size: 28px;
          color: #5878B4;
        }
        .md-input-item-input{
          font-size: 14px;
          height: 24px;
        }
        .md-field-item{
          height: 40px;
        }
        .md-field-item-content{
          min-height: 0;
          height: 40px;
        }
        .input-operator{
          font-size: 16px;
        }
        .md-field-item-children{
          margin-top: 5px;
        }
        .md-input-item-brief{
          font-size: 13px;
          color: #FF4500;
        }
      }
    }
  }
</style>
