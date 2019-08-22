<template>
	<div class="registerFrame">
		<div class="registerWapper">
			<div>
				<a-row type="flex" justify="start" align="middle" :gutter="10">
					<a-col><img src="../../assets/images/logo.png" alt="" class="logo"></a-col>
					<a-col>“智能渔技”综合信息服务平台</a-col>
				</a-row>
			</div>
			<div class="resigerFormWapper">
        <template v-if="!showSuccess">
          <div class='resigerTitle' >
            <span class="title">用户注册</span>
            <span class="errTips" v-if="err.showTips"><a-icon type="close-circle" />{{err.tips}}</span>
          </div>
          <a-form :form="formRegister" class="register-form">
            <a-row type="flex" justify="start" align="middle" :gutter="10">
              <a-col :span="7">
                <a-form-item>
                  <a-input v-decorator="[ 'phone', { validateTrigger:'change', rules: [ { validator: validatePhone}] } ]" placeholder="手机号">
                    <a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item>
                  <a-input v-decorator="[ 'code', { validateTrigger:'blur', rules: [ {validator: validateCode}] } ]" placeholder="手机验证码" :disabled='disPhoneCheckCode'>
                    <a-icon slot="prefix" type="code" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item>
                  <a-button type="primary" :disabled='allowSendCode' ghost @click="sendCode" size="small" style="height:42px"> {{sendCodeBtnText}} </a-button>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="start" align="middle" :gutter="10">
              <a-col span="7">
                <a-form-item>
                  <a-input autocomplete="off" v-decorator="[ 'password', { validateTrigger:'blur', rules: [{ required: true, message: '请输入密码!' }, { validator: validateToNextPassword}] } ]" type="password" placeholder="密码">
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col span="7">
                <a-form-item>
                  <input type="password" style="display: none;">
                  <a-input autocomplete="off" v-decorator="[ 'rePassword', { validateTrigger:'blur', rules: [{ required: true, message: '请重复填写密码!' }, { validator: compareToFirstPassword, }] } ]"
                    type="password" placeholder="重复密码" @blur="handleConfirmBlur">
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="start" align="middle" :gutter="10">
              <a-col span="7">
                <a-form-item>
                  <a-input autocomplete="off"
                    v-decorator="[ 'name', { validateTrigger:'blur', rules: [ { required: true, message: '请输入姓名!'}] } ]"
                    type="text" placeholder="姓名">
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col span="7">
                <a-form-item>
                  <a-input autocomplete="off" v-decorator="[ 'mail', { validateTrigger:'blur', rules: [ { type: 'email', message: '请输入合法邮箱!' }, { required: true, message: '请输入邮箱!' }] } ]"
                    type="text" placeholder="邮箱">
                    <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col span='10'>
                <a-form-item>
                  <a-input v-decorator="[ 'dept', { rules: [ { required: true, message: '请输入单位!' }] } ]" type="text" placeholder="单位">
                    <a-icon slot="prefix" type="bank" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="start" align="middle" :gutter="10">
              <a-col span='14'>
                <a-form-item>
                  <a-input v-decorator="[
                      'addr',
                      {
                      rules: [ {
                        required: true, message: '请输入地址!',
                      }]
                      }
                    ]"
                    type="text" placeholder="地址">
                    <a-icon slot="prefix" type="environment" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
              </a-col>

              <a-col span='7'>
                <a-form-item>
                  <a-input v-decorator="[
                      'zipCode',
                      {
                      validateTrigger:'blur',
                      rules: [ {
                        required: true,
                        validator: checkZipCode,
                      }]
                      }
                    ]"
                    type="text" placeholder="邮编">
                    <a-icon slot="prefix" type="code" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div class="formBtns" >
            <a-button type="primary" class="registerBtn" @click="toRegister"> 注册 </a-button>
            <a-button @click="toLogin" class="registerBtn tologin" > 已有账号，立即登录 </a-button>
          </div>
        </template>
        <template v-else>
          <div class='resigerSuccess'>
            <a-icon class='successIcon' type="check-circle" />
            <p class='tips'>注册成功</p>
            <a-button type="primary" class='toLogin' @click="toLogin" > 立即登录 </a-button>
          </div>
        </template>
			</div>
		</div>
    <div class="footer">
			<p>主办单位：全国水产技术推广总站、中国水产学会&nbsp;&nbsp;&nbsp;&nbsp; 技术支持：博彦科技股份有限公司</p>
			<p>COPYRIGHT&copy;-2019 ALL RIGHTS RESERVED</p>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Register',
  beforeCreate() {
    this.formRegister = this.$form.createForm(this)
  },
  data() {
    return {
      disPhoneCheckCode: false,
      sendCodeBtnText: '发送验证码',
      allowSendCode: true,
      sendCodeTimer: null,
      confirmDirty: false,
      err: {
        tips:'',
        showTips:false
      },
      showSuccess:false,
      inputAutoType:{
        password:'text',
        mail:'text'
      }
    }
  },
  mounted() {
  },
  methods: {
    toLogin(){
      this.$router.push({name:'login'})
    },
    /**
     * 校验手机号
     */
    validatePhone(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        this.allowSendCode = true
        callback('请输入手机号!')
      } else {
        if (!this.$com.checkPhone(value)) {
          callback('手机号输入不合法!')
        } else {
          if (value.length == 11) {
            let links = '?phone=' + value
            this.$ajax.get({
              url: this.$api.GET_CHECK_PHONE_EXIST + links
            }).then(res => {
              if (res.data.content === false) {
                this.allowSendCode = false
                callback()
              } else {
                callback('已存在此用户!')
                this.allowSendCode = true
              }
            })
          }
        }
      }
    },
    /**
     * 手机验证码校验
     */
    validateCode(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入手机验证码!')
      } else {
        if (!/^\d{6}$/.test(value)) {
          callback('请输入6位数字验证码!')
        } else {
          const phone = this.formRegister.getFieldValue('phone')
          const code = this.formRegister.getFieldValue('code')

          this.$ajax.post({
            url: this.$api.POST_CHECK_PHONE_CODE.replace('{type}', 'register').replace('{phone}', phone).replace('{code}', code)
          }).then(res => {
            if (res.code != '200') {
              callback(res.data.msg)
            } else {
              callback()
            }
          })
          callback()
        }
      }
    },
    /**
     * 密码重复密码校验
     */
    validateToNextPassword(rule, value, callback) {
      const form = this.formRegister
      if (value && this.confirmDirty) {
        form.validateFields(['rePassword'], {
          force: true
        })
      }
      callback()
    },
    /**
     * 校验两次密码一致
     */
    compareToFirstPassword(rule, value, callback) {
      const form = this.formRegister
      if (value && value !== form.getFieldValue('password')) {
        callback('密码输入不一致!')
      } else {
        callback()
      }
    },
    /**
     * 效验邮政编码
     */
    checkZipCode(rule, value, callback) {
      if (value && value != undefined) {
        if (!/^[0-9]{6}$/.test(value)) {
          callback('邮编格式不合法!')
        } else {
          callback()
        }
      } else {
        callback('请输入邮编!')
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    /**
     *
     */
    toRegister(){
      // 重置表单提交报错
      this.err.tips = ''
      this.err.showTips = false

      // 提交表单
      this.formRegister.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          let params = {
            'username':values.phone,
            'pwd':values.password,
            'code':values.code,
            'userInfo':{
              'mail':values.mail,
              'name':values.name,
              'dept':values.dept,
              'phone':values.phone,
              'addr':values.addr,
              'zipCode':values.zipCode
            }
          }

          this.$ajax.post({
            url: this.$api.POST_REGISTER,
            params: params
          }).then(res => {
            if (res.code == '200') {
              this.showSuccess = true
            } else {
              this.err.tips = res.data.msg
              this.err.showTips = true
            }
          })
        }
      })
    },
    /**
     * 发送手机验证码
     */
    sendCode() {
      const phone = this.formRegister.getFieldValue('phone')
      let params = {}
      let links = ''
      if (phone) {
        this.$ajax.get({
          url: this.$api.GET_PHONE_CODE.replace('{type}', 'register').replace('{phone}', phone)
        }).then(res => {
          this.disPhoneCheckCode = false
          this.allowSendCode = true
          let num = 60
          const interval = () => {
            this.sendCodeTimer = setInterval(() => {
              if (num <= 0) {
                this.clearTimer()
                return
              }
              this.sendCodeBtnText = (num -= 1) + 's'
            }, 1000)
          }
          interval()
        })
      } else {
        this.$message.error('请先填写手机号！')
      }
    },

    clearTimer() {
      clearInterval(this.sendCodeTimer)
      this.sendCodeBtnText = '获取验证码'
      this.allowSendCode = false
    },
  }
}
</script>

<style>
.ant-input-affix-wrapper { 	height: 44px; text-align: left; }
.footer { height: 50px; width: 100%; text-align: center; position: absolute; bottom: 0px; left: 0px; color: #cfd7f3; font-size: 14px; }
.footer p { margin: 0; }
.footer p:last-of-type { color: #829bdc; }

.registerFrame { 	width: 100%; height: 100%; min-height: 700px; margin: 0px; padding: 0px; position: relative; background-image: url("../../assets/images/bg.jpg"); background-size: cover; }
.registerWapper { width: 900px; height: 540px; position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto; background:#fff url("../../assets/images/border.png") no-repeat bottom center; background-size: 100%; padding: 10px 20px; font-size: 26px; color: rgba(101, 101, 101);}
.registerWapper .logo {height: 70px;}
.resigerTitle { margin-bottom: 20px; }
.resigerTitle .title { font-size: 20px; font-weight: bold; }
.resigerTitle .formBtns{ height:50px}
.resigerTitle .errTips { font-size:14px; padding-left:20px; color:#FF3737; linr-height:20px;}
.resigerTitle .errIcon{ padding-right:5px}

.resigerFormWapper { margin: 0 auto; height: 400px; font-size: 14px; margin-top: 20px; text-align: left; overflow: hidden; overflow-y: auto; padding: 0 10px;}
.resigerFormWapper::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.resigerFormWapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px; -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3); background-color: #e8eaec;
}
.resigerFormWapper::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); border-radius: 0; background-color:#fff; }

.formBtns .registerBtn { float:right; margin-left:10px; height:44px; font-size:16px; padding:0 20px; cursor: pointer; }

.resigerSuccess { width:200px; margin :0 auto ; text-align:center; padding-top:100px;}
.resigerSuccess .successIcon { font-size:100px; color:#0076FF}
.resigerSuccess .tips { padding-top:10px; font-size:20px; font-weight:bold}
.resigerSuccess .toLogin { height:44px; font-size:16px; cursor: pointer; padding:0 20px;}

</style>
