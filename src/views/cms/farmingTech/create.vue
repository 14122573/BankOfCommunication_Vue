<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">新建养殖技术</span>
			<div class="detailOperations">
				<a-button @click='$router.back()'>取消</a-button>
				<a-button type="primary" @click='saveFarming("save")'>保存</a-button>
        <a-button type="primary" @click='saveFarming("saveNcreate")'>保存并新建</a-button>
				<a-button type="primary" @click='saveFarming("publish")'>保存并发布</a-button>
        <a-button type="primary" @click='saveFarming("publishNcreate")'>发布并新建</a-button>
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
                    <a-input v-decorator="['title',{validateTrigger: 'blur',rules:rules.title}]" placeholder="请输入养殖技术标题"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="来源" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['source',{validateTrigger: 'blur',rules:rules.source}]" placeholder="请输入养殖技术来源"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="栏目" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-select v-decorator="['section', { rules: rules.section }]" placeholder="请选择栏目" :options="searchFormOption.section"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="8">
                  <a-form-item label="发布时间" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-date-picker v-decorator="['postDate', {rules: rules.postDate, initialValue: moment().locale('zh-cn').format(dateFormat) }]" />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="关键词" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-input v-decorator="['keywords',{validateTrigger: 'blur',rules:rules.keywords}]" placeholder="请输入关键词"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="发稿人" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['postMan',{validateTrigger: 'blur',rules:rules.postMan, initialValue: postPerson }]" disabled></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="上传附件" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <FileUpload @change="onUploadFileChange"  :acceptTypes="uploadConfig.acceptTypesArray" :maxFileSize="uploadConfig.maxSize" :maxCount="9" :timestamp="Date.now()"></FileUpload>
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
<style scoped>
.iconButton{ padding:3px 6px}
</style>

<script>
import FileUpload from '@/components/Upload/fileUpload'
import VueUeditorWrap from 'vue-ueditor-wrap'
import moment from 'moment'
export default {
  components: {
    FileUpload, VueUeditorWrap
  },
  data() {
    return {
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
      },
      createFormOption: {
        type: [ {
          label: '视频',
          value: '0'
        }, {
          label: 'PDF',
          value: '1'
        } ],
        anonymous: [ {
          label: '公开',
          value: '0'
        }, {
          label: '不公开',
          value: '1'
        }
        ]
      },
      farmingCreateForm: this.$form.createForm(this),
      formData         : {
        content: '',
      },
      dateFormat: 'YYYY/MM/DD',
      rules     : {
        title: [
          { required: true, whitespace: true, message: '请输入知识文献标题!' },
        ],
        source: [
          { required: true, whitespace: true, message: '请输入养殖技术来源!' }
        ],
        section: [
          { required: true, whitespace: true, message: '请选择养殖技术栏目' }
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
      postPerson    : '',
      uploadFileList: [],
      uploadConfig  : {
        maxSize         : 10*1024*1024,
        acceptTypesArray: [ 'doc', 'docx', 'xls', 'xlsx', 'ceb', 'cebx' ]
      }
    }
  },
  watch: {
    // 'formData.videoUrlList': {
    //   handler: function(val) {
    //     console.log(this.formData.videoUrlList)
    //   },
    //   deep: true
    // },
  },
  mounted() {
    this.getUserInfo()
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
    moment,

    /**
     * 监听表单’可否匿名浏览‘选项变动，并暂存
     * @param {Object} e change事件对象
     */
    onDataAnonymousChange(e){
      this.formData.anonymous = e.target.value
    },

    /**
     * 监听表单’文献PDF附件‘上传变动，并暂存
     * @param {Array} filelist 最新变动已上传的文件对象列表
     */
    onUploadFileChange(filelist){
      this.uploadFileList = [].concat(filelist)
    },

    /**
     * 提交表单内容
     * @param {String} type 提交表单内容的数据保存类型，暂存：save；保存并发布：publish
     */
    saveFarming(type){
      type = !type?'save':type
      // console.log(this.arrangeFileList())
      this.farmingCreateForm.validateFields(err => {
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
            'title'   : this.farmingCreateForm.getFieldValue('title'),
            'source'  : this.farmingCreateForm.getFieldValue('source'),
            'section' : this.farmingCreateForm.getFieldValue('section'),
            'postDate': this.farmingCreateForm.getFieldValue('postDate'),
            'keyWord' : this.farmingCreateForm.getFieldValue('keywords'),
            'author'  : this.farmingCreateForm.getFieldValue('postMan'),
          })
          console.log(JSON.stringify(postParams))

          this.$ajax.post({
            url   : this.$api.POST_ADD_ANNOUNCE,
            params: postParams
          }).then(res => {
            if (res.code === '200') {
              this.$message.success(type=='save'?'暂存成功':'保存并发布成功')
              this.$router.push({ name: '/cms/farmingtech' })
            }
          })

          // this.$ajax.post({
          //   url   : this.$api.POST_CMS_KNOWLEDGE,
          //   params: postParams
          // }).then(res => {
          //   if (res.code === '200') {
          //     this.$message.success(type=='save'?'暂存成功':'保存并发布成功')
          //     this.$router.push({ name: '/cms/knowledge' })
          //   }
          // })
        }else{
          this.$com.getFormValidErrTips(this, err)
        }
      })
    }
  }
}
</script>

