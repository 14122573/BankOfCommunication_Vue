<template>
<div class="BYFileUpload">
 <a-upload
    v-if="ready"
    :fileList="uploadFileList"
    :customRequest="(data) =>{handleUpload(data,uploadFileList)}"
    :remove="(data) =>{handleUploadFileRemove(data,uploadFileList)}"
    :beforeUpload="beforeUpload"
    :accept="uploadConfig.acceptTypes"
    :multiple="multiple">
    <a-button :disabled="!allowUpload"> <a-icon type="upload" />选择并上传文件 </a-button>
  </a-upload>
</div>
</template>
<script>
export default {
  name : 'FileUpload',
  props: {
    multiple: { // 是否允许一次上传多个
      type: Boolean,
      default() {
        return false
      }
    },

    /**
     * 需要初始化展示的已上传文件列表,要求格式
     * [{
     *  uid: '-1',
        name: this.knowledgeDetails.path,
        status: 'done',
        url: this.knowledgeDetails.path
     * },
     * ...]
     */
    defaultFileList: {
      type: Array,
      default() {
        return []
      }
    },
    maxCount: { //可上传的文件数量
      type: Number,
      default() {
        return 1
      }
    },
    acceptTypes: { //可上传的文件格式
      type: Array,
      default() {
        return [ 'jpg', 'jpeg', 'png', 'gif', 'doc', 'docx', 'xlsx', 'xls', 'xlsm', 'pdf' ]
      }
    },
    maxFileSize: { //可上传的文件大小，单位B
      type: Number,
      default() {
        return 5*1024*1024
      }
    },
    timestamp: { //时间戳，用于传参更新的被监听字段
      type    : Number,
      required: true
    },
  },
  data(){
    return {
      ready         : false,
      uploadFileList: [],
      uploadConfig  : {
        acceptTypes     : '',
        acceptTypesArray: []
      }
    }
  },
  mounted(){
    this.init()
  },
  watch: {
    timestamp(){
      this.init()
    }
  },
  computed: {
    /**
     * 是否允许继续添加上传文件
     * @returns {Boolean} true 允许继续添加上传
     */
    allowUpload(){
      console.log("allowUpload");
      
      if(this.uploadFileList.length<this.maxCount){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    init(){
      console.log("init");
      
      this.ready = false
      // init UploadConfig
      this.uploadConfig.acceptTypesArray = this.acceptTypes
      this.uploadConfig.acceptTypes = ''
      for(let i=0;i<this.acceptTypes.length;i++){
        this.uploadConfig.acceptTypes += '.'+this.acceptTypes[i]+','
      }
      this.uploadConfig.acceptTypes = this.uploadConfig.acceptTypes.substring(0, this.uploadConfig.acceptTypes.length-1)

      // init uploadFileList
      this.uploadFileList = [].concat(this.defaultFileList)

      this.ready = true
    },

    /**
     * 删除已上传文件，更新暂存
     * @param {Object} file 本次上传的文件对象
     * @param {Array} uploadFileList 已暂存的已上传文件对象列表
     */
    handleUploadFileRemove(file, uploadFileList) {
      const index = uploadFileList.indexOf(file)
      uploadFileList.splice(index, 1)

      this.$emit('change', [].concat(uploadFileList))
    },

    /**
     * 在调用接口上传前，检查本次上传文件是否符合业务规则，如文件后缀及大小
     * @param {Object} file 本次上传的文件对象
     * @returns {Boolean} true 符合规则；
     */
    beforeUpload(file) {
      const fileNameArr = file.name.split('.')
      const fileSuffix = fileNameArr[fileNameArr.length-1].toLowerCase()
      const isAccept = this.$com.oneOf(fileSuffix, this.uploadConfig.acceptTypesArray)
      const isLtMaxFileSize = (file.size < this.maxFileSize)

      let message = ''
      message += !isAccept?('文件格式限定为'+this.uploadConfig.acceptTypes+'；'):''
      message += !isLtMaxFileSize?'文件需小于'+(this.maxFileSize/1024/1024)+'M；':''
      if(isAccept && isLtMaxFileSize){
        return true
      }else{
        this.$modal.error({
          title     : '上传文件验证未通过',
          content   : message,
          okText    : '确认',
          cancelText: '取消',
        })
        this.$emit('change', [].concat(this.uploadFileList))
        return false
      }
    },

    /**
     * 执行接口调用，将本次选择文件上传至远程，并更新本次已上传文件数组
     * @param {Object} file 本次上传的文件对象
     * @param {Array} uploadFileList 已暂存的已上传文件对象列表
     */
    handleUpload(data, uploadFileList) {
      const formData = new FormData()
      formData.append('file', data.file)
      data.onProgress()
      this.$ajax.post({
        url   : this.$api.UPLOAD_TEMP,
        params: formData
      }).then(res => {
        if (res.code === '200') {
          const data = this.$com.confirm(res, 'data.content', {})
          for(let index = 0;index<uploadFileList.length;index++){
            if(data.name == uploadFileList[index].name){
              this.$modal.error({
                title     : '上传文件验证未通过',
                content   : '该文件已上传',
                okText    : '确认',
                cancelText: '取消',
              })
              this.$emit('change', [].concat(uploadFileList))
              return
            }
          }
          this.uploadFileList.push({
            uid   : data.id,
            name  : data.name,
            status: 'done',
            url   : data.path
          })

          this.$emit('change', [].concat(this.uploadFileList))
        }
      })
    },

    /**
     * 供父组件主动调用获取最新的已上传文件列表
     * @returns {Array} uploadFileList
     * [{
     *  uid: '-1',
        name: this.knowledgeDetails.path,
        status: 'done',
        url: this.knowledgeDetails.path
     * },
     */
    getUploadFileList(){
      return this.uploadFileList
    }
  }
}
</script>
<style>
/* 重写表单文件上传结果布局，使其一行多个，且支持单个文件名称折行 */
.BYFileUpload .ant-upload-list-item { display: inline-block; word-break: break-all; height: auto}
.BYFileUpload .ant-upload-list-item-name {white-space: normal; padding-right: 10px;}
.BYFileUpload .ant-upload-list-item .anticon-close { top:50%; margin-top: -5px;}
</style>

