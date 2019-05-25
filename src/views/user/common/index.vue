<template>
    <div class="common">
      <div class="title">常见问题</div>
      <!--问题列表-->
      <div class="problem">
        <div v-for="(item,index) in lists" :key="index">
          <router-link :to="item.path" href="">{{item.text}}</router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      lists: [
        {
          text: '关于延迟放币说明',
          path: '/delay'
        },
        {
          text: '关于 Bit-Ox 平台承兑商的说明',
          path: '/trader'
        },
        {
          text: '关于 Mixin 和 Bit-Ox 的关系',
          path: '/M_and_B'
        },
        {
          text: '关于 BlockPay 钱包的说明',
          path: '/qianbao'
        },
        {
          text: '了解定投',
          path: '/fixed'
        },
        {
          text: '什么是 C2C (场外) 交易?',
          path: '/c2c'
        },
        {
          text: 'C2C 交易的价格是如何确定的?',
          path: '/price'
        },
        {
          text: '为什么实际到手的币的数量和预估的不一样?',
          path: '/get'
        },
        {
          text: 'Bit-Ox 是如何收取服务费的?',
          path: '/service'
        },
        {
          text: '为什么通过 C2C 买入非 USDT 数字货币的时候会收到 UDST ?',
          path: '/rule'
        },
        {
          text: '为什么 Bit-Ox 的 C2C 价格与行情软件显示的价格不一致,有时候甚至相差比较大?',
          path: '/compare'
        },
        {
          text: '使用 Bit-Ox 交易安全吗?会不会跑路?',
          path: '/security'
        },
        {
          text: '为什么有时候 WxinOne 会资金不足?',
          path: '/capital'
        },
        {
          text: '为什么限单?',
          path: '/limit'
        },
        {
          text: '卖出数字货币时如何收款?',
          path: '/collect_money'
        },
        {
          text: '卖出数字货币订单未收到款怎么办?',
          path: '/uncollected'
        },
        {
          text: '付款了没有收到币怎么办?',
          path: '/not_received'
        },
        {
          text: '各种充值一般大概多久到账',
          path: '/recharge'
        },
        {
          text: '提现或充值到错误地方怎么办?',
          path: '/error'
        },
        {
          text: '充值或提币未到账怎么办?',
          path: '/what'
        },
        {
          text: '提币时提示区块同步异常改怎么做?',
          path: '/abnormal'
        },
        {
          text: '忘记了 PIN 码怎么办?',
          path: '/pin_code'
        },
        {
          text: '数字资产介绍',
          path: '/assets'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
  .common{
    font-size: 15px;
    padding: 0 20px;
    /*标题*/
    .title{
      font-size: 22px;
      font-weight: bold;
      padding-top: 40px;
    }
    /*问题列表*/
    .problem{
      div{
        margin:  20px 0;
      }
    }
  }
</style>
