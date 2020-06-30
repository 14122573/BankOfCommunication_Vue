<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">新建专题报告</span>
			<div class="detailOperations">
				<a-button @click='$router.back()'>取消</a-button>
				<a-button type="primary" @click='savefarming("save")'>保存</a-button>
				<a-button type="primary" @click='savefarming("publish")'>保存并发布</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <a-form :form="farmingCreateForm">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">基本信息</p>
            <div style="margin:0 16px;">
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="标题" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['title',{validateTrigger: 'blur',rules:rules.title}]" placeholder="请输入专题报告标题"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="来源" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['source',{validateTrigger: 'blur',rules:rules.source}]" placeholder="请输入专题报告来源"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="发布时间" :label-col="{span:4}" :wrapper-col="{span:16}">
                    <a-date-picker v-decorator="['releaseDate', {validateTrigger: 'change', rules: rules.releaseDate }]" />
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="发稿人" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['author',{validateTrigger: 'blur',rules:rules.author, initialValue: postPerson }]" disabled></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="关键词" :label-col="{span:4}" :wrapper-col="{span:16}">
                    <a-input v-decorator="['KeyWord',{validateTrigger: 'blur',rules:rules.KeyWord}]" placeholder="请输入关键词"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col span="16">
                  <a-form-item label="附件" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <FileUpload @change="onUploadFileChange"  :acceptTypes="uploadConfig.acceptTypesArray" :maxFileSize="uploadConfig.maxSize" :maxCount="100" :timestamp="Date.now()"></FileUpload>
                     <a-alert style="margin-top:16px" message="支持的格式为：word、excel、ceb、cebx" type="info" showIcon />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">专题报告正文内容</p>
            <div style="margin:0 16px;">
               <!-- <VueUeditorWrap v-model="formData.content" :config='ueditorConfig'></VueUeditorWrap> -->
               <UeditorCompent ref="ue" :value="formData.content" ></UeditorCompent>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.iconButton{ padding:3px 6px}
</style>

<script>
import FileUpload from '@/components/Upload/fileUpload'
// import VueUeditorWrap from 'vue-ueditor-wrap'
import UeditorCompent from '@/components/theThreeParty/ueditor.vue'
export default {
  components: {
    FileUpload, UeditorCompent
  },
  data() {
    const validateVideoPath = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        const startStr = value.substr(0, 8).toLowerCase()
        if (startStr.indexOf('https://')!=-1 || startStr.indexOf('http://')!=-1) {
          callback()
        } else {
          callback('请输入带有\'Http://\'或\'https://\'完整线上视频地址')
        }
      }
    }
    return { 
      createFormOption: {
        type: [ {
          label: '视频',
          value: '0'
        }, {
          label: 'PDF',
          value: '1'
        } ],
      },
      farmingCreateForm: this.$form.createForm(this),
      formData         : {
        content     : '',
        videoUrlList: [ '' ]
      },
      postPerson: null,
      rules     : {
        title: [
          { required: true, whitespace: true, message: '请输入专题报告标题!' },
        ],
        author: [
          { required: true, whitespace: true, message: '请输入专题报告作者!' }
        ],
        releaseDate: [
          { required: true, message: '请输入发布时间!' }
        ],
        KeyWord: [
          { required: false, whitespace: true, message: '请输入关键词!' }
        ],
        source: [
          { required: true, whitespace: true, message: '请输入专题报告来源!' }
        ],
      },
      uploadFileList: [],
      uploadConfig  : {
        maxSize         : 10*1024*1024,
        acceptTypesArray: [ 'doc','docx', 'xlsx','xls', 'ceb', 'cebx' ]
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    /**
      获取当前用户名称
     */
    getUserInfo() {
      this.$ajax.get({
        url: this.$api.GET_USER_INFO,
      }).then(res => {
        let content = res.data.content
        this.postPerson = content.name
        this.farmingCreateForm.setFieldsValue({
          releaseDate: this.$moment().locale('zh-cn')
        })
      })
    },

    /**
     * 整理填写的线上视频地址数组和上传的文件数组，合并成指定提交的数据格式
     * @returns {Array} 合并后的文件数组
     */
    arrangeFileList(){
      const fileList = this.uploadFileList.map((item, index) => {
        return {
          type    : 1,
          sort    : index+1,
          fileId  : item.uid,
          fileName: item.name
        }
      })
      const videoList = this.formData.videoUrlList.map((item, index) => {
        return {
          type    : 2,
          sort    : fileList.length+index+1,
          filePath: item
        }
      })
      return fileList.concat(videoList)
    },

    /**
     * 批量检查输入的线上视频地址是否符合格式
     * @param {Array} urls 一维已填写的线上地址数组
     * @returns {Boolean} 已传入地址数组中的每个元素是否符合url地址要求
     */
    checkVideoUrl(urls){
      if(Array.isArray(urls) && urls.length > 0){
        return urls.every(url => {
          if (!url) return true
          const str = url.toLowerCase()
          return str.startsWith('https://') || str.startsWith('http://')
        })
      }else{
        return true
      }
    },

    /**
     * 通过增加videoUrlList组数长度，控制可填写的视频地址input输入框个数
     */
    addVideo(){
      this.formData.videoUrlList.push('')
    },

    /**
     * 删除指定下标位置的线上视频地址
     * @param {Number}  index formData.videoUrlList数组下标
     */
    deleteVideoUrl(index){
      this.formData.videoUrlList.splice(index, 1)
    },

    /**
     * 监听表单’专题报告PDF附件‘上传变动，并暂存
     * @param {Array} filelist 最新变动已上传的文件对象列表
     */
    onUploadFileChange(filelist){
      this.uploadFileList = [].concat(filelist)
    },

    /**
     * 提交表单内容
     * @param {String} type 提交表单内容的数据保存类型，暂存：save；保存并发布：publish
     */
    savefarming(type){
      type = !type?'save':type
      // console.log(this.arrangeFileList())
      this.farmingCreateForm.validateFields(err => {
        if (!err) {
          // if(!this.checkVideoUrl(this.formData.videoUrlList)){
          //   this.$modal.error({
          //     title     : '表单验证未通过',
          //     content   : '”线上视频“填写了不合规的URL地址，请输入带有\'http://\'或\'https://\'完整线上视频地址',
          //     okText    : '确认',
          //     cancelText: '取消',
          //   })
          //   return
          // }

          this.formData.content = this.$refs.ue.value2
          if(this.formData.content==''){
            this.$modal.error({
              title     : '表单验证未通过',
              content   : '请填写专题报告正文内容',
              okText    : '确认',
              cancelText: '取消',
            })
            return
          }

          const postParams = Object.assign({}, this.formData, {
            'titleManageId': this.$titleId.topicId,
            'title'        : this.farmingCreateForm.getFieldValue('title'),
            'author'       : this.farmingCreateForm.getFieldValue('author'),
            'keyWord'      : this.farmingCreateForm.getFieldValue('keyWord'),
            'releaseDate'  : this.farmingCreateForm.getFieldValue('releaseDate'),
            'source'       : this.farmingCreateForm.getFieldValue('source'),
            'status'       : type=='save'?'0':'1',
            'attachments'  : this.arrangeFileList()
          })
          delete postParams.videoUrlList

          this.$ajax.post({
            url   : this.$api.POST_ADD_ANNOUNCE,
            params: postParams
          }).then(res => {
            if (res.code === '200') {
              this.$message.success(type=='save'?'暂存成功':'保存并发布成功')
              this.$router.go(-1)
            }
          })
        }else{
          this.$com.getFormValidErrTips(this, err)
        }
      })
    }
  }
}
</script>

