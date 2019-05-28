<template>
    <div class="bb_order">
      <!--标题-->
      <div class="head">
        <!--箭头-->
        <div class="left_arrow" @click="Arrow">
          <van-icon class="icon" name="arrow-left"></van-icon>
        </div>
        <!--title表头-->
        <div class="title">币币订单</div>
      </div>
      <div class="BG" v-for="(item,index) in order" :key="index">
        <!--订单详情-->
        <div class="md-example-child md-example-child-bill-1">
          <md-bill
            :title="item[0].pair.pair + side"
            :no="item[0].created.substring(0, 10) + ' ' + item[0].created.substring(11, 19)"
            water-mark="Bit-OX">
            <md-detail-item title="委托数量">
              <span>{{Math.floor(item[0].pay_amount * 100) /100}} </span>{{item[0].pay_asset.symbol}}
            </md-detail-item>
            <md-detail-item title="平均成交价">
              <span v-if="!item[0].price">- -</span><span v-else>{{(Math.floor(item[0].price * 100) / 100).toFixed(3)}}</span>{{item[0].pair.pair}}
            </md-detail-item>
            <md-detail-item title="服务费">
              <div v-if="!item[0].pair.price_usdt"><span>- -</span></div>
              <div v-else><span>{{item[0].pair.price_usdt}}</span>EPC</div>
            </md-detail-item>
            <md-detail-item title="实际到账">
              <span v-if="!item[0].pair.price">--</span><span v-else>{{item[0].pair.price}} </span> {{item[0].pair.base.symbol}}
            </md-detail-item>
            <div class="footer-slot" slot="footer">
              <div class="loding"><van-progress :percentage="value" /></div>
              <div class="state">
                <div class="complete" :class="{active: icon_red}">
                  <span>
                    <van-icon class="icon" :name="passed"></van-icon>
                  </span>
                  <span>{{state}}</span>
                </div>
                <div @click="item_pass">
                  <router-link to="/details">详情</router-link>
                </div>
              </div>
            </div>
          </md-bill>
        </div>
      </div>
    </div>
</template>

<script>
import { Field, DetailItem, Tag, Bill } from 'mand-mobile'
import { Icon, Progress, Toast } from 'vant'
export default {
  data () {
    return {
      value: Number,
      color: 'red',
      // 取消颜色 false为不显示
      icon_red: false,
      // icon名称 close为失败
      passed: 'passed',
      // 状态 失败与完成
      state: '',
      order: [],
      side: ''
    }
  },
  methods: {
    // 传输
    item_pass () {
      // 纯时间
      let date = new Date(this.order[0][0].created)
      let result, year, month, day
      year = date.getYear() + 1900
      month = date.getMonth() + 1
      day = date.getDate()
      result = year.toString() + (month > 9 ? month : '0' + month) + (day > 9 ? day : '0' + day)
      let item = result + this.order[0][0].created.substring(11, 13) + this.order[0][0].created.substring(14, 16) + this.order[0][0].created.substring(17, 19) + this.order[0][0].created.substring(20, 26)
      localStorage.setItem('item_pure', item)

      // 时间排序
      localStorage.setItem('item_pow', this.order[0][0].created.substring(0, 10) + ' ' + this.order[0][0].created.substring(11, 19))

      // 价格
      localStorage.setItem('price', this.order[0][0].price)

      // 买入卖出
      localStorage.setItem('side', this.order[0][0].side)

      // 完成状态
      localStorage.setItem('value', this.value)

      // 订单金额
      localStorage.setItem('pay_amount', this.order[0][0].pay_amount)

      // 单价
      localStorage.setItem('price', this.order[0][0].price)


      // 市列表
      localStorage.setItem('pair', this.order[0][0].pair.pair)



      // 成交市名
      localStorage.setItem('symbol', this.order[0][0].pair.base.symbol)


      // 成交USDT
      localStorage.setItem('pay_asset', this.order[0][0].pay_asset.symbol)


      // 成交获得
      localStorage.setItem('pair_price', this.order[0][0].pair.price)
    },
    Arrow () {
      this.$router.go(-1)
    },
    // 获取数据
    async getPair (id) {
      const { data } = await this.$api.bb.orders()
      if (data.code === 200) {
        this.order.push(data.data)
        // 处理状态
        if (!this.order[0][0].transfer_state) {
          this.state = '已取消'
          this.icon_red = true
          this.value = 0
          this.passed = 'close'
        } else if (this.order[0][0].transfer_state === 'pending') {
          this.state = '已挂单'
          this.icon_red = false
          this.value = 50
          this.passed = 'clock-o'
        } else if (this.order[0][0].transfer_state === 'solved') {
          this.icon_red = false
          this.state = '已成功'
          this.value = 100
          this.passed = 'passed'
        }
        // 判断买入卖出
        if (this.order[0][0].side === 'buy') {
          this.side = ' 买入'
        } else if (this.order[0][0].side === 'sell') {
          this.side = ' 卖出'
        } else {
          this.side = ' - -'
        }
      } else {
        Toast('获取数据失败，请刷新页面')
      }
    }
  },
  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    [Bill.name]: Bill,
    [Tag.name]: Tag
  },
  async mounted () {
    await this.getPair(1)
  }
}
</script>

<style lang="less">
  .bb_order{
    font-size: 18px;
    /*标题头部*/
    .head{
      position: relative;
      text-align: center;
      line-height: 80px;
      font-size: 19px;
      /*返回箭头*/
      .left_arrow{
        position: absolute;
        left: 10%;
        font-size: 20px;
        .icon{
          /*vertical-align: middle;*/
        }
      }
    }
    .BG{
      background: rgba(0,0,0,.02);
      width: 100%;
      overflow: hidden;
      .md-example-child-bill-1{
        /*线条*/
        .md-bill-neck{
          height: 0;
        }
        .md-bill{
          background-color: #FFF;
          box-shadow: 0 6px 24px rgba(17, 26, 52, .05);
          &.md-water-mark{
            overflow: visible;
          }
          .md-bill-neck{
            &:before, &:after{
              content: '';
              position: absolute;
              top: 0;
              width: 36px;
              height: 36px;
              border-radius: 18px;
              background-color: #F3F4F5;
            }
            &:before{
              left: -40px;
            }
            &:after{
              right: -40px;
            }
          }
          /*头部控制*/
          .md-bill-header{
            padding-top: 0;
            .md-bill-title{
              font-size: 18px;
              font-weight: bold;
            }
            .md-bill-no{
              font-size: 14px;
            }
          }
          /*名称控制*/
          .md-bill-detail{
            padding: 5px 0;
            .md-detail-item{
              padding: 5px 0;
              .md-detail-title{
                font-size: 16px;
              }
              .md-detail-content{
                font-size: 13px;
                color: #000;
                span{
                  font-size: 16px;
                  padding-right: 8px;
                  font-weight: bold;
                }
              }
            }.md-detail-item:nth-last-child(2){
               span{
                 color: #CD5C5C;
               }
             }
            .md-detail-item:nth-last-child(1){
              span{
                color: #40E0D0;
              }
            }
          }
          .footer-slot{
            padding: 12px 0;
            color: #858B9C;
            font-size: 16px;
            line-height: 1.5;
            border-top: solid 1px #E1E4EB;
            /*进度条*/
            .loding{
              padding-bottom: 12px;
            }
            .state{
              display: flex;
              justify-content: space-between;
              .complete{
                color: green;
                span{
                  vertical-align: middle;
                  padding: 10px 0;
                  .icon{
                    vertical-align: middle;
                  }
                }
                span:nth-child(1){
                  margin-right: 10px;
                }
              }
              .active{
                color: red;
              }
            }
          }
        }
      }
    }
  }
</style>
