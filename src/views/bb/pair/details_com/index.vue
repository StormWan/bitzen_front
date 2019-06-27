<template>
  <div class="details_box">
    <!--        标题-->
    <div class="details_title">
      <div>数量</div>
      <div>(买家)出价</div>
      <div>(卖家)出价</div>
      <div>数量</div>
    </div>
    <!--        数据-->
    <div class="details_data">
      <div>
        <div class="sell" v-for="(item,index) in sell" :key="index">
          <div v-if="!item[0]">- -</div>
          <div v-else>{{item[1].toFixed(2)}}</div>
          <div v-if="!item[1]">- -</div>
          <div v-else>{{item[0].toFixed(4)}}</div>
        </div>
      </div>
      <div>
        <div v-for="(item,index) in buy" :key="index" class="buy">
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
export default {
  name: 'index',
  props: [
    'sell',
    'buy'
  ]
}
</script>

<style scoped lang="less">
  /*详情*/
  .details_box {
    width: 92%;
    margin: 0 auto;
    text-align: center;
    .details_title {
      font-size: 13px;
      display: flex;
      line-height: 48px;
      color: #999;
      div {
        width: 25%;
      }
    }
    .details_data {
      display: flex;
      font-size: 12px;
      color: #999;
      div{
        width: 50%;
        padding: 3px 0;
      }

      /*div:nth-child(4){*/
      /*  color: #FF6347;*/
      /*}*/
      .buy{
        display: flex;
        width: 100%;
        div:nth-child(1){
          color: #FF6347;
        }
      }
      .sell{
        display: flex;
        width: 100%;
        div:nth-child(2){
          color: #228B22;
        }
      }
    }
  }
</style>
