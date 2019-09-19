<template>
<a-form :form="formJob">
  <div class="layoutMargin detailsPartSection">
  <!-- 工作学习经历 -->
    <p class="detailsPartTitle" id="job">工作学习经历</p>
    <div style="margin:0 16px;">
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
            <a-textarea rows="2" v-decorator="['workExperience']" placeholder="请输入"></a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
    </div>
  </div>
  <div class="layoutMargin detailsPartSection">
    <!-- 联系信息 -->
    <p class="detailsPartTitle" id="message">联系信息</p>
    <div style="margin:0 16px;">
      <a-row class="formItemLine">
        <a-col span="8">
          <a-form-item label="通讯地址" v-bind="colSpa">
            <a-input v-decorator="['mailingAddress',{rules:rules.mailingAddress}]" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="联系电话" v-bind="colSpa">
            <a-input v-decorator="['phone',{validateTrigger: 'blur',rules:rules.phone}]" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="电子邮箱" v-bind="colSpa">
            <a-input v-decorator="['email',{rules:rules.email}]" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </div>
  </div>
</a-form>
</template>
<script>
export default {
  name:'jobStudy',
  props:{
    colSpa:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    textSpa:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    options:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data() {
    const validatePhoneOrTel = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (!this.$com.checkPhone(value) && !this.$com.checkTel(value)) {
          callback('联系电话不合法!')
        } else {
          callback()
        }
      }
    }
    return {
      rules: {
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
        ]
      }
    }
  },
  beforeCreate() {
    this.formJob = this.$form.createForm(this)
  },
}
</script>

