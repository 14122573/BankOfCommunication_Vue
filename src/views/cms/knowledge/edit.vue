<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">新建知识文献</span>
			<div class="detailOperations">
				<a-button @click='backList'>取消</a-button>
				<a-button type="primary" @click='saveKnowledge("save")'>保存</a-button>
				<a-button type="primary" @click='saveKnowledge("publish")'>保存并发布</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <a-form :form="knowledgeEditForm">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle" id="basic">基本信息</p>
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
                <a-col span="8" v-if="ready">
                  <a-form-item label="可匿名浏览否" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-radio-group :defaultValue="formData.anonymous" @change="onDataAnonymousChange">
                      <a-radio-button v-for="item in createFormOption.anonymous" :key="item.value" :value="item.value">{{item.label}}</a-radio-button>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>

          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle" id="basic">文献内容</p>
            <div style="margin:0 16px;">
              <a-row :gutter='16'>
                <a-col span="8"  v-if="ready">
                  <a-form-item label="文献内容类型" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-radio-group :defaultValue="formData.type" @change="onDataTypeChange">
                      <a-radio-button v-for="item in createFormOption.type" :key="item.value" :value="item.value">{{item.label}}</a-radio-button>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col v-show="formData.type=='0'" span="16">
                  <a-form-item label="线上视频地址" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['path',{validateTrigger: 'blur',rules:rules.path}]" placeholder="请输入线上视频地址"></a-input>
                    <a-alert style="margin-top:8px;margin-bottom:8px" message="请输入带有'Http://'或'https://'完整线上视频地址" type="info" showIcon />
                  </a-form-item>
                </a-col>
                <a-col v-show="formData.type=='1'" span="16" >
                  <a-form-item label="PDF文档" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <FileUpload @change="onUploadFileChange" :defaultFileList='uploadFileList.default' :acceptTypes="uploadConfig.acceptTypesArray" :maxFileSize="uploadConfig.maxSize" :timestamp="Date.now()"></FileUpload>
                    <a-alert style="margin-top:16px" message="仅能上传PDF格式文件,且仅能上传一个文件" type="info" showIcon />
                  </a-form-item>
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
import FileUpload from '@/views/cms/components/fileUpload'
export default {
  components: {
    FileUpload,
  },
  data() {
    const validateVideoPath = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        let startStr = value.substr(0, 8).toLowerCase()
        if (startStr.indexOf('https://')!=-1 || startStr.indexOf('http://')!=-1) {
          callback()
        } else {
          callback('请输入带有\'Http://\'或\'https://\'完整线上视频地址')
        }
      }
    }
    return {
      id:this.$route.params.id,
      ready:false,
      knowledgeEditForm:this.$form.createForm(this),
      createFormOption:{
        type:[{
          label: '视频',
          value: '0'
        },{
          label: 'PDF',
          value: '1'
        }],
        anonymous:[{
          label: '允许匿名浏览',
          value: '0'
        },{
          label: '不允许匿名浏览',
          value: '1'
        }
        ]
      },
      knowledgeDetails:{},
      formData:{},
      rules: {
        title:[
          { required: true, whitespace: true, message: '请输入知识文献标题!' },
        ],
        author: [
          { required: true, whitespace: true, message: '请输入知识文献作者!' }
        ],
        years: [
          { required: true, message: '请输入知识文献发表年代!仅能为1900~3000的四位数字' }
        ],
        path: [
          { validator: validateVideoPath }
        ],
      },
      uploadFileList:{
        default:[],
        used:[]
      },
      uploadConfig:{
        maxSize:5*1024*1024,
        acceptTypesArray:['pdf']
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
     * 获取详情
     */
    getDetail(){
      this.$ajax.get({
        url: this.$api.GET_CMS_KNOWLEDGE_DETAIL.replace('{id}', this.id)
      }).then(res => {
        if(res.code =='200'){
          this.knowledgeDetails = this.$com.confirm(res, 'data.content', {})

          // 初始化修改表单内容
          this.$nextTick(function () {
            this.formData = {
              anonymous:this.knowledgeDetails.anonymous,
              type:this.knowledgeDetails.type,
            }
            this.knowledgeEditForm.setFieldsValue({
              title:this.knowledgeDetails.title,
              author:this.knowledgeDetails.author,
              years:this.knowledgeDetails.years,
            })
            if(this.knowledgeDetails.type=='0'){
              this.knowledgeEditForm.setFieldsValue({
                path:this.knowledgeDetails.path
              })
            }
            // todo: 获取详情时，初始化pdf文件default展示配置
            if(this.formData.type=='1'){
              this.uploadFileList.default.push({
                uid: '-1',
                name: this.knowledgeDetails.path,
                status: 'done',
                url: this.knowledgeDetails.path
              })
              this.uploadFileList.used.push({
                uid: '-1',
                name: this.knowledgeDetails.path,
                status: 'done',
                url: this.knowledgeDetails.path
              })
            }
            this.ready = true
          })
        }else{
          this.$message.error(res.msg)
        }
      })
    },

    backList(){
      this.$router.back()
    },
    /**
     * 监听表单’可否匿名浏览‘选项变动，并暂存
     * @param {Object} e change事件对象
     */
    onDataAnonymousChange(e){
      this.formData.anonymous = e.target.value
    },
    /**
     * 监听表单’文献内容类型‘选项变动，并暂存
     * @param {Object} e change事件对象
     */
    onDataTypeChange(e){
      this.formData.type = e.target.value
    },
    onUploadFileChange(filelist){
      this.uploadFileList.used = [].concat(filelist)
    },
    saveKnowledge(type){
      type = !type?'save':type
      this.knowledgeEditForm.validateFields(err => {
        if (!err) {
          let postParams = Object.assign({},this.formData ,{
            'title':this.knowledgeEditForm.getFieldValue('title'),
            'author':this.knowledgeEditForm.getFieldValue('author'),
            'years':this.knowledgeEditForm.getFieldValue('years')
          })
          if(this.formData.type=='0'){
            if(!this.knowledgeEditForm.getFieldValue('path')){
              this.$message.error('请填写视频线上地址！')
              return
            }else{
              postParams.path = this.knowledgeEditForm.getFieldValue('path')
            }
          }
          // todo: 修改知识文库的时候，对PDF上传文件是否上传覆盖的逻辑
          if(this.formData.type=='1'){
            if(this.uploadFileList.used.length>0){
              if(this.uploadFileList.used[0].uid == '-1'){ // 未修改PDF
                postParams.path = this.uploadFileList.used[0].path
              }else{ // 修改PDF，给出新上传pdf的文件id
                postParams.fileId = this.uploadFileList.used[0].uid
              }
            }else{
              this.$message.error('请上传PDF文件')
              return
            }
          }
          console.log(postParams)
          this.$ajax.put({
            url: this.$api.PUT_CMS_KNOWLEDGE_DETAIL.replace('{id}', this.id),
            params: postParams
          }).then(res => {
            if (res.code === '200') {
              if(type=='save'){
                this.$message.success('暂存成功')
                this.$router.push({name:'/cms/knowledge'})
              }else if(type=='publish'){
                // todo :保存并发布
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped>

</style>

