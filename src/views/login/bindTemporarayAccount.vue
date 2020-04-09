<template>
	<div class="loginFrame" :style="'background-image: url(' + require('@/assets/images/bg.jpg') + ')'">
    <FrameTop></FrameTop>
		<div class="temporarayAccoutInfoWrapper" :style="'background: url(' + require('@/assets/images/border.png') + ' no-repeat bottom center'">
			<div>
				<a-row type="flex" justify="start" align="middle" :gutter="10">
					<a-col><img src="@/assets/images/logo.png" alt="" class="logo"></a-col>
					<a-col>“智能渔技”综合信息服务平台</a-col>
				</a-row>
			</div>
			<div class="temporarayAccoutInfoFormWapper">
        <div class='temporarayAccoutInfoFormTitle' >
          <span class="title">临时账户信息完善</span>
          <span class="errTips" v-if="err.showTips"><a-icon type="close-circle" />{{err.tips}}</span>
        </div>
        <a-form :form="formTempAccoutInfo" class="register-form">
          <a-row type="flex" justify="start" align="middle" :gutter="10">
            <a-col :span="7">
              <a-form-item>
                <a-input v-decorator="[ 'phone', { validateTrigger:'blur', rules: [ { validator: validatePhone}] } ]" placeholder="手机号">
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
              <input type="password" style="display: none;">
              <a-form-item>
                <a-input autocomplete="off" :type="inputAutoType.password" @focus='pasBlur' v-decorator="[ 'password', { validateTrigger:'blur', rules: [ { validator: validateToNextPassword}] } ]" placeholder="密码需大于6位且含数字和字母">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
                <testStrong :pwd="!formTempAccoutInfo.getFieldValue('password')?'':formTempAccoutInfo.getFieldValue('password')"  :width="75" v-show="passwordStrength"></testStrong>
            </a-col>
            <a-col span="7">
              <input type="password" style="display: none;">
              <a-form-item>
                <input type="password" style="display: none;">
                <a-input autocomplete="off" :type="inputAutoType.password" @focus='pasBlur' v-decorator="[ 'rePassword', { validateTrigger:'blur', rules: [{ required: true, message: '请重复填写密码!' }, { validator: compareToFirstPassword, }] } ]"
                  placeholder="重复密码" @blur="handleConfirmBlur">
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
                  type="text" :readonly='inputAutoType.mail' @focus='mailBlur' placeholder="邮箱" >
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
          <a-button type="primary" class="tempAccoutInfoFormBtn" @click="toBindTempAccount"> 提交账户信息 </a-button>
          <a-button @click="toLogin" class="tempAccoutInfoFormBtn tologin" > 放弃 </a-button>
        </div>
			</div>
		</div>
    <FrameFooter></FrameFooter>
	</div>
</template>
<script>
import testStrong from '@/components/testPwd'
import Loader from '@/components/Loader/loader'
import { encryptDes } from '@/util/des-cryptojs'
import FrameTop from '@/views/login/components/frameTop'
import FrameFooter from '@/views/login/components/footer'
export default {
  name      : 'Register',
  components: {
    Loader,
    testStrong,
    FrameTop,FrameFooter
  },
  beforeCreate() {
    this.formTempAccoutInfo = this.$form.createForm(this)
  },
  data() {
    return {
      tempUserId       : '',
      disPhoneCheckCode: true,
      sendCodeBtnText  : '发送验证码',
      allowSendCode    : true,
      sendCodeTimer    : null,
      isInCountdown    : false,
      confirmDirty     : false,
      err              : {
        tips    : '',
        showTips: false
      },
      // showSuccess:false,
      inputAutoType: {
        password: 'text',
        mail    : true
      },
      passwordStrength: false
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.tempUserId = this.$route.query.id
    }
  },
  methods: {
    /**
     * 处理邮箱被浏览器自动填充值
     * 当未获取焦点时，设置readonly为true，否则设置为false
     */
    mailBlur() {
      this.inputAutoType.mail = false
    },

    /**
     * 处理密码被浏览器自动填充值
     * 当未获取焦点时，设置type为text，否则为password
     */
    pasBlur() {
      this.inputAutoType.password = 'password'
    },
    toLogin(){
      this.$router.push({ name: 'login' })
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
                if(this.isInCountdown){
                  this.allowSendCode = true
                }else{
                  this.allowSendCode = false
                }
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
          const phone = this.formTempAccoutInfo.getFieldValue('phone')
          const code = this.formTempAccoutInfo.getFieldValue('code')

          this.$ajax.post({
            url: this.$api.POST_CHECK_PHONE_CODE.replace('{type}', 'bindPhone').replace('{phone}', phone).replace('{code}', code)
          }).then(res => {
            if (res.code != '200') {
              callback(res.msg)
            } else {
              callback()
            }
          })
        }
      }
    },

    /**
     * 密码重复密码校验
     */
    validateToNextPassword(rule, value, callback) {
      const form = this.formTempAccoutInfo
      if(!value || value == undefined || value.split(' ').join('').length === 0){
        callback('请输入密码！')
        this.passwordStrength=false
      }else{
        if(!this.$com.checkPassword(value)){
          callback('请输入6位以上的数字字母组合！')
          this.passwordStrength=false
        }else{
          if (value && this.confirmDirty) {
					  form.validateFields([ 'rePassword' ], {
					    force: true
					  })
          }
          this.passwordStrength=true
          callback()
        }
      }

    },

    /**
     * 校验两次密码一致
     */
    compareToFirstPassword(rule, value, callback) {
      const form = this.formTempAccoutInfo
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
        if (!this.$com.checkZipCode(value)) {
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
    toBindTempAccount(){
      // 重置表单提交报错
      this.err.tips = ''
      this.err.showTips = false

      // 提交表单
      this.formTempAccoutInfo.validateFields((err, values) => {
        if (!err) {
          let params = {
            'userId'  : this.tempUserId,
            'pwd'     : encryptDes(values.password),
            'code'    : values.code,
            'userInfo': {
              'mail'   : values.mail,
              'name'   : values.name,
              'dept'   : values.dept,
              'phone'  : values.phone,
              'addr'   : values.addr,
              'zipCode': values.zipCode
            }
          }

          this.$ajax.post({
            url   : this.$api.POST_BIND_TEMPUSERINFO_BIND,
            params: params
          }).then(res => {
            if (res.code == '200') {
              this.$com.confirm(res, 'data.content', [])
              let gainDatas = this.$com.confirm(res, 'data.content', {})
              this.$cookie.set('canEnterBind', '500')
              this.$com.setToken(gainDatas.access_token, gainDatas.refresh_token)
              this.$router.push({
                name: 'home',
              })
            } else {
              this.err.tips = res.msg
              this.err.showTips = true
            }
          })
        }else{
          this.$com.getFormValidErrTips(this,err)
        }
      })
    },

    /**
     * 发送手机验证码
     */
    sendCode() {
      const phone = this.formTempAccoutInfo.getFieldValue('phone')
      let params = {}
      let links = ''
      if (phone) {
        this.$ajax.get({
          url: this.$api.GET_PHONE_CODE.replace('{type}', 'bindPhone').replace('{phone}', phone)
        }).then(res => {
          this.disPhoneCheckCode = false
          this.allowSendCode = true
          let num = 60
          const interval = () => {
            this.isInCountdown = true
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
        this.$modal.error({
          title     : '提示',
          content   : '请先填写手机号！',
          okText    : '确认',
          cancelText: '取消',
        })
      }
    },
    clearTimer() {
      clearInterval(this.sendCodeTimer)
      this.isInCountdown = false
      this.sendCodeBtnText = '获取验证码'
      this.allowSendCode = false
      this.disPhoneCheckCode = true
    },
  }
}
</script>
<style>
.ant-input-affix-wrapper { 	height: 44px; text-align: left; }
</style>

<style scoped>
.loginFrame { width: 100%; height: 100%; min-width: 1000px; min-height: 700px; margin: 0px; padding: 0px; position: relative; background-size: cover; z-index: 10;}
.temporarayAccoutInfoWrapper{ width: 900px; height: 540px; position:relative; margin: auto; top: calc((100% - 560px)/2); background: white; padding: 10px 20px; font-size: 26px; color: rgba(101, 101, 101);}
.temporarayAccoutInfoWrapper .logo {height: 70px;}

.temporarayAccoutInfoFormTitle { margin-bottom: 20px; }
.temporarayAccoutInfoFormTitle .title { font-size: 20px; font-weight: bold; }
.temporarayAccoutInfoFormTitle .formBtns{ height:50px}
.temporarayAccoutInfoFormTitle .errTips { font-size:14px; padding-left:20px; color:#FF3737; line-height:20px;}
.temporarayAccoutInfoFormTitle .errIcon{ padding-right:5px}

.temporarayAccoutInfoFormWapper { margin: 0 auto; height: 400px; font-size: 14px; margin-top: 20px; text-align: left; overflow: hidden; overflow-y: auto; padding: 0 10px;}
.temporarayAccoutInfoFormWapper::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.temporarayAccoutInfoFormWapper::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px; -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3); background-color: #e8eaec;
}
.temporarayAccoutInfoFormWapper::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); border-radius: 0; background-color:#fff; }

.formBtns .tempAccoutInfoFormBtn { float:right; margin-left:10px; height:44px; font-size:16px; padding:0 20px; cursor: pointer; }
</style>
