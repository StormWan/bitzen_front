<template>
    <div class="About_us">
      <div class="title">
        <van-nav-bar
          title="关于我们"
          left-text="返回"
          left-arrow
          @click-left="Arrow"
        />
      </div>
      <div class="img_top">
        <img src="../../../../assets/about_left.jpg" alt="">
      </div>
      <div class="img_bot">
        <img src="../../../../assets/about_right.jpg" alt="">
      </div>
    </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'index',
  methods: {
    Arrow () {
      this.$router.go(-1)
    }
  },
  components: {
    [NavBar.name]: NavBar
  }
}
</script>

<style scoped lang="less">
  .About_us{
    font-size: 15px;
    .img_top{
      padding: 0 18px;
      img{
        width: 100%;
      }
    }
    .img_bot{
      padding: 0 18px;
      img{
        width: 100%;
      }
    }
  }
</style>
