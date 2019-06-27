<template>
    <div>
      <!--遮罩层-->
      <div :class="{mask: triangle_active}" @click="mask"></div>
      <!--付款方式-->
      <div class="wallet_box" @click="wallet_box">
        <div class="wallet">
          <div class="Bank">
            <div class="left">
              <van-icon name="youzan-shield"></van-icon>
            </div>
            <div class="right">{{bank}} 钱包</div>
          </div>
          <div class="balance">
            <div class="left">
              <div>{{symbol}} 余额</div>
              <div>{{Math.floor(pair.buy_price * 100) / 100}}</div>
            </div>
            <!--三角形-->
            <div class="right" :class="{active: triangle_active}"></div>
          </div>
        </div>
      </div>

      <!--付款方式钱包-->
      <div class="dis_but" :class="{display: triangle_active}">
        <div class="title">请选择钱包</div>
        <!--钱包选择-->
        <div class="Choice">
          <div class="wallet_box" v-for="(item,index) in wallet" :key="index" @click="wallet_click(index)">
            <div class="wallet">
              <div class="Bank">
                <div class="left">
                  <van-icon :name="item.icon"></van-icon>
                </div>
                <div class="right">{{item.name}} 钱包</div>
              </div>
              <div class="balance">
                <div class="left">
                  <div>{{symbol}} 余额</div>
                  <div>{{Math.floor(pair.buy_price * 100) / 100}}</div>
                </div>
                <!--三角形-->
                <div class="right" :class="{active: index === icon_index}">
                  <van-icon name="passed"></van-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  data () {
    return {
      triangle_active: false,
      bank: '',
      base_symbol: '',
      // 钱包数据
      wallet: [
        {
          name: 'Mixin',
          icon: 'youzan-shield'
        }
        // {
        //   name: 'BlockPay',
        //   icon: 'youzan-shield'
        // }
      ],
      icon_index: 0,
      // symbol: ''
    }
  },
  methods: {
    // 遮罩层
    mask () {
      this.triangle_active = false
    },
    // 钱包选择付款
    wallet_box () {
      if (!this.triangle_active) {
        this.triangle_active = true
      }
    },
    // 钱包选择点击添加动画手
    wallet_click (e) {
      this.bank = this.wallet[e].name
      this.$emit('wallet', this.bank)
      setTimeout(() => {
        this.triangle_active = false
      }, 100)
      this.icon_index = e
    }
  },
  async created () {
    this.bank = this.wallet[0].name
    this.$emit('wallet', this.bank)
  },
  components: {
    [Icon.name]: Icon
  },
  props: [
    'pair',
    'index',
    'symbol'
  ]
}
</script>

<style scoped lang="less">
  /*付款方式*/
  .wallet_box{
    padding: 15px 0;
    margin-top: 15px;
    font-size: 15px;
    .wallet{
      width: 90%;
      border-bottom: 1px solid rgba(0,0,0,.05);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      /*全局*/
      .Bank,.balance{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      /*银行*/
      .Bank{
        color: #696969;
        .left{
          font-size: 20px;
          color: #00BFFF;
        }
        .right{
          font-size: 15px;
          padding-left: 5px;
        }
      }
      /*余额*/
      .balance{
        .left{
          font-size: 13px;
          color: #999;
          text-align: right;
          div:nth-last-child(1){
            padding-top: 5px;
          }
        }
        .right{
          border: 10px solid transparent;
          border-top-color: black;
          margin-left: 10px;
          -webkit-transition: .1s;
          -moz-transition: .1s;
          -ms-transition: .1s;
          -o-transition: .1s;
          transition: .1s;
        }
        .active{
          border: 10px solid transparent;
          border-bottom-color: black;
        }
      }
    }
  }
  /*付款方式钱包*/
  .dis_but{
    position: fixed;
    z-index: 1001;
    bottom: 0;
    background-color: white;
    width: 100%;
    text-align: center;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    height: 0;
    .title{
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      border-bottom: 1px solid rgba(0,0,0,.05);
    }
    /*隐藏滚轮条*/
    .Choice::-webkit-scrollbar {
      display: none;
    }
    /*钱包列表*/
    .Choice{
      height: 100%;
      overflow: auto;
      .wallet_box{
        font-size: 15px;
        margin: 0;
        padding: 6px 0;
        /*padding: 0;*/
        .wallet{
          width: 90%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 20px;
          /*全局*/
          .Bank,.balance{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #696969;
          }
          /*付款*/
          .Bank{
            .left{
              font-size: 20px;
              color: #00BFFF;
            }
            .right{
              font-size: 15px;
              padding-left: 5px;
            }
          }
          /*余额*/
          .balance{
            .left{
              font-size: 13px;
              color: #999;
              text-align: right;
              div:nth-last-child(1){
                padding-top: 5px;
              }
            }
            .right{
              border: none;
              margin-left: 5px;
              -webkit-transition: .1s;
              -moz-transition: .1s;
              -ms-transition: .1s;
              -o-transition: .1s;
              transition: .1s;
              width: 30px;
              font-size: 0px;
              color: #32CD32;
            }
            .active{
              font-size: 20px;
            }
          }
        }
      }
    }
  }
  /*弹出钱包选择框*/
  .display{
    height: 40%;
  }
  /*遮罩层*/
  .mask{
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
    z-index: 1000;
  }
</style>
