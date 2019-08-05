<template>
    <div>
      <div class="title">
        <van-nav-bar
          :title="title"
          left-text="返回"
          left-arrow
          @click-left="onClick"
        />
      </div>
      <div v-html="detail"></div>
    </div>
</template>

<script>
import { NavBar, Toast } from 'vant'
export default {
  name: 'article-detail',
  components: {
    [NavBar.name]: NavBar
  },
  data () {
    return ({
      article: null
    })
  },
  async mounted () {
    const id = this.$route.params.id
    await this.getArticle(id)
  },
  computed: {
    title () {
      return this.article === null ? 'About Us' : this.article.title
    },
    detail () {
      return this.article === null ? '' : this.article.detail
    }
  },
  methods: {
    onClick () {
      this.$router.go(-1)
    },
    async getArticle (id) {
      const { data } = await this.$api.article.articleDetail(id)
      if (data.code !== 200) {
        Toast('网络异常，请重试')
      } else {
        this.article = data.data
      }
    }
  },

}
</script>

<style scoped lang="less">
</style>
