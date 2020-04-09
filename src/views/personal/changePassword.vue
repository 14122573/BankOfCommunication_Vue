<template>
	<!-- 重置密码表单 -->
	<a-modal :maskClosable="false" cancelText="取消" okText="确认" @ok="handleResetOk" @cancel="handleCancel" :width="465"
	 title="重置密码" :visible="isShow">
		<a-form :form="resetData">
			<a-row>
        <a-col span="24">
					<a-form-item label="原密码" v-bind="colSpe">
						<a-input :type="pswType" @focus="pswType = 'password'" placeholder="请输入原密码" autocomplete="off"
						 v-decorator="['oldPwd',rules.oldPwd]">
						</a-input>
					</a-form-item>
				</a-col>
				<a-col span="24">
					<a-form-item label="新密码" v-bind="colSpe">
						<a-input :type="pswType" @focus="pswType = 'password'" placeholder="新密码需大于6位且含字母和数字" autocomplete="off"
						 v-decorator="['newPwd',rules.newPwd]">
						</a-input>
					</a-form-item>
				</a-col>
				<a-col offset='6' span="16">
					<testStrong id="strong" :width="90" :pwd='!resetData.getFieldValue("newPwd")?"":resetData.getFieldValue("newPwd")' v-show='passwordStrength'></testStrong>
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
import { encryptDes } from '@/util/des-cryptojs'
export default {
  name      : 'changePassword',
  components: {
    testStrong
  },
  props: {
    resetPwdShow: {
      type    : Boolean,
      required: true
    }
  },
  beforeCreate() {
    this.resetData = this.$form.createForm(this)
  },
  data() {
    return {
      passwordStrength: false,
      pswType         : 'text',
      isShow          : false,
      colSpe          : {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 16
        }
      },
      rules: {
        oldPwd: {
          validateTrigger: 'blur',
          rules          : [ {
            required: true
          } ]
        },
        newPwd: {
          validateTrigger: 'blur',
          rules          : [ {
            required : true,
            validator: this.validateToNextPassword,
          } ]
        },
        rePassword: {
          validateTrigger: 'blur',
          rules          : [ {
            required  : true,
            whitespace: true,
            message   : '请再次输入新密码!'
          }, {
            validator: this.compareToFirstPassword,
          } ]
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
      this.resetData.validateFields(err => {
        if (!err) {
          this.$ajax.put({
            url   : this.$api.PUT_PERSONAL_RESET_PWD,
            params: {
              old     : encryptDes(this.resetData.getFieldValue('oldPwd')),
              newPwd  : encryptDes(this.resetData.getFieldValue('newPwd')),
              renewPwd: encryptDes(this.resetData.getFieldValue('rePassword'))
            }
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('重置密码成功')
              this.resetForm()
              this.$emit('on-close')
            }
          })
        }else{
          this.$com.getFormValidErrTips(this,err)
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
            this.resetData.validateFields([ 'rePassword' ], {
              force: true
            })
          }
          callback()
          this.passwordStrength = true
        }
      }
    },
    compareToFirstPassword(rule, value, callback) {
      if (value && value !== this.resetData.getFieldValue('newPwd')) {
        callback('密码输入不一致!')
      } else {
        callback()
      }
    },
    handleConfirmBlur(e) {
      this.confirmDirty = this.confirmDirty || !!e.target.value
    },
    handleCancel() {
      this.resetForm()
      this.$emit('on-close')
    },
    resetForm() {
      this.passwordStrength = false
      this.resetData.resetFields()
    }

  }
}
</script>
