<template>
  <div class="user">
    <!--头部个人信息-->
    <div class="information">
      <!--用户信息-->
      <div class="name">
        <!--头像图片-->
        <div class="Head_portrait">
          <div class="img">
            <img v-if="Sing" src="../../assets/cat_top.jpg">
            <img v-else :src="user_img">
          </div>
        </div>
        <!--用户名字-->
        <div class="user_name">
          <div v-if="Sing">
            <router-link to="/Sign_in" href="">请登录</router-link>
          </div>
          <div v-else>
            <div class="Title">{{user_name}}</div>
            <div class="ID">ID: {{user_ID}}</div>
          </div>
        </div>
        <!--活动任务礼品-->
        <div class="gift">
          <router-link to="/task">
            <div class="icon">
              <van-icon name="point-gift-o" color="#CD5C5C" />
            </div>
            <div class="package">活动中心</div>
          </router-link>
        </div>
      </div>
      <!--卡片-->
      <div class="card">
        <div class="Point_card">
          <router-link to="/wallet" class="money">{{money}}</router-link>
          <router-link to="/wallet" class="EPC">EPC</router-link>
        </div>
        <div class="procedures">手续费点卡<a href="" class="icon"><van-icon name="question" color="#808080" /></a></div>
      </div>
    </div>
    <!--分享页面-->
    <div class="share">
      <!--分享好友-->
      <div class="friend">
        <a href="">
          <!--邀请文本-->
          <div class="bg_img">
            <div class="img_share">
              <span class="img">
                <img src="../../assets/cat_top.jpg" alt="">
              </span>
              <span class="share">邀请好友</span>
            </div>
            <!--箭头-->
            <div class="Arrow">></div>
          </div>
        </a>
      </div>
    </div>
    <!--钱包作用页-->
    <div class="Effect">
      <!--BlockPay 钱包-->
      <router-link to="/wallet" class="Effect_box">
        <div class="money">
          <van-icon class="icon" name="youzan-shield"></van-icon>BlockPay 钱包
        </div>
        <div class="Arrow">></div>
      </router-link>
      <!--修改 BlockPay 钱包密码-->
      <router-link to="/password" class="Effect_box">
        <div class="money">
          <van-icon class="icon" name="youzan-shield"></van-icon>修改 BlockPay 钱包密码
        </div>
        <div class="Arrow">></div>
      </router-link>
    </div>
    <!--币币作用页-->
    <div class="Effect">
      <!--法币订单记录-->
<!--      <a class="Effect_box">-->
<!--        <div class="money">-->
<!--          <van-icon class="icon" name="youzan-shield"></van-icon>法币订单记录-->
<!--        </div>-->
<!--        <div class="Arrow">></div>-->
<!--      </a>-->
      <!--币币订单记录-->
      <router-link to="/bb_order" class="Effect_box">
        <div class="money">
          <van-icon class="icon" name="youzan-shield"></van-icon>币币订单记录
        </div>
        <div class="Arrow">></div>
      </router-link>
    </div>
    <!--用户认证作用页-->
    <div class="Effect">
      <!--实名验证-->
<!--      <router-link to="/real_name" class="Effect_box">-->
<!--        <div class="money">-->
<!--          <van-icon class="icon" name="youzan-shield"></van-icon>实名验证-->
<!--        </div>-->
<!--        <div class="Arrow">></div>-->
<!--      </router-link>-->
<!--      &lt;!&ndash;收款方式&ndash;&gt;-->
<!--      <a class="Effect_box">-->
<!--        <div class="money">-->
<!--          <van-icon class="icon" name="youzan-shield"></van-icon>收款方式-->
<!--        </div>-->
<!--        <div class="Arrow">></div>-->
<!--      </router-link>-->
      <!--账号关联-->
      <router-link to="/account" class="Effect_box">
        <div class="money">
          <van-icon class="icon" name="youzan-shield"></van-icon>账号关联
        </div>
        <div class="Arrow">></div>
      </router-link>
    </div>
    <!--退出-->
    <div class="Effect">
      <!--推出-->
      <router-link to="/common" class="Effect_box">
        <div class="money">
          <van-icon class="icon" name="youzan-shield"></van-icon>常见问题
        </div>
        <div class="Arrow">></div>
      </router-link>
    </div>
    <div class="Effect">
      <!--English英文显示-->
<!--      <a class="Effect_box">-->
<!--        <div class="money">-->
<!--          <van-icon class="icon" name="youzan-shield"></van-icon>English-->
<!--        </div>-->
<!--        <div class="Arrow">></div>-->
<!--      </a>-->
      <!--关于-->
      <router-link to="/about" class="Effect_box">
        <div class="money">
          <van-icon class="icon" name="youzan-shield"></van-icon>关于
        </div>
        <div class="Arrow">></div>
      </router-link>
    </div>
    <!--退出-->
    <div class="Effect" v-if="Exse_none">
      <!--退出-->
      <a class="Effect_box" @click="Exse">
        <div class="money">
          <van-icon class="icon" name="youzan-shield"></van-icon>退出
        </div>
        <div class="Arrow">></div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Field, CellItem, Switch } from 'mand-mobile'
import { Icon } from 'vant'

export default {
  data () {
    return {
      open: true,
      Sing: true,
      user_img: '/img/cat.de5d7e86.jpg',
      money: 0,
      lists: [
        {
          icon: '',
          name: '常见问题',
          Arrow: '>'
        },
        {
          icon: '',
          name: 'English',
          Arrow: '>'
        },
        {
          icon: '',
          name: '关于',
          Arrow: '>'
        }
      ],
      user_name: '',
      user_ID: '',
      Exse_none: false
    }
  },
  async mounted () {
    this.setActiveTab(5)
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    }),
    // 退出
    Exse () {
      localStorage.clear()
      alert('成功推出')
      if (localStorage.getItem('user_name')) {
        this.Sing = false
        this.user_name = localStorage.getItem('user_name')
        this.user_ID = localStorage.getItem('user_ID')
      } else {
        this.Sing = true
        this.Exse_none = false
      }
    }
  },
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
    [Icon.name]: Icon
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
      padding: 0px 20px;
      background-image: url(../../assets/information_bg.jpg);
      -webkit-background-size: 35%;
      background-size: 35%;
      /*用户登录*/
      .name{
        display: flex;
        align-items: center;
        padding-top: 20px;
        padding-right: 5px;
        /*头像图片*/
        .Head_portrait{
          width: 15%;
          .img{
            width: 50px;
            height: 100%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            img{
              width: 100%;
              height: 100%;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
            }
          }
        }
        /*用户名字*/
        .user_name{
          width: 70%;
          padding-left: 18px;
          div{
            font-size: 14px;
            a{
              color: #F5F5F5;
            }
          }
          .Title{
            font-size: 14px;
            color: #F5F5F5;
            padding-bottom: 5px;
          }
          .ID{
            font-size: 8px;
            color: #D3D3D3;
          }
        }
        /*礼品*/
        .gift{
          text-align: center;
          width: 15%;
          a{
            display: block;
            div{
              font-size: 10px;
              color: #F5F5F5;
            }
            .icon{
              font-size: 23px;
            }
            .package{
              font-size: 9px;
              color: #708090;
            }
          }
        }
      }
      /*卡片*/
      .card{
        text-align: right;
        padding-right: 5px;
        padding-top: 5px;
        padding-bottom: 13px;
        /*点卡*/
        .Point_card{
          padding-top: 5px;
          padding-right: 20px;
          font-size: 0;
          .money{
            font-size: 20px;
            padding-right: 5px;
            color: white;
          }
          .EPC{
            font-size: 12px;
            color: #999;
          }
        }
        .procedures{
          font-size: 13px;
          color: #696969;
        }
        .icon{
          font-size: 16px;
          vertical-align: middle;
          margin-left: 5px;
        }
      }
    }
    /*分享好友*/
    .share{
      font-size: 10px;
      .friend{
        width: 100%;
        margin: 18px 0;
        /*邀请文本*/
        a{
          display: block;
          font-size: 15px;
          color: #666666;
          width: 90%;
          margin: 0 auto;
          -webkit-border-radius: 18px;
          -moz-border-radius: 18px;
          border-radius: 18px;
          height: 50px;
          line-height: 50px;
          box-shadow: darkgrey 3px 3px 7px 1px;
          .bg_img{
            margin: 0 auto;
            color: #000;
            width: 90%;
            display: flex;
            justify-content: space-between;
            font-size: 0;
            span{
              font-size: 16px;
              display: inline-block;
              vertical-align: middle;
            }
            .img_share{
              .img{
                margin-right: 8px;
                width: 30px;
                height: 30px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                img{
                  width: 100%;
                  height: 100%;
                  -webkit-border-radius: 10px;
                  -moz-border-radius: 10px;
                  border-radius: 10px;
                }
              }
            }
            .Arrow{
              font-size: 18px;
              color: #999;
            }
          }
        }
      }
    }
    /*作用页*/
    .Effect{
      border-bottom: 8px solid rgba(0,0,0,.04);
      .Effect_box{
        padding: 15px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 17px;
        color: #696969;
        border-bottom: 1px solid rgba(0,0,0,.02);
        .money{
          .icon{
            font-size: 15px;
            margin-right: 10px;
            vertical-align: middle;
          }
        }
        .Arrow{
          color: #ccc;
        }
      }
    }
  }
</style>
