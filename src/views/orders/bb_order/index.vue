<template>
    <div class="bb_order">
      <div class="title">
        <div v-for="(item,index) in orderTitle" :key="index" @click="changeProcessTab(index)" :class="{active: index === process_tab_index}">{{item.title}}</div>
      </div>
      <div class="BG" v-for="(item,index) in lists" :key="index">
        <!--买入订单详情-->
        <div class="md-example-child md-example-child-bill-1" v-if="item.side === 'buy'">
          <md-bill
            :title="item.pair.pair + ' 买入'"
            :no="item.created.substring(0, 10) + ' ' + item.created.substring(11, 19)"
            water-mark="BlockPay">
            <md-detail-item title="委托数量">
              <span>{{Math.floor(item.pay_amount * 100) /100}} </span>{{item.pay_asset.symbol}}
            </md-detail-item>
            <md-detail-item title="平均成交价">
              <span v-if="!item.exchangeinstantordermodel">- -</span><span v-else>{{Math.floor(item.exchangeinstantordermodel.average_price * 1000000) / 1000000}}</span>{{item.pair.pair}}
            </md-detail-item>
            <md-detail-item title="实际到账">
              <span v-if="!item.exchangeinstantordermodel">--</span><span v-else>{{Math.floor((item.exchangeinstantordermodel.filled - item.exchangeinstantordermodel.fee_cost - (item.pair.fee * (item.exchangeinstantordermodel.filled - item.exchangeinstantordermodel.fee_cost))) * 1000000) / 1000000}} </span> {{item.pair.base.symbol}}
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
                  <span v-if="item.state && item.state === 'paid' && !item.exchange_state">已支付</span>
                  <span v-else-if="item.exchange_state && item.exchange_state === 'pending' && item.transfer_state !== 'completed' && item.transfer_state !== 'fail'">未挂单</span>
                  <span v-else-if="item.exchange_state && item.exchange_state === 'open' && item.transfer_state !== 'completed' && item.transfer_state !== 'fail'">已持单</span>
                  <span v-else-if="item.exchange_state && item.exchange_state === 'closed' && item.transfer_state !== 'completed' && item.transfer_state !== 'fail'">兑换完毕</span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'completed'">已完成</span>
                  <span v-else-if="item.transfer_state && item.transfer_state === 'fail'">挂单失败</span>
                  <span v-else>交易未知</span>
                </div>
                <div @click="item_pass(index)">
                  <a>详情</a>
                </div>
              </div>
            </div>
          </md-bill>
        </div>
        <!--卖出订单详情-->
        <div class="md-example-child md-example-child-bill-1" v-if="item.side === 'sell'">
          <md-bill
            :title="item.pair.pair + ' 卖出'"
            :no="item.created.substring(0, 10) + ' ' + item.created.substring(11, 19)"
            water-mark="BlockPay">
            <md-detail-item title="委托数量">
              <span>{{Math.floor(item.pay_amount * 100) /100}} </span>{{item.pay_asset.symbol}}
            </md-detail-item>
            <md-detail-item title="平均成交价">
              <span v-if="!item.exchangeinstantordermodel">- -</span><span v-else>{{Math.floor(item.exchangeinstantordermodel.average_price * 10000) / 10000}}</span>{{item.pair.pair}}
            </md-detail-item>
            <md-detail-item title="实际到账">
              <span v-if="!item.exchangeinstantordermodel">--</span><span v-else>{{Math.floor((item.exchangeinstantordermodel.cost - item.exchangeinstantordermodel.fee_cost - (item.pair.fee * (item.exchangeinstantordermodel.cost - item.exchangeinstantordermodel.fee_cost))) * 100000) / 100000}} </span> {{item.pair.quote.symbol}}
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
                  <span v-else-if="item.transfer_state && item.transfer_state === 'fail'">挂单失败</span>
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
      <!--加载数据loading图-->
      <div class="load" v-if="ifLoading"><van-loading type="spinner" /></div>
      <div class="bottom" v-else>{{bottomTips}}</div>
    </div>
</template>

<script>
import { Field, DetailItem, Tag, Bill } from 'mand-mobile'
import { Icon, Progress, Toast, NavBar, Loading } from 'vant'
export default {
  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    [Bill.name]: Bill,
    [Tag.name]: Tag,
    [NavBar.name]: NavBar,
    [Loading.name]: Loading
  },
  mounted () {
    this.getPair()
    // 滚轮事件监听
    window.addEventListener('scroll', this.handleScroll, true)
  },
  data () {
    return {
      orderData: [], // 获取后台传过来的数据
      orderTitle: [
        {
          title: '进行中'
        },
        {
          title: '交易完成'
        },
        {
          title: '交易失败'
        }
      ],
      processTab: 'paid',
      process_tab_index: 0,
      dataLimit: 10,
      offset: 0,
      // state: '=paid',
      transfer_state: '!==completed',
      scr_off: true,
      // 加载数据loading图
      bottomTips: '',
      ifLoading: true
    }
  },
  methods: {
    // 点击详情按钮跳转链接
    item_pass: function (i) {
      this.$router.push({
        name: 'details',
        params: {
          id: this.lists[i].id - 1
        }
      })
    },
    // 点击返回上一页
    onClickLeft () {
      this.$router.go(-1)
    },
    // 获取数据
    async getPair () {
      this.ifLoading = true
      const { data } = await this.$api.bb.orders()
      if (data) {
        this.bottomTips = '- - - - - - - 到底了 - - - - - - -'
        if (data.code === 200) {
          console.log(data.data)
          this.orderData = data.data
          this.checkDataLength()
        } else {
          Toast('获取数据失败，请刷新页面')
        }
      } else {
        this.bottomTips = '- - - - - - - 请检查网络 - - - - - - -'
        Toast('网络链接失败')
      }
    },
    // 如果追加数据长度不到10条，停止请求
    checkDataLength () {
      if (this.dataLimit > this.orderData.length) {
        this.scr_off = false
        this.ifLoading = false
        this.bottomTips = '- - - - - - - 到底了 - - - - - - -'
      } else {
        this.scr_off = true
        this.ifLoading = false
      }
    },
    // 滚轮到底触发数据(获取)追加
    async wheelAppendData () {
      const { data } = await this.$api.bb.orders()
      if (data) {
        this.bottomTips = '- - - - - - - 到底了 - - - - - - -'
        if (data.code === 200) {
          data.data.forEach((res) => {
            this.orderData.push(res)
          })
          this.checkDataLength()
        } else {
          Toast('获取数据失败，请刷新页面')
        }
      } else {
        this.bottomTips = '- - - - - - - 请检查网络 - - - - - - -'
        Toast('网络链接失败')
      }
    },
    // 导航栏状态筛选
    changeProcessTab (e) {
      this.process_tab_index = e
      if (e === 0) {
        // 进行中
        this.processTab = 'paid'
        this.transfer_state = '!==completed'
        this.dataLimit = 10
        this.offset = 0
        this.getPair()
      } else if (e === 1) {
        // 已完成
        this.processTab = 'completed'
        this.transfer_state = '=completed'
        this.dataLimit = 10
        this.offset = 0
        this.getPair()
      } else {
        // 失败
        this.processTab = 'fail'
        this.transfer_state = '=fail'
        this.dataLimit = 10
        this.offset = 0
        this.getPair()
      }
    },
    // 滚轮事件监听
    handleScroll () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if ((scrollHeight - (scrollTop + windowHeight)) <= 20 && this.scr_off) {
        this.scr_off = false
        this.ifLoading = true
        this.offset = this.dataLimit + 1
        this.dataLimit += 10
        this.wheelAppendData()
      }
    }
  },
  computed: {
    // 获取数据(渲染)页面
    lists: function () {
      let that = this
      let arrByZM = []
      for (let i = 0; i < that.orderData.length; i++) {
        if (that.orderData[i].transfer_state.search(that.processTab) !== -1 || (that.orderData[i].state.search(that.processTab) !== -1 && that.orderData[i].transfer_state !== 'completed' && that.orderData[i].transfer_state !== 'fail')) {
          arrByZM.push(that.orderData[i])
        }
      }
      return arrByZM
    }
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
      color: #999;
    }
    .active{
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
              padding: 3px 0;
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
            }.md-detail-item:nth-last-child(3){
               span{
                 color: #CD5C5C;
               }
             }
            .md-detail-item:nth-last-child(2){
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
    .load{
      margin-bottom: 70px;
      .van-loading{
        left: 50%;
        transform: translate(-50%,0);
      }
    }
    .bottom{
      margin-bottom: 70px;
      color: #999;
      text-align: center;
      font-size: 15px;
    }
  }
</style>
