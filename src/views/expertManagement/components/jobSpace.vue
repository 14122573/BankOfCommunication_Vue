<template>
  <a-form :form="formSpace">
      <!-- 工作领域信息 -->
      <div style="margin:0 16px;">
        <a-row>
          <a-col span="11" :offset="1">
            <a-form-item label="主要研究领域" v-bind="textSpa">
              <!-- <a-select v-decorator="['researchDirection',{rules:rules.researchDirection}]" :options="options.researchDirectionList" placeholder="请选择"></a-select> -->
              <a-input v-decorator="['researchDirection']" placeholder="请输入研究领域（可分次添加多条）"
                @blur="handleInputResearchDirection" @keyup.enter="handleInputResearchDirection"></a-input>
            </a-form-item>
            <a-row class="nearTop">
              <a-col :span="4"></a-col>
              <a-col :span="20">
                <template v-for="tag in researchDirectionTags">
                  <a-tag  color="blue" class="linkRule-tag" :title="tag" :key="tag" closable :afterClose="() => handleCloseResearchDirection(tag)">
                    {{tag}}
                  </a-tag>
                </template>
              </a-col>
            </a-row>
          </a-col>
          <a-col span="1"><a-button type="primary" shape="circle" @click="handleInputResearchDirection" 
            style="margin-top:3.5px;">+</a-button></a-col>
          <a-col span="10">
            <a-form-item label="关键词" v-bind="textSpa">
              <a-input v-decorator="['topicWord']" placeholder="请输入主题词（可分次添加多条）"
                @blur="handleInputTopicWord" @keyup.enter="handleInputTopicWord"></a-input>
            </a-form-item>
            <a-row class="nearTop">
              <a-col :span="4"></a-col>
              <a-col :span="20">
                <template v-for="tag in topicWordTags">
                  <a-tag  color="blue" class="linkRule-tag" :title="tag" :key="tag" closable :afterClose="() => handleTopicWord(tag)">
                    {{tag}}
                  </a-tag>
                </template>
              </a-col>
            </a-row>
          </a-col>
          <a-col span="1"><a-button type="primary" shape="circle"  @click="handleInputTopicWord"
            style="margin-top:3.5px;">+</a-button></a-col>
        </a-row>
        <a-row :gutter="10" v-for="(item, i) in achievementsList" :key="i">
          <a-col span="7" :offset="1">
            <a-form-item :label="i > 0 ? `主要成果${i + 1}` : '主要成果1'" v-bind="col">
              <a-select v-decorator="[`achievements[${i}].type`]" allowClear :options="options.awardTypeList" placeholder="请选择成果类别"></a-select>
            </a-form-item>
          </a-col>
          <a-col span="10">
            <a-form-item>
              <a-input v-decorator="[`achievements[${i}].content`]" placeholder="请输入主要内容" />
            </a-form-item>
          </a-col>
          <a-col span="4">
            <a-form-item>
              <!-- <a-range-picker format="YYYY-MM"  v-decorator="[`achievements[${i}].date`]"/> -->
              <a-month-picker format="YYYY-MM" v-decorator="[`achievements[${i}].date`]"/>
            </a-form-item>
          </a-col>
          <a-col span="2">
            <div v-if="i > 0" class="del-btn"><a-icon @click="deleteAchievements(i)" type="delete" /></div>
          </a-col>
        </a-row>
        <a-row>
          <a-col span="20" offset="3"><a-button class="addNewData" @click="addAchievements" type="dashed" block>+ 新增一条成果</a-button></a-col>
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
      <!-- 相关管理信息 -->
      <!-- <div v-if="isExpert" class="layoutMargin detailsPartSection">
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
          </a-row> -->
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
        <!-- </div>
      </div> -->
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
      topicWordTags:[],
      researchDirectionTags:[],
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
      var jobSpace=JSON.parse(JSON.stringify(data))
      this.researchDirectionTags=jobSpace.researchDirection?jobSpace.researchDirection.split('、'):[]
      this.topicWordTags=jobSpace.topicWord?jobSpace.topicWord.split('、'):[]
      this.$delete(data, 'researchDirection')
      this.$delete(data, 'topicWord')
      for(let i=0;i<data.achievements.length;i++){
        if(data.achievements[i].date){
          data.achievements[i].date=this.$moment(data.achievements[i].date,'YYYY-MM')
        }
      }
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
      this.achievementsList = result.length <= 0 ? [{}] : result
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
    //删除topicWordTags
    handleTopicWord(removedTag) {
      const tags = this.topicWordTags.filter(tag => tag !== removedTag)
      this.topicWordTags = tags
    },
    //组装topicWordTags数组
    handleInputTopicWord() {
      const inputValue = this.formSpace.getFieldValue('topicWord')?this.formSpace.getFieldValue('topicWord'):''
      if(inputValue && inputValue!=''){
        let tags = this.topicWordTags
        if (inputValue && tags.indexOf(inputValue) === -1) {
          this.topicWordTags.push(inputValue)
        }
      }else{
        this.$modal.error({
          title: '请先输入内容！',
          okText: '确认',
        })
      }
    },
    //删除researchDirectionTags
    handleCloseResearchDirection(removedTag) {
      const tags = this.researchDirectionTags.filter(tag => tag !== removedTag)
      this.researchDirectionTags = tags
    },
    //组装researchDirectionTags数组
    handleInputResearchDirection() {
      const inputValue = this.formSpace.getFieldValue('researchDirection')?this.formSpace.getFieldValue('researchDirection'):''
      if(inputValue && inputValue!=''){
        let tags = this.researchDirectionTags
        if (inputValue && tags.indexOf(inputValue) === -1) {
          this.researchDirectionTags.push(inputValue)
        }
      }else{
        this.$modal.error({
          title: '请先输入内容！',
          okText: '确认',
        })
      }
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
.nearTop{
  margin-top: -10px;
  margin-bottom: 10px;
}
.nearTop .linkRule-tag{
  margin-bottom: 5px;
}
.linkRule-tag.ant-tag{
  white-space:normal;
  height:auto;
  word-break:break-all;
}
.addNewData{
  border-color: #1890FF;
}
</style>
