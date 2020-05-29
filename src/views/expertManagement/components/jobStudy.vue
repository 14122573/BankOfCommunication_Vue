<template>
<a-form :form="formJob" style="margin-bottom:25px;">
  <!-- 工作学习经历 -->
    <div style="margin:0 16px;">
      <a-row>
        <a-col span="8">
          <a-form-item label="毕业院校" v-bind="colSpa">
            <a-input v-decorator="['graduatedSchool',{rules:rules.graduatedSchool}]" placeholder="请输入"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="最高学历" v-bind="colSpa">
            <a-select v-decorator="['education',{rules:rules.education}]" :options="options.educationList" placeholder="请选择"></a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="最高学位" v-bind="colSpa">
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
      <a-row :gutter="10" v-for="(item, i) in expeirenceList" :key="i">
        <a-col span="10">
          <a-form-item :label="i > 0 ? `工作/学习经历${i + 1}` : '工作/学习经历1'" v-bind="col">
            <!-- <a-range-picker format="YYYY-MM" 
              v-decorator="[`workExperience[${i}].date`,{rules:rules.experience.date}]"
            /> -->
            <a-range-picker :value="workExperienceDate[i]"
              :placeholder="['开始时间', '结束时间']" format="YYYY-MM" @change="(value)=>handleChange(value, i)"
              :mode="mode" @panelChange="(value, mode)=>handlePanelChange(value, mode,i)"
            />
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item>
            <a-input v-decorator="[`workExperience[${i}].name` ]" placeholder="请输入单位/学校" />
          </a-form-item>
        </a-col>
        <a-col span="6">
          <a-form-item>
            <a-input v-decorator="[`workExperience[${i}].content` ]" placeholder="请输入主要内容" />
          </a-form-item>
        </a-col>
        <a-col span="2">
          <div v-if="i > 0" class="del-btn"><a-icon @click="deleteExperience(i)" type="delete" /></div>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="20" offset="3"><a-button class="addNewData" @click="addExperience" type="dashed" block>+ 新增一条经历</a-button></a-col>
      </a-row>
      <!-- <a-row>
        <a-col span="16">
          <a-form-item label="工作经历" v-bind="textSpa">
            <a-textarea rows="2" v-decorator="['workExperience']" placeholder="请输入"></a-textarea>
          </a-form-item>
        </a-col>
      </a-row> -->
    </div>
  <!-- 联系信息 -->
  <!-- <div class="layoutMargin detailsPartSection">
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
  </div> -->
</a-form>
</template>
<script>
export default {
  name : 'jobStudy',
  props: {
    colSpa: {
      type   : Object,
      default: () => {
        return {}
      }
    },
    textSpa: {
      type   : Object,
      default: () => {
        return {}
      }
    },
    options: {
      type   : Object,
      default: () => {
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
      formJob: this.$form.createForm(this),
      col    : {
        labelCol  : { span: 8 },
        wrapperCol: { span: 16 }
      },
      mode              : [ 'month', 'month' ],
      workExperienceDate: [], //工作时间
      rules             : {
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
            required  : true,
            type      : 'email',
            whitespace: true,
            message   : '请输入电子邮箱!'
          }
        ],
        experience: {
          date   : [ { required: true, message: '请选择起止时间!' } ],
          name   : [ { required: true, message: '请输入单位/学校!' } ],
          content: [ { required: true, message: '请输入主要内容!' } ],
        },
      },
      expeirenceList: [ {} ],
    }
  },
  methods: {
    handleChange(value, i) {
      this.workExperienceDate [i]= value
    },
    handlePanelChange(value, mode, i) {
      // console.log(value, mode,i,this.formJob.getFieldValue('workExperience'))
      // var str='workExperience['+i+'].date'
      // this.formJob.setFieldsValue({
      //   str:value
      // })
      this.workExperienceDate [i]= value
      this.mode = [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ]
    },
    initialData(data) {
      const workExperience=data.workExperience
      for(let i=0;i<workExperience.length;i++){
        const date=workExperience[i].date?workExperience[i].date:[]
        if(JSON.stringify(date)!='[]' && date.length>1){
          const workDate=[]
          workDate[0]=this.$moment(date[0], 'YYYY-MM')
          workDate[1]=this.$moment(date[1], 'YYYY-MM')
          this.workExperienceDate.push(workDate)
        }
      }
      this.setRows(workExperience)
      this.$nextTick(() => {
        this.formJob.setFieldsValue(data)
      })
    },
    setRows(rows) {
      const result = []
      rows.forEach(item => {
        result.push({})
      })
      this.expeirenceList = result.length <= 0 ? [ {} ] : result
    },
    addExperience() {
      this.expeirenceList.push({})
    },
    deleteExperience(i) {
      this.workExperienceDate.splice(i, 1)
      const workExperience = this.formJob.getFieldValue('workExperience')
      this.expeirenceList.splice(i, 1)
      workExperience.splice(i, 1)
      this.formJob.setFieldsValue({
        workExperience,
      })
    },
  },
}
</script>

<style scoped>
.del-btn {
  font-size: 18px;
  cursor: pointer;
  margin: 6px 0;
}
.del-btn:hover {
  color: red;
}
.addNewData{
  border-color: #1890FF;
}
</style>
