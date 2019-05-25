<template>
    <div class="wallet">
      <div class="title">
        <!--头部标题-->
        <div class="title_box">
          <!--钱包Icon-->
          <div class="icon" @click="icon_arrow">
            <van-icon name="arrow-left"></van-icon>
          </div>
          <!--资金标题-->
          <div class="head_title">资金</div>
          <!--日志Icon-->
          <a href="" class="icon">
            <van-icon name="orders-o"></van-icon>
          </a>
        </div>
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
              <span class="value">0.26579506</span>
              <span class="market">BTC</span>
            </div>
            <!--显示资产-->
            <div class="money">
              <span>￥</span>
              <span>{{money}}</span>
            </div>
            <!--充值提现-->
            <div class="Chg_and_wir">
              <a href=""><span>
                <van-icon class="icon" name="balance-list"></van-icon>
              </span>充值</a>
              <a href=""><span>
                <van-icon class="icon" name="card"></van-icon>
              </span>提现</a>
            </div>
          </div>
          <!--卡包-->
          <div class="card">
            <!--卡包小额隐藏-->
            <div class="display">
              <!--价格-->
              <div class="Price">
                <p> <span :class="{active: bbgcolor}">销量</span> <span :class="{active: sales}" @click="orderFn('sales', false)"> ↑ </span>
                  <span :class="{active: sales_lower}" @click="orderFn('sales', true)"> ↓ </span>
                </p>
              </div>
              <!--搜索-->
              <div class="search">
                <input type="text" v-model="searchVal" placeholder="名称" />
              </div>
              <!--销量-->
              <div class="Sales_volume">
                <p> <span :class="{active: tbgcolor}">价格</span> <span @click="orderFn('price', false)" :class="{active: price}"> ↑ </span>
                  <span @click="orderFn('price', true)" :class="{active: price_lower}"> ↓ </span>
                </p>
              </div>
            </div>
            <!--卡包信息-->
            <div class="information" v-for='(item, key) in list1' :key="key">
              <a href="">
                <div class="left">
                  <div class="img">
                    <img :src="item.img" />
                  </div>
                </div>
                <div class="cent">{{item.name}} <span>({{item.title_name}})</span></div>
                <div class="right">{{item.price}}</div>
              </a>
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
      money: '11355.49',
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
      goodsList: [
        {
          name: 'AST',
          title_name: 'AirSwap',
          price: 5200,
          sales: 2.6,
          img: require('../../../assets/cat_top.jpg')
        },
        {
          name: 'ARK',
          title_name: 'AirSwap',
          price: 2500,
          sales: 2.2,
          img: require('../../../assets/cat_top.jpg')
        },
        {
          name: 'ANB',
          title_name: 'BirSwap',
          price: 2800,
          sales: 1.6,
          img: require('../../../assets/cat_top.jpg')
        }
      ],
      price: false,
      sales: false,
      sales_lower: false,
      price_lower: false,
      tbgcolor: false,
      bbgcolor: false
    }
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
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
        this.money = '11355.49'
        this.icon_run = true
      }
    },
    // 隐藏小额度
    active_state () {
      this.tbgcolor = false
      this.bbgcolor = false
      if (this.isactive === false) {
        this.isactive = true
        this.price = false
        this.sales = false
        this.price_lower = false
        this.sales_lower = false
      } else {
        this.isactive = false
        this.price = false
        this.sales = false
        this.price_lower = false
        this.sales_lower = false
      }
    },
    // 搜索引擎
    orderFn (letter, original) {
      // 排序字段 price or sales
      this.letter = letter
      // 排序方式  up or down
      this.original = original
      if (this.letter === 'price') {
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
      if (this.letter === 'sales') {
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
    }
  },
  computed: {
    list1: function () {
      let _this = this
      let arrByZM = []
      // console.log(this.searchVal)
      for (let i = 0; i < this.goodsList.length; i++) {
        // for循环数据中的每一项（根据name值）
        if (this.goodsList[i].name.search(this.searchVal) !== -1 || this.goodsList[i].title_name.search(this.searchVal) !== -1) {
          // 判断输入框中的值是否可以匹配到数据，如果匹配成功
          arrByZM.push(this.goodsList[i])
          // 向空数组中添加数据
        }
      }
      // 逻辑-->升序降序排列  false: 默认从小到大  true：默认从大到小
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
  }
}
</script>

<style scoped lang="less">
  .wallet{
    font-size: 16px;
    /*头部标题*/
    .title{
      width: 100%;
      color: #696969;
      /*头部标题*/
      .title_box{
        padding-top: 18px;
        padding-bottom: 25px;
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 0 auto;
        .icon{
          font-size: 22px;
          color: #00CED1;
        }
        .head_title{
          font-size: 16px;
        }
      }
    }
    /*资产-卡包*/
    .Asset_card{
      width: 100%;
      /*资产*/
      .bg{
        width: 90%;
        margin: 0 auto;
        .Asset{
          text-align: center;
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
            }
          }
          /*余额显示*/
          .money{
            span{
              font-size: 16px;
              color: #808080;
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
              width: 70%;
              font-size: 16px;
              color: #87CEEB;
              span{
                color: #999;
                font-size: 12px;
              }
            }
            .right{
              width: 15%;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>
