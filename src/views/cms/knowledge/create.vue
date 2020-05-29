<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">新建知识文献</span>
			<div class="detailOperations">
				<a-button @click='$router.back()'>取消</a-button>
				<a-button type="primary" @click='saveKnowledge("save")'>保存</a-button>
				<a-button type="primary" @click='saveKnowledge("publish")'>保存并发布</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <a-form :form="knowledgeCreateForm">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">基本信息</p>
            <div style="margin:0 16px;">
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="标题" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['title',{validateTrigger: 'blur',rules:rules.title}]" placeholder="请输入知识文献标题"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="作者" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['author',{validateTrigger: 'blur',rules:rules.author}]" placeholder="请输入知识文献作者"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="8">
                  <a-form-item label="发表年代" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-input-number style="width:100%" :min="1900" :max="3000" v-decorator="['years',{validateTrigger: 'blur',rules:rules.years}]" placeholder="请输入知识文献发表年代"></a-input-number>
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="是否公开" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-radio-group :defaultValue="formData.anonymous" @change="onDataAnonymousChange">
                      <a-radio-button v-for="item in createFormOption.anonymous" :key="item.value" :value="item.value">{{item.label}}</a-radio-button>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="线上视频地址" :label-col="{span:4}" :wrapper-col="{span:20}">

                    <a-row :gutter='16' align='top' justify="start" v-for="(url,index) in formData.videoUrlList" :key="index">
                      <a-col span="20"><a-input v-model="formData.videoUrlList[index]" placeholder="请输入线上视频地址"></a-input></a-col>
                      <a-col span="4"><a-button @click='deleteVideoUrl(index)' class="iconButton" icon='delete' type="danger" ghost></a-button></a-col>
                    </a-row>

                    <a-row style="margin:4px 0" align='top'>
                      <a-col span="20" style="margin-bottom:4px;"><a-button style="width:100%" @click="addVideo" class="iconButton" icon='plus' type="dashed">添加一个线上视频地址</a-button></a-col>
                      <a-col span="20"><a-alert message="请输入带有'Http://'或'https://'完整线上视频地址" type="info" showIcon /></a-col>
                    </a-row>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="PDF材料" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <FileUpload @change="onUploadFileChange"  :acceptTypes="uploadConfig.acceptTypesArray" :maxFileSize="uploadConfig.maxSize" :maxCount="100" :timestamp="Date.now()"></FileUpload>
                     <a-alert style="margin-top:16px" message="仅能上传PDF格式文件" type="info" showIcon />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">文献正文内容</p>
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
export default {
  components: {
    FileUpload, VueUeditorWrap
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
      ueditorConfig: {
        serverUrl       : this.$api.GET_UEDITOR_SERVICE_URL,
        UEDITOR_HOME_URL: '/static/ueditor/',
        toolbars        : [ [
          'undo', 'redo', '|',
          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
          'directionalityltr', 'directionalityrtl', 'indent', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
          'simpleupload', 'insertimage', 'attachment', 'insertvideo', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'unlink',
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
      knowledgeCreateForm: this.$form.createForm(this),
      formData           : {
        anonymous   : '0',
        content     : '',
        videoUrlList: [ '' ]
      },
      rules: {
        title: [
          { required: true, whitespace: true, message: '请输入知识文献标题!' },
        ],
        author: [
          { required: true, whitespace: true, message: '请输入知识文献作者!' }
        ],
        years: [
          { required: true, message: '请输入知识文献发表年代!仅能为1900~3000的四位数字' }
        ],
        path: [
          { required: true, message: '请输入知识文献内容视频的线上地址！并带有"Http://"或"https://"' },
          { validator: validateVideoPath }
        ],
      },
      uploadFileList: [],
      uploadConfig  : {
        maxSize         : 5*1024*1024,
        acceptTypesArray: [ 'pdf', 'mp4' ]
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
  },
  methods: {
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
    saveKnowledge(type){
      type = !type?'save':type
      // console.log(this.arrangeFileList())
      this.knowledgeCreateForm.validateFields(err => {
        if (!err) {
          if(!this.checkVideoUrl(this.formData.videoUrlList)){
            this.$modal.error({
              title     : '表单验证未通过',
              content   : '”线上视频“填写了不合规的URL地址，请输入带有\'http://\'或\'https://\'完整线上视频地址',
              okText    : '确认',
              cancelText: '取消',
            })
            return
          }
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
            'title'      : this.knowledgeCreateForm.getFieldValue('title'),
            'author'     : this.knowledgeCreateForm.getFieldValue('author'),
            'years'      : this.knowledgeCreateForm.getFieldValue('years'),
            'status'     : type=='save'?'0':'1',
            'attachments': this.arrangeFileList()
          })
          delete postParams.videoUrlList

          this.$ajax.post({
            url   : this.$api.POST_CMS_KNOWLEDGE,
            params: postParams
          }).then(res => {
            if (res.code === '200') {
              this.$message.success(type=='save'?'暂存成功':'保存并发布成功')
              this.$router.push({ name: '/cms/knowledge' })
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

