<template>
  <div class="home">
    <!--头部轮播图-->
    <div class="md-example-child md-example-child-swiper md-example-child-swiper-2">
      <md-swiper
        @before-change="beforeChange"
        @after-change="afterChange"
        :autoplay="2000"
        transition="fade"
        ref="swiper">
        <md-swiper-item :key="$index" v-for="(item, $index) in simple">
          <span href="javascript:void(0)"
             class="banner-item"
             :style="{'background': `${item.color}`}">{{item.text}}</span>
        </md-swiper-item>
      </md-swiper>
    </div>

    <!--    行情轮播-->
    <div class="md-example-child md-example-child-swiper md-example-child-swiper-3">
      <md-swiper
        @before-change="beforeChange"
        @after-change="afterChange"
        ref="swiper">
        <md-swiper-item :key="$index" v-for="(item, $index) in list">
          <ul>
            <li :key="$index1" v-for="(sub, $index1) in item">
              <a href="javascript:void(0)" class="banner-item">
                <p class="name">{{sub.market}}</p>
                <p class="Price">{{sub.Price}}</p>
                <p class="Quotation">{{sub.Fall_rise}}</p>
              </a>
            </li>
          </ul>
        </md-swiper-item>
      </md-swiper>
    </div>

    <!--公告-->
    <div class="Notice">
      <div class="icon_title">
        <span class="icon">
          <md-icon name="volumn" />
        </span>
        <span class="title md-example-child md-example-child-swiper md-example-child-swiper-1">
          <md-swiper
            @before-change="beforeChange"
            @after-change="afterChange"
            :default-index="1"
            :dragable="false"
            :autoplay="2000"
            transition="slideY">
            <md-swiper-item :key="$index" v-for="(item, $index) in simple">
              <span class="banner-item">{{item.text}}</span>
            </md-swiper-item>
          </md-swiper>
        </span>
      </div>
    </div>

    <!--工具栏-->
    <div class="toolbar">
      <div v-for="(toolbar,index) in toolbar" :key="index">
        <router-link :to="toolbar.path">
          <p class="icon">
            <md-icon :name='toolbar.icon_service'></md-icon>
          </p>
          <p>{{toolbar.name}}</p>
        </router-link>
      </div>
    </div>

    <!--邀请好友-->
    <div class="Invitation">
      <a href="">
        <img src="../../assets/cat.jpg">
      </a>
    </div>

    <!--行情标签-->
    <div class="Quotation">
      <van-tabs class="order-tabs" v-model="active" sticky>
        <van-tab v-for="(item,index) in title" :title="item.name" :key="index" @change="tab(index)">
          <div class="content">
            <div class="bg_color">
              <div>市场</div>
              <div>最新价</div>
              <div>24H涨跌</div>
            </div>
          </div>
          <!--涨幅榜-->
          <div v-if="index==0" class="rise">
            <div v-for="(item,index) in data" :key="index">
              <router-link :to="'/pair/' + item.id" v-if="item.rate.charAt(0) !== '-'">
                <div class="Market">
                  <span class="title">{{item.base.symbol}}</span>
                  /
                  <span class="currency">{{item.quote.symbol}}</span>
                </div>
                <div class="Price">
                  {{(Math.floor(item.price * 100) / 100).toFixed(4)}}
                </div>
                <div class="Fall_rise">
                  {{(Math.floor(item.rate * 100) / 100).toFixed(5)}}
                </div>
              </router-link>
            </div>
          </div>
          <!--跌幅榜-->
          <div v-if="index==1" class="rise">
            <div v-for="(item,index) in data" :key="index">
              <router-link :to="'/pair/' + item.id" v-if="item.rate.charAt(0) === '-'">
                <div class="Market">
                  <span class="title">{{item.base.symbol}}</span>
                  /
                  <span class="currency">{{item.quote.symbol}}</span>
                </div>
                <div class="Price">
                  {{(Math.floor(item.price * 100) / 100).toFixed(4)}}
                </div>
                <div class="fall">
                  {{(Math.floor(item.rate * 100) / 100).toFixed(5)}}
                </div>
              </router-link>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!--导航栏-->
      <div class="nav">

      </div>

      <!--显示内容-->
      <div></div>
    </div>

    <!--加载更多-->
    <div class="More">
      <router-link to="/bb">更多》</router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Swiper, SwiperItem, Icon } from 'mand-mobile'
import MdIcon from 'mand-mobile/components/icon/index'
import { Tab, Tabs, NoticeBar, Toast } from 'vant'

export default {
  data () {
    return {
      // 行情轮播
      list: [
        [
          {
            market: 'BNB / BTC',
            Price: 0.0034836,
            Fall_rise: '-6.52%'
          },
          {
            market: 'EOS / BTC',
            Price: 0.0034836,
            Fall_rise: '-6.52%'
          },
          {
            market: 'XRP / BTC',
            Price: 0.0034836,
            Fall_rise: '-6.52%'
          }
        ],
        [
          {
            market: 'EOS / BTC',
            Price: 0.0034836,
            Fall_rise: '-6.52%'
          },
          {
            market: 'BNB / BTC',
            Price: 0.0034836,
            Fall_rise: '-6.52%'
          },
          {
            market: 'XRP / BTC',
            Price: 0.0034836,
            Fall_rise: '-6.52%'
          }
        ]
      ],
      // 公告轮播
      simple: [
        {
          color: '#4390EE',
          text: '给时光以生命，给岁月以文明。'
        },
        {
          color: '#364d79',
          text: '你的无畏来源于无知。'
        },
        {
          color: '#CA4040',
          text: 'FADT 几天预告会涨幅'
        }
      ],
      current_bav: 1,
      // 工具栏
      toolbar: [
        {
          name: '帮助',
          path: '/common',
          icon_service: 'service'
        },
        {
          name: '自选',
          path: '/bb',
          icon_service: 'motor-vehicle'
        },
        {
          name: '充值',
          path: '/wallet',
          icon_service: 'security'
        },
        {
          name: '提现',
          path: '/wallet',
          icon_service: 'rmb'
        }
      ],
      // 行情标签
      title: [
        {
          name: '涨幅榜'
        },
        {
          name: '跌幅榜'
        }
      ],
      // 涨幅榜
      Market_label: [
        {
          market: 'DGD',
          currency: 'BTC',
          Price: 0.005803,
          Fall_rise: '+15.46%'
        },
        {
          market: 'ZEN',
          currency: 'BTC',
          Price: 0.001748,
          Fall_rise: '+15.46%'
        },
        {
          market: 'MFT',
          currency: 'BTC',
          Price: 0.0000054,
          Fall_rise: '+15.46%'
        }
      ],
      // 跌幅榜
      fall: [
        {
          market: 'DGD',
          currency: 'BTC',
          Price: 0.005803,
          Fall_rise: '- 15.46%'
        },
        {
          market: 'ZEN',
          currency: 'BTC',
          Price: 0.001748,
          Fall_rise: '- 15.46%'
        },
        {
          market: 'MFT',
          currency: 'BTC',
          Price: 0.0000054,
          Fall_rise: '- 15.46%'
        },
        {
          market: 'TRX',
          currency: 'BTC',
          Price: 0.00000420,
          Fall_rise: '- 15.46%'
        },
        {
          market: 'CVC',
          currency: 'BTC',
          Price: 0.00001234,
          Fall_rise: '- 15.46%'
        }
      ],
      active: 0,
      // 数据
      data: []
    }
  },
  components: {
    MdIcon,
    // 轮播
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NoticeBar.name]: NoticeBar
  },
  async mounted () {
    this.setActiveTab(1)
    // 轮播
    window.triggerSwiper3 = () => {
      this.goto()
    }
    await this.getPairs()
  },
  methods: {
    // 获取数据
    async getPairs () {
      const { data } = await this.$api.bb.pairList()
      console.log(data.data)
      if (data.code === 200) {
        this.data = data.data
      } else {
        Toast('获取数据失败，请刷新')
      }
    },
    // 涨跌榜
    tab (i) {
      console.log(i)
    },
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    }),
    setValue (id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    },
    // 轮播前移
    beforeChange (from, to) {
      this.setValue('#valueSwiper10', from)
      this.setValue('#valueSwiper11', to)
      this.setValue('#valueSwiper5', from)
      this.setValue('#valueSwiper6', to)
    },
    // 轮播后移
    afterChange (from, to) {
      this.setValue('#valueSwiper12', from)
      this.setValue('#valueSwiper13', to)
      this.setValue('#valueSwiper7', from)
      this.setValue('#valueSwiper8', to)
    },
    // 轮播跑动
    goto () {
      this.$refs.swiper.goto(2)
    }
  },
  // keep-alive 组件激活时调用
  activated () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="less">
  /*全部*/
  .home{
    padding-bottom: 50px;
    /*头部轮播图*/
    .md-example-child-swiper-2{
      width: 100%;
      height: 150px;
      .md-swiper-indicator{
        height: 1px;
        width: 10px;
      }
      .banner-item{
        float: left;
        width: 100%;
        height: 100%;
        line-height: 150px;
        text-align: center;
        font-size: 14px;
        color: #FFF;
        box-align: center;
        align-items: center;
        box-pack: center;
        justify-content: center;
        -webkit-background-size: 100%;
        background-size: 100%;
      }
    }
    /*行情轮播*/
    .md-example-child-swiper-3{
      height: 60px;
      margin: 5px 0;
      .md-swiper-indicator{
        height: 1px;
        width: 0px;
      }
      ul{
        display: flex;
        justify-content: space-around;
        li{
          height: 62px;
          width: 100%;
          .banner-item{
            float: left;
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 14px;
            box-align: center;
            align-items: center;
            box-pack: center;
            justify-content: center;
            p{
              padding-top: 5px;
            }
            .name{
              font-size: 11px;
              color: #191970;
            }
            .Price{
              font-size: 15px;
              color: #BA55D3;
            }
            .Quotation{
              font-size: 10px;
              color: #BA55D3;
            }
          }
        }
        li:nth-child(2){
          border-left: 1px solid #999999;
          border-right: 1px solid #999999;
        }
      }
    }
    /*公告*/
    .Notice{
      font-size: 12px;
      border-top: 1px solid #999999;
      line-height: 35px;
      padding-left: 15px;
      padding-top: 5px;
      .icon_title{
        vertical-align: middle;
        span{
          display: inline-block;
          line-height: 35px;
        }
        .md-icon.icon-font.md{
          font-size: 18.5px;
          color: #191970;
        }
        .icon{
          margin-right: 8px;
          height: 23px;
        }
        .title{
          font-size: 12px;
          height: 23px;
          position: relative;
          width: 70%;
          color: #999999;
          .banner-item{
            font-size: 12px;
          }
        }
        .md-example-child,.md-example-child-swiper,.md-example-child-swiper-1{
          .md-swiper,md-swiper-vertical{
            position: relative;
          }
          .md-swiper-indicator{
            height: 0px;
            width: 0px;
          }
        }
      }
    }
    /*工具栏*/
    .toolbar{
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      a{
        color: #999999;
        text-align: center;
        .icon{
          padding: 4px 0;
        }
      }
    }
    /*邀请好友*/
    .Invitation{
      width: 85%;
      height: 70px;
      margin: 15px auto;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      border-radius: 15px;
      box-shadow: darkgrey 4px 4px 15px 2px;
      a{
        display: block;
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 100%;
          -webkit-border-radius: 15px;
          -moz-border-radius: 15px;
          border-radius: 15px;
        }
      }
    }
    /*行情标签*/
    .Quotation{
      /*表头*/
      .content{
        background-color: rgba(0,0,0,.05);
        /*margin-top: 10px;*/
        .bg_color{
          width: 82%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          line-height: 40px;
          div{
            font-size: 13px;
            color: #ccc;
          }
        }
      }
      /*涨幅榜*/
      .rise{
        width: 88%;
        margin: 0 auto;
        a{
          display: flex;
          justify-content: space-between;
          padding: 18px 0;
          border-bottom: 1px solid #e9e9e9;
          color: #000;
          align-items: center;
          div{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 500;
          }
          /*行情名字*/
          .Market{
            font-size: 15px;
            .title{
              font-size: 20px;
            }
          }
          .Fall_rise, .fall{
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            color: white;
            padding: 4px 5px;
            font-size: 12px;
          }
          /*涨*/
          .Fall_rise{
            background-color: green;
          }
          /*跌*/
          .fall{
            background-color: #DC143C;
          }
          .Price{
            font-size: 19px;
          }
        }
      }
    }
    .md-example-child-tabs{
      .content{
        font-size: 14px;
        background: #FFF;
        width: 80%;
        padding-top: 10px;
        margin: 0 auto;
        line-height: 1.5;
        box-sizing: border-box;
        .md-tabs-content{
          min-height: 100px;
          background: #FFF;
        }
      }
    }

    /*更多*/
    .More{
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      a{
        display: inline-block;
        width: 100%;
        color: #999;
      }
    }
  }
</style>
