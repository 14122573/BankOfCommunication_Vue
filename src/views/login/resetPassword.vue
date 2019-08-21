<template>
	<div class="findPassword">
		<h2>忘记密码</h2>
		<div v-if="appearIndex==0" class='linksTips'>
			<div @click='appearIndex=1'>
				<a-icon type="link" />已绑定用户，点击这里找回密码</div>
			<div @click='appearIndex=2'>
				<a-icon type="link" />其他用户，点击这里找回密码</div>
		</div>
		<div v-if="appearIndex==1">
			已绑定用户,请联系管理员进行修改
			<div @click='appearIndex=0' class='linksTips'>
				<a-icon type="link" />点击返回，重新选择用户类型</div>
		</div>
		<a-form :form="formRegister" class="register-form" v-if="appearIndex==2">
			<a-form-item>
				<a-input v-decorator="[
		  						'username',
		  						{   validateTrigger:'blur',
		  							rules: [{validator:validatePhoneForget}]
		  						}
		  					]"
				 placeholder="手机号">
					<a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
				</a-input>
			</a-form-item>
			<a-form-item>
				<a-row type="flex">
					<a-col :span="15">
						<a-input v-decorator="[
		  								'code',
		  								{
		  									validateTrigger:'blur',
		  									rules: [
		  										{ validator:validateCode}
		  										]
		  								}
		  							]"
						 placeholder="手机验证码" :disabled='disableCode' type="text" autocomplete="off">
							<a-icon slot="prefix" type="code" style="color: rgba(0,0,0,.25)" />
						</a-input>
					</a-col>
					<a-col :span="8" :offset="1">
						<a-button type="primary" :disabled='disableBtn' ghost @click="sendCode" size="small" style="height:42px;min-width: 40px;">
							{{btnTxt}}
						</a-button>
					</a-col>
				</a-row>
			</a-form-item>
			<input type="password" style="display:none">
			<a-form-item>
				<a-input v-decorator="[
		  						'pwd',
		  						{
		  							rules: [{ required: true,whitespace:true, message: '请输入新密码!' }, {
		  							validator: validateToNextPassword,
		  							}]
		  						 }
		  					]"
				 :type="isType" placeholder="新密码" autocomplete="off" @focus='pasBlur'>
					<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
				</a-input>
			</a-form-item>
			<testStrong :pwd='formRegister.getFieldValue("pwd")' v-show='formRegister.getFieldValue("pwd")!=""&&formRegister.getFieldValue("pwd")!=undefined'></testStrong>
			<a-form-item>
				<a-input v-decorator="[
		  						'rePassword',
		  						{
		  							rules: [{ required: true,whitespace:true,  message: '请再次输入新密码!' }, {
		  							validator: compareToFirstPassword,
		  						}] }
		  					]"
				 :type="isType" placeholder="再次输入新密码" @blur="handleConfirmBlur" autocomplete="off" @focus='pasBlur'>
					<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
				</a-input>
			</a-form-item>
			<a-form-item>
				<a-button type="primary" block  html-type="submit" class="login-form-button" @click="handleFindPwd">
					重置密码
				</a-button>
				<a @click="handleJump" class="login-form-register">
					找回密码?去登录
				</a>
			</a-form-item>
		</a-form>
	</div>
</template>

<script>
import testStrong from '@/components/testPwd'
export default {
  name: 'register',
  components: {
    testStrong
  },
  beforeCreate() {
    this.formRegister = this.$form.createForm(this)
  },
  data() {
    return {
      pageType: 'login',
      btnTxt: '发送验证码',
      disableBtn: true,
      timer: null,
      disableCode: false,
      loginFailMsg: '',
      visibleError: false,
      confirmDirty: false,
      isType: 'text',
      appearIndex: 0
    }
  },
  methods: {
    //校验手机号--忘记密码
    validatePhoneForget(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入手机号!')
      } else {
        if (!this.$com.checkPhone(value)) {
          callback('手机号输入不合法!')
          this.disableBtn = true
        } else {
          this.disableBtn = false
          callback()
        }
      }
    },
    //手机验证码校验
    validateCode(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入手机验证码!')
      } else {
        if (!/^\d{6}$/.test(value)) {
          callback('请输入6位数字验证码!')
        } else {
          callback()
        }
      }
    },
    //密码重复密码校验
    validateToNextPassword(rule, value, callback) {
      const form = this.formRegister
      if (value && this.confirmDirty) {
        form.validateFields(['rePassword'], {
          force: true
        })
      }
      callback()
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.formRegister
      if (value && value !== form.getFieldValue('pwd')) {
        callback('密码输入不一致!')
      } else {
        callback()
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    pasBlur() {
      this.isType = 'password'
    },
    //发送验证码
    sendCode() {
      let links = ''
      // 				if (this.redirectUrlPrefix != 'null') {
      // 					links = '?redirectUrl=' + this.$cookie.get('redirectUrl')
      // 				}
      this.$ajax.get({
        url: this.$api.GET_SEND_CODE.replace('{phone}', this.formRegister.getFieldValue('username')) + links
      }).then(res => {
        if (res.code == '200') {
          this.disableCode = false
          this.disableBtn = true
          let num = 60
          const interval = () => {
            this.timer = setInterval(() => {
              if (num <= 0) {
                this.clearTimer()
                return
              }
              this.btnTxt = (num -= 1) + 's'
            }, 1000)
          }
          interval()
        }
      })
    },
    //提交找回密码
    handleFindPwd() {
      this.formRegister.validateFields((err, values) => {
        if (!err) {
          const params = Object.assign(values, {
            newPwd: values.pwd
          })
          delete params['pwd']
          delete params['rePassword']
          this.$ajax.post({
            url: this.$api.POST_FIND_PASSWORD,
            params: params
          }).then(res => {
            if (res.code == '200') {
              this.$message.success('找回密码成功！')
              this.pageType = 'login'
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    handleJump() {
      this.$emit('on-change', 'login')
    }
  }
}
</script>

<style scoped>
	.form>div {
		width: 260px;
		position: absolute;
		left: 35px;
		top: 35px;
	}

	h2 {
		font-size: 24px;
		text-align: left;
		height: 24px;
		line-height: 24px;
		font-weight: 500;
		margin: 0 0 22px 0;
	}

	.login-form,
	.register-form {
		max-width: 300px;
		text-align: left;
	}

	.ant-form label {
		text-align: left;
		font-size: 12px;
		color: #939a9f;
	}

	.register .login-form-button {
		width: 100%;
	}

	.ant-input-affix-wrapper,
	.login-form-button {
		height: 44px;
	}

	.linksTips {
		color: #1890ff;
		cursor: pointer;
	}

	.linksTips div {
		margin: 0 0 10px 0;
	}
</style>
