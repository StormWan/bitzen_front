<template>
  <div class="otc_details">
    <div class="title">
      <div v-for="(item,index) in otcOrderTitle" :key="index" @click="changeProcessTab(index)"
           :class="{active: index === active_index}">{{item.title}}</div>
    </div>
    <div class="BG" v-for="(item,index) in lists" :key="index">
      <!--订单详情-->
      <div class="md-example-child md-example-child-bill-1" v-if="item.side === 'buy'">
        <md-bill
          :title="'买入 ' + item.otc_pair.asset.symbol"
          :no="item.created.substring(0, 10) + ' ' + item.created.substring(11, 19)"
          water-mark="BlockPay">
          <md-detail-item title="数量">
            <span>{{item.usdt_amount}} </span>{{item.otc_pair.asset.symbol}}
          </md-detail-item>
          <md-detail-item title="价格">
            <span v-if="!item.usdt_price">- -</span>
            <span v-else>{{Math.floor(item.usdt_price * 1000) / 1000}}</span>
            CNY/{{item.otc_pair.asset.symbol}}
          </md-detail-item>
          <md-detail-item title="总价">
            <div v-if="!item"><span>- -</span></div>
            <div v-else><span>{{item.currency_amount}}</span>CNY</div>
          </md-detail-item>
          <div class="footer-slot" slot="footer">
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
                <span v-else class="active">交易未知</span>
              </div>
              <div @click="toDetailsPage(index)">
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
          water-mark="BlockPay">
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
                <span v-else-if="item.status === 11">
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
                <span v-else-if="item.status === 11">已托管,等待承兑商转账</span>
                <span v-else-if="item.status === 21">已托管,等待承兑商转账</span>
                <span v-else-if="item.status === 22">承兑商已经转账</span>
                <span v-else-if="item.status === 23">等待用户确认转账</span>
                <span v-else-if="item.status === 24">用户已经确认转账</span>
                <span v-else-if="item.status === 30" class="active">取消</span>
                <span v-else-if="item.status === 2">完成</span>
                <span v-else class="active">交易未知</span>
              </div>
              <div @click="toDetailsPage(index)">
                <a>详情</a>
              </div>
            </div>
          </div>
        </md-bill>
      </div>
    </div>
    <div class="load" v-if="ifLoading"><van-loading type="spinner" /></div>
    <div class="bottom" v-else>{{bottomTips}}</div>
  </div>
</template>

<script>
import { Field, DetailItem, Tag, Bill } from 'mand-mobile'
import { Icon, Progress, Toast, NavBar, Loading } from 'vant'
export default {
  data () {
    return {
      value: 1,
      color: 'red',
      otcOrderData: [],
      off: true,
      otcOrderTitle: [
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
      title_suo: '',
      price: 30,
      active_index: 0,
      orderStatus: '20',
      handleScrollLimit: 10,
      offset: 0,
      scr_off: true,
      status: '',
      ifLoading: true,
      bottomTips: '',
      createTime: ''
    }
  },
  methods: {
    // 点击详情按钮跳转
    toDetailsPage (i) {
      this.off = false
      if (this.lists[i].side === 'buy') {
        this.$router.push({
          name: 'buy-detail',
          params: {
            id: this.lists[i].id
          }
        })
      } else if (this.lists[i].side === 'sell') {
        this.$router.push({
          name: 'sell-detail',
          params: {
            id: this.lists[i].id
          }
        })
      } else {
        Toast('数据不存在')
      }
    },
    // 点击导航栏(状态)筛选
    changeProcessTab (e) {
      this.active_index = e
      this.ifLoading = true
      this.scr_off = true
      this.handleScrollLimit = 10
      this.offset = 0
      if (e === 0) {
        // 已完成
        this.title_suo = ''
        this.price = 30
        this.orderStatus = '20'
        this.getPair()
      } else if (e === 1) {
        this.title_suo = '20'
        this.price = 30
        this.orderStatus = ''
        this.status = 2
        this.getPair_remove()
      } else {
        // 失败
        this.title_suo = '30'
        this.price = ''
        this.orderStatus = ''
        this.status = 30
        this.getPair_remove()
      }
    },
    // 获取数据
    async getPair () {
      const { data } = await this.$api.otc.orderList(`?limit=10&offset=${this.offset}`)
      this.ifLoading = false
      this.bottomTips = '- - - - - - - 到底了 - - - - - - -'
      if (data.code === 200) {
        this.otcOrderData = data.data
        await this.setTime()
      } else {
        Toast('获取数据失败，请刷新页面')
      }
    },
    // 获取取消状态的数据
    async getPair_remove () {
      const { data } = await this.$api.otc.orderList(`?status=${this.status}&limit=10&offset=${this.offset}`)
      this.ifLoading = false
      this.bottomTips = '- - - - - - - 到底了 - - - - - - -'
      if (data.code === 200) {
        this.otcOrderData = data.data
        await this.setTime()
      } else {
        Toast('获取数据失败，请刷新页面')
      }
    },
    // 滚轮事件
    handleScroll () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if ((scrollHeight - (scrollTop + windowHeight)) <= 20 && this.scr_off) {
        this.scr_off = false
        this.ifLoading = true
        this.offset = this.handleScrollLimit + 1
        this.handleScrollLimit += 10
        this.meet()
      }
    },
    // 滚轮到底部触发数据追加获取
    async meet () {
      this.scr_off = false
      if (this.active_index === 0) {
        const { data } = await this.$api.otc.orderList(`?limit=10&offset=${this.offset}`)
        if (data) {
          this.bottomTips = '- - - - - - - 到底了 - - - - - - -'
          if (data.code === 200) {
            data.data.forEach((res) => {
              this.otcOrderData.push(res)
            })
            this.scr_off = true
            this.me_ge()
          } else {
            Toast('获取数据失败，请刷新页面')
          }
        } else {
          this.bottomTips = '- - - - - - - 请检查网络 - - - - - - -'
          Toast('网络链接失败')
        }
      } else {
        const { data } = await this.$api.otc.orderList(`?status=${this.status}&limit=10&offset=${this.offset}`)
        if (data) {
          this.bottomTips = '- - - - - - - 到底了 - - - - - - -'
          if (data.code === 200) {
            data.data.forEach((res) => {
              this.otcOrderData.push(res)
            })
            this.scr_off = true
            this.me_ge()
          } else {
            Toast('获取数据失败，请刷新页面')
          }
        } else {
          this.bottomTips = '- - - - - - - 请检查网络 - - - - - - -'
          Toast('网络链接失败')
        }
      }
    },
    // 滚轮到底触发数据获取
    me_ge () {
      if (this.handleScrollLimit > this.otcOrderData.length) {
        this.scr_off = false
        this.ifLoading = false
        this.bottomTips = '- - - - - - - 到底了 - - - - - - -'
      } else {
        this.scr_off = true
        this.ifLoading = false
      }
    },
    // 下单时间倒计时(超过15分钟自动取消订单)
    setTime () {
      this.otcOrderData.forEach((i) => {
        // 下单时间
        this.createTime = new Date(i.created)
        if (this.checkTime <= 3) {
        } else {
          this.$api.otc.orderUpdate(i.id, { op_type: 'user_cancel_order' })
        }
      })
    }
  },
  computed: {
    // 获取到的数据在这里渲染到页面
    lists: function () {
      if (this.otcOrderData.length !== 0) {
        let that = this
        let arrByZM = []
        for (let i = 0; i < that.otcOrderData.length; i++) {
          let pan = that.otcOrderData[i].status.toString().length >= 2 ? that.otcOrderData[i].status.toString()
            : that.otcOrderData[i].status.toString() + '0'
          if (pan.search(that.title_suo) !== -1 && that.otcOrderData[i].status !== this.price && pan !== this.orderStatus) {
            arrByZM.push(that.otcOrderData[i])
          }
        }
        return arrByZM
      } return ''
    },
    /**
     * 检查下单时间情况
     * */
    checkTime () {
      let itemHours = this.createTime.getHours > 9 ? this.createTime.getHours : '0' + this.createTime.getHours
      let itemMinutes = this.createTime.getMinutes > 9 ? this.createTime.getMinutes : '0' + this.createTime.getMinutes
      let itemDate = this.createTime.getDate > 9 ? this.createTime.getDate : '0' + this.createTime.getDate
      let itemMonth = (this.createTime.getMonth + 1) > 9
        ? (this.createTime.getMonth + 1) : '0' + (this.createTime.getMonth + 1)
      let set = this.createTime.getFullYear + '' + itemMonth + itemDate + itemHours + itemMinutes
      // 本地时间
      let date = new Date()
      let itemSetHours = date.getHours > 9 ? date.getHours : '0' + date.getHours
      let itemSetMinutes = date.getMinutes > 9 ? date.getMinutes : '0' + date.getMinutes
      let itemSetDate = date.getDate > 9 ? date.getDate : '0' + date.getDate
      let itemSetMonth = (date.getMonth + 1) > 9 ? (date.getMonth + 1) : '0' + (date.getMonth + 1)
      let itemSet = date.getFullYear + '' + itemSetMonth + itemSetDate + itemSetHours + itemSetMinutes
      // 监听事件否过了下单期
      return itemSet - set
    }
  },
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
  async mounted () {
    await this.getPair()
    // 监听滚轮
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less">
  .otc_details{
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
    .load{
      margin-bottom: 25px;
      .van-loading{
        left: 50%;
        transform: translate(-50%,0);
        margin-bottom: 70px;
      }
    }
    .bottom{
      color: #999;
      text-align: center;
      font-size: 15px;
      margin-bottom: 70px;
    }
  }
</style>
