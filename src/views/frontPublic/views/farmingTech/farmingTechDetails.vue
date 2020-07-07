<template>
  <div>
    <div class="pageWrapper">
      <Navbar class="navbar" />
      <div class="main"> 
        <a-row>
          <a-col :span="4">&nbsp;</a-col>
          <a-col :span="16">
            <a-descriptions class="title" :title="list.title">
              <a-descriptions-item label="发稿人">{{
                list.author
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
        </a-row>
        <a-divider type="horizontal"></a-divider>
        <a-card class="content" :bordered="false" v-html="list.content">
        </a-card>
        <div class="tagPlace" v-if="list.attachments.length !== 0">
          <a-divider type="horizontal"></a-divider>
          <span>文件下载：</span>
          <span v-for="(item, index) in list.attachments" :key="index">
              <span>&nbsp;</span>
              <a v-if="item.type == '1'" @click="tagClick(item.filePath)" style="text-decoration: underline">
                {{item.fileName}}
              </a>
          </span>
        </div>
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
    this.loadArticle(),
    this.$nextTick(() => {
      document.querySelector('#components-layout-demo-basic').scrollTop = 0
    })
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
    },

    /**
     * 组装需要展示的文件数组
     * @returns {Array}  [{name:带文件后缀的文件名称；url：已上传的文件地址},...]
     */
    makeFileList() {
      let fileList = []
      const attachments = !this.list.attachments
        ? []
        : this.list.attachments
      for (let i = 0; i < attachments.length; i++) {
        if (attachments[i].type == '1') {
          fileList.push({
            name: attachments[i].fileName,
            url : attachments[i].filePath
          })
        }
      }
      console.log('1' + JSON.stringify(fileList))
      return fileList
    },
    tagClick(path) {
      console.log(path)
      
      window.location.href = path
    }
  },
}
</script>

<style scoped>

.tagPlace {
  text-align: left;
}
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
