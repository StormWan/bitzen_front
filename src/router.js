import Vue from 'vue'
import Router from 'vue-router'
import api from './api'
import { getUrlKey } from './common/utils/regexp/url'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: () => import('./views/home/index.vue'),
        tabbar: () => import('./components/tabbar/index.vue')
      },
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // {
    //   path: '/otc',
    //   name: 'otc',
    //   components: {
    //     default: () => import('./views/otc/index.vue'),
    //     tabbar: () => import('./components/tabbar/index.vue')
    //   },
    //   meta: {
    //     keepAlive: true,
    //     Auth: true
    //   }
    // },
    // 贷款
    // {
    //   path: '/lend',
    //   name: 'lend',
    //   components: {
    //     default: () => import('./views/lend/index.vue'),
    //     tabbar: () => import('./components/tabbar/index.vue')
    //   },
    //   meta: {
    //     keepAlive: true,
    //     Auth: true
    //   }
    // },
    // 币币
    {
      path: '/bb',
      name: 'bb',
      components: {
        default: () => import('./views/bb/index.vue'),
        tabbar: () => import('./components/tabbar/index.vue')
      },
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 我的
    {
      path: '/user',
      name: 'user',
      components: {
        default: () => import('./views/user/index.vue'),
        tabbar: () => import('./components/tabbar/index.vue')
      },
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/account/login-phone.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 登录
    {
      path: '/login-verify',
      name: 'login-verify',
      component: () => import('./views/account/login-verify.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 钱包
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('./views/user/wallet/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 市名充值提现
    {
      path: '/charg_withd',
      name: 'charg_withd',
      component: () => import('./views/user/wallet/charg_withd/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 充值
    {
      path: '/wallet_recharge',
      name: 'wallet_recharge',
      component: () => import('./views/user/wallet/charg_withd/recharge/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 提现
    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: () => import('./views/user/wallet/charg_withd/withdrawal/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 法币交易
    {
      path: '/transaction',
      name: 'transaction',
      component: () => import('./views/otc/transaction/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 币币交易
    {
      path: '/pair/:id',
      name: 'pair',
      component: () => import('./views/bb/pair/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 密码
    {
      path: '/Password',
      name: 'Password',
      component: () => import('./views/user/password/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 实名认证
    {
      path: '/real_name',
      name: 'real_name',
      component: () => import('./views/user/real_name/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 注册
    {
      path: '/Sign_in',
      name: 'Sign_in',
      component: () => import('./views/user/Sign_in/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 活动任务
    {
      path: '/task',
      name: 'task',
      component: () => import('./views/user/task/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 关于
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/user/about/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 服务条款
    {
      path: '/clause',
      name: 'clause',
      component: () => import('./views/user/about/clause/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 隐私声明
    {
      path: '/statement',
      name: 'statement',
      component: () => import('./views/user/about/statement/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 率费标准
    {
      path: '/rate',
      name: 'rate',
      component: () => import('./views/user/about/rate/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 关于我们
    {
      path: '/about_us',
      name: 'about_us',
      component: () => import('./views/user/about/about_us/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 联系我们
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/user/about/contact/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 常见问题
    {
      path: '/common',
      name: 'common',
      component: () => import('./views/user/common/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 币币订单
    {
      path: '/bb_order',
      name: 'bb_order',
      component: () => import('./views/user/bb_order/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 详情
    {
      path: '/details',
      name: 'details',
      component: () => import('./views/user/bb_order/details/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 关于放币说明
    {
      path: '/delay',
      name: 'delay',
      component: () => import('./views/user/common/delay/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 关于Bit-Ox平台承兑商的说明
    {
      path: '/trader',
      name: 'trader',
      component: () => import('./views/user/common/trader/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 关于 Mixin 和 Bit-Ox 的关系
    {
      path: '/M_and_B',
      name: 'M_and_B',
      component: () => import('./views/user/common/M_and_B/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 关于 ExinPay 钱包的说明
    {
      path: '/qianbao',
      name: 'qianbao',
      component: () => import('./views/user/common/qianbao/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 了解定投
    {
      path: '/fixed',
      name: 'fixed',
      component: () => import('./views/user/common/fixed/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 什么是 C2C (场外) 交易
    {
      path: '/c2c',
      name: 'c2c',
      component: () => import('./views/user/common/c2c/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // C2C 交易的价格是如何确定的?
    {
      path: '/price',
      name: 'price',
      component: () => import('./views/user/common/price/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 为什么实际到手的币的数量和预估的不一样?
    {
      path: '/get',
      name: 'get',
      component: () => import('./views/user/common/get/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // Bit-Ox 是如何收取服务费的?
    {
      path: '/service',
      name: 'service',
      component: () => import('./views/user/common/service/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 为什么通过 C2C 买入非 USDT 数字货币的时候会收到 UDST ?
    {
      path: '/rule',
      name: 'rule',
      component: () => import('./views/user/common/rule/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 为什么 Bit-Ox 的 C2C 价格与行情软件显示的价格不一致,有时候甚至相差比较大?
    {
      path: '/compare',
      name: 'compare',
      component: () => import('./views/user/common/compare/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 使用 Bit-Ox 交易安全吗?会不会跑路?
    {
      path: '/security',
      name: 'security',
      component: () => import('./views/user/common/security/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 为什么有时候 WxinOne 会资金不足?
    {
      path: '/capital',
      name: 'capital',
      component: () => import('./views/user/common/capital/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 为什么限单?
    {
      path: '/limit',
      name: 'limit',
      component: () => import('./views/user/common/limit/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 卖出数字货币时如何收款?
    {
      path: '/collect_money',
      name: 'collect_money',
      component: () => import('./views/user/common/collect_money/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 卖出数字货币订单未收到款怎么办?
    {
      path: '/uncollected',
      name: 'uncollected',
      component: () => import('./views/user/common/uncollected/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 付款了没有收到币怎么办?
    {
      path: '/not_received',
      name: 'not_received',
      component: () => import('./views/user/common/not_received/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 各种充值一般大概多久到账
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('./views/user/common/recharge/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 提现或充值到错误地方怎么办?
    {
      path: '/error',
      name: 'error',
      component: () => import('./views/user/common/error/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 充值或提币未到账怎么办?
    {
      path: '/what',
      name: 'what',
      component: () => import('./views/user/common/what/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 提币时提示区块同步异常改怎么做
    {
      path: '/abnormal',
      name: 'abnormal',
      component: () => import('./views/user/common/abnormal/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 忘记了 PIN 码怎么办?
    {
      path: '/pin_code',
      name: 'pin_code',
      component: () => import('./views/user/common/pin_code/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // assets
    {
      path: '/assets',
      name: 'assets',
      component: () => import('./views/user/common/assets/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 账号关联
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/user/account/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // 如果 meta.Auth是False则直接进入路由，否则开始认证
  if (to.matched.some(recode => !recode.meta.Auth)) {
    next()
  } else {
    // 获取localStorage存储的token，存在则直接进入页面
    const token = localStorage.getItem('token')
    if (token !== null) {
      // console.log('获得token, token=' + token)
      next() // 进入 home 页面
      return
    }
    // Mixin认证
    const clientId = '28536b52-f840-4366-8619-3872fb5b3164'
    const scope = 'PROFILE:READ+ASSETS:READ+PHONE:READ'
    const oauthUrl = `https://mixin.one/oauth/authorize?client_id=${clientId}&scope=${scope}&code_challenge=PKCE`
    const code = getUrlKey('code')
    console.log('code=' + code)
    if (code === null) {
      window.location.href = oauthUrl
    } else {
      let { data } = await api.account.oauth({ code: code })
      if (data.code === 200) {
        console.log(data)
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('userInfo', JSON.stringify(data.data))
        // const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        next()
      } else {
        console.log(data)
        window.location.href = oauthUrl
      }
    }
  }
})

export default router
