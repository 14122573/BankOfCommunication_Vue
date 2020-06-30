<template>
  <div>
    <div class="pageWrapper">
      <Navbar class="navbar" />
      <div class="main">
        <a-row>
          <a-col :span="5">&nbsp;</a-col>
          <a-col :span="14">
            <a-descriptions class="title" :title="list.title">
              <a-descriptions-item label="发稿人">{{
                list.author
              }}</a-descriptions-item>
              <a-descriptions-item label="发布日期">{{
                list.startTime
              }}</a-descriptions-item>
              <a-descriptions-item label="来源">{{
                !!list.source?list.source:"无来源信息"
              }}</a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :span="5">&nbsp;</a-col>
        </a-row>
        <a-divider type="horizontal"></a-divider>
        <a-card v-html="list.content" class="content" :bordered="false">
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/frontPublic/components/navbar.vue'
export default {
  data() {
    return {
      list: {}
    }
  },
  components: {
    Navbar
  },
  mounted() {
    this.loadArticle()
  },
  methods: {
    loadArticle() {
      let articleId = this.$route.params.id
      this.$ajax
        .get({
          url   : this.$api.GET_PUB_ANNOUNCE_DETAIL.replace('{id}', articleId),
          params: {
            id: articleId
          }
        })
        .then(res => {
          if(res.code === '200') {
            this.list = this.$com.confirm(res, 'data.content', {})
          }
        })
    }
  },
}
</script>

<style scoped>
.pageWrapper {
  padding: 0px 180px 30px 180px;
  background-color: #f1f5f8;
}

.pageWrapper .navbar {
  text-align: left;
  padding: 30px 0px;
}

.pageWrapper .title {
  line-height: 30px;
}

.pageWrapper .main {
  background-color: #ffffff;
  padding: 50px 20px;
}

.pageWrapper .content {
  text-align: left;
  line-height: 30px;
}
</style>

<style lang="stylus">
// 主标题
.main[data-v-3d830607] .ant-descriptions-title {
  $megaFontSize()
}

// 标题下来源信息
.ant-row[data-v-3d830607] .ant-descriptions-item > span {
  $titleFontSize()
}

// 正文
.main[data-v-3d830607] .ant-card-body {
  $titleFontSize()
}
</style>
