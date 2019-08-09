import Vue from 'vue'
import Router from 'vue-router'
import api from './api'
import { getUrlKey } from './common/utils/regexp/url'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'otc',
      components: {
        default: () => import('./views/otc/index.vue'),
        tabbar: () => import('./components/tabbar/index.vue')
      },
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 法币交易
    {
      path: '/otc/pair/:id',
      name: 'otc-pair',
      component: () => import('./views/otc/pair/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 付款方式
    {
      path: '/payment',
      name: 'payment',
      component: () => import('./views/otc/order/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 法币买入订单详情
    {
      path: '/otc_order/:id',
      name: 'otc_order',
      component: () => import('./views/otc/order/buy-detail/index.vue'),
      meta: {
        keepAlive: false,
        Auth: true
      }
    },
    // 法币卖出订单
    {
      path: '/otc_out/:id',
      name: 'otc_out',
      component: () => import('./views/otc/order/sell-detail/index.vue'),
      meta: {
        keepAlive: false,
        Auth: true
      }
    },
    // 订单
    {
      path: '/orders',
      name: 'orders',
      components: {
        default: () => import('./views/orders/index.vue'),
        tabbar: () => import('./components/tabbar/index.vue')
      },
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
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
    // 收款
    {
      path: '/payment-method',
      name: 'payment-method',
      component: () => import('./views/user/payment_method/index.vue'),
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
    // 分享
    {
      path: '/share',
      name: 'share',
      component: () => import('./views/user/share/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // BlackPay 钱包
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('./views/user/wallet/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    {
      path: '/change_wallet',
      name: 'change_wallet',
      component: () => import('./views/user/wallet/change_wallet/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    {
      path: '/wallet_recharge',
      name: 'wallet_recharge',
      component: () => import('./views/user/wallet/change_wallet/wallet_recharge/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: () => import('./views/user/wallet/change_wallet/withdrawal/index.vue'),
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
      path: '/realname_verified',
      name: 'realname_verified',
      component: () => import('./views/user/realname_verified/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 注册
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/user/login/index.vue'),
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
      component: () => import('./views/user/article/about/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 常见问题
    {
      path: '/common',
      name: 'common',
      component: () => import('./views/user/article/common/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // 文章详情（关于，常见问题）
    {
      path: '/article/:id',
      name: 'article-detail',
      component: () => import('./views/user/article/detail/index.vue'),
      meta: {
        keepAlive: true,
        Auth: true
      }
    },
    // bb详情
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('./views/orders/bb_order/details/index.vue'),
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
      console.log(oauthUrl)
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
