<template>
  <div class="details_box">
    <!--标题-->
    <van-row type="flex" justify="center">
      <van-col span="6" class="detail_title">数量</van-col>
      <van-col span="6" class="detail_title">（买家）出价</van-col>
      <van-col span="6" class="detail_title">（卖家）出价</van-col>
      <van-col span="6" class="detail_title">数量</van-col>
    </van-row>
    <!--        数据-->
    <div class="details_data">
      <!--      买家数据-->
      <div>
        <div class="buyerBid" v-for="(item,index) in buyerInfo" :key="index">
          <div v-if="!item[0]">- -</div>
          <div v-else>{{item[1].toFixed(2)}}</div>
          <div v-if="!item[1]">- -</div>
          <div v-else>{{item[0].toFixed(4)}}</div>
        </div>
      </div>
      <!--      卖家数据-->
      <div>
        <div v-for="(item,index) in sellerInfo" :key="index" class="sellerBid">
          <div v-if="!item[0]">- -</div>
          <div v-else>{{item[0].toFixed(4)}}</div>
          <div v-if="!item[1]">- -</div>
          <div v-else>{{item[1].toFixed(2)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, NavBar, Col } from 'vant'

export default {
  name: 'index',
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [NavBar.name]: NavBar
  },
  props: [
    'sellerInfo',
    'buyerInfo'
  ]
}
</script>

<style scoped lang="less">
  /*详情*/
  .details_box {
    width: 92%;
    margin: 0 auto;
    text-align: center;
    .detail_title{ // 标题
      font-size: 13px;
      color: #999;
      line-height: 48px;
    }
    .details_data { // 卖家买家出价数据
      display: flex;
      font-size: 12px;
      color: #999;
      div{
        width: 50%;
        padding: 3px 0;
      }
      .sellerBid{ // 卖家出价
        display: flex;
        width: 100%;
        div:nth-child(1){
          color: #FF6347;
        }
      }
      .buyerBid{ // 买家出价
        display: flex;
        width: 100%;
        div:nth-child(2){
          color: #228B22;
        }
      }
    }
  }
</style>
