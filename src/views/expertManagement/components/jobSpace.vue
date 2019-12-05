<template>
  <a-form :form="formSpace">
    <div class="layoutMargin detailsPartSection">
      <!-- 工作领域信息 -->
      <p class="detailsPartTitle" id="space">工作领域信息</p>
      <div style="margin:0 16px;">
        <a-row>
          <a-col span="8">
            <a-form-item label="主要相关研究方向" v-bind="colSpa">
              <a-select v-decorator="['researchDirection',{rules:rules.researchDirection}]" :options="options.researchDirectionList" placeholder="请选择"></a-select>
            </a-form-item>
          </a-col>
          <a-col span="16">
            <a-form-item label="主题词" v-bind="textSpa">
              <a-input v-decorator="['topicWord']" placeholder="请输入主题词（多个主题词请用、号隔开）"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="10" v-for="(item, i) in achievementsList" :key="i">
        <a-col span="10">
          <a-form-item :label="i > 0 ? `主要完成成果${i + 1}` : '主要完成成果'" v-bind="col">
            <a-range-picker v-decorator="[`achievements[${i}].date`]"/>
          </a-form-item>
        </a-col>
        <a-col span="4">
          <a-form-item>
            <a-select v-decorator="[`achievements[${i}].type`]" :options="options.awardTypeList" placeholder="请选择成果类别"></a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item>
            <a-input v-decorator="[`achievements[${i}].content`]" placeholder="请输入主要内容" />
          </a-form-item>
        </a-col>
        <a-col span="2">
          <div v-if="i > 0" class="del-btn"><a-icon @click="deleteAchievements(i)" type="delete" /></div>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="20" offset="3"><a-button @click="addAchievements" type="dashed" block>新增一条成果</a-button></a-col>
      </a-row>
        <!-- <a-row>
          <a-col span="16">
            <a-form-item label="主要工作业绩" v-bind="textSpa">
              <a-textarea rows="2" v-decorator="['performance']" placeholder="请输入"></a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col span="16">
            <a-form-item label="获奖成果" v-bind="textSpa">
              <a-textarea v-decorator="['achievements']" placeholder="请输入"></a-textarea>
            </a-form-item>
          </a-col>
        </a-row> -->
      </div>
    </div>
    <!-- 相关管理信息 -->
    <div v-if="isExpert" class="layoutMargin detailsPartSection">
      <p class="detailsPartTitle" id="management">相关管理信息</p>
      <div style="margin:0 16px;">
        <a-row>
          <a-col span="8" >
            <a-form-item label="省级认定" v-bind="colSpa">
              <a-radio-group v-decorator="['provinceConfirm',{rules:rules.provinceConfirm}]" :options="options.provinceConfirmList"/>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="部级认定" v-bind="colSpa">
              <a-radio-group v-decorator="['unitConfirm',{rules:rules.unitConfirm}]" :options="options.unitConfirmList"/>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row>
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
          <a-col span="8" v-if="this.type != 'talent'">
            <a-form-item label="省级认定" v-bind="colSpa">
              <a-radio-group v-decorator="['provinceConfirm',{rules:rules.provinceConfirm}]" :options="options.provinceConfirmList"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="this.type != 'talent'">
          <a-col span="8">
            <a-form-item label="部级认定" v-bind="colSpa">
              <a-radio-group v-decorator="['unitConfirm',{rules:rules.unitConfirm}]" :options="options.unitConfirmList"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col span="16">
            <a-form-item label="入库以来参加工作" v-bind="textSpa">
              <a-textarea v-decorator="['historyWork']" placeholder="请输入"></a-textarea>
            </a-form-item>
          </a-col>
        </a-row> -->
      </div>
    </div>
  </a-form>
</template>
<script>
export default {
  name:'jobSpace',
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
    },
    isExpert: {
      type: Boolean,
      default: true,
    },
    // type:{
    //   type:String,
    //   default:null
    // },
  },
  data(){
    return{
      formSpace: this.$form.createForm(this),
      col: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
      },
      rules:{
        // 相关管理信息
        researchDirection:[
          { whitespace: true, message: '请选择主要相关研究方向!' }
        ],
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
        ],
      },
      achievementsList: [{}],
    }
  },
  methods: {
    initialData(data) {
      this.setRows(data.achievements)
      this.$nextTick(() => {
        if (!this.isExpert) {
          this.$delete(data, 'provinceConfirm')
          this.$delete(data, 'unitConfirm')
        }
        this.formSpace.setFieldsValue(data)
      })
    },
    setRows(rows) {
      const result = []
      rows.forEach(item => {
        result.push({})
      })
      this.achievementsList = result.length <= 0 ? [{}] : []
    },
    addAchievements() {
      this.achievementsList.push({})
    },
    deleteAchievements(i) {
      const achievements = this.formSpace.getFieldValue('achievements')
      this.achievementsList.splice(i, 1)
      achievements.splice(i, 1)
      this.formSpace.setFieldsValue({
        achievements,
      })
    },
  },
}
</script>
<style scoped>
.space-form{
  padding-bottom: 20px;
}
.del-btn {
  font-size: 18px;
  cursor: pointer;
  margin: 6px 0;
}
.del-btn:hover {
  color: red;
}
</style>
