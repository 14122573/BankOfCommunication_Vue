<template>
  <div>
    <div class="detailWrapper">
      <div class="portalDetailWapper">
        <div class="portalDetailTitle">
          <span class="title">横幅图详情</span>
          <div class="detailOperations">
            <a-button @click="$router.back()"> 返回 </a-button>
          </div>
        </div>
        <div class="portalDetailContentWapper">
          <div class="portalDetailContentBody">
            <div class="detailWrapperContent">
              <a-descriptions>
                <a-descriptions-item label="轮播图名称">
                  {{ data.bannerName }}
                </a-descriptions-item>
                <a-descriptions-item label="照片ID">
                  {{ data.id }}
                </a-descriptions-item>
                <a-descriptions-item label="跳转链接">
                  {{ data.linkUrl }}
                </a-descriptions-item>
              </a-descriptions>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data      : [],
      bannerId  : null,
      detailDesc: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let that = this
      this.bannerId = this.$route.params.id
      this.$ajax
        .get({
          url: this.$api.MOCK_URL + this.$api.GET_BANNER_DETAIL.replace('{id}', this.bannerId)
        })
        .then(res => {
          if (res.code === '200') {
            that.data = this.$com.confirm(res, 'data.content', [])
            console.log(JSON.stringify(that.data))
          } else {
            this.$message.error(res.msg)
          }
        })
    }
  }
}
</script>

<style scoped>
.detailWrapperTitle {
  background-color: #fff;
  margin: 10px 10px;
}

.detailWrapperContent {
  background-color: #fff;
  margin: 10px 10px;
  height: 300px;
  padding: 30px 30px;
}
</style>
