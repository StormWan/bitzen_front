<template>
    <div class="contact">
      <div class="title">联系我们</div>
      <div class="text">
        <h5>亲爱的用户：</h5>
        <p class="tow">如您遇到问题，请先查看 <a href="">Bit-OX 常见问题</a>，看看您的问题是否已经得到了解答，若还是找不到你想要的，<a href="">请提交工单</a>。</p>
        <p class="tow">交流与账户无关的话题，请移步我们的社区：</p>
        <ul>
          <li>微信入群请添加客服账号：exin512；</li>
          <li>Mixin 入群请添加账号 Mixin ID：37026545；</li>
        </ul>
        <h5>感谢您对 Bit-OX 的支持！</h5>
        <p>Bit-OX 团队</p>
        <p>2018 年 11 月 23 日</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="less">
  .contact{
    font-size: 15px;
    .title{
      font-size: 22px;
      text-align: center;
      line-height: 80px;
    }
    .text{
      padding: 0 20px;
      p{
        margin-bottom: 20px;
        text-align: justify;
        color: rgba(0,0,0,.8);
      }
      .tow{
        text-indent: 2em;
      }
      h5{
        padding-bottom: 18px;
        font-weight: bold;
      }
      ul{
        text-align: justify;
        margin-left: 30px;
        margin-bottom: 20px;
        li{
          list-style-type: disc;
          font-size: 14px;
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
