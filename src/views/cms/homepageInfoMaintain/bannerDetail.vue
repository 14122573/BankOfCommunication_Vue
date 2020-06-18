<template>
  <div>
    <div class="detailWrapper">
      <div class="detailWrapperTitle">
        标题栏
      </div>

      <div class="detailWrapperContent">
        <a-descriptions title="User Info">
          <a-descriptions-item label="轮播图名称">
            {{data.bannerName}}
          </a-descriptions-item>
          <a-descriptions-item label="照片">
            {{data.id}}
          </a-descriptions-item>
          <a-descriptions-item label="跳转链接">
            {{data.linkUrl}}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.getList()
    console.log(this.data)
    
  },
  methods: {
    getList() {
      const searchParams = JSON.parse(JSON.stringify(this.searchForm))
      let query = 'http://yapi.omniview.pro/mock/267/service-release/banner'
      this.$ajax
        .get({
          url: query
        })
        .then(res => {
          if (res.code === '200') {
            this.data = this.$com.confirm(res, 'data.content', [])
          } else {
            this.$message.error(res.msg)
          }
          // 存储当前页面列表的搜索添加和分页信息
          this.$com.storeSearchParams(
            this.$route.name + '/old',
            this.params,
            this.searchForm
          )
        })
    }
  }
}
</script>

<style scoped>
.detailWrapperTitle {
  background-color: #FFF;
  margin: 10px 10px;
}

.detailWrapperContent {
  background-color: #FFF;
  margin: 10px 10px;
  height: 300px;
  padding: 30px 30px;
}
</style>
