<template>
	<!-- 重置密码表单 -->
	<a-modal :maskClosable="false" cancelText="取消" okText="确认" @ok="handleResetOk" @cancel="handleCancel" :width="465"
	 title="重置密码" :visible="isShow">
		<a-form :form="resetData">
			<a-row>
				<a-col span="24">
					<a-form-item label="新密码" v-bind="colSpe">
						<a-input :type="pswType" @focus="pswType = 'password'" placeholder="新密码需大于6位且含字母和数字" autocomplete="off"
						 v-decorator="['newPwd',rules.newPwd]">
						</a-input>
					</a-form-item>
				</a-col>
				<a-col offset='6' span="16" v-if="isShow">
					<testStrong id="strong" :width="90" :pwd='resetData.getFieldValue("newPwd")' v-show='passwordStrength'></testStrong>
				</a-col>
				<a-col span="24">
					<a-form-item label="重复密码" v-bind="colSpe">
						<a-input :type="pswType" placeholder="再次输入新密码" @blur="handleConfirmBlur" autocomplete="off" @focus="pswType = 'password'"
						 v-decorator="[ 'rePassword',rules.rePassword]">
						</a-input>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-modal>
</template>

<script>
import testStrong from '@/components/testPwd'
export default {
  components: {
    testStrong
  },
  props: ['resetPwdShow'],
  beforeCreate() {
    this.resetData = this.$form.createForm(this)
  },
  data() {
    return {
      passwordStrength: false,
      pswType: 'text',
      isShow: false,
      colSpe: {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 16
        }
      },
      confirmDirty: false,
      rules: {
        newPwd: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            validator: this.validateToNextPassword,
          }]
        },
        rePassword: {
          validateTrigger: 'blur',
          rules: [{
            required: true,
            whitespace: true,
            message: '请再次输入新密码!'
          }, {
            validator: this.compareToFirstPassword,
          }]
        }
      }
    }
  },
  watch: {
    resetPwdShow() {
      this.isShow = this.resetPwdShow
    }
  },
  methods: {
    handleResetOk() {
      this.resetData.validateFields((err, values) => {
        if (!err) {
          this.$emit('on-ok', values)
        }
      })
    },
    //密码重复密码校验
    validateToNextPassword(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入新密码！')
        this.passwordStrength = false
      } else {
        if (!this.$com.checkPassword(value)) {
          callback('请输入6位以上的数字字母组合！')
          this.passwordStrength = false
        } else {
          if (value && this.confirmDirty) {
            form.validateFields(['rePassword'], {
              force: true
            })
          }
          callback()
          this.passwordStrength = true
        }
      }
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.resetData
      if (value && value !== form.getFieldValue('newPwd')) {
        callback('密码输入不一致!')
      } else {
        callback()
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    handleCancel() {
      this.$emit('on-cancel')
    },
    resetForm() {
      this.confirmDirty=false
      this.passwordStrength=false
      this.resetData.resetFields()
    }
  }
}
</script>

<style>
</style>
