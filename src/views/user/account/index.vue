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
    this.user_name = JSON.parse(localStorage.getItem('userInfo')).full_name
    this.user_ID = JSON.parse(localStorage.getItem('userInfo')).identity_num
    if (JSON.parse(localStorage.getItem('userInfo')).phone) {
      this.user_bind = '已授权'
    } else {
      this.user_bind = '未授权'
    }
  },
  components: {
    [NavBar.name]: NavBar
  }
}
</script>

<style scoped lang="less">
  .account{
    font-size: 16px;
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
