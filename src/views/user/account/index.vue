<template>
    <div class="account">
      <!--标题-->
      <div class="bar">
        <van-nav-bar
          title="账号关联"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>
      <!--内容-->
      <div class="content">
        <div>
          <div class="img">
            <img :src="img" alt="">
          </div>
          <div>{{user_name}}</div>
        </div>
        <div>{{user_ID}}</div>
        <div>{{user_bind}}</div>
      </div>
    </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  data () {
    return {
      img: require('../../../assets/cat_top.jpg'),
      user_name: '',
      user_ID: '',
      user_bind: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  mounted () {
    console.log(localStorage.getItem('user_ID'))
    this.user_name = localStorage.getItem('user_name')
    this.user_ID = localStorage.getItem('user_ID')
    this.user_bind = '已授权'
  },
  components: {
    [NavBar.name]: NavBar
  }
}
</script>

<style scoped lang="less">
  .account{
    font-size: 16px;
    .van-nav-bar__arrow + .van-nav-bar__text ,.van-nav-bar .van-icon{
      color: #696969;
    }
    .content{
      padding: 15px 15px;
      background: rgba(0,0,0,.02);
      display: flex;
      justify-content: space-between;
      align-items: center;
      div:nth-child(1){
        display: flex;
        align-items: center;
        .img{
          width: 35px;
          height: 35px;
          padding-right: 5px;
          img{
            width: 100%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
