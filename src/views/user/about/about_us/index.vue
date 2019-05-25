<template>
    <div class="About_us">
      <div class="title">关于我们</div>
      <div class="img_top">
        <img src="../../../../assets/about_left.jpg" alt="">
      </div>
      <div class="img_bot">
        <img src="../../../../assets/about_right.jpg" alt="">
      </div>
    </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="less">
  .About_us{
    font-size: 15px;
    .title{
      font-size: 22px;
      text-align: center;
      line-height: 80px;
    }
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
