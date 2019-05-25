<template>
    <div class="bb_order">
      <!--标题-->
      <div class="head">
        <!--箭头-->
        <div class="left_arrow" @click="Arrow">
          <van-icon class="icon" name="arrow-left"></van-icon>
        </div>
        <!--title表头-->
        <div class="title">币币订单</div>
      </div>
      <div class="BG" v-for="(item,index) in order" :key="index">
        <!--订单详情-->
        <div class="md-example-child md-example-child-bill-1">
          <md-bill
            :title="item.pair + ' 买入'"
            no="2019/05/22 18:00"
            water-mark="Bit-OX">
            <md-detail-item title="委托数量">
              <span>1000 </span>USDT
            </md-detail-item>
            <md-detail-item title="平均成交价">
              <span>5771.1 </span>USDT/BTC
            </md-detail-item>
            <md-detail-item title="服务费">
              <span>254.44 </span>EPC
            </md-detail-item>
            <md-detail-item title="实际到账">
              <span>1269.637636 </span> USDT
            </md-detail-item>
            <div class="footer-slot" slot="footer">
              <div class="loding"><van-progress :percentage="value" /></div>
              <div class="state">
                <div class="complete" :class="{active: icon_red}">
                  <span>
                    <van-icon class="icon" :name="passed"></van-icon>
                  </span>
                  <span>{{state}}</span>
                </div>
                <div>
                  <router-link to="/details">详情</router-link>
                </div>
              </div>
            </div>
          </md-bill>
        </div>
      </div>
    </div>
</template>

<script>
import { Field, DetailItem, Tag, Bill } from 'mand-mobile'
import { Icon, Progress, Toast } from 'vant'
export default {
  data () {
    return {
      value: 100,
      color: 'red',
      // 取消颜色 false为不显示
      icon_red: false,
      // icon名称 close为失败
      passed: 'passed',
      // 状态 失败与完成
      state: '完成',
      order: []
    }
  },
  methods: {
    Arrow () {
      this.$router.go(-1)
    },
    // 获取数据
    async getPair (id) {
      const { data } = await this.$api.bb.pairDetail(id)
      if (data.code === 200) {
        this.order.push(data.data)
        console.log(this.order)
      } else {
        Toast('获取数据失败，请刷新页面')
      }
    }
  },
  components: {
    [Field.name]: Field,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Progress.name]: Progress,
    [Bill.name]: Bill,
    [Tag.name]: Tag
  },
  async mounted () {
    await this.getPair(1)
  }
}
</script>

<style lang="less">
  .bb_order{
    font-size: 18px;
    /*标题头部*/
    .head{
      position: relative;
      text-align: center;
      line-height: 80px;
      font-size: 19px;
      /*返回箭头*/
      .left_arrow{
        position: absolute;
        left: 10%;
        font-size: 20px;
        .icon{
          /*vertical-align: middle;*/
        }
      }
    }
    .BG{
      background: rgba(0,0,0,.02);
      width: 100%;
      overflow: hidden;
      .md-example-child-bill-1{
        /*线条*/
        .md-bill-neck{
          height: 0;
        }
        .md-bill{
          background-color: #FFF;
          box-shadow: 0 6px 24px rgba(17, 26, 52, .05);
          &.md-water-mark{
            overflow: visible;
          }
          .md-bill-neck{
            &:before, &:after{
              content: '';
              position: absolute;
              top: 0;
              width: 36px;
              height: 36px;
              border-radius: 18px;
              background-color: #F3F4F5;
            }
            &:before{
              left: -40px;
            }
            &:after{
              right: -40px;
            }
          }
          /*头部控制*/
          .md-bill-header{
            padding-top: 0;
            .md-bill-title{
              font-size: 18px;
              font-weight: bold;
            }
            .md-bill-no{
              font-size: 14px;
            }
          }
          /*名称控制*/
          .md-bill-detail{
            padding: 5px 0;
            .md-detail-item{
              padding: 5px 0;
              .md-detail-title{
                font-size: 16px;
              }
              .md-detail-content{
                font-size: 13px;
                color: #000;
                span{
                  font-size: 16px;
                  padding-right: 8px;
                  font-weight: bold;
                }
              }
            }.md-detail-item:nth-last-child(2){
               span{
                 color: #CD5C5C;
               }
             }
            .md-detail-item:nth-last-child(1){
              span{
                color: #40E0D0;
              }
            }
          }
          .footer-slot{
            padding: 12px 0;
            color: #858B9C;
            font-size: 16px;
            line-height: 1.5;
            border-top: solid 1px #E1E4EB;
            /*进度条*/
            .loding{
              padding-bottom: 12px;
            }
            .state{
              display: flex;
              justify-content: space-between;
              .complete{
                color: green;
                span{
                  vertical-align: middle;
                  padding: 10px 0;
                  .icon{
                    vertical-align: middle;
                  }
                }
                span:nth-child(1){
                  margin-right: 10px;
                }
              }
              .active{
                color: red;
              }
            }
          }
        }
      }
    }
  }
</style>
