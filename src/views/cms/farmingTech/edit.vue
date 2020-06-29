<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">修改养殖技术</span>
			<div class="detailOperations">
				<a-button @click='$router.back()'>取消</a-button>
				<a-button type="primary" @click='saveFarming("save")'>保存</a-button>
				<a-button type="primary" @click='saveFarming("publish")'>保存并发布</a-button>
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
                    <a-input v-decorator="['title',{initialValue: editFormInitialValue.title, validateTrigger: 'blur',rules:rules.title}]" placeholder="请输入养殖技术标题"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="来源" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['source',{validateTrigger: 'blur',rules:rules.source}]" placeholder="请输入养殖技术来源"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="栏目" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-select v-decorator="['section', {rules: rules.section }]" placeholder="请选择栏目" :options="searchFormOption.section"/>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="是否投票文章" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-select v-decorator="['isVote', {initialValue: editFormInitialValue.isVote, rules: rules.isVote }]" placeholder="请选择是或否" :options="searchFormOption.isVote"/>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="是否置顶" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-select v-decorator="['isTop', {initialValue: editFormInitialValue.isTop, rules: rules.isTop }]" placeholder="请选择是或否" :options="searchFormOption.isTop"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="8">
                  <a-form-item label="发布时间" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-date-picker v-decorator="['postDate', {initialValue: editFormInitialValue.startTime, rules: rules.postDate}]" />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="关键词" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-input v-decorator="['keywords',{initialValue: editFormInitialValue.keyWords,validateTrigger: 'blur',rules:rules.keywords}]" placeholder="请输入关键词"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="发稿人" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['postMan',{initialValue: editFormInitialValue.author, validateTrigger: 'blur',rules:rules.postMan}]" disabled></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="上传附件" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <FileUpload @change="onUploadFileChange"  :acceptTypes="uploadConfig.acceptTypesArray" :maxFileSize="uploadConfig.maxSize" :maxCount="9" :timestamp="Date.now()" :defaultFileList='uploadFileList.default'></FileUpload>
                     <a-alert style="margin-top:16px" message="可上传Word, Excel, Ceb, Cebx格式文件" type="info" showIcon />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">养殖技术正文内容</p>
            <div style="margin:0 16px;">
               <VueUeditorWrap v-model="formData.content" :config='ueditorConfig'></VueUeditorWrap>
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/Upload/fileUpload'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  data() {
    return {
      defaultFileList : [],
      farmingEditForm : this.$form.createForm(this),
      searchFormOption: {
        section: [
          {
            label: '栏目1',
            value: '0'
          },
          {
            label: '栏目2',
            value: '1'
          }
        ],
        isVote: [
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ],
        isTop: [
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ],
      },
      dateFormat: 'YYYY-MM-DD',
      formData  : {
        content: '',
      },
      editFormInitialValue: [],
      rules               : {
        title: [
          { required: true, whitespace: true, message: '请输入知识文献标题!' },
        ],
        source: [
          { required: true, whitespace: true, message: '请输入养殖技术来源!' }
        ],
        section: [
          { required: true, whitespace: true, message: '请选择养殖技术栏目' }
        ],
        isVote: [
          { required: true, whitespace: true, message: '请选择是否为投票结果文章' }
        ],
        isTop: [
          { required: true, whitespace: true, message: '请选择是否为置顶文章' }
        ],
        postDate: [
          { required: true, message: '请选择养殖技术发布时间，格式 YYYY-MM-DD' }
        ],
        keywords: [
          { required: false, message: '请输入关键词' }
        ],
        postMan: [
          { required: false, message: '请输入发稿人' }
        ],
      },
      postId        : null,
      postPerson    : '',
      uploadFileList: {
        default: [],
        used   : []
      },
      uploadConfig: {
        maxSize         : 10*1024*1024,
        acceptTypesArray: [ 'doc', 'docx', 'xls', 'xlsx', 'ceb', 'cebx' ]
      },
      ueditorConfig: {
        serverUrl       : this.$api.GET_UEDITOR_SERVICE_URL,
        UEDITOR_HOME_URL: '/static/ueditor/',
        toolbars        : [ [
          'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', 'insertvideo', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink', 'inserttable', 'map',
        ] ],
        zIndex            : 1,
        autoHeightEnabled : false, // {Boolean} [默认值：true] 编辑器不自动被内容撑高
        elementPathEnabled: false, // {Boolean} [默认值：true] 是否启用元素路径，默认是显示
        wordCount         : false, // {Boolean} [默认值：true] 是否开启字数统计
        enableAutoSave    : false, // {Boolean} [默认值：true] 启用自动保存，这个配置忽好忽坏
        initialFrameWidth : '90%',
        saveInterval      : 100000000, // {Number} [默认值：500] 自动保存间隔时间，单位ms
        autoFloatEnabled  : false, // [默认值：true] // 是否保持toolbar的位置不动
        initialFrameHeight: 300
      },
    }
  },
  components: {
    FileUpload,
    VueUeditorWrap
  },
  methods: {
    getUserInfo() {
      this.$ajax.get({
        url: this.$api.GET_USER_INFO,
      }).then(res => {
        let content = res.data.content
        this.postPerson =  content.name
      })
    },

    // getEditformInfo() {
    //   this.postId = this.$route.params.id
    //   this.$ajax
    //     .get({
    //       url   : this.$api.MOCK_URL + this.$api.GET_PUB_ANNOUNCE_DETAIL,
    //       params: this.postId
    //     })
    //     .then(res => {
    //       if(res.code === '200') {
    //         this.editFormInitialValue = this.$com.confirm(res, 'data.content', {})
    //         this.defaultFileList.push({
    //           uid   : this.$com.confirm(res, 'data.content.fileId', {}),
    //           name  : this.$com.confirm(res, 'data.content.filePath', {}),
    //           status: 'done',
    //           url   : this.$com.confirm(res, 'data.content.filePath', {})
    //         })
    //       }
    //     })
    // },
    getDetail(){
      this.$ajax.get({
        url   : this.$api.MOCK_URL + this.$api.GET_PUB_ANNOUNCE_DETAIL,
        params: {
          id: this.id
        }
      }).then(res => {
        if(res.code =='200'){
          this.editFormInitialValue = this.$com.confirm(res, 'data.content', {})
          console.log(this.editFormInitialValue)
          
          this.$nextTick(function () {

            // this.knowledgeDetails.attachments
            if(Array.isArray(this.editFormInitialValue.attachments)){
              for(let i=0;i<this.editFormInitialValue.attachments.length;i++){
                switch (this.editFormInitialValue.attachments[i].type) {
                case '1': // 为文件上传的附件类型
                  this.uploadFileList.default.push({
                    uid   : '-'+(i+1),
                    name  : !this.editFormInitialValue.attachments[i].fileName?'none':this.editFormInitialValue.attachments[i].fileName,
                    status: 'done',
                    url   : this.editFormInitialValue.attachments[i].filePath
                  })
                  this.uploadFileList.used.push({
                    uid   : '-'+(i+1),
                    name  : !this.editFormInitialValue.attachments[i].fileName?'none':this.editFormInitialValue.attachments[i].fileName,
                    status: 'done',
                    url   : this.editFormInitialValue.attachments[i].filePath
                  })
                  break
                case '2': // 线上视频地址的数据
                  // this.formData.videoUrlList.push(this.knowledgeDetails.attachments[i].filePath)
                  this.formData.videoUrlList.push(this.editFormInitialValue.attachments[i].filePath)
                  break
                default:
                  break
                }
              }
            }

            // console.log('list',this.formData.videoUrlList,this.uploadFileList)

            this.farmingEditForm.setFieldsValue({
              title : this.editFormInitialValue.title,
              author: this.editFormInitialValue.author,
              years : this.editFormInitialValue.years,
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
      this.uploadFileList = [].concat(filelist)
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
      return fileList
    },

    /**
     * 提交表单内容
     * @param {String} type 提交表单内容的数据保存类型，暂存：save；保存并发布：publish
     */
    saveFarming(type){
      type = !type?'save':type
      // console.log(this.arrangeFileList())
      this.farmingEditForm.validateFields(err => {
        if (!err) {
          if(this.formData.content==''){
            this.$modal.error({
              title     : '表单验证未通过',
              content   : '请填写知识文献正文内容',
              okText    : '确认',
              cancelText: '取消',
            })
            return
          }

          const postParams = Object.assign({}, this.formData, {
            'title'      : this.farmingEditForm.getFieldValue('title'),
            'source'     : this.farmingEditForm.getFieldValue('source'),
            'keyWord'    : this.farmingEditForm.getFieldValue('keywords'),
            'section'    : this.farmingEditForm.getFieldValue('section'),
            'isVote'     : this.farmingEditForm.getFieldValue('isVote'),
            'isTop'      : this.farmingEditForm.getFieldValue('isTop'),
            'postDate'   : this.$moment(this.farmingEditForm.getFieldValue('postDate')).format(this.dateFormat),
            'author'     : this.farmingEditForm.getFieldValue('postMan'),
            'attachments': this.arrangeFileList()
          })
          console.log(JSON.stringify(postParams))

          this.$ajax.post({
            url   : this.$api.PUT_ANNOUNCE_MODIFY,
            params: postParams.concat(
              {
                id: this.postId
              }
            )
          }).then(res => {
            if (res.code === '200') {
              this.$message.success(type=='save'?'暂存成功':'保存并发布成功')
              this.$router.push({ name: '/cms/farmingtech' })
            }
          })
        }else{
          this.$com.getFormValidErrTips(this, err)
        }
      })
    }
  },
  mounted() {
    this.getUserInfo(),
    this.getDetail()
  },
}
</script>

<style scoped>

</style>