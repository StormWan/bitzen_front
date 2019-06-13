<template>
    <div class="bb_order">
      <div class="title">
        <div v-for="(item,index) in title" :key="index" @click="title_data(index)">{{item.title}}</div>
      </div>
      <div class="BG" v-for="(item,index) in lists" :key="index">
        <!--订单详情-->
        <div class="md-example-child md-example-child-bill-1" v-if="item.side === 'buy'">
          <md-bill
            :title="item.pair.pair + ' 买入'"
            :no="item.created.substring(0, 10) + ' ' + item.created.substring(11, 19)"
            water-mark="Bit-OX">
            <md-detail-item title="委托数量">
              <span>{{Math.floor(item.pay_amount * 100) /100}} </span>{{item.pay_asset.symbol}}
            </md-detail-item>
            <md-detail-item title="平均成交价">
              <span v-if="!item.price">- -</span><span v-else>{{(Math.floor(item.price * 100) / 100).toFixed(3)}}</span>{{item.pair.pair}}
            </md-detail-item>
            <md-detail-item title="服务费">
              <div v-if="!item.exchangeinstantordermodel.fee_cost"><span>- -</span></div>
              <div v-else><span>{{item.exchangeinstantordermodel.fee_cost}}</span>EPC</div>
            </md-detail-item>
            <md-detail-item title="实际到账">
              <span v-if="!item.exchangeinstantordermodel.cost">--</span><span v-else>{{item.exchangeinstantordermodel.cost}} </span> {{item.pair.base.symbol}}
            </md-detail-item>
            <div class="footer-slot" slot="footer">
              <!--支付状态-->
              <div class="state">
                <div class="complete" :class="{active: item.transfer_state === 'fail' || item.state === 'pending'}">
                  <!--icon-->
                  <span v-if="item.state && item.state === 'paid' && item.exchange_state !== 'closed'">
                    <van-icon class="icon" name="passed"></van-icon>
                  </span>
                  <span v-else-if="item.exchange_state && item.exchange_state === 'closed' && item.transfer_state !== 'completed' && item.transfer_state !== 'fail'">
                    <van-icon class="icon" name="passed"></van-icon>
                  </span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'completed'">
                    <van-icon class="icon" name="passed"></van-icon>
                  </span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'fail'">
                    <van-icon class="icon" name="close"></van-icon>
                  </span>
                  <span v-else>
                    <van-icon class="icon" name="close"></van-icon>
                  </span>
                  <span v-if="item.state && item.state === 'paid' && item.exchange_state !== 'closed'">已支付</span>
                  <span v-else-if="item.exchange_state && item.exchange_state === 'closed' && item.transfer_state !== 'completed' && item.transfer_state !== 'fail'">兑换完毕</span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'completed'">已完成</span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'fail'">支付失败</span>
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
            :title="item.pair.pair + ' 卖出'"
            :no="item.created.substring(0, 10) + ' ' + item.created.substring(11, 19)"
            water-mark="Bit-OX">
            <md-detail-item title="委托数量">
              <span>{{Math.floor(item.pay_amount * 100) /100}} </span>{{item.pay_asset.symbol}}
            </md-detail-item>
            <md-detail-item title="平均成交价">
              <span v-if="!item.price">- -</span><span v-else>{{(Math.floor(item.price * 100) / 100).toFixed(3)}}</span>{{item.pair.pair}}
            </md-detail-item>
            <md-detail-item title="服务费">
              <div v-if="!item.exchangeinstantordermodel.fee_cost"><span>- -</span></div>
              <div v-else><span>{{item.exchangeinstantordermodel.fee_cost}}</span>EPC</div>
            </md-detail-item>
            <md-detail-item title="实际到账">
              <span v-if="!item.exchangeinstantordermodel.cost">--</span><span v-else>{{item.exchangeinstantordermodel.cost}} </span> {{item.pair.base.symbol}}
            </md-detail-item>
            <div class="footer-slot" slot="footer">
              <!--支付状态-->
              <div class="state">
                <div class="complete" :class="{active: item.transfer_state === 'fail' || item.state === 'pending'}">
                  <!--icon-->
                  <span v-if="item.state && item.state === 'paid' && item.exchange_state !== 'closed'">
                    <van-icon class="icon" name="passed"></van-icon>
                  </span>
                  <span v-else-if="item.exchange_state && item.exchange_state === 'closed' && item.transfer_state !== 'completed' && item.transfer_state !== 'fail'">
                    <van-icon class="icon" name="passed"></van-icon>
                  </span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'completed'">
                    <van-icon class="icon" name="passed"></van-icon>
                  </span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'fail'">
                    <van-icon class="icon" name="close"></van-icon>
                  </span>
                  <span v-else>
                    <van-icon class="icon" name="close"></van-icon>
                  </span>
                  <span v-if="item.state && item.state === 'paid' && item.exchange_state !== 'closed'">已支付</span>
                  <span v-else-if="item.exchange_state && item.exchange_state === 'closed' && item.transfer_state !== 'completed' && item.transfer_state !== 'fail'">兑换完毕</span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'completed'">已完成</span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'fail'">支付失败</span>
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
      data_sta: [],
      order_index: Number,
      title: [
        {
          title: '交易完成'
        },
        {
          title: '进行中'
        },
        {
          title: '交易失败'
        }
      ],
      title_suo: ''
    }
  },
  methods: {
    // 传输
    item_pass (i) {
      // 纯时间
      let date = new Date(this.order[i].created)
      let result, year, month, day
      year = date.getYear() + 1900
      month = date.getMonth() + 1
      day = date.getDate()
      result = year.toString() + (month > 9 ? month : '0' + month) + (day > 9 ? day : '0' + day)
      // eslint-disable-next-line camelcase
      let obj_data = {
        item: result + this.order[i].created.substring(11, 13) + this.order[i].created.substring(14, 16) + this.order[i].created.substring(17, 19) + this.order[i].created.substring(20, 26),
        item_pow: this.order[i].created.substring(0, 10) + ' ' + this.order[i].created.substring(11, 19),
        price: this.order[i].price,
        side: this.order[i].side,
        pay_amount: this.order[i].pay_amount,
        pair: this.order[i].pair.pair,
        symbol: this.order[i].pair.base.symbol,
        pay_asset: this.order[i].pay_asset.symbol,
        pair_price: this.order[i].exchangeinstantordermodel.cost,
        state: this.order[i].state,
        exchange_state: this.order[i].exchange_state,
        transfer_state: this.order[i].transfer_state
      }
      localStorage.setItem('obj_data', JSON.stringify(obj_data))
      this.$router.push({
        path: '/details'
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取数据
    async getPair (id) {
      const { data } = await this.$api.bb.orders()
      if (data.code === 200) {
        this.order = data.data
      } else {
        Toast('获取数据失败，请刷新页面')
      }
    },
    title_data (e) {
      if (e === 0) {
        // 已完成
        this.title_suo = 'completed'
      } else if (e === 1) {
        // 进行中
        this.title_suo = 'closed'
      } else {
        // 失败
        this.title_suo = 'fail'
      }
    }
  },
  computed: {
    lists: function () {
      let that = this
      let arrByZM = []
      for (let i = 0; i < that.order.length; i++) {
        if (that.order[i].transfer_state.search(that.title_suo) !== -1 || that.order[i].state.search(that.title_suo) !== -1) {
          arrByZM.push(that.order[i])
        }
      }
      return arrByZM
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
    await this.getPair(1)
  }
}
</script>

<style lang="less">
  .bb_order{
    font-size: 18px;
    .title{
      display: flex;
      justify-content: space-around;
      margin: 20px 0;
      font-size: 16px;
      color: green;
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
            padding: 5px 0;
            color: #858B9C;
            font-size: 16px;
            line-height: 1.5;
            border-top: solid 1px #E1E4EB;
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
