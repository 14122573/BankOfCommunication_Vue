<template>
	<div class="findPassword">
		<h2>忘记密码</h2>
		<div v-if="appearIndex==0" class='linksTips'>
			<div @click='appearIndex=2'>
				<img src="@/assets/images/bgResetPwd.png" alt="" class="bgImage">
				<a-row type="flex" justify="space-around" align="middle" :gutter="10" class='block'>
					<a-col span='6'><img src="../../assets/images/head1.png" alt="" class="icon"></a-col>
					<a-col span='16'>
						<div class="title">已绑定手机用户</div>
						<div class="desc">点击此处找回密码</div>
					</a-col>
				</a-row>
			</div>
			<div @click='appearIndex=1' class="unBindLinks">
				<img src="@/assets/images/bgResetPwd.png" alt="" class="bgImage">
				<a-row type="flex" justify="space-around" align="middle" class='block'>
					<a-col span='6'><img src="../../assets/images/head2.png" alt="" class="icon"></a-col>
					<a-col span='16'>
						<div class="title">未绑定手机用户</div>
						<div class="desc">点击此处联系管理员</div>
					</a-col>
				</a-row>
			</div>
		</div>
		<div v-if="appearIndex==1" style="margin-top: 100px;">
			<div>管理员联系方式</div>
			<div class='linksTips contract'>
				<div>
					<img src="@/assets/images/bgResetPwd.png" alt="" class="bgImage">
					<a-row type="flex" justify="space-around" align="middle" class='block'>
						<a-col span='6'><img src="../../assets/images/head1.png" alt="" class="icon"></a-col>
						<a-col span='16'>
							<div class="title">管理员姓名</div>
							<div class="desc" style="color:black">18300562365</div>
						</a-col>
					</a-row>
				</div>
			</div>
		</div>
		<div class="backPage" @click="handleJump" v-if="appearIndex!=2">
			<a-icon type="arrow-left" />立即登录
		</div>
		<a-form :form="formRegister" class="register-form" v-if="appearIndex==2">
			<a-form-item>
				<a-input v-decorator="[
		  						'username',
		  						{   validateTrigger:'change',
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
		  									validateTrigger:'change',
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
						<a-button type="primary" :disabled='disableBtn' ghost @click="sendCode" size="small" style="height:42px;min-width: 86px;">
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
		  							rules: [ {
		  							validator: validateToNextPassword,
		  							}]
		  						 }
		  					]"
				 :type="isType" placeholder="新密码需大于6位且含字母和数字" autocomplete="off" @focus='pasBlur'>
					<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
				</a-input>
			</a-form-item>
			<testStrong :pwd='formRegister.getFieldValue("pwd")'  v-show='passwordStrength'></testStrong>
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
				<a-button type="primary" block html-type="submit" class="login-form-button" @click="handleFindPwd">
					重置密码
				</a-button>
				<a @click="handleJump" class="login-form-register">
					立即登录
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
      disableCode: true,
      loginFailMsg: '',
      visibleError: false,
      confirmDirty: false,
      isType: 'text',
      appearIndex: 0,
	  passwordStrength:false
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
          if (value.length == 11) {
            let links = '?phone=' + value
            this.$ajax.get({
              url: this.$api.GET_CHECK_PHONE_EXIST + links
            }).then(res => {
              if (res.data.content === true) {
                this.disableBtn = false
                callback()
              } else {
                callback('不存在此用户!')
                this.disableBtn = true
              }
            })
          }
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
          this.$ajax.get({
            url: this.$api.POST_CHECK_PHONE_CODE.replace('{type}','back').replace('{phone}',this.formRegister.getFieldValue('username')).replace('{code}',value)
          }).then(res => {
            if (res.code != '200') {
              callback(res.data.msg)
            } else {
              callback()
            }
          })
						
        }
      }
    },
    //密码重复密码校验
    validateToNextPassword(rule, value, callback) {
      const form = this.formRegister
	  if(!value || value == undefined || value.split(' ').join('').length === 0){
	    callback('请输入密码！')
	    this.passwordStrength=false
	  }else{
	    if(!this.$com.checkPassword(value)){
	      callback('请输入6位以上的数字字母组合！')
	      this.passwordStrength=false
	    }else{
	       if (value && this.confirmDirty) {
	        form.validateFields(['rePassword'], {
	          force: true
	        })
	      }
	      callback()
	      this.passwordStrength=true
	    }
	  }
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
      this.$ajax.get({
        url: this.$api.GET_PHONE_CODE.replace('{phone}', this.formRegister.getFieldValue('username')).replace('{type}','back')
      }).then(res => {
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
      })
    },
    clearTimer(){
      this.timer=null
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
              this.$emit('on-success', '找回密码成功！')
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

	.findPassword {
		height: calc(100% - 35px);
		position: relative;
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
		margin-top: 20px;
	}

	.linksTips>div {
		margin: 0px 0 20px 0;
		width: 100%;
		height: 90px;
		position: relative;
	}

	.linksTips .title {
		color: black;
		font-weight: bold;
		font-size: 14px;
	}

	.linksTips .desc {
		font-size: 12px;
	}

	.bgImage {
		width: 100%;
		height: 90px;
		position: absolute;
		top: 0;
		left: 0;
	}

	.block {
		height: 90px;
	}

	.returnPage {
		text-align: center;
		height: 45px;
		line-height: 45px;
		margin-top: 100px !important;
		cursor: default;
	}

	.backPage {
		width: 100%;
		text-align: center;
		cursor: pointer;
		position: absolute;
		bottom: 30px;
		color: #0076FF;
	}

	.contract {
		cursor: default;
	}

	.icon {
		width: 50px;
		height: 50px;
	}
</style>
