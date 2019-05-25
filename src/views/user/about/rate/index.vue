<template>
    <div class="rate">
      <div class="title">费率标准</div>
      <div class="text">
        <h4>亲爱的用户：</h4>
        <p> 关于 Bit-OX 的相关费率标准，说明如下：</p>
        <h4>1、Bit-OX 的平台手续费</h4>
        <ul>
          <li>Bit-OX 平台手续费统一为 0.2%，服务费将从您的成交总额中扣除。若成交后获得比特币资产，则支付比特币交易手续费。</li>
          <li>Bit-OX 平台手续费优先使用点卡 EPC 余额扣除。</li>
        </ul>
        <h4>2、币币交易手续费</h4>
        <ul>
          <li>Bit-OX 平台的币币交易是直接调取交易所 API 完成真实成交，相关手续费是对应的交易所收取的，具体以交易所的公告为准。<a href="">《火币费率标准》</a>、<a href="">《Bigone费率标准》</a>。</li>
          <li>EPC 点卡不能抵扣交易所手续费。</li>
        </ul>
        <h4>3、提币手续费</h4>
        <p>Bit-OX 是基于 Mixin Network 开发的，用户从 Bit-OX 钱包提币去其他平台或钱包，所需要的手续费是根据网络拥堵程度通过算法自动调整的，收费率略高于正常的矿工费，较高的部分给予结点维护系统，具体的说明参见 Mixin 官方说明：<a
          href="">《为什么天然气费高，哪里检查燃气费》</a>。</p>
        <h4>感谢您对 Bit-OX 的支持！</h4>
        <h5>Bit-OX 团队</h5>
        <h5>2018 年 11 月 23 日</h5>
      </div>
    </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped lang="less">
  .rate{
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
      h5{
        padding-bottom: 5px;
        font-weight: bold;
      }
      h4{
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
