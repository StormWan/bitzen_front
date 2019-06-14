<template>
  <div class="about">
    <!--标题-->
    <div class="head">
      <van-nav-bar
        title="关于"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
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
import { Icon, NavBar } from 'vant'
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
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  components: {
    [Icon.name]: Icon,
    [NavBar.name]: NavBar
  }
}
</script>

<style scoped lang="less">
  .about{
    height: 100%;
    width: 100%;
    font-size: 17px;
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
