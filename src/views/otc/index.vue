<template>
  <div class="Legal_currency">
    <div class="header"> 法 币 </div>
    <!--趋势-->
    <div class="div" v-for="(Mala,index) in Market_label" :key="index" @click="text_click(index)">
      <!--名称-->
      <div class="Market">
        <div class="img">
          <img src="../../assets/cat_top.jpg" alt="">
        </div>
        <div class="title">{{Mala.market}}</div>
      </div>
      <!--价格-->
      <div class="Price_icon">
        <p class="Price">
          <span class="Price_box">{{Mala.Price}}</span>
          <span class="name">CNY</span>
        </p>
        <p class="icon">
          <span class="icon_fire">
            <van-icon name="fire" color="#00BFFF" />
          </span>
          <span class="name">{{Mala.market}}/{{Mala.currency}}</span>
        </p>
      </div>
      <!--按钮-->
      <div class="Fall_rise">
        交易
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Icon } from 'vant'
export default {
  data () {
    return {
      // 行情标签涨幅
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
        },
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
        },
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
      // 行情跌幅
      Decline: [
        {
          market: 'DGD',
          currency: 'BTC',
          Price: 0.005803,
          Fall_rise: '-15.46%'
        },
        {
          market: 'ZEN',
          currency: 'BTC',
          Price: 0.001748,
          Fall_rise: '-15.46%'
        },
        {
          market: 'MFT',
          currency: 'BTC',
          Price: 0.0000054,
          Fall_rise: '-15.46%'
        },
        {
          market: 'TRX',
          currency: 'BTC',
          Price: 0.00000420,
          Fall_rise: '-15.46%'
        },
        {
          market: 'CVC',
          currency: 'BTC',
          Price: 0.00001234,
          Fall_rise: '-15.46%'
        },
        {
          market: 'DGD',
          currency: 'BTC',
          Price: 0.005803,
          Fall_rise: '-15.46%'
        },
        {
          market: 'ZEN',
          currency: 'BTC',
          Price: 0.001748,
          Fall_rise: '-15.46%'
        },
        {
          market: 'MFT',
          currency: 'BTC',
          Price: 0.0000054,
          Fall_rise: '-15.46%'
        },
        {
          market: 'TRX',
          currency: 'BTC',
          Price: 0.00000420,
          Fall_rise: '-15.46%'
        },
        {
          market: 'CVC',
          currency: 'BTC',
          Price: 0.00001234,
          Fall_rise: '-15.46%'
        },
        {
          market: 'DGD',
          currency: 'BTC',
          Price: 0.005803,
          Fall_rise: '-15.46%'
        },
        {
          market: 'ZEN',
          currency: 'BTC',
          Price: 0.001748,
          Fall_rise: '-15.46%'
        },
        {
          market: 'MFT',
          currency: 'BTC',
          Price: 0.0000054,
          Fall_rise: '-15.46%'
        },
        {
          market: 'TRX',
          currency: 'BTC',
          Price: 0.00000420,
          Fall_rise: '-15.46%'
        },
        {
          market: 'CVC',
          currency: 'BTC',
          Price: 0.00001234,
          Fall_rise: '-15.46%'
        },
        {
          market: 'DGD',
          currency: 'BTC',
          Price: 0.005803,
          Fall_rise: '-15.46%'
        },
        {
          market: 'ZEN',
          currency: 'BTC',
          Price: 0.001748,
          Fall_rise: '-15.46%'
        },
        {
          market: 'MFT',
          currency: 'BTC',
          Price: 0.0000054,
          Fall_rise: '-15.46%'
        },
        {
          market: 'TRX',
          currency: 'BTC',
          Price: 0.00000420,
          Fall_rise: '-15.46%'
        },
        {
          market: 'CVC',
          currency: 'BTC',
          Price: 0.00001234,
          Fall_rise: '-15.46%'
        }
      ]
    }
  },
  async mounted () {
    this.setActiveTab(2)
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    }),
    text_click (e) {
      localStorage.setItem('Send_out', JSON.stringify(this.Market_label[e]))
      this.$router.push({
        path: '/transaction'
      })
    }
  },
  components: {
    [Icon.name]: Icon
  },
  // router-link触发
  activated () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="less">
  /*底部改变*/
  .md-icon.icon-font.md{
    font-size: 16px;
  }
  /*菜单栏*/
  .Legal_currency{
    margin-bottom: 43px;
    height: 100%;
    .header{
      background-color: #87CEFA;
      text-align: center;
      font-size: 18px;
      line-height: 53px;
      -webkit-border-radius: 0 0 40px 40px;
      -moz-border-radius: 0 0 40px 40px;
      border-radius: 0 0 40px 40px;
      color: #696969;
    }
    /*行情标签*/
        .div{
          width: 90%;
          margin: 15px auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 10px;
          color: #000;
          font-size: 13px;
          /*box-shadow: 2px 1px 7px #000;*/
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
          -moz-box-shadow:0 0 3px red,1px 1px 3px 3px yellow,2px 2px 4px 3px green;
          -webkit-box-shadow:0 0 3px red,1px 1px 3px 3px yellow,2px 2px 4px 3px green;
          box-shadow:0 0 3px red,1px 1px 3px 3px yellow,2px 2px 4px 3px green;
          div{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-weight: 500;
          }
          /*名称*/
          .Market{
            display: flex;
            align-items: center;
            .img{
              width: 35px;
              height: 35px;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .title{
              font-size: 15px;
              color: #708090;
              padding-left: 15px;
            }
          }
          /*价格*/
          .Price_icon{
            font-size: 14px;
            /*价格详情*/
            .Price{
              margin-bottom: 5px;
              .Price_box{
                color: #FF4500;
                font-size: 18px;
              }
              .name{
                font-size: 12px;
                color: #999;
                margin-left: 8px;
              }
            }
            /*币币名称图标*/
            .icon{
              font-size: 15px;
              text-align: right;
              .icon_fire{
                font-size: 15px;
              }
              .name{
                font-size: 12px;
                color: #ccc;
                margin-left: 10px;
              }
            }
          }
          /*交易按钮*/
          .Fall_rise{
            background-color: #00BFFF;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            color: white;
            padding: 10px 18px;
            font-size: 12px;
          }
        }
  }
</style>
