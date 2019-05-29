<template>
  <div class="withdrawal">
    <!--标题-->
    <div class="title">
      <van-nav-bar
        :title="title"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!--选择器-->
    <!--一-->
    <div class="checked">
      <div class="md-example-child md-example-child-selector md-example-child-selector-1">
        <md-field>
          <md-field-item
            :content="selectorValue"
            @click="showSelector"
            arrow
            solid
            :title="title_ch"
          />
        </md-field>
        <md-selector
          v-model="isSelectorShow"
          :data="data[0]"
          title="自定义选项"
          @choose="onSelectorChoose"
        >
          <template slot-scope="{ option }">
            <div class="md-selector-custom-brief">{{ option.text }}使用slot-scope</div>
          </template>
        </md-selector>
      </div>
    </div>
  </div>
</template>

<script>
import { Selector, Field, FieldItem } from 'mand-mobile'
import { NavBar } from 'vant'
export default {
  data () {
    return {
      title: '- -',
      isSelectorShow: false,
      data: [
        [
          {
            value: '1',
            text: '选项一',
          },
          {
            value: '2',
            text: '选项二',
          },
          {
            value: '3',
            text: '选项三',
          },
          {
            value: '4',
            text: '选项四',
          }
        ]
      ],
      selectorValue: '',
      title_ch: '点击添加地址'
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose ({ text }) {
      this.selectorValue = text
    }
  },
  components: {
    [Selector.name]: Selector,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
    [NavBar.name]: NavBar
  },
  activated () {
    console.log(JSON.parse(localStorage.getItem('lists')))
    this.title = JSON.parse(localStorage.getItem('lists')).symbol
  }
}
</script>

<style scoped lang="less">
  .withdrawal{
    .checked{
      .md-example-child-selector-1{
        .md-selector-custom-brief{
          font-size: 20px;
          color: #999;
        }
      }
    }
  }
</style>
