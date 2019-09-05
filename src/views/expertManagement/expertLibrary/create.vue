<template>
    <div ref="create-talent" class="create-talent">
        <a-card>
            <a-row type="flex" slot="title" justify="space-between" align="middle">
                <a-col>
                    新增人才账号
                </a-col>
                <a-col>
                    <a-button type="primary" @click="back" ghost>取消</a-button>
                    <a-button type="primary" @click="save">保存</a-button>
                </a-col>
            </a-row>
        </a-card>
        <div class="content">
            <a-form :form="form">
            <a-card>
                <a-row type="flex" id="basic" slot="title" justify="space-between" align="middle">
                    <a-col>
                        基本信息
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-row>
                            <a-col span="12">
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
                                <a-form-item label="工作单位" v-bind="colSpa">
                                    <a-input v-decorator="['workCompany',{rules:rules.workCompany}]" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                            <a-col span="12">
                                <a-form-item label="身份证号" v-bind="colSpa">
                                    <a-input v-decorator="['identity',{rules:rules.identity}]" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="12">
                                <a-form-item label="单位性质" v-bind="colSpa">
                                    <a-select v-decorator="['companyNature',{rules:rules.companyNature}]" :options="options.companyNatureList" placeholder="请选择"></a-select>
                                </a-form-item>
                            </a-col>
                            <!-- <a-col span="12">
                                <a-form-item label="登录密码" v-bind="colSpa">
                                    <a-input v-decorator="['loginPwd',{rules:rules.loginPwd}]" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col> -->
                            <a-col span="12">
                                <a-form-item label="单位所在地" v-bind="colSpa">
                                    <a-input v-decorator="['companyAddress',{rules:rules.companyAddress}]" placeholder="请输入"></a-input>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="一寸照" v-bind="colSpa">
                            <a-upload
                                listType="picture-card"
                                :fileList="fileList"
                                @preview="handlePreview"
                                @change="handleChange"
                                class="avatar-uploader"
                                v-decorator="['portraitImg']"
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
                        <a-form-item label="所在部门" v-bind="colSpa">
                            <a-input v-decorator="['belongDepartment',{rules:rules.belongDepartment}]" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <!-- <a-col span="8">
                        <a-form-item label="所在系统" v-bind="colSpa">
                            <a-input v-decorator="['belongSystem',{rules:rules.belongSystem}]" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col> -->
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
                <a-row>
                    <a-col span="16">
                        <a-form-item label="主要社会兼职" v-bind="textSpa">
                            <a-input v-decorator="['partTime']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            <!-- 工作学习经历 -->
            <a-card class="margin-card">
                <a-row id="job" type="flex" slot="title" justify="space-between" align="middle">
                    <a-col>
                        工作学习经历
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="毕业院校" v-bind="colSpa">
                            <a-input v-decorator="['graduatedSchool',{rules:rules.graduatedSchool}]" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="学历" v-bind="colSpa">
                            <a-select v-decorator="['education',{rules:rules.education}]" :options="options.educationList" placeholder="请选择"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="学位" v-bind="colSpa">
                            <a-select v-decorator="['bachelor',{rules:rules.bachelor}]" :options="options.bachelorList" placeholder="请选择"></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="所学专业" v-bind="colSpa">
                            <a-input v-decorator="['profession',{rules:rules.profession}]" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="工作经历" v-bind="textSpa">
                            <a-input v-decorator="['workExperience']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            <!-- 联系信息 -->
            <a-card class="margin-card">
                <a-row id="message" type="flex" slot="title" justify="space-between" align="middle">
                    <a-col>
                        联系信息
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="通讯地址" v-bind="colSpa">
                            <a-input v-decorator="['mailingAddress',{rules:rules.mailingAddress}]" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="联系电话" v-bind="colSpa">
                            <a-input v-decorator="['phone',{rules:rules.phone}]" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="电子邮箱" v-bind="colSpa">
                            <a-input v-decorator="['email',{rules:rules.email}]" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            <!-- 工作领域信息 -->
            <a-card class="margin-card">
                <a-row id="space" type="flex" slot="title" justify="space-between" align="middle">
                    <a-col>
                        工作领域信息
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="主要相关研究方向" v-bind="colSpa">
                            <a-select v-decorator="['researchDirection']" :options="options.researchDirectionList" placeholder="请选择"></a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="主要工作业绩" v-bind="textSpa">
                            <a-input v-decorator="['performance']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="获奖成果" v-bind="textSpa">
                            <a-input v-decorator="['achievements']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            <!-- 相关管理信息 -->
            <a-card class="margin-card">
                <a-row id="management" type="flex" slot="title" justify="space-between" align="middle">
                    <a-col>
                        相关管理信息
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="工作领域" v-bind="colSpa">
                            <a-select v-decorator="['workArea',{rules:rules.workArea}]" :options="options.workAreaList" placeholder="请选择"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="专业组别" v-bind="colSpa">
                            <a-select v-decorator="['professionGroup',{rules:rules.professionGroup}]" :options="options.professionGroupList" placeholder="请选择"></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col span="8">
                        <a-form-item label="省级认定" v-bind="colSpa">
                            <a-radio-group v-decorator="['provinceConfirm',{rules:rules.provinceConfirm}]" :options="options.provinceConfirmList"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="8">
                        <a-form-item label="部级认定" v-bind="colSpa">
                            <a-radio-group v-decorator="['unitConfirm',{rules:rules.unitConfirm}]" :options="options.unitConfirmList"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="入库以来参加工作" v-bind="textSpa">
                            <a-input v-decorator="['historyWork']" placeholder="请输入"></a-input>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
            </a-form>
        </div>
        <a-anchor :offsetTop="260" :getContainer="()=> this.$refs['create-talent']" class="talent-anchor" >
            <a-anchor-link href="#basic" title="基本信息" />
            <a-anchor-link href="#job" title="工作学习经历" />
            <a-anchor-link href="#message" title="联系信息" />
            <a-anchor-link href="#space" title="工作领域信息" />
            <a-anchor-link href="#management" title="相关管理信息" />
        </a-anchor>
    </div>
            
</template>
<script>
export default {
  name: 'talent-create',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === null || value === '') {
        callback()
      } else {
        if (!this.$com.checkPhone(value)) {
          callback('手机号码不合法!')
        } else {
          callback()
        }
      }
    }
    const validatePhoneOrTel = (rule, value, callback) => {
      if (value === null || value === '') {
        callback()
      } else {
        if (!this.$com.checkPhone(value) && !this.$com.checkTel(value)) {
          callback('联系电话不合法!')
        } else {
          callback()
        }
      }
    }
    const validateIdentity = (rule, value, callback) => {
      if (!this.$com.checkID(value)) {
        callback('身份证号不正确!')
      } else {
        callback()
      }
    }
    return {
      form: this.$form.createForm(this),
      options: {
        sexList: [{ label: '男', value: '男' }, { label: '女', value: '女' }],
        provinceConfirmList: [
          { label: '是', value: '是' },
          { label: '否', value: '否' }
        ],
        unitConfirmList: [
          { label: '是', value: '是' },
          { label: '否', value: '否' }
        ],
        minorityList: [],
        companyNatureList: [],
        positionList: [],
        jobTitleList: [],
        educationList: [],
        bachelorList: [],
        workAreaList: [],
        professionGroupList: [],
        researchDirectionList: []
      },
      fileList: [],
      colSpa: {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
      },
      textSpa: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      previewVisible: false,
      previewImage: '',
      rules: {
        loginPhone: [
          { required: true, whitespace: true, message: '请输入登录手机号!' },
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
        // 工作学习经历
        graduatedSchool: [
          { required: true, whitespace: true, message: '请输入毕业院校!' }
        ],
        education: [
          { required: true, whitespace: true, message: '请选择学历!' }
        ],
        bachelor: [
          { required: true, whitespace: true, message: '请选择学位!' }
        ],
        profession: [
          { required: true, whitespace: true, message: '请输入所学专业!' }
        ],
        // 联系信息
        mailingAddress: [
          { required: true, whitespace: true, message: '请输入通讯地址!' }
        ],
        phone: [
          { required: true, whitespace: true, message: '请输入联系电话!' },
          { validator: validatePhoneOrTel }
        ],
        email: [
          {
            required: true,
            type: 'email',
            whitespace: true,
            message: '请输入电子邮箱!'
          }
        ],
        // 相关管理信息
        workArea: [
          { required: true, whitespace: true, message: '请选择工作领域!' }
        ],
        professionGroup: [
          { required: true, whitespace: true, message: '请选择专业组别!' }
        ],
        provinceConfirm: [
          { required: true, whitespace: true, message: '请选择省级认定!' }
        ],
        unitConfirm: [
          { required: true, whitespace: true, message: '请选择部级认定!' }
        ]
      }
    }
  },
  methods: {
    //   查询options
    getOptions() {
      let api = this.$api.DICTIONARY_TYPE_GET
      // let api='http://47.100.45.230:30000/mock/185/dictionary/{type}';
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
            url: api.replace('{type}', item.type)
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
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    // 取消
    back() {},
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
      let link,msg,methods
      if(this.$route.query.id){

      }else{
        link=this.$api.EXPORT_TYPE
        methods='post'
        msg='新增成功！'
      }
      this.$ajax[methods]({
        url: link,
        params:data
      })
        .then(res => {
          console.log(res)
        })
    },
    // 保存按钮
    save() {
      this.form.validateFields(err => {
        if (!err) {
          let data = JSON.parse(JSON.stringify(this.form.getFieldsValue()))
          this.forMat(data)
        }
      })
    }
  },
  mounted() {
    this.$ajax.all(this.getOptions()).then(() => {})
  }
}
</script>
<style scoped>
.content {
  padding: 20px;
}
.margin-card {
  margin-top: 20px;
}
.talent-anchor {
  position: absolute;
  right: 21px;
  top: 260px;
}
.create-talent {
  position: relative;
  overflow: auto;
  height: 100%;
}
</style>
<style>
.avatar-uploader > .ant-upload {
  width: 90%;
  height: 220px;
}
</style>


