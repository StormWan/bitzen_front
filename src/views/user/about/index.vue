<template>
  <div class="about">
    <!--标题-->
    <div class="head">
      <!--箭头-->
      <div class="left_arrow" @click="Arrow">
        <van-icon class="icon" name="arrow-left"></van-icon>
      </div>
      <!--title表头-->
      <div class="title">关于</div>
    </div>
    <!--服务内容-->
    <div class="content" v-for="(item,index) in content" :key="index" >
      <router-link :to="item.path">
        <div class="title">{{item.title}}</div>
        <div class="right_arrow">
          <van-icon name="arrow"></van-icon>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  data () {
    return {
      content: [
        {
          title: '服务条框',
          path: '/clause'
        },
        {
          title: '隐私声明',
          path: '/statement'
        },
        {
          title: '费率标准',
          path: '/rate'
        },
        {
          title: '关于我们',
          path: '/about_us'
        },
        {
          title: '联系我们',
          path: '/contact'
        }
      ]
    }
  },
  methods: {
    Arrow () {
      this.$router.go(-1)
    }
  },
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style scoped lang="less">
  .about{
    height: 100%;
    width: 100%;
    font-size: 17px;
    /*标题头部*/
    .head{
      background-color: rgba(0,0,0,.02);
      position: relative;
      text-align: center;
      line-height: 80px;
      margin-bottom: 20px;
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
    /*服务内容*/
    .content{
      background-color: rgba(0,0,0,.02);
      padding: 12px 20px;
      border-bottom: 0.1px solid #ccc;
      a{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
          color: #696969;
        }
        .right_arrow{
          color: #ccc;
        }
      }
    }
  }
</style>
