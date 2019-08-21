<template>
	<div class="loginFrame">
		<div class="loginForm">
			<div class="matching">
				<a-row type="flex" justify="start" align="middle" :gutter="10">
					<a-col offset="1"><img src="../../assets/images/logo.png" alt="" class="logo"></a-col>
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
								 placeholder="账户或手机号" autocomplete="off">
									<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
								</a-input>
							</a-form-item>
							<input type="password" style="display: none;">
							<a-form-item class="login-form-password">
								<a-input v-decorator="[ 'pwd', { validateTrigger:'blur', rules: [{ required: true,whitespace:true, message: '请输入密码!' }] } ]"
								 :type="isType" id="pwds" placeholder="密码" autocomplete="off" @focus='pasBlur'>
									<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
								</a-input>
							</a-form-item>
							<input type="text" style="display:none">
							<a-form-item>
								<a-row type="flex" justify="space-between">
									<a-col :span="12" class="login-form-chckbox">
										<a-checkbox :checked="remember" @change="keepLogin"  > 7天免登录 </a-checkbox>
									</a-col>
									<a-col :span="12">
										<a class="login-form-forgot" @click='pageType="findPassword"'> 忘记密码? </a>
									</a-col>
								</a-row>
								<div class="showError">
										<a-alert  type="error" :message="loginFailMsg" v-if="visibleError" showIcon closable :afterClose="handleClose" />
								</div>
								<a-button type="primary" html-type="submit"  class="login-form-button" @click="handleLogin">
									登录
								</a-button>
								<a @click="pageType = 'register'" class="login-form-register"> 没有账号?去注册 </a>
							</a-form-item>
						</a-form>
					</div>
				</transition>
				<Register v-if='pageType=="register"' @on-change='pageTypeChange'></Register>
				<ResetPassword v-if='pageType=="findPassword"' @on-change='pageTypeChange'></ResetPassword>
			</div>
		</div>
		<div class="footer">
			<p>主办单位：全国水产技术推广总站、中国水产协会&nbsp;&nbsp;&nbsp;&nbsp; 技术支持：博彦科技股份有限公司</p>
			<p>COPYRIGHT&copy;-2016 ALL RIGHTS RESERVED │ 沪ICP备13003917号 </p>
		</div>
	</div>
</template>

<script>
import { permission } from '@/util/mixins'
import testStrong from '@/components/testPwd'
import Register from '@/views/login/register'
import ResetPassword from '@/views/login/ResetPassword'
export default {
  name: 'Login',
  components: {
    testStrong,
    Register,
    ResetPassword
  },
  mixins: [permission],
  beforeCreate() {
    this.formLogin = this.$form.createForm(this)
    this.formRegister = this.$form.createForm(this)
  },
  data() {
    return {
      pageType: 'login',
      loginFailMsg: '',
      visibleError: false,
      isType: 'text',
      remember:false, // 设置是否7天免登录
    }
  },
  mounted() {
    this.setUrl()
    this.$cookie.set('KeepLogin',false,{ expires: 7 }) // 7天免登录默认是false
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
  watch: {
    pageType() {
      this.isType = 'text'
    }
  },
  methods: {
    keepLogin(e){
      this.remember = e.target.checked
      if(this.remember){
        this.$cookie.set('KeepLogin',true,{ expires: 7 })
      }else{
        this.$cookie.set('KeepLogin',false,{ expires: 7 })
      }
    },
    //存储redirectUrl
    setUrl() {
      if (this.redirectUrlPrefix != 'null') {
        this.$cookie.set('redirectUrl', this.getQueryString('redirectUrl') + '&sysCode=' + String(this.getQueryString('sysCode')))
      }
    },
    pasBlur() {
      this.isType = 'password'
    },
    //登录操作
    handleLogin(e) {
      this.formLogin.validateFields((err, values) => {
        if (!err) {
          let params = values
          if (this.redirectUrlPrefix != 'null') {
            params.redirectUrl = this.$cookie.get('redirectUrl')
          }
          this.$ajax.post({
            url: this.$api.POST_LOGIN,
            params: params
          }).then(res => {
            if (res.code == '200') {
              this.$cookie.set('canEnterBind', '200')
              this.jumpOpeation(res)
              this.visibleError = false
            } else {
              this.loginFailMsg = res.data.msg
              this.visibleError = true
            }
          })
        }
      })
    },
    //跳转操作
    jumpOpeation(res) {
      let gainDatas = res.data.content
      if (res.msg == 'choose') {
        //存储系统列表
        this.$cookie.set('systemLists', JSON.stringify(gainDatas))
        if (this.sysCode != 'null') {
          //列表存在该code  存在去匹配code值去获取跳转路径 不存在去绑定
          let data = gainDatas.find(item => item.sysDic.sysCode == this.sysCode)
          if (data) {
            let links = '?userId=' + data.id
            if (this.redirectUrlPrefix != 'null') {
              links = links + '&redirectUrl=' + this.$cookie.get('redirectUrl')
            }
            this.$ajax.get({
              url: this.$api.GET_SELECT_SYSTEM + links
            }).then(res => {
              let gainDatas = res.data.content
              if (res.msg != 'bind') {
                //不需要绑定
                if (gainDatas.redirectUrl) {
                  window.open(gainDatas.redirectUrl, '_parent')
                  this.$cookie.set('canEnterBind', '500')
                } else {
                  if (String(gainDatas.isNew) == 'true') {
                    this.$com.setToken(gainDatas.access_token, gainDatas.refresh_token)
                    // this.$cookie.set('token', gainDatas.access_token)
                    // this.$cookie.set('refresh_token', gainDatas.refresh_token)
                    this.$router.push({
                      name: 'home',
                    })
                  } else {
                    const openUrl = gainDatas.url + '?userId=' + gainDatas.userId + '&accessToken=' + gainDatas.access_token +
												'&refreshToken=' + gainDatas.refresh_token
                    window.open(openUrl, '_parent')
                    this.$cookie.set('canEnterBind', '500')
                  }
                }
              } else {
                //去绑定
                this.$router.push({
                  name: 'bindPhone',
                  query: {
                    id: gainDatas
                  }
                })
              }
            })
          } else {
            this.$router.push({
              name: 'bindPhone',
            })
          }
        } else {
          this.$router.push({
            name: 'bindPhone',
          })
        }
      } else if (res.msg == 'bind') {
        this.$router.push({
          name: 'bindPhone',
          query: {
            id: gainDatas
          }
        })
      } else if (res.msg == 'success') {
        if (gainDatas.redirectUrl) {
          window.open(gainDatas.redirectUrl, '_parent')
          this.$cookie.set('canEnterBind', '500')
        } else {
          if (String(gainDatas.isNew) == 'true') {
            this.$com.setToken(gainDatas.access_token, gainDatas.refresh_token)
            // this.$cookie.set('token', gainDatas.access_token)
            // this.$cookie.set('refresh_token', gainDatas.refresh_token)
            this.$router.push({
              name: 'home',
            })
          } else {
            const openUrl = gainDatas.url + '?userId=' + gainDatas.userId + '&accessToken=' + gainDatas.access_token +
								'&refreshToken=' + gainDatas.refresh_token
            window.open(openUrl, '_parent')
            this.$cookie.set('canEnterBind', '500')
          }
        }
      }
    },
    //关闭login错误提示框
    handleClose() {
      this.visibleError = false
    },
    //验证账户是否合法
    validateAccount(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入账户或手机号!')
      } else {
        callback()
      }
    },
    //得到url传递参数
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
    pageTypeChange(data){
      this.pageType=data
    }
  }
}
</script>

<style scoped>
	.loginFrame {
		width: 100%;
		height: 100%;
		min-height: 700px;
		min-width: 1000px;
		margin: 0px;
		padding: 0px;
		position: relative;
		background-image: url("../../assets/images/bg.jpg");
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
		background-image: url("../../assets/images/pic.jpg");
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
		margin-top: 20px;
		text-align: center;
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

	.showError {
		margin-top:10px;
		height: 40px;
	}
</style>
