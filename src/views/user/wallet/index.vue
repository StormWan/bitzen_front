<template>
    <div class="wallet">
      <div class="title">
        <!--头部标题-->
        <van-nav-bar
          title="资金"
          left-text="返回"
          left-arrow
          @click-left="icon_arrow"
        />
      </div>
      <!--资产卡包-->
      <div class="Asset_card">
        <div class="bg">
          <!--资产余额-->
          <div class="Asset">
            <!--资产估计-->
            <div class="estimate">
              <span class="Es_assets">资产估计(BTC)</span>
              <span class="icon_box">
                <van-icon class="icon" :name="icon" @click="icon_click"></van-icon>
              </span>
            </div>
            <!--市值-->
            <div class="market_value">
              <span class="value">{{market}}</span>
              <span class="market">{{surface}}</span>
            </div>
            <!--显示资产-->
            <div class="money">
              <span>≈</span>
              <span>{{money}}</span>
            </div>
            <!--充值提现-->
<!--            <div class="Chg_and_wir">-->
<!--              <router-link to="/wallet_recharge"><span>-->
<!--                <van-icon class="icon" name="balance-list"></van-icon>-->
<!--              </span>充值</router-link>-->
<!--              <router-link to="/withdrawal"><span>-->
<!--                <van-icon class="icon" name="card"></van-icon>-->
<!--              </span>提现</router-link>-->
<!--            </div>-->
          </div>
          <!--卡包-->
          <div class="card">
            <div class="display">
              <!--价格-->
              <div class="Price">
                <p> <span :class="{active: bbgcolor}">资产</span> <span :class="{active: sales}" @click="orderFn('price_btc', false)"> ↑ </span>
                  <span :class="{active: sales_lower}" @click="orderFn('price_btc', true)"> ↓ </span>
                </p>
              </div>
              <!--搜索-->
              <div class="search">
                <input type="text" v-model="searchVal" placeholder="名称" />
              </div>
              <!--销量-->
              <div class="Sales_volume">
                <p> <span :class="{active: tbgcolor}">余额</span> <span @click="orderFn('balance', false)" :class="{active: price}"> ↑ </span>
                  <span @click="orderFn('balance', true)" :class="{active: price_lower}"> ↓ </span>
                </p>
              </div>
            </div>
            <!--卡包信息-->
            <div class="information" v-for="(item, key) in lists" :key="key">
              <a @click="onlists(key)">
                <div class="left">
                  <div class="img">
                    <img :src="item.icon_url" />
                  </div>
                </div>
                <div class="cent">{{item.symbol}} <span>({{item.name}})</span></div>
                <div class="right">{{item.balance}}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Icon, Toast, NavBar } from 'vant'

export default {
  data () {
    return {
      money_box: 0,
      money: 0,
      icon: 'eye-o',
      icon_run: true,
      // 默认输入为空
      searchVal: '',
      // 默认不排序
      letter: '',
      // 默认从小到大排列
      original: false,
      // 隐藏小额
      isactive: false,
      // 搜索引擎
      price: false,
      sales: false,
      sales_lower: false,
      price_lower: false,
      tbgcolor: false,
      bbgcolor: false,
      wallet_data: [],
      market_box: 0,
      market: 0,
      surface: ''
    }
  },
  components: {
    [Icon.name]: Icon,
    [NavBar.name]: NavBar
  },
  methods: {
    // 箭头
    icon_arrow () {
      this.$router.go(-1)
    },
    // 显示隐藏钱包
    icon_click () {
      if (this.icon_run === true) {
        this.icon = 'closed-eye'
        this.money = '******'
        this.icon_run = false
      } else {
        this.icon = 'eye-o'
        this.money = this.money_box
        this.icon_run = true
      }
    },
    // 搜索引擎
    orderFn (letter, original) {
      // 排序字段 price or sales
      this.letter = letter
      // 排序方式  up or down
      this.original = original
      if (this.letter === 'balance') {
        this.tbgcolor = true
        this.bbgcolor = false
        if (this.price === true) {
          this.price = false
          this.isactive = false
          this.sales = false
          this.price_lower = true
        } else {
          this.price = true
          this.price_lower = false
          this.isactive = false
          this.sales = false
          this.sales_lower = false
        }
      }
      if (this.letter === 'price_btc') {
        this.tbgcolor = false
        this.bbgcolor = true
        if (this.sales === true) {
          this.price = false
          this.isactive = false
          this.sales = false
          this.price_lower = false
          this.sales_lower = true
        } else {
          this.price = false
          this.price_lower = false
          this.isactive = false
          this.sales = true
          this.sales_lower = false
        }
      }
    },
    // 数据获取
    async wallet () {
      const { data } = await this.$api.wallet.walletAssets()
      this.surface = data.data[0].asset.symbol
      if (data.code === 200) {
        for (let i = 0; i < data.data.length; i++) {
          this.wallet_data.push(data.data[i].asset)
          this.money_box += (data.data[i].asset.price_usd * data.data[i].asset.balance)
          this.market_box += (data.data[i].asset.price_btc * data.data[i].asset.balance)
        }
        this.money = Math.floor(this.money_box * 1000) / 1000
        this.market = Math.floor(this.market_box * 10000) / 10000
      } else {
        Toast('获取数据失败，请刷新')
      }
    },
    // 钱包跳转
    onlists (i) {
      // console.log(this.lists[i])
      this.$router.push({
        name: 'charg_withd',
        params: {
          arr: this.lists[i]
        }
      })
      localStorage.setItem('lists', JSON.stringify(this.lists[i]))
    }
  },
  computed: {
    lists: function () {
      let _this = this
      let arrByZM = []
      for (let i = 0; i < this.wallet_data.length; i++) {
        // for循环数据中的每一项（根据name值）
        if (this.wallet_data[i].symbol.toLowerCase().search(this.searchVal.toLowerCase()) !== -1 || this.wallet_data[i].name.toLowerCase().search(this.searchVal.toLowerCase()) !== -1) {
          // 判断输入框中的值是否可以匹配到数据，如果匹配成功
          arrByZM.push(this.wallet_data[i])
          // 向空数组中添加数据
        }
      }
      // 判断，如果要letter不为空，说明要进行排序
      if (this.letter !== '') {
        arrByZM.sort(function (a, b) {
          if (_this.original) {
            return b[_this.letter] - a[_this.letter]
          } else {
            return a[_this.letter] - b[_this.letter]
          }
        })
      }
      return arrByZM
    }
  },
  async created () {
    await this.wallet()
  }
}
</script>

<style scoped lang="less">
  .wallet{
    font-size: 16px;
    /*资产-卡包*/
    .Asset_card{
      width: 100%;
      /*资产*/
      .bg{
        width: 90%;
        margin: 0 auto;
        .Asset{
          text-align: center;
          padding: 20px 0;
          /*全局*/
          div{
            font-size: 0;
            padding-bottom: 5px;
            span{
              vertical-align: middle;
              overflow: hidden;
              -ms-text-overflow: ellipsis;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: inline-block;
              font-size: 16px;
            }
          }
          a{
            font-size: 16px;
          }
          /*资产估计*/
          .estimate{
            .Es_assets{
              color: #999;
              margin-right: 7px;
              font-size: 14px;
            }
            .icon_box{
              .icon{
                vertical-align: middle;
                font-size: 18px;
              }
            }
          }
          /*市值*/
          .market_value{
            font-weight: 600;
            color: #000;
            span{
              font-size: 20px;
              vertical-align: bottom;
            }
            .market{
              color: #999;
              font-size: 16px;
              margin-left: 3px;
            }
          }
          /*余额显示*/
          .money{
            span{
              font-size: 17px;
              color: #808080;
              vertical-align: middle;
            }
            span:nth-child(1){
              margin-right: 3px;
            }
          }
          /*充值提现*/
          .Chg_and_wir{
            font-size: 0;
            margin-top: 3px;
            a{
              font-size: 13px;
              display: inline-block;
              padding: 5px 30px;
              border: 1px solid #ccc;
              color: green;
              /*充值提现icon*/
              span{
                padding-right: 3px;
                color: red;
                vertical-align: middle;
                .icon{
                  font-size: 13px;
                }
              }
            }
          }
        }
      }
      /*卡包*/
      .card{
        margin-top: 20px;
        padding-top: 10px;
        width: 100%;
        height: 100%;
        border-top: 13px solid rgba(0,0,0,.01);
        background: rgba(0,0,0,.01);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        /*标题搜索隐藏小额度*/
        .display{
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          width: 90%;
          margin: 5px auto;
          /*隐藏*/
          /*.none{*/
          /*  color: #999;*/
          /*  span{*/
          /*    margin-right: 5px;*/
          /*    .icon{*/
          /*      vertical-align: middle;*/
          /*      font-size: 14px;*/
          /*    }*/
          /*  }*/
          /*}*/

          /*价格*/
          .Price{
            font-size: 15px;
            color: #999;
            p{
              font-size: 13px;
              span{
                font-size: 15px;
              }
            }
          }
          /*销量*/
          .Sales_volume{
            color: #999;
            font-size: 13px;
            p{
              font-size: 13px;
              span{
                font-size: 15px;
              }
            }
          }
          /*搜索*/
          .search{
            border: 2px solid #FFFFF0;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            input{
              width: 80px;
              height: 22px;
              outline: none;
              font-size: 13px;
              text-align: center;
              border: none;
              -webkit-border-radius: 10px;
              -moz-border-radius: 10px;
              border-radius: 10px;
              padding: 2px 5px;
              background-color: #F5F5F5;
              color: #999;
            }
          }
          /*点击颜色*/
          .active{
            color: #DAA520;
          }
        }
        /*卡包信息*/
        .information{
          /*display: flex;*/
          /*justify-content: space-between;*/
          width: 95%;
          margin: 0 auto;
          a{
            display: flex;
            align-items: center;
            width: 100%;
            color: #000;
            padding: 12px 0;
            border-bottom: 1px solid rgba(0,0,0,.02);
            div{
              overflow: hidden;
              -ms-text-overflow: ellipsis;
              text-overflow: ellipsis;
              white-space: nowrap;
              vertical-align: middle;
            }
            .left{
              width: 15%;
              .img{
                width: 40px;
                height: 40px;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .cent{
              width: 60%;
              font-size: 16px;
              color: #87CEEB;
              span{
                color: #999;
                font-size: 12px;
              }
            }
            .right{
              width: 25%;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
