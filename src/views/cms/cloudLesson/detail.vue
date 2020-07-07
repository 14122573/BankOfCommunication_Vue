<template>
  <div class="portalDetailWapper">
    <div class="portalDetailTitle">
      <span class="title">云课堂详情</span>
      <div class="detailOperations">
        <a-button @click="$router.back()">取消</a-button>
      </div>
    </div>
    <div class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <a-form :form="farmingCreateForm">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">云课堂信息</p>
            <div style="margin:0 16px;">
              <a-row type="flex" justify="start">
                <a-col span="16" style="margin:8px 0;">
                  <DetailsItem
                    :labelSpan="4"
                    :textSpan="20"
                    :label="'标题'"
                    :text="detailList.title"
                  ></DetailsItem>
                </a-col>
                <a-col span="16" style="margin:8px 0;">
                  <DetailsItem
                    :labelSpan="4"
                    :textSpan="20"
                    :label="'发稿人'"
                    :text="detailList.author"
                  ></DetailsItem>
                </a-col>
                <a-col span="16" style="margin:8px 0;">
                  <DetailsItem
                    :labelSpan="4"
                    :textSpan="20"
                    :label="'栏目'"
                    :text="detailList.id"
                  ></DetailsItem>
                </a-col>
                <a-col span="16" style="margin:8px 0;">
                  <DetailsItem
                    :labelSpan="4"
                    :textSpan="20"
                    :label="'发布时间'"
                    :text="detailList.releaseDate"
                  ></DetailsItem>
                </a-col>
                <a-col span="16" style="margin:8px 0;">
                  <DetailsItem
                    :labelSpan="4"
                    :textSpan="20"
                    :label="'关键词'"
                    :text="detailList.keyWord"
                  ></DetailsItem>
                </a-col>
                <a-col span="16" style="margin:8px 0;">
                  <DetailsItem
                    :labelSpan="4"
                    :textSpan="20"
                    :label="'文件信息'"
                    :text="fileList"
                  ></DetailsItem>
                </a-col>
              </a-row>
            </div>
          </div>

          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">云课堂正文内容</p>
            <div style="margin:0 16px;">
              <a-row type="flex" justify="start">
                <a-col span="16" style="margin:8px 0;">
                  <div
                    v-html="!detailList.content ? '' : detailList.content"
                  ></div>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      farmingCreateForm: this.$form.createForm(this),
      detailList       : [], // 包含明细信息的list
      fileList         : ''
    }
  },
  mounted() {
    this.getDetailList()
  },
  methods: {
    getDetailList() {
      let id = this.$route.params.id
      this.$ajax
        .get({
          url   : this.$api.GET_ANNOUNCE_DETAIL.replace('{id}', id),
          params: {
            id: id
          }
        })
        .then(res => {
          if (res.code === '200') {
            this.detailList = this.$com.confirm(res, 'data.content', {})
            const attachments = !this.detailList.attachments
              ?   [] : this.detailList.attachments
            // console.log(JSON.stringify(this.detailList))
            for (let i = 0; i < attachments.length; i++) {
              if (attachments[i].type == '1') {
                i == attachments.length - 1 ? this.fileList += attachments[i].fileName : this.fileList += attachments[i].fileName + ', '
              }
            }
          }
        })
    },

    /**
     * 组装需要展示的文件数组
     * @returns {Array}  [{name:带文件后缀的文件名称；url：已上传的文件地址},...]
     */
    makeFileList() {
      let fileList = []
      const attachments = !this.detailList.attachments
        ? []
        : this.detailList.attachments
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
    }
  }
}
</script>

<style scoped></style>
