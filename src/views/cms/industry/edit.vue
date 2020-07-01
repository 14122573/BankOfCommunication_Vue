<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">修改行业动态</span>
			<div class="detailOperations">
				<a-button @click='$router.back()'>取消</a-button>
				<a-button type="primary" @click='savefarming("save")'>保存</a-button>
				<a-button type="primary" @click='savefarming("publish")'>保存并发布</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <a-form :form="farmingEditForm">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">基本信息</p>
            <div style="margin:0 16px;">
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="标题" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['title',{validateTrigger: 'blur',rules:rules.title}]" placeholder="请输入行业动态标题"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="来源" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['source',{validateTrigger: 'blur',rules:rules.source}]" placeholder="请输入行业动态来源"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="发布时间" :label-col="{span:4}" :wrapper-col="{span:16}">
                    <a-date-picker v-decorator="['releaseDate', {rules: rules.releaseDate, initialValue: this.$moment().locale('zh-cn') }]" />
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="发稿人" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['author',{validateTrigger: 'blur',rules:rules.author, initialValue: postPerson }]" disabled></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="关键词" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-input v-decorator="['keyWord',{validateTrigger: 'blur',rules:rules.KeyWord}]" placeholder="请输入关键词"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="PDF文档" :label-col="{span:4}" :wrapper-col="{span:20}" v-if="ready">
                    <FileUpload @change="onUploadFileChange" :defaultFileList='uploadFileList.default' :acceptTypes="uploadConfig.acceptTypesArray" :maxCount="100"  :maxFileSize="uploadConfig.maxSize" :timestamp="Date.now()"></FileUpload>
                    <a-alert style="margin-top:16px" message="仅能上传PDF格式文件" type="info" showIcon />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>

          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">文献正文内容</p>
            <div style="margin:0 16px;"> 
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
import UeditorCompent from '@/components/theThreeParty/ueditor.vue'
export default {
  components: {
    FileUpload, UeditorCompent
  },
  data() {
    return {
      id             : this.$route.params.id,
      ready          : false,
      farmingEditForm: this.$form.createForm(this),
      farmingDetails : {},
      formData       : {
        content: '',
      },
      postPerson: null,
      rules     : {
        title: [
          { required: true, whitespace: true, message: '请输入行业动态标题!' },
        ],
        author: [
          { required: true, whitespace: true, message: '请输入行业动态作者!' }
        ],
        KeyWord: [
          { required: false, whitespace: true, message: '请输入关键词!' }
        ],
        releaseDate: [
          { required: false, whitespace: true, message: '请输入发布时间!' }
        ],
        source: [
          { required: true, whitespace: true, message: '请输入行业动态来源!' }
        ],
      },
      uploadFileList: {
        default: [],
        used   : []
      },
      uploadConfig: {
        maxSize         : 10*1024*1024,
        acceptTypesArray: [ 'pdf' ]
      }
    }
  },
  created(){
  },
  mounted() {
    this.getDetail()
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
        this.postPerson =  content.name
      })
    },

    /**
     * 整理填写的线上视频地址数组和上传的文件数组，合并成指定提交的数据格式
     * @returns {Array} 合并后的文件数组
     */
    arrangeFileList(){
      const fileList = this.uploadFileList.used.map((item, index) => {
        if(item.uid && item.uid.toString().indexOf('-')==0){// 未修改PDF
          return {
            type    : 1,
            sort    : index+1,
            // filePath: item.url,
            // fileName: item.name
            fileId  : item.uid,
            filePath: item.url
          }
        }else{ // 新上传的PDF
          return {
            type  : 1,
            sort  : index+1,
            fileId: item.uid
          }
        }
      })
      return fileList
    },

    /**
     * 获取详情
     */
    getDetail(){
      let that = this
      this.$ajax.get({
        url: this.$api.GET_ANNOUNCE_DETAIL.replace('{id}', this.id)
      }).then(res => {
        if(res.code =='200'){
          this.farmingDetails = this.$com.confirm(res, 'data.content', {})
          
          // console.log(this.farmingDetails)
          // 初始化修改表单内容
          this.$nextTick(function () {
            this.formData.content = !this.farmingDetails.content?'':this.farmingDetails.content

            // this.farmingDetails.attachments
            if(Array.isArray(this.farmingDetails.attachments)){
              for(let i=0;i<this.farmingDetails.attachments.length;i++){
                switch (this.farmingDetails.attachments[i].type) {
                case '1': // 为文件上传的附件类型
                  console.log('HERE')
                  
                  that.uploadFileList.default.push({
                    uid   : '-'+(i+1),
                    name  : !this.farmingDetails.attachments[i].fileName?'none':this.farmingDetails.attachments[i].fileName,
                    status: 'done',
                    url   : this.farmingDetails.attachments[i].filePath
                  })
                  that.uploadFileList.used.push({
                    uid   : '-'+(i+1),
                    name  : !this.farmingDetails.attachments[i].fileName?'none':this.farmingDetails.attachments[i].fileName,
                    status: 'done',
                    url   : this.farmingDetails.attachments[i].filePath
                  })
                  break
                default:
                  break
                }
              }
            }

            // console.log('list',this.formData.videoUrlList,this.uploadFileList)

            this.farmingEditForm.setFieldsValue({
              title      : this.farmingDetails.title,
              author     : this.farmingDetails.author,
              keyWord    : this.farmingDetails.keyWord,
              releaseDate: this.farmingDetails.releaseDate,
              source     : this.farmingDetails.source,
            })

            this.ready = true
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },

    /**
     * 监听表单’文献PDF附件‘上传变动，并暂存
     * @param {Array} filelist 最新变动已上传的文件对象列表
     */
    onUploadFileChange(filelist){
      this.uploadFileList.used = [].concat(filelist)
    },

    /**
     * 提交表单内容
     * @param {String} type 提交表单内容的数据保存类型，暂存：save；保存并发布：publish
     */
    savefarming(type){
      type = !type?'save':type
      this.farmingEditForm.validateFields(err => {
        if (!err) {
          this.formData.content = this.$refs.ue.value2
          if(this.formData.content==''){
            this.$modal.error({
              title     : '表单验证未通过',
              content   : '请填写行业动态正文内容',
              okText    : '确认',
              cancelText: '取消',
            })
            return
          }

          const postParams = Object.assign({}, this.formData, {
            'id'             : this.id,
            'title'          : this.farmingEditForm.getFieldValue('title'),
            'author'         : this.farmingEditForm.getFieldValue('author'),
            'keyWord'        : this.farmingEditForm.getFieldValue('keyWord'),
            'releaseDate'    : this.farmingEditForm.getFieldValue('releaseDate'),
            'source'         : this.farmingEditForm.getFieldValue('source'),
            'attachments'    : this.arrangeFileList(),
            'status'         : type=='save'?'0':'1',
            'titleManageName': '行业动态'
          })
          // console.log(postParams)

          this.$ajax.put({
            url   : this.$api.PUT_ANNOUNCE_MODIFY.replace('{id}', this.id),
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
<style scoped>

</style>

