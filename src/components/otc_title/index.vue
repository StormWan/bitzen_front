<template>
  <!--头部标题-->
  <div class="top">
    <!--返回-->
    <div class="Arrow" @click="Arrow">
      <van-icon name="arrow-left"></van-icon>
    </div>
    <div class="title">
          <span>
            <img :src="title_img" alt="">
          </span>
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  name: 'index',
  methods: {
    // 箭头点击回退一页
    Arrow () {
      this.$router.go(-1)
      localStorage.removeItem('Send_out')
    }
  },
  components: {
    [Icon.name]: Icon
  },
  props: [
    'title',
    'title_img'
  ]
}
</script>

<style scoped lang="less">
  /*头部标题*/
  .top{
    position: relative;
    text-align: center;
    /*箭头*/
    .Arrow{
      position: absolute;
      left: 7%;
      color: #696969;
      font-size: 20px;
      top: 50%;
      transform: translate(0,-50%);
    }
    /*产品标题*/
    .title{
      color: #999;
      font-size: 16px;
      padding: 13px 0;
      span{
        vertical-align: middle;
      }
      span:nth-child(1){
        display: inline-block;
        width: 20px;
        img{
          width: 100%;
        }
      }
      span:nth-child(2){
        margin: 0 4px;
        font-size: 15px;
      }
    }
  }
</style>
