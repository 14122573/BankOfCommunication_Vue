<template>
    <a-card :bordered="false">
        <a-row type="flex" slot="title" justify="space-between" align="middle">
            <a-col>
                导入组织机构
            </a-col>
            <a-col >
                <a-button type="primary" @click="$router.back();" ghost>取消</a-button>
                <a-button
                    type="primary"
                    @click="handleUpload"
                    :disabled="fileList.length === 0"
                    :loading="uploading"
                    >
                    {{uploading ? '导入中' : '导入' }}
                    </a-button>
            </a-col>
        </a-row>
        <a-row type="flex"  align="middle" :gutter="16">
            <a-col span="10">
                <a-input-group compact>
                    <span class="upload-text">导入文件：</span>
                    <a-input readonly :value="fileName" style="width:60%;" />
                    <a-upload :showUploadList="false" style="width:20%;" name="file" :multiple="true" 
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers"
                    :beforeUpload="beforeUpload">
                        <a-button type="primary">
                            选择文件
                        </a-button>
                    </a-upload>
                </a-input-group>
            </a-col>
            <a-col span="8"><a-icon type="link" class="download-icon" /><a>下载导入模板</a></a-col>
        </a-row>
    </a-card>
</template>
<script>
export default {
  name: 'organization-upload',
  data() {
    return {
      headers: {},
      fileList: [],
      uploading: false,
      fileName:''
    }
  },
  methods: {
    beforeUpload(file) {
      this.fileList=[]
      this.fileList = [...this.fileList, file]
      this.fileName=this.fileList[0].name
      return false
    },
    handleUpload() {
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('files[]', file)
      })
      this.uploading = true

      // You can use any AJAX library you like
      reqwest({
        url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        method: 'post',
        processData: false,
        data: formData,
        success: () => {
          this.fileList = []
          this.uploading = false
          this.$message.success('upload successfully.')
        },
        error: () => {
          this.uploading = false
          this.$message.error('upload failed.')
        }
      })
    }
  }
}
</script>
<style scoped>
.upload-text{
    line-height: 32px;
    width:20%;text-align: right;
}
.download-icon{
    color: #1890ff;font-size: 14px;margin-right: 5px;
    cursor: pointer;
}
</style>

