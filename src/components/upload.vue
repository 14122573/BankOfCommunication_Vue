<template>
  <a-upload name="file" :multiple="true" action="http://znyj.nftec.agri.cn/api/service-file/file/upload/1/temp" :headers="headers" @change="handleChange">
    <a-button>
      <a-icon type="upload" /> Click to Upload
    </a-button>
  </a-upload>
</template>
<script>
export default {
  data () {
    return {
      headers: {
        Authorization: 'authorization-text',
      }
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        // this.$message.success(`${info.file.name} file uploaded successfully`)
        this.$modal.success({
          title  : '文件上传成功',
          content: `${info.file.name} file uploaded successfully`
        })
      } else if (info.file.status === 'error') {
        this.$modal.error({
          title     : '提交错误',
          content   : `${info.file.name} 上传失败.`,
          okText    : '确认',
          cancelText: '取消',
        })
        // this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
  },
}
</script>
