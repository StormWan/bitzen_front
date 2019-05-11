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
        Auth: false
      }
      // children:[]
    },
    {
      path: '/otc',
      name: 'otc',
      components: {
        default: () => import('./views/otc/index.vue'),
        tabbar: () => import('./components/tabbar/index.vue')
      },
      meta: {
        keepAlive: true,
        Auth: false
      }
    },
    {
      path: '/lend',
      name: 'lend',
      components: {
        default: () => import('./views/lend/index.vue'),
        tabbar: () => import('./components/tabbar/index.vue')
      },
      meta: {
        keepAlive: true,
        Auth: false
      }
    },
    {
      path: '/Coin',
      name: 'Coin',
      components: {
        default: () => import('./views/Coin/index.vue'),
        tabbar: () => import('./components/tabbar/index.vue')
      },
      meta: {
        keepAlive: true,
        Auth: false
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        default: () => import('./views/user/index.vue'),
        tabbar: () => import('./components/tabbar/index.vue')
      },
      meta: {
        keepAlive: true,
        Auth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/account/login-phone.vue'),
      meta: {
        keepAlive: true,
        Auth: false
      }
    },
    {
      path: '/login-verify',
      name: 'login-verify',
      component: () => import('./views/account/login-verify.vue'),
      meta: {
        keepAlive: true,
        Auth: false
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
      console.log('获得token, token=' + token)
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
