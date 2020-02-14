<template>
  <div class="about">
    <!--标题-->
    <div class="head">
      <van-nav-bar
        title="关于"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!--服务内容-->
    <div class="content" v-for="(item,index) in articles" :key="index" >
      <van-cell :title="item.title" is-link :to="{ name: 'article-detail', params: { id: item.id }}"/>
    </div>
  </div>
</template>

<script>
import { Icon, NavBar, Cell, Toast } from 'vant'
export default {
  data () {
    return {
      articles: []
    }
  },
  async mounted () {
    await this.getArticles()
  },
  methods: {
    async getArticles () {
      const params = { 'article_type': 1 }
      const { data } = await this.$api.article.articleList(params)
      if (data.code !== 200) {
        Toast('网络错误，请重试')
      } else {
        this.articles = data.data
      }
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  components: {
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Cell.name]: Cell
  }
}
</script>

<style scoped lang="less">
</style>
