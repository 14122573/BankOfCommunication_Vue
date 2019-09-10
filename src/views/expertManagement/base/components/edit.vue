<template>
	<!-- 重置密码表单 -->
	<a-modal :maskClosable="false" cancelText="取消" okText="确认" @ok="handleOk" @cancel="handleCancel" :width="465"
	 :title="name.modalTitle" :visible="isShow">
		<a-form :form="editForm">
			<a-row>
        <a-col span="24">
					<a-form-item :label="name.formLabel" v-bind="colSpe">
						<a-input :placeholder="name.formPlaceHolder"  v-decorator="['title',rules.title]"> </a-input>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>

<script>
import common from '@/util/common'
export default {
  name:'changePassword',
  props: {
    item:{
      type:Object,
      required:true,
    },
    baseType:{
      type:String,
      required:true,
      validator (value) {
        // 0-民族 1-单位性质 2-职务 3-职称 4-学历 5-学位 6-工作领域 7-专业组别 8-研究方向
        return common.oneOf(value, ['0', '1', '2', '3', '4', '5', '6', '7', '8'])
      }
    },
    resetShow:{
      type:Boolean,
      required:true
    }
  },
  data() {
    return {
      isShow: false,
      colSpe: {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 16
        }
      },
      rules: {
        title: {
          validateTrigger: 'blur',
          rules: [{ required: true }]
        }
      },
      name:{
        modalTitle:'',
        formLabel:'',
        formPlaceHolder:''
      }
    }
  },
  beforeCreate() {
    this.editForm = this.$form.createForm(this)
  },
  watch: {
    baseType(){
      this.resetForm()
      this.initModalTitle()
    },
    resetShow() {
      this.isShow = this.resetShow
      if(this.isShow){
        this.editForm.setFieldsValue({ title: !this.item.name?'': this.item.name })
      }
    }
  },
  created(){
    this.initModalTitle()
  },
  methods: {
    initModalTitle(){
      switch (this.baseType) {
      case '0':
        this.name.modalTitle = '编辑民族'
        this.name.formLabel = '民族'
        this.name.formPlaceHolder = '请输入民族'
        break
      case '1':
        this.name.modalTitle = '编辑单位性质'
        this.name.formLabel = '单位性质'
        this.name.formPlaceHolder = '请输入单位性质'
        break
      case '2':
        this.name.modalTitle = '编辑职务'
        this.name.formLabel = '职务'
        this.name.formPlaceHolder = '请输入职务'
        break
      case '3':
        this.name.modalTitle = '编辑职称'
        this.name.formLabel = '职称'
        this.name.formPlaceHolder = '请输入职称'
        break
      case '4':
        this.name.modalTitle = '编辑学历'
        this.name.formLabel = '学历'
        this.name.formPlaceHolder = '请输入学历'
        break
      case '5':
        this.name.modalTitle = '编辑学位'
        this.name.formLabel = '学位'
        this.name.formPlaceHolder = '请输入学位'
        break
      case '6':
        this.name.modalTitle = '编辑工作领域'
        this.name.formLabel = '工作领域'
        this.name.formPlaceHolder = '请输入工作领域'
        break
      case '7':
        this.name.modalTitle = '编辑专业组别'
        this.name.formLabel = '专业组别'
        this.name.formPlaceHolder = '请输入专业组别'
        break
      case '8':
        this.name.modalTitle = '编辑研究方向'
        this.name.formLabel = '研究方向'
        this.name.formPlaceHolder = '请输入研究方向'
        break
      default:
        break
      }
    },
    handleOk() {
      this.editForm.validateFields(err => {
        if (!err) {
          this.$ajax.put({
            url: this.$api.PUT_EXPERT_BASE.replace('{id}', this.item.id),
            params: {
              type: this.baseType,
              name: this.editForm.getFieldValue('title')
            }
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('修改成功')
              this.resetForm()
              this.$emit('on-success',true)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    handleCancel() {
      this.resetForm()
      this.$emit('on-success',false)
    },
    resetForm() {
      this.editForm.resetFields()
    }

  }
}
</script>
