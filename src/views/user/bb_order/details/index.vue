<template>
  <div class="bb_order">
    <!--标题-->
    <div class="head">
      <!--箭头-->
      <div class="left_arrow" @click="Arrow">
        <van-icon class="icon" name="arrow-left"></van-icon>
      </div>
      <!--title表头-->
      <div class="title">USDT/BTC 卖出</div>
    </div>
    <div class="BG">
      <!--订单详情-->
      <div class="md-example-child md-example-child-detail-item md-example-child-detail-item-0">
        <md-field>
          <md-detail-item class="title" title="No.99414" content="2019/05/08 12:10" bold />
          <md-detail-item title="兑换价格" content="5782.645363 BTC/USDT" />
          <md-detail-item title="兑换数量" content="0.22 BTC" />
          <md-detail-item title="成交获得" content="1269.637636 USDT" />
        </md-field>
      </div>
      <!--进度条-->
      <div class="go_box">
        <div class="go">
          <van-steps direction="vertical" :active="active">
            <van-step>
              <h3>支付完成</h3>
            </van-step>
            <van-step>
              <h3>币币兑换成功</h3>
            </van-step>
            <van-step>
              <h3>完成</h3>
            </van-step>
          </van-steps>
        </div>
      </div>

      <!--说明-->
      <div class="Explain">如需帮助请联系Bit-OX客服，Mixin ID：37026545，微信：exin520</div>
    </div>
  </div>
</template>

<script>
import { Field, DetailItem } from 'mand-mobile'
import { Icon, Progress, Step, Steps } from 'vant'
export default {
  data () {
    return {
      active: 2
    }
  },
  methods: {
    Arrow () {
      this.$router.go(-1)
    }
  },
  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    [Step.name]: Step,
    [Steps.name]: Steps
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
    /*用户购买信息*/
    .BG{
      background: rgba(0,0,0,.02);
      /*订单详情*/
      .md-example-child-detail-item-0{
        font-size: 16px;
        padding: 15px 0;
        border-bottom: 5px solid rgba(0,0,0,.01);
        /*进度条*/
        .progress{
          padding: 15px 0;
        }
        .md-field{
          padding: 0 15px;
          margin: 0 15px;
          .md-detail-item{
            font-size: 16px;
          }
          .md-detail-item.is-bold{
            .md-detail-content{
              font-size: 14px;
            }
          }
        }
        .md-detail-item{
          padding: 0;
          line-height: 30px;
        }
        .title{
          .md-detail-title{

          }
        }
        .tit{
          .md-detail-title{
            color: red;
          }
        }
      }
    }
    /*进度条*/
    .go_box{
      width: 100%;
      background: white;
      padding: 40px 0;
      .go{
        width: 40%;
        margin: 0 auto;
        .van-step--vertical{
          padding: 25px 0;
          .van-step__circle-container > i{
            top: 30px;
          }
          .van-step__line{
            top: 30px;
          }
        }
      }
    }
    /*说明*/
    .Explain{
      color: #999999;
      font-size: 14px;
      text-align: justify;
      padding: 30px 30px;
      line-height: 20px;
    }
  }
</style>
