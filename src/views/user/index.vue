<template>
  <div class="user">
    <!--头部个人信息-->
    <div class="information">
      <!--用户信息-->
      <div class="name">
        <!--头像图片-->
        <div class="Head_portrait">
          <div class="img">
            <img v-if="Sign" src="../../assets/cat_top.jpg">
            <img v-else :src="user_img">
          </div>
        </div>
        <!--用户名字-->
        <div class="user_name">
          <div v-if="Sign">
            <a href="">请登录</a>
          </div>
          <div v-else>
            <div class="Title">陈大仙</div>
            <div class="ID">ID: 20617</div>
          </div>
        </div>
        <!--礼品-->
        <div class="gift">
          <a href="">
            <div class="icon">
              <van-icon name="point-gift-o" color="#CD5C5C" />
            </div>
            <div class="package">活动中心</div>
          </a>
        </div>
      </div>
      <!--卡片-->
      <div class="card">
        <div class="Point_card">
          <span class="money">{{money}}</span>
          <span class="EPC">EPC</span>
        </div>
        <div class="procedures">手续费点卡<a href="" class="icon"><van-icon name="question" color="#808080" /></a></div>
      </div>
    </div>
    <!--分享页面-->
    <div class="share">
      <!--分享好友-->
      <div class="friend">
        <a href="">分享好友</a>
      </div>
    </div>
    <!--余额-->
<!--    <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-1">-->
<!--      <md-field>-->
<!--        <md-cell-item title="余额" addon="可用8000.34" arrow />-->
<!--        <md-cell-item title="使用余额">-->
<!--          <md-switch slot="right" v-model="open" />-->
<!--        </md-cell-item>-->
<!--      </md-field>-->
<!--    </div>-->
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
      Sign: true,
      user_img: '/img/cat.de5d7e86.jpg',
      money: 0
    }
  },
  async mounted () {
    this.setActiveTab(4)
  },
  methods: {
    ...mapMutations({
      setActiveTab: 'tabbar/setActiveTab'
    })
  },
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch,
    [Icon.name]: Icon
  }
}
</script>

<style scoped lang="less">
  .user{
    .information{
      width: 100%;
      padding: 0px 40px;
      background-image: url(../../assets/information_bg.jpg);
      -webkit-background-size: 35%;
      background-size: 35%;
      /*用户登录*/
      .name{
        display: flex;
        align-items: center;
        padding-top: 40px;
        padding-right: 10px;
        /*头像图片*/
        .Head_portrait{
          width: 15%;
          .img{
            width: 100px;
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
          padding-left: 35px;
          div{
            font-size: 27px;
            a{
              color: #F5F5F5;
            }
          }
          .Title{
            font-size: 28px;
            color: #F5F5F5;
            padding-bottom: 10px;
          }
          .ID{
            font-size: 16px;
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
              font-size: 20px;
              color: #F5F5F5;
            }
            .icon{
              font-size: 45px;
            }
            .package{
              font-size: 18px;
              color: #708090;
            }
          }
        }
      }
      /*卡片*/
      .card{
        text-align: right;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 25px;
        /*点卡*/
        .Point_card{
          padding-top: 10px;
          padding-right: 40px;
          font-size: 0;
          .money{
            font-size: 40px;
            padding-right: 10px;
            color: white;
          }
          .EPC{
            font-size: 23px;
            color: #999;
          }
        }
        .procedures{
          font-size: 25px;
          color: #696969;
        }
        .icon{
          font-size: 32px;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
    }
    /*分享好友*/
    .share{
      font-size: 20px;
      .friend{
        a{
          font-size: 30px;
          color: #666666;
        }
      }
    }
  }
</style>
