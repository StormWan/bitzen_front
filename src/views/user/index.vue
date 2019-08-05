<template>
  <div class="user">
    <!--title标题-->
    <div class="heart">
      <van-nav-bar
        title="我的"
      />
    </div>
    <!--头部个人信息-->
    <div class="information">
      <!--用户信息-->
      <div class="img">
        <img v-if="Sing" :src="img">
        <img v-else :src="user_img">
        </div>
        <div>
          <van-cell :value="user_name" />
        </div>
      </div>

    <!--分享页面-->
    <div class="Effect">
      <!--分享好友-->
      <router-link to="/share">
        <!--邀请文本-->
        <van-cell :value="'ID: ' + user_ID" icon="gift-o" is-link>
          <template slot="title">
            <span class="custom-text">超级返利</span>
          </template>
        </van-cell>
      </router-link>
    </div>
    <!--钱包作用页-->
    <div class="Effect">
      <!--BlockPay 钱包-->
      <router-link to="/wallet">
        <van-cell title="BlockPay 钱包" icon="balance-list-o" is-link />
      </router-link>
      <!--修改 BlockPay 钱包密码-->
      <router-link to="/password">
        <van-cell title="修改 BlockPay 钱包密码" icon="goods-collect-o" is-link />
      </router-link>
    </div>
    <!--用户认证作用页-->
    <div class="Effect">
      <!--实名验证-->
      <router-link to="/real_name">
        <van-cell title="实名验证" icon="user-circle-o" is-link />
      </router-link>
      <!--收款方式-->
      <router-link to="/payment-method">
        <van-cell title="收款方式" icon="peer-pay" is-link />
      </router-link>
      <!--账号关联-->
      <router-link to="/account">
        <van-cell title="账号关联" icon="exchange" is-link />
      </router-link>
    </div>
    <!--常见问题-->
    <div class="Effect">
      <!--常见问题-->
      <router-link to="/common">
        <van-cell title="常见问题" icon="question-o" is-link />
      </router-link>
    </div>
    <!--关于-->
    <div class="Effect">
      <!--关于-->
      <router-link to="/about">
        <van-cell title="关于" icon="service-o" is-link />
      </router-link>
    </div>
    <!--退出-->
    <div class="Effect" v-if="Exse_none">
      <!--退出-->
      <a @click="logout">
        <van-cell title="退出登陆" icon="share" is-link />
      </a>
    </div>
    <div class="hei"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Field, CellItem, Switch } from 'mand-mobile'
import { Icon, Cell, CellGroup, NavBar, Toast, Dialog } from 'vant'
export default {
  data () {
    return {
      open: true,
      Sing: true,
      user_img: require('../../assets/cat.jpg'),
      money: 0,
      user_name: '',
      user_ID: '',
      Exse_none: false,
      login: '',
      img: require('../../assets/cat_top.jpg')
    }
  },
  async mounted () {
    this.setActiveTab(5)
    let user = JSON.parse(localStorage.getItem('userInfo'))
    this.Sing = false
    this.user_name = user.full_name
    this.user_ID = user.identity_num
    this.Exse_none = true
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    }),
    // 退出
    logout () {
      Dialog.confirm({
        title: '退出',
        message: '是否退出登录'
      }).then(() => {
        localStorage.clear()
        Toast('退出成功')
        this.Sing = true
      }).catch(() => {
        Toast('已取消')
      })
    }
  },
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar
  },
  // keep-alive 组件激活时调用
  activated () {
    if (localStorage.getItem('user_name')) {
      this.Sing = false
      this.user_name = localStorage.getItem('user_name')
      this.user_ID = localStorage.getItem('user_ID')
      this.Exse_none = true
    }
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="less">
  /*底部改变*/
  .md-icon.icon-font.md{
    font-size: 16px;
  }
  .user{
    font-size: 16px;
    padding-bottom: 50px;
    height: 100%;
    background-color: rgba(0,0,0,.02);
    .information{
      width: 100%;
      display: flex;
      align-items: center;
      background-color: white;
      padding: 10px 0 0px 20px;
      .img{
        width: 42px;
        height: 42px;
        img{
          width: 100%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
      }
      .van-cell__value--alone{
        color: #FFD700;
        font-weight: bold;
        font-size: 20px;
      }
    }
    /*作用页*/
    .Effect{
      border-bottom: 8px solid rgba(0,0,0,.04);
      .van-cell{
        padding: 12px 15px;
      }
    }
    /*底部*/
    .hei{
      height: 50px;
    }
  }
</style>
