<template>
  <div class="otc_details">
    <!--标题-->
    <div class="head">
      <van-nav-bar
        title="C2C 订单记录"
        left-text="返回"
        left-arrow
        @click-left="Arrow"
      />
<!--      &lt;!&ndash;箭头&ndash;&gt;-->
<!--      <div class="left_arrow" @click="Arrow">-->
<!--        <van-icon class="icon" name="arrow-left"></van-icon>-->
<!--      </div>-->
<!--      &lt;!&ndash;title表头&ndash;&gt;-->
<!--      <div class="title">C2C 订单记录</div>-->
    </div>
    <div class="BG" v-for="(item,index) in order" :key="index">
      <!--订单详情-->
      <div class="md-example-child md-example-child-bill-1" v-if="item.side === 'buy'">
        <md-bill
          :title="'买入 ' + item.otc_pair.asset.symbol"
          :no="item.created.substring(0, 10) + ' ' + item.created.substring(11, 19)"
          water-mark="Bit-OX">
          <md-detail-item title="数量">
            <span>{{item.usdt_amount}} </span>{{item.otc_pair.asset.symbol}}
          </md-detail-item>
          <md-detail-item title="价格">
            <span v-if="!item.usdt_price">- -</span><span v-else>{{Math.floor(item.usdt_price * 1000) / 1000}}</span>CNY/{{item.otc_pair.asset.symbol}}
          </md-detail-item>
          <md-detail-item title="总价">
            <div v-if="!item"><span>- -</span></div>
            <div v-else><span>{{item.currency_amount}}</span>CNY</div>
          </md-detail-item>
          <div class="footer-slot" slot="footer">
            <!--进度条-->
            <div class="loding" v-if="item.state && !item.transfer_state"><van-progress :percentage="0" /></div>
            <div class="loding" v-else-if="item.transfer_state && !item.exchange_state"><van-progress :percentage="50" /></div>
            <div class="loding" v-if="item.exchange_state"><van-progress :percentage="100" /></div>
            <!--支付状态-->
            <div class="state">
              <div class="complete" :class="{active: item.transfer_state === 'fail' || item.state === 'pending'}">
                <!--icon-->
                <span v-if="item.status === 0">
                  <van-icon class="icon" name="clock-o"></van-icon>
                </span>
                <span v-else-if="item.status === 1">
                  <van-icon class="icon" name="cash-back-record"></van-icon>
                </span>
                <span v-else-if="item.status === 11 || item.status === 12">
                  <van-icon class="icon" name="exchange"></van-icon>
                </span>
                <span v-else-if="item.status === 2">
                  <van-icon class="icon" name="certificate"></van-icon>
                </span>
                <span v-else>
                  <van-icon class="icon active" name="close"></van-icon>
                </span>
                <span v-if="item.status === 0">待转账</span>
                <span v-else-if="item.status === 1">已确认转账</span>
                <span v-else-if="item.status === 11">等待承兑商释放USDT</span>
                <span v-else-if="item.status === 12">承兑商已经释放USDT</span>
                <span v-else-if="item.status === 30" class="active">取消</span>
                <span v-else-if="item.status === 2">完成</span>
                <span v-else>交易未知</span>
              </div>
              <div @click="item_pass(index)">
                <a>详情</a>
              </div>
            </div>
          </div>
        </md-bill>
      </div>
      <!--订单详情-->
      <div class="md-example-child md-example-child-bill-1" v-if="item.side === 'sell'">
        <md-bill
          :title="'卖出 ' + item.otc_pair.asset.symbol"
          :no="item.created.substring(0, 10) + ' ' + item.created.substring(11, 19)"
          water-mark="Bit-OX">
          <md-detail-item title="数量">
            <span>{{item.asset_amount}} </span>{{item.otc_pair.asset.symbol}}
          </md-detail-item>
          <md-detail-item title="价格">
            <span v-if="!item.usdt_price">- -</span><span v-else>{{Math.floor(item.usdt_price * 1000) / 1000}}</span>CNY/{{item.otc_pair.asset.symbol}}
          </md-detail-item>
          <md-detail-item title="总价">
            <div><span>{{Math.round(item.asset_amount * item.usdt_price * 100) / 100}}</span>CNY</div>
          </md-detail-item>
          <div class="footer-slot" slot="footer">
            <!--进度条-->
            <div class="loding" v-if="item.status === 0"><van-progress :percentage="0" /></div>
            <div class="loding" v-else-if="item.status === 1"><van-progress :percentage="25" /></div>
            <div class="loding" v-else-if="item.status === 21 || item.status === 22"><van-progress :percentage="50" /></div>
            <div class="loding" v-else-if="item.status === 23 || item.status === 24"><van-progress :percentage="75" /></div>
            <div class="loding" v-else-if="item.status === 2"><van-progress :percentage="100" /></div>
            <div class="loding" v-else><van-progress :percentage="0" /></div>
            <!--支付状态-->
            <div class="state">
              <div class="complete" :class="{active: item.transfer_state === 'fail' || item.state === 'pending'}">
                <!--icon-->
                <span v-if="item.status === 0">
                  <van-icon class="icon" name="clock-o"></van-icon>
                </span>
                <span v-else-if="item.status === 1">
                  <van-icon class="icon" name="cash-back-record"></van-icon>
                </span>
                <span v-else-if="item.status === 21 || item.status === 22 || item.status === 23 || item.status === 24">
                  <van-icon class="icon" name="exchange"></van-icon>
                </span>
                <span v-else-if="item.status === 2">
                  <van-icon class="icon" name="certificate"></van-icon>
                </span>
                <span v-else>
                  <van-icon class="icon active" name="close"></van-icon>
                </span>
                <span v-if="item.status === 0">待转账</span>
                <span v-else-if="item.status === 1">已确认转账</span>
                <span v-else-if="item.status === 21">已托管,等待承兑商转账</span>
                <span v-else-if="item.status === 22">承兑商已经转账</span>
                <span v-else-if="item.status === 23">等待用户确认转账</span>
                <span v-else-if="item.status === 24">用户已经确认转账</span>
                <span v-else-if="item.status === 30" class="active">取消</span>
                <span v-else-if="item.status === 2">完成</span>
                <span v-else>交易未知</span>
              </div>
              <div @click="item_pass(index)">
                <a>详情</a>
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
import { Icon, Progress, Toast, NavBar } from 'vant'
export default {
  data () {
    return {
      value: 1,
      color: 'red',
      order: [],
      off: true
    }
  },
  methods: {
    // 传输
    item_pass (i) {
      this.off = false
      if (this.order[i].side === 'buy') {
        this.$router.push({
          name: 'otc_order',
          params: {
            id: this.order[i].id
          }
        })
      } else if (this.order[i].side === 'sell') {
        this.$router.push({
          name: 'otc_out',
          params: {
            id: this.order[i].id
          }
        })
      } else {
        Toast('数据不存在')
      }
    },
    Arrow () {
      this.$router.push({
        path: '/user'
      })
    },
    // 获取数据
    async getPair () {
      const { data } = await this.$api.otc.orders_lis()
      if (data.code === 200) {
        this.order = data.data
        await this.Setitem()
      } else {
        Toast('获取数据失败，请刷新页面')
      }
    },
    async Setitem () {
      this.order.forEach((i) => {
        // 下单时间
        let item = new Date(i.created)
        // 时间详细显示
        this.set_item_M = item.getFullYear() + '' + (item.getMonth() + 1) + item.getDate() + item.getHours() + item.getMinutes() + item.getSeconds() + item.getMilliseconds()
        // 时间下单时间
        this.set_item_F = item.getFullYear() + '/' + (item.getMonth() + 1) + '/' + item.getDate() + ' ' + item.getHours() + ':' + item.getMinutes()
        // 当前时间
        // eslint-disable-next-line camelcase
        let item_hours = item.getHours() > 9 ? item.getHours() : '0' + item.getHours()
        // eslint-disable-next-line camelcase
        let item_minutes = item.getMinutes() > 9 ? item.getMinutes() : '0' + item.getMinutes()
        // eslint-disable-next-line camelcase
        let item_date = item.getDate() > 9 ? item.getDate() : '0' + item.getDate()
        // eslint-disable-next-line camelcase
        let item_month = (item.getMonth() + 1) > 9 ? (item.getMonth() + 1) : '0' + (item.getMonth() + 1)
        // eslint-disable-next-line camelcase
        let set = item.getFullYear() + '' + item_month + item_date + item_hours + item_minutes
        // 本地时间
        let date = new Date()
        // eslint-disable-next-line camelcase
        let itemSet_hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
        // eslint-disable-next-line camelcase
        let itemSet_minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
        // eslint-disable-next-line camelcase
        let itemSet_date = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        // eslint-disable-next-line camelcase
        let itemSet_month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
        // eslint-disable-next-line camelcase
        let itemSet = date.getFullYear() + '' + itemSet_month + itemSet_date + itemSet_hours + itemSet_minutes
        if ((itemSet - set) <= 3) {
        } else {
          this.$api.otc.orders_patch(i.id, { op_type: 'user_cancel_order' })
        }
      })
    }
  },
  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    [Bill.name]: Bill,
    [Tag.name]: Tag,
    [NavBar.name]: NavBar
  },
  async mounted () {
    await this.getPair()
  },
  destroyed () {
    if (this.off) {
      this.$router.push({
        path: '/user'
      })
    }
  }
}
</script>

<style lang="less">
  .otc_details{
    font-size: 18px;
    /*标题头部*/
    .head{
      /*text-align: center;*/
      /*line-height: 80px;*/
      /*font-size: 19px;*/
      /*!*返回箭头*!*/
      /*.left_arrow{*/
      /*  position: absolute;*/
      /*  left: 10%;*/
      /*  font-size: 20px;*/
      /*}*/
      margin: 10px 0;
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
              a{
                color: #00BFFF;
              }
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
