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
        <md-swiper-item :key="$index" v-for="(item, $index) in mulit">
          <ul>
            <li :key="$index1" v-for="(sub, $index1) in item">
              <a href="javascript:void(0)" class="banner-item">
                <p class="name">{{sub.name}}</p>
                <p class="Price">{{sub.Price}}</p>
                <p class="Quotation">{{sub.Quotation}}</p>
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
              <span class="banner-item">{{item.Notice}}</span>
            </md-swiper-item>
          </md-swiper>
        </span>
      </div>
    </div>

    <!--工具栏-->
    <div class="toolbar">
      <div v-for="(toolbar,index) in toolbar" :key="index">
        <a href="">
          <p class="icon">
            <md-icon :name='toolbar.icon_service'></md-icon>
          </p>
          <p>{{toolbar.name}}</p>
        </a>
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
        <van-tab v-for="(item,index) in title" :title="item.name" :key="index">
          <div class="content">
            <div class="bg_color">
              <div>市场</div>
              <div>最新价</div>
              <div>24H涨跌</div>
            </div>
          </div>
          <!--涨幅榜-->
          <div v-if="index==0" class="rise">
            <a href="" v-for="(Mala,index) in Market_label" :key="index">
              <div class="Market">
                <span class="title">{{Mala.market}}</span>
                /
                <span class="currency">{{Mala.currency}}</span>
              </div>
              <div class="Price">
                {{Mala.Price}}
              </div>
              <div class="Fall_rise">
                {{Mala.Fall_rise}}
              </div>
            </a>
          </div>
          <!--跌幅榜-->
          <div v-if="index==1" class="rise">
            <a href="" v-for="(Mala,index) in fall" :key="index">
              <div class="Market">
                <span class="title">{{Mala.market}}</span>
                /
                <span class="currency">{{Mala.currency}}</span>
              </div>
              <div class="Price">
                {{Mala.Price}}
              </div>
              <div class="fall">
                {{Mala.Fall_rise}}
              </div>
            </a>
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
      <a href="">更多》</a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Swiper, SwiperItem, Icon } from 'mand-mobile'
import simple from 'mand-mobile/components/swiper/demo/data/simple'
import mulit from 'mand-mobile/components/swiper/demo/data/mulit-item'
import MdIcon from 'mand-mobile/components/icon/index'
import { Tab, Tabs } from 'vant'

export default {
  data () {
    return {
      simple,
      mulit,
      current_bav: 1,
      // 工具栏
      toolbar: [
        {
          name: '帮助',
          path: '',
          icon_service: 'service'
        },
        {
          name: '自选',
          path: '',
          icon_service: 'motor-vehicle'
        },
        {
          name: '充值',
          path: '',
          icon_service: 'security'
        },
        {
          name: '提现',
          path: '',
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
        },
        {
          market: 'TRX',
          currency: 'BTC',
          Price: 0.00000420,
          Fall_rise: '+15.46%'
        },
        {
          market: 'CVC',
          currency: 'BTC',
          Price: 0.00001234,
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
      active: 0
    }
  },
  components: {
    MdIcon,
    // 轮播
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  async mounted () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.setActiveTab(1)
    // 轮播
    window.triggerSwiper3 = () => {
      this.goto()
    }
  },
  methods: {
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
  }
}
</script>

<style lang="less">
  /*修改tab样式*/
  .order-tabs .van-ellipsis {
    font-size: 25px;
    font-weight: bold;
  }
  /*全部*/
  .home{
    padding-bottom: 103px;
    /*头部轮播图*/
    .md-example-child-swiper-2{
      width: 100%;
      height: 300px;
      .banner-item{
        float: left;
        width: 100%;
        height: 100%;
        line-height: 300px;
        text-align: center;
        font-size: 28px;
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
      height: 120px;
      margin: 10px 0;
      ul{
        display: flex;
        justify-content: space-around;
        li{
          height: 125px;
          width: 100%;
          .banner-item{
            float: left;
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 28px;
            box-align: center;
            align-items: center;
            box-pack: center;
            justify-content: center;
            p{
              padding-top: 10px;
            }
            .name{
              font-size: 22px;
              color: #191970;
            }
            .Price{
              font-size: 30px;
              color: #BA55D3;
            }
            .Quotation{
              font-size: 20px;
              color: #BA55D3;
            }
          }
        }
        li:nth-child(2){
          border-left: 2px solid #999999;
          border-right: 2px solid #999999;
        }
      }
    }
    /*公告*/
    .Notice{
      font-size: 25px;
      border-top: 1px solid #999999;
      line-height: 70px;
      padding-left: 30px;
      padding-top: 10px;
      overflow: hidden;
      .icon_title{
        vertical-align: middle;
        span{
          display: inline-block;
          line-height: 70px;
        }
        .md-icon.icon-font.md{
          font-size: 27px;
          color: #191970;
        }
        .icon{
          margin-right: 15px;
          height: 45px;
        }
        .title{
          font-size: 23px;
          height: 45px;
          position: relative;
          width: 70%;
          color: #999999;
          .banner-item{
            font-size: 23px;
          }
        }
        .md-example-child,.md-example-child-swiper,.md-example-child-swiper-1{
          .md-swiper,md-swiper-vertical{
            position: relative;
          }
          .md-swiper::after{
            content: '';
            display: inline-block;
            width:30px;
            height: 130%;
            background: white;
            position: absolute;
            right: 0;
            top: -5px;
          }
        }
      }
    }
    /*工具栏*/
    .toolbar{
      display: flex;
      justify-content: space-around;
      font-size: 28px;
      a{
        color: #999999;
        text-align: center;
        .icon{
          padding: 8px 0;
        }
      }
    }
    /*邀请好友*/
    .Invitation{
      width: 85%;
      height: 140px;
      margin: 30px auto;
      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;
      border-radius: 30px;
      box-shadow: darkgrey 8px 8px 30px 3px;
      a{
        display: block;
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 100%;
          -webkit-border-radius: 30px;
          -moz-border-radius: 30px;
          border-radius: 30px;
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
          line-height: 80px;
          div{
            font-size: 25px;
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
          padding: 15px 0;
          border-bottom: 1px solid #e9e9e9;
          color: #000;
          div{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 500;
          }
          /*行情名字*/
          .Market{
            font-size: 20px;
            .title{
              font-size: 28px;
            }
          }
          /*涨*/
          .Fall_rise{
            background-color: green;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            color: white;
            padding: 7px 10px;
            font-size: 24px;
          }
          /*跌*/
          .fall{
            background-color: #DC143C;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            color: white;
            padding: 7px 10px;
            font-size: 24px;
          }
          .Price{
            font-size: 30px;
          }
        }
      }
    }
    .md-example-child-tabs{
      .content{
        font-size: 28px;
        background: #FFF;
        width: 80%;
        padding-top: 20px;
        margin: 0 auto;
        line-height: 1.5;
        box-sizing: border-box;
        .md-tabs-content{
          min-height: 200px;
          background: #FFF;
        }
      }
    }

    /*更多*/
    .More{
      font-size: 28px;
      line-height: 70px;
      text-align: center;
      a{
        display: inline-block;
        width: 100%;
        color: #999;

      }
    }
  }
</style>
