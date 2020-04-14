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
                        <a-input v-decorator="['loginPhone',{validateTrigger: 'blur',rules:rules.loginPhone}]" placeholder="请输入"></a-input>
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
                      <a-form-item label="出生日期" v-bind="colSpa">
                        <a-date-picker v-decorator="['birthday',{rules:rules.birthday}]" @change="setAge"/>
                      </a-form-item>
                    </a-col>
                    <a-col span="12">
                      <a-form-item label="年龄" v-bind="colSpa">
                        <a-input :value="age" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <!-- <a-col span="12">
                      <a-form-item label="身份证号" v-bind="colSpa">
                        <a-input v-decorator="['identity',{validateTrigger: 'blur',rules:rules.identity}]" placeholder="请输入"></a-input>
                      </a-form-item>
                    </a-col> -->
                    <a-col span="12">
                      <a-form-item label="政治面貌" v-bind="colSpa">
                        <a-select v-decorator="['politic',{rules:rules.politic}]" :options="options.politicsList" placeholder="请选择"></a-select>
                      </a-form-item>
                    </a-col>
                    <a-col span="12">
                      <a-form-item label="工作单位" v-bind="colSpa">
                        <a-input v-decorator="['workCompany',{rules:rules.workCompany}]" placeholder="请输入"></a-input>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="8">
                  <a-form-item label="一寸照" v-bind="colSpa">
                    <a-upload listType="picture-card" class="avatar-uploader"
                      :fileList="fileList"
                      :customRequest="(data) =>{handleUpload(data,fileList)}"
                      :remove="handleRemove"
                      :beforeUpload="beforeUpload"
                      :accept="fileUpload.acceptTypes"
                      @preview="handlePreview"
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
              <a-row>
                <a-col span="8">
                  <a-form-item label="单位性质" v-bind="colSpa">
                    <a-select v-decorator="['companyNature',{rules:rules.companyNature}]" :options="options.companyNatureList" placeholder="请选择"></a-select>
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="单位所在地" v-bind="colSpa">
                    <!-- <a-input v-decorator="['companyAddress',{rules:rules.companyAddress}]" placeholder="请输入"></a-input> -->
                    <a-cascader
                      v-decorator="['companyAddressId',{rules:rules.companyAddress}]"
                      :options="options.areas"
                      :loadData="getAreas"
                      placeholder="请选择"
                    />
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="单位联系电话" v-bind="colSpa">
                    <a-input v-decorator="['companyPhone',{rules:rules.companyPhone}]" placeholder="请输入"></a-input>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row >
                <!-- <a-col span="8">
                    <a-form-item label="所在部门" v-bind="colSpa">
                      <a-input v-decorator="['belongDepartment',{rules:rules.belongDepartment}]" placeholder="请输入"></a-input>
                    </a-form-item>
                </a-col> -->
                <a-col span="8">
                  <a-form-item label="职称" v-bind="colSpa">
                    <a-select v-decorator="['jobTitle',{rules:rules.jobTitle}]" :options="options.jobTitleList" placeholder="请选择"></a-select>
                  </a-form-item>
                </a-col>
                <a-col span="8">
                  <a-form-item label="行政职务" v-bind="colSpa">
                    <a-select v-decorator="['position',{rules:rules.position}]" :options="options.positionList" placeholder="请选择"></a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <!-- <a-row >
                <a-col span="16">
                  <a-form-item label="主要社会兼职" v-bind="textSpa">
                    <a-textarea rows="2"  v-decorator="['partTime']" placeholder="请输入"></a-textarea>
                  </a-form-item>
                </a-col>
              </a-row> -->
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
import jobStudy from '@/views/expertManagement/components/jobStudy'
import jobSpace from '@/views/expertManagement/components/jobSpace'
export default {
  name      : 'talent-create',
  components: { jobStudy, jobSpace },
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
            url        : this.$api.GET_CHECK_PHONE_EXIST + links,
            hideLoading: true,
          }).then(res => {
            if (res.data.content === false) {
              callback()
              this.$refs.jobStudy.formJob.setFieldsValue({ phone: value })
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
    const validateCompanyPhone = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (!this.$com.checkPhone(value) && !this.$com.checkTel(value)) {
          callback('电话号码不合法！')
        } else {
          callback()
        }
      }
    }
    return {
      form       : this.$form.createForm(this),
      age        : null,
      changeSmall: false,
      options    : {
        sexList              : [ { label: '男', value: '男' }, { label: '女', value: '女' } ],
        minorityList         : [],
        companyNatureList    : [],
        positionList         : [],
        jobTitleList         : [],
        workAreaList         : [],
        professionGroupList  : [],
        researchDirectionList: [],
        educationList        : [],
        bachelorList         : [],
        provinceConfirmList  : [ { label: '是', value: '是' },{ label: '否', value: '否' } ],
        unitConfirmList      : [ { label: '是', value: '是' },{ label: '否', value: '否' } ],
        politicsList         : [],
        areas                : [],
      },
      colSpa: {
        labelCol  : { span: 10 },
        wrapperCol: { span: 12 }
      },
      textSpa: {
        labelCol  : { span: 5 },
        wrapperCol: { span: 18 }
      },
      previewVisible: false,
      previewImage  : '',
      fileList      : [],
      fileUpload    : {
        acceptTypes     : '.jpg,.jpeg',
        acceptTypesArray: [ 'jpg','jpeg' ]
      },
      rules: {
        loginPhone: [
          { required: true, whitespace: true, message: '请输入联系电话!' },
          { validator: validatePhone }
        ],
        name    : [ { required: true, whitespace: true, message: '请输入姓名!' } ],
        sex     : [ { required: true, whitespace: true, message: '请选择性别!' } ],
        birthday: [ { required: true, message: '请选择出生日期!' } ],
        politic : [ { required: true, whitespace: true, message: '请选择政治面貌!' } ],
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
          { required: true, message: '请选择单位所在地！' },
        ],
        companyPhone: [
          { required: true, whitespace: true, message: '请输入单位联系电话!' },
          { validator: validateCompanyPhone }
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
      }
    }
  },
  mounted() {
    this.getAreas(null)
    this.$ajax.all(this.getOptions()).then(() => {
      if (this.$route.query.id) {
        this.getDetail()
      }
    })
  },
  methods: {
    //   查询options
    getOptions() {
      let api = this.$api.DICTIONARY_TYPE_GET
      const items = [
        //民族
        { type: '0', name: 'minorityList' },
        //单位性质
        { type: '1', name: 'companyNatureList' },
        //职务
        { type: '2', name: 'positionList' },
        //职称
        { type: '3', name: 'jobTitleList' },
        //学历
        { type: '4', name: 'educationList' },
        //学位
        { type: '5', name: 'bachelorList' },
        //工作领域
        { type: '6', name: 'workAreaList' },
        //专业组别
        { type: '7', name: 'professionGroupList' },
        //主要研究方向
        { type: '8', name: 'researchDirectionList' },
        //政治面貌
        { type: '11', name: 'politicsList' }
      ]
      return items.map(item => {
        this.$ajax
          .get({
            url        : api.replace('{type}', item.type),
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
    getAreas(selectedOptions) {
      // 初始化或者根据选择来获取省市区级联选择框的数据
      let targetOption = null
      if (selectedOptions) {
        targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true
      }
      this.$ajax.get({
        url   : this.$api.GET_AREA_NEXT,
        params: {
          parentId: targetOption ? targetOption.value.split('#')[0] : '0',
        },
        hideLoading: true,
      }).then(res => {
        const datas = this.$com.confirm(res, 'data.content', [])
        const result = datas.map(item => {
          return {
            label : item.areaName,
            value : item.id + '#' + item.areaName,
            isLeaf: item.lv > 2,
          }
        })
        if (targetOption) {
          targetOption.loading = false
          targetOption.children = result
        } else {
          this.options.areas = result
        }
        this.options.areas = [ ...this.options.areas ]
      })
    },
    setAreaOptions(companyAddressId) {
      // 处理数据来回显省市区级联选择框的数据
      const ids = companyAddressId.split('/')
      this.$ajax.all(
        this.$ajax.get({
          url   : this.$api.GET_AREA_NEXT,
          params: {
            parentId: ids[0].split('#')[0],
          },
          hideLoading: true,
        }),
        this.$ajax.get({
          url   : this.$api.GET_AREA_NEXT,
          params: {
            parentId: ids[1].split('#')[0],
          },
          hideLoading: true,
        }),
      ).then(res => {
        const lv2 = this.$com.confirm(res[0], 'data.content', [])
        const lv3 = this.$com.confirm(res[1], 'data.content', [])
        const result = []
        this.options.areas.forEach(item => {
          if (item.value == ids[0]) {
            const children = []
            lv2.forEach(child => {
              if (child.id == ids[1].split('#')[0]) {
                child.children = lv3.map(child => {
                  return {
                    label : child.areaName,
                    value : child.id + '#' + child.areaName,
                    isLeaf: child.lv > 2,
                  }
                })
              }
              children.push(child)
            })
            result.push({
              label   : item.label,
              value   : item.value,
              isLeaf  : item.isLeaf,
              children: children.map(item => {
                return {
                  label   : item.areaName,
                  value   : item.id + '#' + item.areaName,
                  isLeaf  : item.lv > 2,
                  children: item.children,
                }
              }),
            })
          }
        })
        this.options.areas = result
        this.form.setFieldsValue({
          companyAddressId: ids,
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
      let fileNameArr = file.name.split('.')
      let fileSuffix = fileNameArr[fileNameArr.length-1].toLowerCase()
      let isAccept = this.$com.oneOf(fileSuffix,this.fileUpload.acceptTypesArray)
      let isLt5M = file.size / 1024 / 1024 < 5
      let message = ''
      if(!isAccept){
        message += !isAccept?('文件格式限定为'+this.fileUpload.acceptTypes+'；'):''
      }
      if(!isLt5M){
        message += !islt200m?'一寸照需小于5M；':''
      }
      if(isAccept && isLt5M){
        return true
      }else{
        this.$modal.error({
          title     : '上传文件验证未通过',
          content   : message,
          okText    : '确认',
          cancelText: '取消',
        })
        return false
      }
    },
    handleUpload(data,fileList) {
      const formData = new FormData()
      formData.append('file', data.file)
      data.onProgress()
      this.$ajax.post({
        url   : this.$api.UPLOAD_TEMP,
        params: formData
      }).then(res => {
        if (res.code === '200') {
          let data = this.$com.confirm(res, 'data.content', {})
          this.fileList = []
          this.fileList.push({
            uid   : data.id,
            name  : data.name,
            status: 'done',
            url   : data.path
          })
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
        //民族
        { key: 'minority', list: 'minorityList', value: 'minorityName' },
        //单位性质
        {
          key  : 'companyNature',
          list : 'companyNatureList',
          value: 'companyNatureName'
        },
        //职务
        { key: 'position', list: 'positionList', value: 'positionName' },
        //职称
        { key: 'jobTitle', list: 'jobTitleList', value: 'jobTitleName' },
        //学历
        { key: 'education', list: 'educationList', value: 'educationName' },
        //学位
        { key: 'bachelor', list: 'bachelorList', value: 'bachelorName' },
        //工作领域
        { key: 'workArea', list: 'workAreaList', value: 'workAreaName' },
        //专业组别
        {
          key  : 'professionGroup',
          list : 'professionGroupList',
          value: 'professionGroupName'
        },
        //主要研究方向
        {
          key  : 'researchDirection',
          list : 'researchDirectionList',
          value: 'researchDirectionName'
        },
        // 政治面貌
        { key: 'politic', list: 'politicsList', value: 'politicName' },
      ]
      items.forEach(item => {
        this.options[item.list].forEach(option => {
          if (option.value === data[item.key]) {
            data[item.value] = option.label
          }
        })
      })
      const transformDate = (key) => {
        // 格式化动态添加的行数据中的日期，并加序号
        const list = [ ...data[key] ]
        if (list && list.length > 0) {
          const result = list.map((item, index) => {
            if (item.date && item.date.length > 0) {
              const date = [ ...item.date ]
              item.date = [ this.$moment(date[0]).format('YYYY-MM-DD'), this.$moment(date[1]).format('YYYY-MM-DD') ]
              item.index = index
            }
            return item
          })
          return result
        } else {
          return []
        }
      }
      data.birthday = this.$moment(data.birthday).format('YYYY-MM-DD')
      data.workExperience = JSON.stringify(transformDate('workExperience'))
      data.achievements = JSON.stringify(transformDate('achievements'))
      const address = data.companyAddressId.map(id => {
        return id.split('#')[1]
      })
      data.companyAddress = address.join('/')

      data.companyAddressId = data.companyAddressId.join('/')
      let link, msg, methods
      if (this.$route.query.id) {
        link = this.$api.EXPORT_TYPE_EDIT.replace('{experId}',this.$route.query.id)
        methods = 'put'
        msg = '修改成功！'
      } else {
        link = this.$api.EXPORT_TYPE
        methods = 'post'
        msg = '新增成功！'
      }
      this.$ajax[methods]({
        url   : link,
        params: data
      }).then(res => {
        if (res.code === '200') {
          this.$message.success(msg)
          this.back()
        }
      })
    },
    getDetail() {
      this.$ajax.get({
        url        : this.$api.GET_EXPERT_DETAIL.replace('{experId}',this.$route.query.id),
        hideLoading: false
      }).then(res => {
        let {
          loginPhone,
          name,
          sex,
          minority,
          workCompany,
          identity,
          companyNature,
          companyAddressId,
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
          portraitImg,
          birthday,
          politic,
          companyPhone,
          topicWord,
        } = this.$com.confirm(res, 'data.content', {})
        const transformDate = (data) => {
          // 格式化动态添加的行数据中的日期
          const list = JSON.parse(data)
          if (list && list.length > 0) {
            const result = list.map((item, index) => {
              if (item.date && item.date.length > 0) {
                const date = [ ...item.date ]
                item.date = [ this.$moment(date[0]), this.$moment(date[1]) ]
                this.$delete(item, 'index')
              }
              return item
            })
            return result
          } else {
            return []
          }
        }
        // 设置省市区级联选择框的回显
        this.setAreaOptions(companyAddressId)
        this.$nextTick(() => {
          this.setAge(birthday)
          this.form.setFieldsValue({
            loginPhone,
            name,
            sex,
            minority,
            workCompany,
            // identity,
            companyNature,
            // companyAddressId: addressIds,
            // belongDepartment,
            jobTitle,
            position,
            // partTime,
            birthday: this.$moment(birthday),
            politic,
            companyPhone,
          })
          this.$refs.jobStudy.initialData({
            graduatedSchool,
            education,
            bachelor,
            profession,
            workExperience: transformDate(workExperience),
            mailingAddress,
            phone,
            email
          })
          this.$refs.jobSpace.initialData({
            researchDirection,
            // performance,
            achievements: transformDate(achievements),
            // workArea,
            // professionGroup,
            provinceConfirm,
            unitConfirm,
            // historyWork,
            topicWord,
          })
          if(portraitImg != null){
            this.fileList.push({
              uid   : '-1',
              name  : portraitImg,
              status: 'done',
              url   : portraitImg
            })
          }
        })
      })
    },
    setAge(date) {
      this.age = date ? this.$moment().diff(date, 'years') : null
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
      let personalPhoto = {}
      if(this.fileList.length>0){
        //当有上传一寸照时，作如下判断
        if(this.fileList[0].uid == '-1'){
          // 说明未修改一寸照
          personalPhoto.portraitImg = this.fileList[0].name
        }else{
          // 说明有修改一寸照
          personalPhoto.fileId = this.fileList[0].uid
        }
      }
      if (formsAll) {
        let data = Object.assign({},
          this.$refs.jobStudy.formJob.getFieldsValue(),
          this.$refs.jobSpace.formSpace.getFieldsValue(),
          this.form.getFieldsValue(),
          personalPhoto
        )
        this.forMat(data)
      } else {
        this.$modal.error({
          title     : '表单验证未通过',
          content   : '请检查输入',
          okText    : '确认',
          cancelText: '取消',
        })
      }
    }
  },
}
</script>
<style scoped>
.target { position: absolute; z-index: 10; right: 33px; top: 240px; padding: 10px 8px; border-radius: 2px; background: white;
  -moz-box-shadow: -1px 0px 5px #878787;
  -webkit-box-shadow: -1px 0px 5px #878787;
  box-shadow: -1px 0px 5px #878787;
}
.target .icon { text-align: right; cursor: pointer; color: #1890ff; }
.create-talent { overflow: auto; }
</style>
<style>
.avatar-uploader > .ant-upload { width: 90%; height: 220px; }
.avatar-uploader .ant-upload-list { width: 100%;}
.avatar-uploader .ant-upload-list-picture-card .ant-upload-list-item { width: 90%;height: 220px;}
</style>


