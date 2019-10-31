<template>
  <div class="portalDetailWapper">
    <div class="portalDetailTitle" v-if="ready">
        <span class="title">{{noticeDetail.title}}</span>
        <div class="detailOperations">
            <a-button @click='$router.back()'>取消</a-button>
            <a-button type="primary" @click='saveKnowledge("save")'>保存</a-button>
            <a-button type="primary" @click='saveKnowledge("publish")'>保存并发布</a-button>
        </div>
    </div>
    <div class="portalDetailContentWapper">
      <div class="portalDetailContentBody">
        <a-form :form="noticeEditForm">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle">基本信息</p>
            <div style="margin:0 16px;">
              <a-row :gutter='16'>
                <a-col span="16">
                  <a-form-item label="标题" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-input v-decorator="['title',{validateTrigger: 'blur',rules:rules.title}]" placeholder="请输入通知公告标题"></a-input>
                  </a-form-item>
                </a-col>
                <a-col span="16" v-if="ready">
                  <a-form-item label="生效起始时间" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-switch :defaultChecked='formData.openEffectStart' @change="onStartEffectChange" style='margin-right:10px;' />
                    <a-date-picker style="width:300px" v-show="formData.openEffectStart" v-decorator="['startTime']" :format="timeFormat" showTime/>
                  </a-form-item>
                </a-col>
                <a-col span="16" v-if="ready">
                  <a-form-item label="生效截止时间" :label-col="{span:4}" :wrapper-col="{span:20}">
                    <a-switch :defaultChecked='formData.openEffectEnd'  @change="onEndEffectChange" style='margin-right:10px;' />
                    <a-date-picker style="width:300px" v-show="formData.openEffectEnd" v-decorator="['endTime']" :format="timeFormat" :showTime="{ defaultValue: $moment('00:00:00', 'HH:mm:ss') }"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter='16' v-if="ready">
                <a-col span="8">
                  <a-form-item label="置顶否" :label-col="{span:8}" :wrapper-col="{span:16}">
                    <a-radio-group :defaultValue="formData.isTop" @change="onPlacmentChange">
                      <a-radio-button v-for="item in createFormOption.isTop" :key="item.value" :value="item.value">{{item.label}}</a-radio-button>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-form>
        <div class="layoutMargin detailsPartSection">
          <p class="detailsPartTitle">正文内容</p>
          <div style="margin:0 16px;">
            <UeditorCompent @ready="editorReady" ref="ue" :value="formData.defaultContent" ></UeditorCompent>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import UeditorCompent from '@/components/theThreeParty/ueditor.vue'
export default {
  components: { UeditorCompent },
  data() {
    return {
      ready:false,
      id:this.$route.params.id,
      timeFormat:'YYYY-MM-DD HH:mm:ss',
      noticeEditForm:this.$form.createForm(this),
      noticeDetail:{},
      createFormOption:{
        isTop:[{
          label: '不置顶',
          value: '0'
        },{
          label: '置顶',
          value: '1'
        }],
      },
      st:'',
      formData:{
        isTop:'0',
        openEffectStart:false,
        openEffectEnd:false,
        defaultContent:'qwerqwreq',
        content:''
      },
      defaultEffectTime:{
        startTime:'1900-01-01 00:00:00',
        endTime:'2099-01-01 00:00:00'
      },
      rules: {
        title:[
          { required: true, whitespace: true, message: '请输入通知公告标题!' },
        ]
      }
    }
  },
  created(){
    this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail(){
      this.$ajax.get({
        url: this.$api.GET_CMS_NOTICE_DETAIL.replace('{id}', this.id)
      }).then(res => {
        if(res.code =='200'){
          this.noticeDetail = this.$com.confirm(res, 'data.content', {})
          this.formData.defaultContent = this.noticeDetail.content
          this.formData.isTop = this.noticeDetail.isTop
          this.formData.openEffectStart = this.$com.oneOf(this.noticeDetail.startTime,['',this.defaultEffectTime.startTime])?false:true
          this.formData.openEffectEnd = this.$com.oneOf(this.noticeDetail.endTime,['',this.defaultEffectTime.endTime])?false:true

          //初始化表单数据
          this.$nextTick(function () {
            this.noticeEditForm.setFieldsValue({ title:this.noticeDetail.title })
            if(this.formData.openEffectStart){
              this.noticeEditForm.setFieldsValue({ startTime:this.$moment(this.noticeDetail.startTime,this.timeFormat) })
            }
            if(this.formData.openEffectEnd){
              this.noticeEditForm.setFieldsValue({ endTime:this.$moment(this.noticeDetail.endTime,this.timeFormat) })
            }
          })

          this.ready=true

        }else{
          this.$message.error(res.msg)
        }
      })
    },
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
     * 监听UEditor内容变更，并存储
     * @param {Object} instance
     */
    editorReady(instance) {
      instance.setContent(this.formData.content)
      instance.addListener('contentChange', () => {
        this.formData.content = instance.getContent()
        // console.log('editorReady',this.formData.content )
      })
    },
    /**
     * 提交表单内容
     * @param {String} type 提交表单内容的数据保存类型，暂存：save；保存并发布：publish
     */
    saveKnowledge(type){
      type = !type?'save':type
      this.noticeEditForm.validateFields(err => {
        if (!err) {
          //检查生效起始时间设置，并存储或提示
          if(this.formData.openEffectStart){
            if(!this.noticeEditForm.getFieldValue('startTime')){
              this.$message.error('请填写生效起始时间！')
              return
            }else{
              this.formData.startTime = this.$moment(this.noticeEditForm.getFieldValue('startTime')).format(this.timeFormat)
            }
          }else{
            this.formData.startTime = this.defaultEffectTime.startTime
          }
          //检查生效截止时间设置，并存储或提示
          if(this.formData.openEffectEnd){
            if(!this.noticeEditForm.getFieldValue('endTime')){
              this.$message.error('请填写生效截止时间！')
              return
            }else{
              this.formData.endTime = this.$moment(this.noticeEditForm.getFieldValue('endTime')).format(this.timeFormat)
            }
          }else{
            this.formData.endTime = this.defaultEffectTime.endTime
          }
          //检查生效截止时间设置，并存储或提示
          if(this.formData.content.length<1){
            this.$message.error('请填写通知公告正文内容！')
            return
          }

          let postParams = Object.assign({},this.formData ,{
            'title':this.noticeEditForm.getFieldValue('title'),
            'isVote':'0', // 默认创建的为非投票结果文章
            'status':type=='save'?'0':'1'
          })
          delete postParams.openEffectStart
          delete postParams.openEffectEnd
          delete postParams.defaultContent

          this.$ajax.put({
            url: this.$api.PUT_CMS_NOTICE_DETAIL.replace('{id}', this.id),
            params: postParams
          }).then(res => {
            if (res.code === '200') {
              this.$message.success(type=='save'?'暂存成功':'保存并发布成功')
              this.$router.push({name:'/cms/notice'})
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

