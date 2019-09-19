<template>
  <div class="portalDetailWapper">
		<div class="portalDetailTitle">
			<span class="title">{{$route.meta.title}}</span>
			<div class="detailOperations">
				<a-button @click='back'>取消</a-button>
				<a-button type="primary" @click='save' html-type="submit">保存</a-button>
			</div>
		</div>
    <div  class="portalDetailContentWapper">
      <div class="portalDetailContentBody create-talent" ref="create-talent">
        <a-form :form="form">
          <div class="layoutMargin detailsPartSection">
            <p class="detailsPartTitle" id="basic">基本信息</p>
            <div style="margin:0 16px;">
              <a-row>
                <a-col span="16">
                  <a-row>
                    <a-col span="12" v-if="!$route.query.id">
                      <a-form-item label="登录手机号" v-bind="colSpa">
                        <a-input v-decorator="['loginPhone',{rules:rules.loginPhone}]" placeholder="请输入"></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col span="12">
                      <a-form-item label="姓名" v-bind="colSpa">
                        <a-input v-decorator="['name',{rules:rules.name}]" placeholder="请输入"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col span="12">
                      <a-form-item label="性别" v-bind="colSpa">
                        <a-radio-group v-decorator="['sex',{rules:rules.sex}]" :options="options.sexList"/>
                      </a-form-item>
                    </a-col>
                    <a-col span="12">
                      <a-form-item label="民族" v-bind="colSpa">
                        <a-select v-decorator="['minority',{rules:rules.minority}]" :options="options.minorityList" placeholder="请选择"></a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col span="12">
                      <a-form-item label="身份证号" v-bind="colSpa">
                        <a-input v-decorator="['identity',{rules:rules.identity}]" placeholder="请输入"></a-input>
                      </a-form-item>
                    </a-col>
                    <a-col span="12">
                      <a-form-item label="工作单位" v-bind="colSpa">
                        <a-input v-decorator="['workCompany',{rules:rules.workCompany}]" placeholder="请输入"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col span="12">
                      <a-form-item label="单位性质" v-bind="colSpa">
                        <a-select v-decorator="['companyNature',{rules:rules.companyNature}]" :options="options.companyNatureList" placeholder="请选择"></a-select>
                      </a-form-item>
                    </a-col>
                    <a-col span="12">
                      <a-form-item label="单位所在地" v-bind="colSpa">
                        <a-input v-decorator="['companyAddress',{rules:rules.companyAddress}]" placeholder="请输入"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="8">
                  <a-form-item label="一寸照" v-bind="colSpa">
                    <a-upload listType="picture-card" :fileList="fileList"
                      @preview="handlePreview"
                      :remove="handleRemove"
                      :beforeUpload="beforeUpload"
                      class="avatar-uploader"
                      accept=".jpg,.jpeg"
                      >
                      <div v-if="fileList.length < 1">
                        <a-icon type="cloud-upload" style="fontSize:24px" />
                        <div class="ant-upload-text">上传照片</div>
                        <div class="ant-upload-text">仅支持jpg格式</div>
                      </div>
                    </a-upload>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row >
                <a-col span="8">
                    <a-form-item label="所在部门" v-bind="colSpa">
                      <a-input v-decorator="['belongDepartment',{rules:rules.belongDepartment}]" placeholder="请输入"></a-input>
                    </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="职称" v-bind="colSpa">
                    <a-select v-decorator="['jobTitle',{rules:rules.jobTitle}]" :options="options.jobTitleList" placeholder="请选择"></a-select>
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="职务" v-bind="colSpa">
                    <a-select v-decorator="['position',{rules:rules.position}]" :options="options.positionList" placeholder="请选择"></a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row >
                <a-col span="16">
                  <a-form-item label="主要社会兼职" v-bind="textSpa">
                    <a-textarea rows="2"  v-decorator="['partTime']" placeholder="请输入"></a-textarea>
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-form>
        <jobStudy ref="jobStudy" class="marginRef" :options="options" :colSpa="colSpa" :textSpa="textSpa"/>
        <jobSpace ref="jobSpace" class="marginRef" :options="options" :colSpa="colSpa" :textSpa="textSpa" />
      </div>
      <div class="target">
        <div class="icon" v-show="changeSmall">
					<a-icon type="environment" @click="changeSmall=false"/>
				</div>
				<div class="icon" v-show="!changeSmall">
					<a-icon type="double-right" @click="changeSmall=true"/>
				</div>
        <a-anchor v-show="!changeSmall" :offsetTop="240" :getContainer="()=> this.$refs['create-talent']" class="talent-anchor">
          <a-anchor-link href="#basic" title="基本信息" />
          <a-anchor-link href="#job" title="工作学习经历" />
          <a-anchor-link href="#message" title="联系信息" />
          <a-anchor-link href="#space" title="工作领域信息" />
          <a-anchor-link href="#management" title="相关管理信息" />
        </a-anchor>
      </div>
      
    </div>

		<a-modal :visible="previewVisible"  style="text-align:center" :width="600" :footer="null" @cancel="previewVisible = false">
			<img alt="一寸照" style="width: 80%;height:auto" :src="previewImage" />
		</a-modal>
  </div>

</template>
<script>
import jobStudy from '../components/jobStudy'
import jobSpace from '../components/jobSpace'
export default {
  name: 'talent-create',
  components: { jobStudy, jobSpace },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (!this.$com.checkPhone(value)) {
          callback('登录手机号不合法!')
        } else {
          let links='?phone=' + value
          this.$ajax.get({
            url: this.$api.GET_CHECK_PHONE_EXIST + links
          }).then(res => {
            if (res.data.content === false) {
              callback()
              this.$refs.jobStudy.formJob.setFieldsValue({phone:value})
            } else {
              callback('已存在此用户!')
            }
          })
        }
      }
    }
    const validateIdentity = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (!this.$com.checkID(value)) {
          callback('身份证号不正确!')
        } else {
          callback()
        }
      }
    }
    const validateImg = (rule, value, callback) => {
      if (this.fileList.length === 0) {
        callback('请上传一寸照!')
      } else {
        callback()
      }
    }
    return {
      changeSmall:false,
      options: {
        sexList: [{ label: '男', value: '男' }, { label: '女', value: '女' }],
        minorityList: [],
        companyNatureList: [],
        positionList: [],
        jobTitleList: [],
        workAreaList: [],
        professionGroupList: [],
        researchDirectionList: [],
        educationList: [],
        bachelorList: [],
        provinceConfirmList: [{ label: '是', value: '是' },{ label: '否', value: '否' }],
        unitConfirmList: [{ label: '是', value: '是' },{ label: '否', value: '否' }]
      },
      fileList: [],
      colSpa: {
        labelCol: { span: 10 },
        wrapperCol: { span: 12 }
      },
      textSpa: {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 }
      },
      previewVisible: false,
      previewImage: '',
      rules: {
        loginPhone:[
          { required: true, whitespace: true, message: '请输入联系电话!' },
          { validator: validatePhone }
        ],
        name: [{ required: true, whitespace: true, message: '请输入姓名!' }],
        sex: [{ required: true, whitespace: true, message: '请选择性别!' }],
        minority: [
          { required: true, whitespace: true, message: '请选择民族!' }
        ],
        workCompany: [
          { required: true, whitespace: true, message: '请输入工作单位!' }
        ],
        identity: [
          { required: true, whitespace: true, message: '请输入身份证号!' },
          { validator: validateIdentity }
        ],
        companyNature: [
          { required: true, whitespace: true, message: '请选择单位性质!' }
        ],
        companyAddress: [
          { required: true, whitespace: true, message: '请输入单位所在地!' }
        ],
        belongDepartment: [
          { required: true, whitespace: true, message: '请输入所在部门!' }
        ],
        jobTitle: [
          { required: true, whitespace: true, message: '请选择职称!' }
        ],
        position: [
          { required: true, whitespace: true, message: '请选择职务!' }
        ],
        // 一寸照
      }
    }
  },
  methods: {
    //   查询options
    getOptions() {
      let api = this.$api.DICTIONARY_TYPE_GET
      const items = [
        { type: '0', name: 'minorityList' }, //民族
        { type: '1', name: 'companyNatureList' }, //单位性质
        { type: '2', name: 'positionList' }, //职务
        { type: '3', name: 'jobTitleList' }, //职称
        { type: '4', name: 'educationList' }, //学历
        { type: '5', name: 'bachelorList' }, //学位
        { type: '6', name: 'workAreaList' }, //工作领域
        { type: '7', name: 'professionGroupList' }, //专业组别
        { type: '8', name: 'researchDirectionList' } //主要研究方向
      ]
      return items.map(item => {
        this.$ajax
          .get({
            url: api.replace('{type}', item.type),
            hideLoading: false
          })
          .then(res => {
            let data = this.$com.confirm(res, 'data.content', [])
            this.options[item.name] = data.map(e => {
              return {
                label: e.name,
                value: e.id
              }
            })
          })
      })
    },
    //   一寸照方法
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleRemove(file) {
      this.fileList = []
    },
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('一寸照最大不能超过5M!')
        return false
      }
      let fileList = [...this.fileList, file]
      this.handleUpload(fileList)
      return false
    },
    handleUpload(fileList) {
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('file', file)
      })
      this.$ajax
        .post({
          url: this.$api.UPLOAD_TEMP,
          params: formData
        })
        .then(res => {
          if (res.code === '200') {
            let data = this.$com.confirm(res, 'data.content', {})
            this.fileList = []
            this.fileList.push({
              uid: data.id,
              name: data.name,
              status: 'done',
              url: data.path
            })
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // 取消
    back() {
      this.$router.back()
    },
    // 整理数据
    forMat(data) {
      const items = [
        { key: 'minority', list: 'minorityList', value: 'minorityName' }, //民族
        {
          key: 'companyNature',
          list: 'companyNatureList',
          value: 'companyNatureName'
        }, //单位性质
        { key: 'position', list: 'positionList', value: 'positionName' }, //职务
        { key: 'jobTitle', list: 'jobTitleList', value: 'jobTitleName' }, //职称
        { key: 'education', list: 'educationList', value: 'educationName' }, //学历
        { key: 'bachelor', list: 'bachelorList', value: 'bachelorName' }, //学位
        { key: 'workArea', list: 'workAreaList', value: 'workAreaName' }, //工作领域
        {
          key: 'professionGroup',
          list: 'professionGroupList',
          value: 'professionGroupName'
        }, //专业组别
        {
          key: 'researchDirection',
          list: 'researchDirectionList',
          value: 'researchDirectionName'
        } //主要研究方向
      ]
      items.forEach(item => {
        this.options[item.list].forEach(option => {
          if (option.value === data[item.key]) {
            data[item.value] = option.label
          }
        })
      })
      let link, msg, methods
      if (this.$route.query.id) {
        link = this.$api.EXPORT_TYPE_EDIT.replace(
          '{experId}',
          this.$route.query.id
        )
        methods = 'put'
        msg = '修改成功！'
      } else {
        link = this.$api.EXPORT_TYPE
        methods = 'post'
        msg = '新增成功！'
      }
      this.$ajax[methods]({
        url: link,
        params: data
      }).then(res => {
        if (res.code === '200') {
          this.$message.success(msg)
          this.back()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getDetail() {
      this.$ajax
        .get({
          url: this.$api.GET_EXPERT_DETAIL.replace(
            '{experId}',
            this.$route.query.id
          ),
          hideLoading: false
        })
        .then(res => {
          let {
            loginPhone,
            name,
            sex,
            minority,
            workCompany,
            identity,
            companyNature,
            companyAddress,
            belongDepartment,
            jobTitle,
            position,
            partTime,
            graduatedSchool,
            education,
            bachelor,
            profession,
            workExperience,
            mailingAddress,
            phone,
            email,
            researchDirection,
            performance,
            achievements,
            workArea,
            professionGroup,
            provinceConfirm,
            unitConfirm,
            historyWork,
            portraitImg
          } = this.$com.confirm(res, 'data.content', {})
          this.$nextTick(() => {
            this.form.setFieldsValue({
              loginPhone,
              name,
              sex,
              minority,
              workCompany,
              identity,
              companyNature,
              companyAddress,
              belongDepartment,
              jobTitle,
              position,
              partTime
            })
            this.$refs.jobStudy.formJob.setFieldsValue({
              graduatedSchool,
              education,
              bachelor,
              profession,
              workExperience,
              mailingAddress,
              phone,
              email
            })
            this.$refs.jobSpace.formSpace.setFieldsValue({
              researchDirection,
              performance,
              achievements,
              workArea,
              professionGroup,
              provinceConfirm,
              unitConfirm,
              historyWork
            })
            if(portraitImg != null){
              this.fileList.push({
                uid: -1,
                name: portraitImg,
                status: 'done',
                url: portraitImg
              })
            }
          })
        })
    },
    // 保存按钮
    save() {
      let forms = [
        this.$refs.jobStudy.formJob,
        this.$refs.jobSpace.formSpace,
        this.form
      ]
      let formsAll = true
      forms.forEach(form => {
        form.validateFields(err => {
          if (err) {
            formsAll = false
          }
        })
      })

      if (formsAll) {
        let data = Object.assign(
          this.$refs.jobStudy.formJob.getFieldsValue(),
          this.$refs.jobSpace.formSpace.getFieldsValue(),
          this.form.getFieldsValue()
        )
        this.forMat(data)
      } else {
        this.$message.error('请检查输入!')
      }
    }
  },
  mounted() {
    this.$ajax.all(this.getOptions()).then(() => {
      if (this.$route.query.id) {
        this.getDetail()
      }
    })
  }
}
</script>
<style scoped>
.target {
  position: absolute;
  z-index: 10;
  right: 33px;
  top: 240px;
  padding: 10px 8px;
  border-radius: 2px;
  background: white;
  -moz-box-shadow: -1px 0px 5px #878787;
  -webkit-box-shadow: -1px 0px 5px #878787;
  box-shadow: -1px 0px 5px #878787;
}
.target .icon {
  text-align: right;
  cursor: pointer;
  color: #1890ff;
}
.create-talent {
  overflow: auto;
}
/* .talent-anchor {  position: absolute; box-shadow: 2px 2px 5px #e0e0e0;  z-index: 10; right: 0px; top: 240px; } */
</style>
<style>
.avatar-uploader > .ant-upload {
  width: 90%;
  height: 220px;
}
.avatar-uploader .ant-upload-list {
  width: 100%;
}
.avatar-uploader .ant-upload-list-picture-card .ant-upload-list-item {
  width: 90%;
  height: 220px;
}
</style>


