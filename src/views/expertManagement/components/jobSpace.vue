<template>
    <span>
        <a-form :form="formSpace">
			
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
                            <a-textarea v-decorator="['performance']" placeholder="请输入"></a-textarea>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col span="16">
                        <a-form-item label="获奖成果" v-bind="textSpa">
                            <a-textarea v-decorator="['achievements']" placeholder="请输入"></a-textarea>
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
                            <a-textarea v-decorator="['historyWork']" placeholder="请输入"></a-textarea>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-card>
				</a-form>
    </span>
</template>
<script>
export default {
  beforeCreate() {
    this.formSpace = this.$form.createForm(this)
  },
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
  data(){
    return{
      rules:{
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
        ],
      }
    }
  },
}
</script>
