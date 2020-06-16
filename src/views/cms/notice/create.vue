<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">新建通知公告</span>
			<div class="detailOperations">
				<a-button @click='$router.back()'>取消</a-button>
				<a-button type="primary" @click='saveKnowledge("save")'>保存</a-button>
				<a-button type="primary" @click='saveKnowledge("publish")'>保存并发布</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <a-form :form="noticeCreateForm">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">基本信息</p>
            <div style="margin:0 16px;">
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="标题" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['title',{validateTrigger: 'blur',rules:rules.title}]" placeholder="请输入通知公告标题"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="生效起始时间" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-switch @change="onStartEffectChange" style='margin-right:10px;' />
                    <!-- <a-date-picker style="width:300px" @change='onStartEffectTimeChange' @ok='onStartEffectTimeCheck' v-show="formData.openEffectStart" v-decorator="['startTime']" format="YYYY-MM-DD HH:mm:ss" :disabledDate="disabledDate" :disabledTime="disabledDateTime" :showTime="{ defaultValue: $moment('00:00:00', 'HH:mm:ss') }"/> -->
                    <a-date-picker style="width:300px" v-show="formData.openEffectStart" v-decorator="['startTime']" :format="timeFormat" showTime />
                  </a-form-item>
                </a-col>
                <a-col span="16">
                  <a-form-item label="生效截止时间" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-switch @change="onEndEffectChange" style='margin-right:10px;' />
                    <a-date-picker style="width:300px" v-show="formData.openEffectEnd" v-decorator="['endTime']" :format="timeFormat" showTime />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16'>
                <a-col span="8">
                  <a-form-item label="置顶否" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-radio-group :defaultValue="formData.isTop" @change="onPlacmentChange">
                      <a-radio-button v-for="item in createFormOption.isTop" :key="item.value" :value="item.value">{{item.label}}</a-radio-button>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col span="16">
                  <a-form-item label="附件" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <FileUpload @change="onUploadFileChange"  :acceptTypes="uploadConfig.acceptTypesArray" :maxFileSize="uploadConfig.maxSize" :maxCount="100" :timestamp="Date.now()"></FileUpload>
                      <a-alert style="margin-top:16px" message="仅能上传PDF格式文件" type="info" showIcon />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">正文内容</p>
            <div style="margin:0 16px;">
              <UeditorCompent ref="ue" :value="formData.content" ></UeditorCompent> 
            </div>
          </div>
        </a-form>
      </div>
    </div>
  </div>

</template>
<script>
import UeditorCompent from '@/components/theThreeParty/ueditor'
import FileUpload from '@/components/Upload/fileUpload' 
export default {
  components: { UeditorCompent, FileUpload },
  data() {
    return { 
      timeFormat      : 'YYYY-MM-DD HH:mm:ss',
      noticeCreateForm: this.$form.createForm(this),
      createFormOption: {
        isTop: [ {
          label: '不置顶',
          value: '0'
        }, {
          label: '置顶',
          value: '1'
        } ],
      },
      formData: {
        isTop          : '0',
        openEffectStart: false,
        openEffectEnd  : false,
        content        : ''
      },
      defaultEffectTime: {
        startTime: '1900-01-01 00:00:00',
        endTime  : '2099-01-01 00:00:00'
      },
      rules: {
        title: [
          { required: true, whitespace: true, message: '请输入通知公告标题!' },
        ]
      },
      uploadFileList: [],
      uploadConfig  : {
        maxSize         : 5*1024*1024,
        acceptTypesArray: [ 'pdf' ]
      }
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 监听表单’是否开启生效起始时间‘选项变动，并暂存
     * @param {Boolean} checked true：开启
     */
    onStartEffectChange(checked){
      this.formData.openEffectStart = checked
    },

    /**
     * 监听表单’是否开启生效截止时间‘选项变动，并暂存
     * @param {Boolean} checked true：开启
     */
    onEndEffectChange(checked){
      this.formData.openEffectEnd = checked
    },

    /**
     * 监听表单’置顶否‘选项变动，并暂存
     * @param {Object} e change事件对象
     */
    onPlacmentChange(e){
      this.formData.isTop = e.target.value
    },
 
    /**
     * 监听表单’文献PDF附件‘上传变动，并暂存
     * @param {Array} filelist 最新变动已上传的文件对象列表
     */
    onUploadFileChange(filelist){
      this.uploadFileList = [].concat(filelist)
      // console.log(this.uploadFileList)

    },

    /**
     * 提交表单内容
     * @param {String} type 提交表单内容的数据保存类型，暂存：save；保存并发布：publish
     */
    saveKnowledge(type){
      type = !type?'save':type
      this.noticeCreateForm.validateFields(err => {
        if (!err) {
          //检查生效起始时间设置，并存储或提示
          if(this.formData.openEffectStart){
            if(!this.noticeCreateForm.getFieldValue('startTime')){
              this.$com.getFormValidErrTips(this, err, '请填写生效起始时间！')
              return
            }else{
              this.formData.startTime = this.$moment(this.noticeCreateForm.getFieldValue('startTime')).format(this.timeFormat)
            }
          }else{
            this.formData.startTime = this.defaultEffectTime.startTime
          }
          //检查生效截止时间设置，并存储或提示
          if(this.formData.openEffectEnd){
            if(!this.noticeCreateForm.getFieldValue('endTime')){
              this.$com.getFormValidErrTips(this, err, '请填写生效截止时间！')
              return
            }else{
              this.formData.endTime = this.$moment(this.noticeCreateForm.getFieldValue('endTime')).format(this.timeFormat)
            }
          }else{
            this.formData.endTime = this.defaultEffectTime.endTime
          }
          //检查生效截止时间设置，并存储或提示
          this.formData.content = this.$refs.ue.value2
          if(this.formData.content.length<1){
            this.$com.getFormValidErrTips(this, err, '请填写通知公告正文内容！')
            return
          }
          const attachments = this.uploadFileList.map(item => {
            return {
              fileId  : item.uid,
              type    : '1',
              filePath: item.url,
            }
          })
          const postParams = Object.assign({}, this.formData, {
            'title' : this.noticeCreateForm.getFieldValue('title'),
            'isVote': '0', // 默认创建的为非投票结果文章
            'status': type=='save'?'0':'1',
            attachments, // 附件
          })

          delete postParams.openEffectStart
          delete postParams.openEffectEnd

          this.$ajax.post({
            url   : this.$api.POST_CMS_NOTICE,
            params: postParams
          }).then(res => {
            // console.log(res)
            if (res.code === '200') {
              this.$message.success(type=='save'?'暂存成功':'保存并发布成功')
              this.$router.push({ name: '/cms/notice' })
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

