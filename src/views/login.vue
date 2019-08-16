	<template>
		<div class="loginFrame">
			<div class="loginForm">
				<div class="matching">
					<a-row type="flex" justify="start" align="middle" :gutter="10">
						<a-col offset="1"><img src="../assets/images/logo.png" alt="" class="logo"></a-col>
						<a-col>“综合渔技智能服务平台”</a-col>
					</a-row>
				</div>
				<div class="form">
					<transition name="fade" mode="out-in" v-if='pageType=="login"'>
						<div class="login">
							<h2>用户登录</h2>
							<a-form :form="formLogin" class="login-form">
								<a-form-item>
									<a-input v-decorator="[
										'username',
										{ validateTrigger:'blur',
										rules: [
										{ validator: validateAccount}] }
									]"
									 placeholder="账户或手机号">
										<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
									</a-input>
								</a-form-item>
								<a-form-item class="login-form-password">
									<a-input v-decorator="[
										 'pwd',
										 { rules: [{ required: true,whitespace:true, message: '请输入密码!' }] }
									 ]"
									 type="password" placeholder="密码">
										<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
									</a-input>
								</a-form-item>
								<a-form-item>
									<a-row type="flex" justify="space-between">
										<a-col :span="12" class="login-form-chckbox">
											<a-checkbox v-decorator="[
												 'remember',
												 {
													 valuePropName: 'checked',
													 initialValue: true,
												 }
												 ]">
												记住密码
											</a-checkbox>
										</a-col>
										<a-col :span="12">
											<a class="login-form-forgot" href="">
												忘记密码?
											</a>
										</a-col>
									</a-row>
									<a-row type="flex" justify="start" align="middle" :gutter="10" style="min-height:30px;color:red">
										<a-col>
											<a-icon style="color:red" type="info-circle" v-show='loginFailMsg!=""' />
										</a-col>
										<a-col>{{loginFailMsg}}</a-col>
									</a-row>
									<a-button type="primary" html-type="submit" class="login-form-button" @click="handleLogin">
										登录
									</a-button>
									<a @click="jumpToRegister" class="login-form-register">
										没有账号?去注册
									</a>
								</a-form-item>
							</a-form>
						</div>
					</transition>
					<transition name="fade" mode="out-in" v-if='pageType=="register"'>
						<div class="register">
							<h2>用户注册</h2>
							<a-form :form="formRegister" class="register-form">
								<a-form-item>
									<a-input v-decorator="[
										'username',
										{   validateTrigger:'blur',
											rules: [{validator:validatePhone}]
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
											 placeholder="手机验证码" :disabled='disableCode'>
												<a-icon slot="prefix" type="code" style="color: rgba(0,0,0,.25)" />
											</a-input>
										</a-col>
										<a-col :span="8" :offset="1">
											<a-button type="primary" :disabled='disableBtn' ghost @click="sendCode" size="small" style="height:42px">
												{{btnTxt}}
											</a-button>
										</a-col>
									</a-row>
								</a-form-item>
								<a-form-item>
									<a-input v-decorator="[
										'pwd',
										{
											rules: [{ required: true,whitespace:true, message: '请输入密码!' }, {
											validator: validateToNextPassword,
											}]
										 }
									]"
									 type="password" placeholder="密码">
										<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
									</a-input>
								</a-form-item>
								<testStrong :pwd='formRegister.getFieldValue("pwd")' v-show='formRegister.getFieldValue("pwd")!=""&&formRegister.getFieldValue("pwd")!=undefined'></testStrong>
								<a-form-item>
									<a-input v-decorator="[
										'rePassword',
										{
												 rules: [{ required: true,whitespace:true,  message: '请重复填写密码!' }, {
											validator: compareToFirstPassword,
										}] }
									]"
									 type="password" placeholder="重复密码" @blur="handleConfirmBlur">
										<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
									</a-input>
								</a-form-item>
								<a-form-item>
									<a-button type="primary" html-type="submit" class="login-form-button" @click="handleRegister">
										注册
									</a-button>
									<a @click="pageType='login'" class="login-form-register">
										已有账号?去登录
									</a>
								</a-form-item>
							</a-form>
						</div>
					</transition>
				</div>
			</div>
			<div class="footer">
				<p>主办单位：全国水产技术推广总站、中国水产协会&nbsp;&nbsp;&nbsp;&nbsp; 技术支持：博彦科技股份有限公司</p>
				<p>COPYRIGHT&copy;-2016 ALL RIGHTS RESERVED │ 沪ICP备13003917号 </p>
			</div>
		</div>
	</template>

<script>
import {
  permission
} from '@/util/mixins'
import testStrong from '@/components/testPwd'
export default {
  name: 'Login',
  components: {
    testStrong
  },
  mixins: [permission],
  beforeCreate() {
    this.formLogin = this.$form.createForm(this)
    this.formRegister = this.$form.createForm(this)
    // this.formLogin.setFieldsValue
  },
  data() {
    return {
      pageType: 'login',
      btnTxt: '发送验证码',
      disableBtn: true,
      timer: null,
      disableCode: false,
      loginFailMsg: ''
    }
  },
  mounted() {
    this.setUrl()
  },
  computed: {
    sysCode() {
      const code = String(this.getQueryString('sysCode'))
      return code
    },
    redirectUrlPrefix() {
      const code = String(this.getQueryString('redirectUrl'))
      return code
    }
  },
  methods: {
    setUrl() {
      if (this.redirectUrlPrefix != 'null') {
        this.$cookie.set('redirectUrl', this.getQueryString('redirectUrl') + '&sysCode=' + String(this.getQueryString(
          'sysCode')))
      }
    },
    handleLogin(e) {
      this.setUrl()
      this.formLogin.validateFields((err, values) => {
        if (!err) {
          let params = values
          if (this.redirectUrlPrefix != 'null') {
            params.redirectUrl = this.$cookie.get('redirectUrl')
          }
          this.$ajax.post(
            this,
            this.$api.POST_LOGIN,
            params,
            null,
            (res) => {
              if (res.code == '200') {
                this.$cookie.set('canEnterBind', '200')
                if (values.remember == 'true') {
                  this.$cookie.set('accountName', values.username)
                  this.$cookie.set('accountPwd', values.password)
                }
                this.loginFailMsg = ''
                if (res.msg == 'choose') {
                  this.$cookie.set('systemLists', JSON.stringify(res.data.content))
                  if (this.sysCode != 'null') {
                    let data = res.data.content.find(item => item.sysDic.sysCode == this.sysCode)
                    if (data) {
                      let links = '?userId=' + data.id
                      if (this.redirectUrlPrefix != 'null') {
                        links = links + '&redirectUrl=' + this.$cookie.get('redirectUrl')
                      }
                      this.$ajax.get(
                        this,
                        this.$api.GET_SELECT_SYSTEM + links, {},
                        null,
                        (res) => {
                          if (res.code == '200') {
                            if (res.msg != 'bind') {
                              this.$cookie.set('url', res.data.content.redirectUrl)
                              if (this.$cookie.get('url') != 'null' && this.$cookie.get('url') != 'undefined') {
                                window.open(this.$cookie.get('url'), '_parent')
                              }
                            } else {
                              this.$router.push({
                                name: 'bindPhone',
                                query: {
                                  id: res.data.content
                                }
                              })
                            }
                          }
                        }
                      )
                    } else {
                      this.$router.push({ name: 'bindPhone', })
                    }
                  } else {
                    this.$router.push({ name: 'bindPhone', })
                  }

                } else if (res.msg == 'bind') {
                  this.$router.push({
                    name: 'bindPhone',
                    query: {
                      id: res.data.content
                    }
                  })
                } else if (res.msg == 'success') {
                  this.$cookie.set('url', res.data.content.redirectUrl)
                  if (this.$cookie.get('url') != 'null' && this.$cookie.get('url') != 'undefined') {
                    window.open(this.$cookie.get('url'), '_parent')
                  } else {
                    this.$cookie.set('token', res.data.content.access_token)
                    this.$cookie.set('refresh_token', res.data.content.refresh_token)
                    this.$router.push({
                      name: 'home',
                    })
                  }
                }
              } else {
                this.loginFailMsg = res.data.msg
              }
            }
          )
        }
      })
    },
    jumpToRegister() {
      this.setUrl()
      this.pageType = 'register'
    },
    handleRegister(e) {
      this.formRegister.validateFields((err, values) => {
        if (!err) {
          let params = values
          if (this.redirectUrlPrefix != 'null') {
            params.redirectUrl = this.$cookie.get('redirectUrl')
          }
          this.$ajax.post(
            this,
            this.$api.POST_REGISTER,
            params,
            null,
            (res) => {
              if (res.code == '200') {
                this.$message.success('成功！')
                this.pageType = 'login'
              }
            },
          )
        }
      })
    },
    validateAccount(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入账户或手机号!')
      } else {
        callback()
      }
    },
    //得到传递参数
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var reg_rewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      var q = window.location.pathname.substr(1).match(reg_rewrite)
      if (r != null) {
        return unescape(r[2])
      } else if (q != null) {
        return unescape(q[2])
      } else {
        return null
      }
    },
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
    validatePhone(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入手机号!')
      } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback('手机号输入不合法!')
        } else {
          let links = '?phone=' + this.formRegister.getFieldValue('username')
          if (this.redirectUrlPrefix != 'null') {
            links = links + '&redirectUrl=' + this.$cookie.get('redirectUrl')
          }
          this.$ajax.get(
            this,
            this.$api.GET_CHECK_PHONE + links, {},
            null,
            (res) => {
              if (res.code == '200') {
                if (res.data.content == false) {
                  this.disableBtn = false
                  callback()
                } else {
                  callback('此用户已经存在!')
                }
              }
            }
          )
        }
      }
    },
    sendCode() {
      let links = ''
      if (this.redirectUrlPrefix != 'null') {
        links = '?redirectUrl=' + this.$cookie.get('redirectUrl')
      }
      this.$ajax.get(
        this,
        this.$api.GET_SEND_CODE.replace('{phone}', this.formRegister.getFieldValue('username')) + links, {},
        null,
        (res) => {
          if (res.code != '200') {
            return
          }
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
      )
    },
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
    }

  }
}
</script>

	<style scoped>
		.loginFrame {
			width: 100%;
			height: 100%;
			margin: 0px;
			padding: 0px;
			position: relative;
			background-image: url("../assets/images/bg.jpg");
			background-size: cover;
		}

		.loginForm {
			width: 900px;
			height: 460px;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}

		.loginForm>div {
			height: 460px;
			float: left;
			overflow: hidden;
		}

		.matching {
			width: 550px;
			background-image: url("../assets/images/pic.jpg");
			background-size: cover;
			padding: 10px 0;
			font-size: 26px;
			color: white;
		}

		.logo {
			height: 70px;
		}

		.form {
			width: 350px;
			background: white;
			position: relative;
		}

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

		.login-form-forgot {
			float: right;
			font-size: 12px;
		}

		.login-form-register {
			color: #0076FF;
			font-size: 14px;
		}

		.login .login-form-button {
			width: 100%;
			margin-top: 40px;
			text-align: center;
		}

		.register .login-form-button {
			width: 100%;
		}

		.footer {
			height: 50px;
			width: 100%;
			text-align: center;
			position: absolute;
			bottom: 0px;
			left: 0px;
			color: #cfd7f3;
			font-size: 14px;
		}

		.footer p {
			margin: 0;
		}

		.footer p:last-of-type {
			color: #829bdc;
		}

		.ant-input-affix-wrapper,
		.login-form-button {
			height: 44px;
		}
	</style>
