<template>
    <div class="Real_name">
      <!--头部标题-->
      <div class="head">
        <van-nav-bar
          title="LV ID 验证"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
      </div>
      <!--实名验证文本-->
      <div class="title_name">实名验证</div>
      <van-collapse v-model="activeName" accordion>
        <!--普通认证-->
        <van-collapse-item title="Lv 1 认证" name="1">
          <!--开始认证-->
          <div v-if="Lv_off">
            <div class="content_Tips" :class="{out: Tips_title}" v-if="Tips_title">{{Tips_title}}</div>
            <!--姓名-->
            <div class="name">
              <van-cell-group name="group">
                <van-field
                  v-model="username"
                  required
                  clearable
                  label="姓名"
                  placeholder="输入您的姓名"
                  @input="name"
                />
              </van-cell-group>
            </div>

            <!--身份证号-->
            <div class="name">
              <van-cell-group name="group">
                <van-field
                  v-model="ID"
                  required
                  clearable
                  label="身份证号码"
                  placeholder="请输入身份证号码"
                  @input="ID_card"
                  maxlength="18"
                />
              </van-cell-group>
            </div>

            <!--上传身份证正面图片-->
            <div class="ID_just">
              <van-uploader :after-read="onRead_just" accept="image/*" :max-count="1" multiple capture>
                <span>*</span>
                <span>上传身份证正面</span>
                <span>
                <img class="head-img" src="../../../assets/shenfenzhenegzheng.jpg" ref="onRead_just"/>
              </span>
              </van-uploader>
            </div>
            <!--上传身份证反面图片-->
            <div class="ID_just">
              <van-uploader :after-read="onRead_back" accept="image/*" :max-count="1" multiple capture>
                <span>*</span>
                <span>上传身份证反面</span>
                <span>
                <img class="head-img" src="../../../assets/shenfenzhenegbei.jpg" ref="onRead_back"/>
              </span>
              </van-uploader>
            </div>

            <!--手持身份证-->
            <div class="ID_just">
              <van-uploader :after-read="onRead_hand" accept="image/*" :max-count="1" multiple capture>
                <span>*</span>
                <span>上传手持身份证</span>
                <span>
                <img class="head-img" src="../../../assets/shenfenzhenegbei.jpg" ref="onRead_hand"/>
              </span>
              </van-uploader>
            </div>

            <!--按钮-->
            <div class="but" @click="primary_but">
              <van-button type="primary" :plain="plain" size="large">开始验证</van-button>
            </div>

            <!--提示-->
            <div class="Tips_box">
              <div v-for="(item,index) in Tips" :key="index" class="Tips">
                <div>{{index + 1}}、</div>
                <div>{{item.text}}</div>
              </div>
            </div>

          </div>
          <!--认证成功-->
          <div v-else class="content_Tips" :class="{ok: cla}">{{ok_Tips}}</div>
        </van-collapse-item>
        <!--高级认证-->
        <van-collapse-item title="Lv 2 认证" name="2">
          <div class="title_Explain">
            <!--说明-->
            <div class="Explain">LV ID, 一种安全、快速地通过实名认证的方式。</div>
            <!--说明-->
            <div class="Explain fontSize">你可以尝试在浏览器中打开以下链接（点击复制）进行LV ID实名认证，然后再返回查看认证后果</div>
            <!--认证链接跳转-->
            <div class="click" data-clipboard-text="https://baidu.con" @click="copy">https://baidu.con</div>
            <!--我已完成实名认证-->
            <div class="bot" @click="bot">
              <a>我已完成实名认证</a>
            </div>
          </div>
          <!--弹出内容-->
          <van-popup v-model="show">复制成功</van-popup>
        </van-collapse-item>

      </van-collapse>
    </div>
</template>

<script>
import { Icon, Popup, NavBar, Collapse, CollapseItem, Field, Button, Uploader, Toast } from 'vant'
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      show: false,
      activeName: '1',
      username: '',
      Tips: [
        {
          text: 'C2C总交易额超过 10000 USDT 必须进行实名认证'
        },
        {
          text: 'BlockPay 承诺对用户身份信息严格保密'
        },
        {
          text: '实名信息必须为本人真实信息'
        },
        {
          text: '你上传的照片将会自动打上水印"仅限于 BlockPay 实名认证"'
        },
        {
          text: '非大陆籍用户可使用台湾身份证或护照进行实名认证'
        },
        {
          text: '身份证号码不足 18 位的在后面补 0 即可'
        }
      ],
      img_t: false,
      img_b: false,
      img_c: false,
      ID_off: false,
      // 提交后改变
      Lv_off: false,
      // 按钮颜色
      plain: true,
      ID: '',
      ID_z: '',
      ID_f: '',
      ID_s: '',
      ok_Tips: '',
      cla: false,
      Tips_title: ''
    }
  },
  methods: {
    // title返回按钮
    onClickLeft () {
      this.$router.go(-1)
    },
    // 用户姓名
    name (e) {
      let that = this
      if (this.username && this.ID_off && this.img_b && this.img_t && this.img_c) {
        that.plain = false
      } else {
        that.plain = true
      }
    },
    // 用户身份证号码
    ID_card (e) {
      this.ID = e.replace(/[^\d]/g, '')
      if (e.length >= 18) {
        this.ID_off = true
      } else {
        this.ID_off = false
      }
      if (this.username && this.ID_off && this.img_b && this.img_t && this.img_c) {
        this.plain = false
      } else {
        this.plain = true
      }
    },
    // 身份证正面
    onRead_just (file) {
      this.img_b = true
      // 将原图片显示为选择的图片
      this.$refs.onRead_just.src = file.content
      this.ID_z = file.file
      if (file) {
        if (this.username && this.ID_off && this.img_b && this.img_t && this.img_c) {
          this.plain = false
        } else {
          this.plain = true
        }
      }
    },
    // 身份证正反面
    onRead_back (file) {
      // 将原图片显示为选择的图片
      this.img_t = true
      this.$refs.onRead_back.src = file.content
      this.ID_f = file.file
      if (file) {
        if (this.username && this.ID_off && this.img_b && this.img_t && this.img_c) {
          this.plain = false
        } else {
          this.plain = true
        }
      }
    },
    // 手持照片
    onRead_hand (file) {
      // 将原图片显示为选择的图片
      this.img_c = true
      this.$refs.onRead_hand.src = file.content
      this.ID_s = file.file
      if (file) {
        if (this.username && this.ID_off && this.img_b && this.img_t && this.img_c) {
          this.plain = false
        } else {
          this.plain = true
        }
      }
    },
    // 点击开始验证按钮
    async primary_but () {
      if (!this.plain) {
        let Formdata = new FormData()
        Formdata.append('id_in_hand', this.ID_s)
        Formdata.append('id_number', this.ID)
        Formdata.append('id_photo_back', this.ID_f)
        Formdata.append('id_photo_front', this.ID_z)
        Formdata.append('name', this.username)
        // lodin
        const toast = Toast.loading({
          duration: 0,
          // 持续展示 toast
          forbidClick: true,
          // 禁用背景点击
          loadingType: 'spinner',
          message: '倒计时 5 秒'
        })
        let second = 5
        const timer = setInterval(async () => {
          second--
          if (second) {
            toast.message = `倒计时 ${second} 秒`
            if (data) {
              if (data.data.id_in_hand && data.data.id_number && data.data.id_photo_back && data.data.id_photo_front && data.data.name) {
                clearInterval(timer)
                this.Lv_off = false
                Toast('身份信息上传成功')
              }
            }
          } else {
            // 检测是否上传成功
            if (data) {
              // 检测上传数据完全性质
              if (data.data.id_in_hand && data.data.id_number && data.data.id_photo_back && data.data.id_photo_front && data.data.name) {
                clearInterval(timer)
                this.Lv_off = false
                Toast('身份信息提交成功')
              } else {
                clearInterval(timer)
                Toast('请您填写正确信息')
                this.Tips_title = '填写信息格式不正确'
              }
            } else {
              clearInterval(timer)
              Toast('提交失败')
              this.Tips_title = '请检查网络和上传文件大小'
            }
          }
        }, 1000)
        // 数据传输
        const { data } = await this.$api.kyc.kyc_list(Formdata)
      } else {
        Toast('请填入完整信息后再验证')
      }
    },
    // 复制按钮
    copy () {
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 300)
      let clipboard = new Clipboard('.click')
      clipboard.on('success', e => {
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        console.log('该浏览器不支持自动复制')
        clipboard.destroy()
      })
    },
    // Lv 2认证使用loding
    bot () {
      Toast.loading({
        mask: true,
        message: '处理中...'
      })
    }
  },
  async mounted () {
    const { data } = await this.$api.kyc.kyc_get()
    if (data.code === 200) {
      if (data.data.id_in_hand && data.data.id_number && data.data.id_photo_back && data.data.id_photo_front && data.data.name) {
        this.Lv_off = false
        this.ok_Tips = '认证提交成功，将会在工作日3天之内返回认证结果'
        if (data.data.verified_state === 1) {
          // 成功
          this.ok_Tips = '您已经成功实名认证'
          this.cla = true
        } else if (data.data.verified_state === 2) {
          // 不成功
          this.Lv_off = true
          this.Tips_title = '历史提交' + data.data.verified_feedback + '不正确'
        }
      } else {
        this.Lv_off = true
      }
    } else {
      Toast('发生错误啦，请稍后重试')
    }
  },
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast
  }
}
</script>

<style scoped lang="less">
  .Real_name{
    .van-popup{
      font-size: 20px;
      background-color: transparent;
      color: white;
    }
    font-size: 17px;
    /*头部标题*/
    .head{
      margin-bottom: 10px;
    }
    /*实名验证*/
    .title_name{
      width: 93%;
      margin: 0 auto;
      font-size: 18px;
    }
    .content_Tips{
      text-align: center;
    }
    .ok{
      color: green;
      font-size: 16px;
    }
    .out{
      color: #FF6347;
    }
    .but{
      margin-top: 20px;
    }
    /*上传身份证*/
      .ID_just{
      padding: 10px 8px;
      font-size: 0;
      span{
        font-size: 12px;
        vertical-align: middle;
      }
      span:nth-child(1){
        color: #f44;
      }
      span:nth-child(2){
        color: #323233;
      }
      span:nth-child(3){
        display: inline-block;
        width: 105px;
        height: 60px;
        margin-left: 10px;
        img{
          width: 100%;
          height: 100%;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
      }
    }
    /*标题加说明*/
    .title_Explain{
      width: 90%;
      margin: 0 auto;
      /*说明*/
      .Explain{
        padding-top: 20px;
      }
      .fontSize{
        font-size: 16px;
      }
      /*认证链接*/
      .click{
        margin: 15px 0;
        border: 1px dashed #696969;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        padding: 5px 8px;
        color: #999;
      }
      /*已认证*/
      .bot{
        text-align: center;
        background-color: #7B68EE;
        line-height: 50px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        font-size: 17px;
        a{
          color: white;
          display: block;
        }
      }
    }
    .Tips_box{
      margin-top: 30px;
      .Tips{
        display: flex;
        font-size: 12px;
        margin: 5px 0;
      }
    }
  }
</style>
