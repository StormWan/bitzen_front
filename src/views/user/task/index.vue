<template>
    <div class="task">
      <!--完成任务-->
      <div class="complete">
        <p>完成任务</p>
      </div>
      <!--活动介绍-->
      <div class="introduce">
        <!--排列-->
        <div class="array" v-for="(lists,index) in lists" :key="index">
          <!--图片与标题-->
          <div class="left">
            <div class="img">
              <img :src="lists.img" />
            </div>
            <div class="title">
              <p>{{lists.title}}</p>
              <p>{{lists.task}}</p>
            </div>
          </div>
          <!--任务完成状态-->
          <div class="right">
            <a v-if="lists.state">去完成</a>
            <a v-else>已完成</a>
          </div>
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
          img: require('../../../assets/cat_top.jpg'),
          title: '实名认证奖励BTC',
          task: '完成实名认证，奖励 0.0001 BTC',
          state: true
        },
        {
          img: require('../../../assets/cat_top.jpg'),
          title: '首次交易',
          task: '完成任意一笔交易，奖励 200 EPC',
          state: true
        },
        {
          img: require('../../../assets/cat_top.jpg'),
          title: '实名认证奖励EPC',
          task: '完成实名认证，奖励 300 EPC',
          state: true
        },
        {
          img: require('../../../assets/cat_top.jpg'),
          title: '邀请注册',
          task: '每邀请一个新用户，最高奖励 300 EPC',
          state: true
        },
        {
          img: require('../../../assets/cat_top.jpg'),
          title: '首次定投',
          task: '每次成功使用定投功能，奖励 200 EPC',
          state: true
        },
        {
          img: require('../../../assets/cat_top.jpg'),
          title: '连续定投两周',
          task: '连续定投两周，奖励 200 Epc',
          state: true
        },
        {
          img: require('../../../assets/cat_top.jpg'),
          title: '连续定投',
          task: '连续不断定投，EPC奖励递增',
          state: true
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
  .task{
    width: 100%;
    height: 100%;
    background: url(../../../assets/task_bg.jpg) no-repeat;
    -webkit-background-size: 100%;
    font-size: 18px;
    color: white;
    /*完成任务标题*/
    .complete{
      text-align: center;
      padding-top: 52px;
      font-size: 40px;
      p{
        font-family: 'Audiowide';
        text-align: center;
        -webkit-transition: all .8s ease;
        transition: all .8s ease;
        -webkit-animation: Glow .8s ease infinite alternate;
        animation: Glow .8s ease infinite alternate;
      }
      @-webkit-keyframes Glow {
        from {
          text-shadow: 0 0 10px #fff,
          0 0 20px #fff,
          0 0 30px #fff,
          0 0 40px #00a67c,
          0 0 70px #00a67c,
          0 0 80px #00a67c,
          0 0 100px #00a67c,
          0 0 150px #00a67c;
        }
        to {
          text-shadow: 0 0 5px #fff,
          0 0 10px #fff,
          0 0 15px #fff,
          0 0 20px #00a67c,
          0 0 35px #00a67c,
          0 0 40px #00a67c,
          0 0 50px #00a67c,
          0 0 75px #00a67c;
        }
      }
      @keyframes Glow {
        from {
          text-shadow: 0 0 10px #fff,
          0 0 20px #fff,
          0 0 30px #fff,
          0 0 40px #00a67c,
          0 0 70px #00a67c,
          0 0 80px #00a67c,
          0 0 100px #00a67c,
          0 0 150px #00a67c;
        }
        to {
          text-shadow: 0 0 5px #fff,
          0 0 10px #fff,
          0 0 15px #fff,
          0 0 20px #00a67c,
          0 0 35px #00a67c,
          0 0 40px #00a67c,
          0 0 50px #00a67c,
          0 0 75px #00a67c;
        }
      }
    }
    .introduce{
      padding-top: 60px;
      width: 85%;
      margin: 0 auto;
      /*排列*/
      .array{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 40px;
        /*图片与标题*/
        .left{
          display: flex;
          align-items: center;
          /*图片*/
          .img{
            width: 35px;
            height: 35px;
            margin-right: 10px;
            img{
              width: 100%;
              overflow: hidden;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
            }
          }
          /*标题*/
          .title{
            font-size: 16px;
            p{
              width: 200px;
            }
            p:nth-last-child(1){
              font-size: 13px;
              color: #ccc;
              padding-top: 6px;
            }
          }
        }
        /*任务完成状态*/
        .right{
          font-size: 15px;
          background-color: #DAA520;
          padding: 8px 13px;
          -webkit-border-radius: 15px;
          -moz-border-radius: 15px;
          border-radius: 15px;
          a{
            font-size: 15px;
            color: white;
          }
        }
      }
    }
  }
</style>
