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
        <a-col span="24" v-if="baseType=='breed'">
        <!-- 仅水产品种信息编辑展示 -->
					<a-form-item label="计量单位" v-bind="colSpe">
						<a-input placeholder="请输入品种计量单位"  v-decorator="['breedUnit',rules.breedUnit]"> </a-input>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>

<script>
export default {
  name:'changePassword',
  props: {
    item:{
      type:Object,
      required:true,
    },
    baseType:{
      type:String,
      required:true
    },
    resetShow:{
      type:Boolean,
      required:true
    }
  },
  data() {
    return {
      apis:{
        put:'',
        detail:''
      },
      isShow: false,
      colSpe: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        }
      },
      rules: {
        title: {
          validateTrigger: 'blur',
          rules: [{ required: true }]
        },
        breedUnit: {
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
        this.$nextTick(function () {
          this.editForm.setFieldsValue({ title: !this.item.name?'': this.item.name })
          switch (this.baseType) {
          case 'breed':
            this.editForm.setFieldsValue({ breedUnit: !this.item.unit?'': this.item.unit })
            break
          default:
            break
          }
        })
      }
    }
  },
  created(){
    this.initModalTitle()
  },
  methods: {
    initModalTitle(){
      switch (this.baseType) {
      case 'breed':
        this.name.modalTitle = '编辑水产品种大类'
        this.name.formLabel = '水产品种大类名称'
        this.name.formPlaceHolder = '请输入名称'
        this.apis.put = this.$api.PUT_SYSBASICINFO_BREED
        break
      default:
        break
      }
      this.$nextTick(function () {
        this.editForm.setFieldsValue({ title: !this.item.name?'': this.item.name })
        switch (this.baseType) {
        case 'breed':
          this.editForm.setFieldsValue({ breedUnit: !this.item.unit?'': this.item.unit })
          break
        default:
          break
        }
      })
    },
    handleOk() {
      this.editForm.validateFields(err => {
        if (!err) {
          this.$ajax.put({
            url: this.apis.put.replace('{id}', this.item.id),
            params: {
              name: this.editForm.getFieldValue('title'),
              unit: this.createForm.getFieldValue('breedUnit')
            }
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('修改成功')
              this.resetForm()
              this.$emit('on-success',true)
            }
          })
        }else{
          this.$com.getFormValidErrTips(this,err)
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
