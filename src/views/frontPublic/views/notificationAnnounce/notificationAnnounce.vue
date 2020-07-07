<template>
  <div>
    <div class="pageWrapper">
      <Navbar class="navbar" />
      <div class="main"> 
        <a-row v-if="!useWrapper">
          <a-col :span="4">&nbsp;</a-col>
          <a-col :span="16">
            <a-descriptions class="title" :title="list.title">
              <a-descriptions-item label="发稿人">{{
                list.creator
              }}</a-descriptions-item>
              <a-descriptions-item label="发布日期">{{
                list.releaseDate?list.releaseDate.slice(0, 10):''
              }}</a-descriptions-item>
              <a-descriptions-item label="来源">{{
                list.source
              }}</a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :span="4">&nbsp;</a-col>
          <a-divider type="horizontal"></a-divider>
        </a-row>
        <a-card class="content" :bordered="false" v-html="list.content">
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
      list: {},
      useWrapper: false
    }
  },
  components: {
    Navbar
  },
  mounted() {
    this.loadArticle()
    this.$nextTick(() => {
      document.querySelector('#components-layout-demo-basic').scrollTop = 0
    })
  },
  methods: {
    loadArticle() {
      let articleId = this.$route.params.id
      this.useWrapper = this.$route.params.wrapper
      this.$ajax
        .get({
          url: this.$api.GET_PUB_ANNOUNCE_DETAIL.replace('{id}', articleId),
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
  padding: 0px 0px 30px 0px;
  background-color: #f1f5f8;
  max-width: 1000px;
  margin: 0 auto;
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
<style lang="stylus" scoped>
.votingTitle
  $titleFontSize()
  margin-left 20px
.radioItem
  $simpleFontSize()
.radioTitle
  $titleFontSize()   
  height 35px
  font-weight 600
.isMust
  color red
.votingCeiling
  height 200px
  display flex
  align-items center
  justify-content center
  font-size 18px
  color #999 
</style>
