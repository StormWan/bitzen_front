<template>
  <div class="Legal_currency">
    <div class="header"> 法 币 </div>
    <!--趋势-->
    <a href="" v-for="(Mala,index) in Market_label" :key="index">
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
    </a>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Icon } from 'vant'
export default {
  data(){
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
    })
  },
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style scoped lang="less">
  /*菜单栏*/
  .Legal_currency{
    margin-bottom: 95px;
    height: 100%;
    .header{
      background-color: #87CEFA;
      text-align: center;
      font-size: 35px;
      line-height: 105px;
      -webkit-border-radius: 0 0 25px 25px;
      -moz-border-radius: 0 0 25px 25px;
      border-radius: 0 0 80px 80px;
      color: #696969;
    }
    /*行情标签*/
        a{
          width: 90%;
          margin: 30px auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 40px 20px;
          color: #000;
          font-size: 25px;
          /*box-shadow: 2px 1px 7px #000;*/
          -webkit-border-radius: 15px;
          -moz-border-radius: 15px;
          border-radius: 15px;
          -moz-box-shadow:0 0 10px red,2px 2px 10px 10px yellow,4px 4px 12px 12px green;
          -webkit-box-shadow:0 0 10px red,2px 2px 10px 10px yellow,4px 4px 12px 12px green;
          box-shadow:0 0 10px red,2px 2px 3px 3px yellow,4px 4px 3px 3px green;
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
              width: 70px;
              height: 70px;
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
              font-size: 30px;
              color: #708090;
              padding-left: 30px;
            }
          }
          /*价格*/
          .Price_icon{
            font-size: 28px;
            /*价格详情*/
            .Price{
              margin-bottom: 10px;
              .Price_box{
                color: #FF4500;
                font-size: 35px;
              }
              .name{
                font-size: 23px;
                color: #999;
                margin-left: 15px;
              }
            }
            /*币币名称图标*/
            .icon{
              font-size: 30px;
              text-align: right;
              .icon_fire{
                font-size: 30px;
              }
              .name{
                font-size: 21px;
                color: #ccc;
                margin-left: 20px;
              }
            }
          }
          /*交易按钮*/
          .Fall_rise{
            background-color: #00BFFF;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
            color: white;
            padding: 20px 35px;
            font-size: 24px;
          }
        }
  }
</style>
