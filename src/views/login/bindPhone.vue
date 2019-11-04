<template>
	<div class="loginFrame" :style="'background-image: url(' + require('@/assets/images/bg.jpg') + ')'">
		<div class="chooseSystem">
			<div>
				<a-row type="flex" justify="start" align="middle" :gutter="10">
					<a-col><img src="@/assets/images/logo.png" alt="" class="logo"></a-col>
					<a-col>“智能渔技”综合信息服务平台</a-col>
				</a-row>
			</div>
			<div class="systemBlock" v-if='right!="完成绑定"'>
				<div class="systemTitle">
					请选择登录系统
				</div>
				<div class="systemLists">
          <a-row :gutter="16">
          <template v-for="(item,index) in systemLists">
            <a-col span='6' :key="index">
              <div class="systemItem" @click="selectSystem(item,index)">
                {{item.sysDic.sysName}}
                <img src="@/assets/images/system-s.png" alt="" class="checkImage" v-show='activeIndex==index' />
                <img src="@/assets/images/isBind.png" alt="" class="checkImage" v-show='item.isBind=="true"||item.isBind=="1"' />
              </div>
            </a-col>
          </template>
          </a-row>
				</div>
			</div>
			<div class="bindPhone" v-if='right=="完成绑定"'>
				<div class='bindPhoneTitle' style="margin-bottom:2px">{{systemNmme}}</div>
				<div class='bindPhoneTitle' style="font-weight:normal">绑定手机号码</div>
				<a-form :form="formBind" class="register-form">
					<a-row type="flex" justify="start" align="middle" :gutter="10">
						<a-col :span="7">
							<a-form-item>
								<a-input v-decorator="[
									  'phone',
									  { validateTrigger:'blur',
										 rules: [
									  { validator: validatePhone}] }
									]"
								 placeholder="手机号" :disabled='disablePhone'>
									<a-icon slot="prefix" type="mobile" style="color: rgba(0,0,0,.25)" />
								</a-input>
							</a-form-item>
						</a-col>
						<a-col :span="7">
							<a-form-item>
								<a-input v-decorator="[ 'code', { validateTrigger:'change',  rules: [ {validator: validateCode}] } ]"
								 placeholder="手机验证码" :disabled='disableCode'>
									<a-icon slot="prefix" type="code" style="color: rgba(0,0,0,.25)" />
								</a-input>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item>
								<a-button type="primary" :disabled='disableBtn' ghost @click="sendCode" size="small" style="height:42px;min-width: 86px;">
									{{btnTxt}}
								</a-button>
							</a-form-item>
						</a-col>
					</a-row>
					<div v-if="!isBind">
						<div class="tips">{{tips}}</div>
						<a-row type="flex" justify="start" align="middle" :gutter="10">
							<a-col span="7">
								<a-form-item>
									<a-input v-decorator="[ 'password', { validateTrigger:'blur', rules: [ { validator: validateToNextPassword, }] } ]" type="password" placeholder="密码需大于6位且含字母和数字">
										<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
									</a-input>
								</a-form-item>
								<testStrong :pwd="formBind.getFieldValue('password')" :width="75" v-show="passwordStrength"></testStrong>
							</a-col>
							<a-col span="7">
								<a-form-item>
									<a-input v-decorator="[
										  'rePassword',
										  { validateTrigger:'blur',
                        rules: [{ required: true, message: '请重复填写密码!' }, {
											  validator: compareToFirstPassword,
											}] }
										]"
									 type="password" placeholder="重复密码" @blur="handleConfirmBlur">
										<a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
									</a-input>
								</a-form-item>
							</a-col>
						</a-row>
						<a-row type="flex" justify="start" align="middle" :gutter="10">
							<a-col span="7">
								<a-form-item>
									<a-input v-decorator="[
											  'name',
											  {validateTrigger:'blur',
												rules: [ {
												  required: true, message: '请输入姓名!',
												}]
											  }
											]"
									 type="text" placeholder="姓名">
										<a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
									</a-input>
								</a-form-item>
							</a-col>
							<a-col span="7">
								<a-form-item>
									<a-input v-decorator="[
										  'mail',
										  {
                                            validateTrigger:'blur',
											rules: [{
											  type: 'email', message: '请输入合法邮箱!',
											}, {
											  required: true, message: '请输入邮箱!',
											}]
										  }
										]"
									 type="text" placeholder="邮箱">
										<a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
									</a-input>
								</a-form-item>
							</a-col>
							<a-col span='10'>
								<a-form-item>
									<a-input v-decorator="[
										  'dept',
										  {
											rules: [ {
											  required: true, message: '请输入单位!',
											}]
										  }
										]"
									 type="text" placeholder="单位">
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
					</div>
				</a-form>
			</div>
		  <img src="@/assets/images/border.png" alt="" class="border">
			<div class="btnGroup">
				<div v-if="hasLogined" @click="toLogin">
					<img src="@/assets/images/left.png" alt="">
					<div>退出</div>
				</div>
				<div v-else @click="showLeft">
					<img src="@/assets/images/left.png" alt="">
					<div>{{left}}</div>
				</div>
				<div @click="showRight">
					<img src="@/assets/images/right2.png" alt="" v-if='disableNext'>
					<img src="@/assets/images/right.png" alt="" v-else>
					<div>{{right}}</div>
				</div>
			</div>
		</div>
		<a-modal title="完成绑定" :visible="visibleModal" :closable='false' :maskClosable='false'>
			<template slot="footer">
				<a-button @click="handleOk" type="primary">继续访问</a-button>
			</template>
			<p>可使用原账号或手机号登录</p>
		</a-modal>
		<div class="footer">
			<p>主办单位：全国水产技术推广总站、中国水产学会&nbsp;&nbsp;&nbsp;&nbsp; 技术支持：博彦科技股份有限公司</p>
			<p>COPYRIGHT&copy;-{{$com.getCurrentYear()}} ALL RIGHTS RESERVED</p>
		</div>
	</div>
</template>

<script>
import { permission } from '@/util/mixins'
import testStrong from '@/components/testPwd'
import { encryptDes } from '@/util/des-cryptojs'
export default {
  name: 'bindPhone',
  components: {
    testStrong
  },
  mixins: [permission],
  beforeCreate() {
    this.formBind = this.$form.createForm(this)
  },
  data() {
    return {
      hasLogined: !this.$route.query.logined ? false : (1 == parseInt(this.$route.query.logined) ? true : false),
      left: '返回',
      disableCode: true,
      right: '下一步(1/2)',
      btnTxt: '发送验证码',
      disableBtn: true,
      timer: null,
      systemLists: [],
      activeIndex: null,
      pageType: '',
      userId: '',
      systemNmme: '',
      confirmDirty: false,
      isBind: true,
      tips: '',
      disableNext: true,
      passwordStrength: false,
      disablePhone: false,
      visibleModal: false,
      gainDatas: {}
    }
  },
  mounted() {
    // this.systemLists = this.$cookie.get('systemLists') != undefined ? JSON.parse(this.$cookie.get('systemLists')) : []
    this.systemLists = this.$store.state.chooseSystemLists
    if (this.$route.query.id) {
      this.userId = this.$route.query.id
      this.pageType = 'isBind'
      this.right = '完成绑定'
      this.left = '返回'
      this.disableNext = false
    }
  },
  methods: {
    toLogin() {
      this.$com.handleLogOut()
    },
    showLeft() {
      if (!this.$route.query.id) {
        if (this.right == '完成绑定') {
          this.right = '下一步'
          this.left = '返回'
          this.isBind = true
          this.clearTimer()
        } else {
          this.$cookie.set('canEnterBind', '500')
          this.$router.push({
            name: 'login'
          })
        }
      } else {
        if (this.right == '完成绑定') {
          this.$router.push({
            name: 'login'
          })
          this.$cookie.set('canEnterBind', '500')
        }
      }
    },
    selectSystem(item, index) {
      this.userId = item.id
      this.systemNmme = item.sysDic.sysName
      this.activeIndex = index
      this.pageType = item.isBind == false ? 'isBind' : 'unBind'
      this.disableNext = false
      if (this.pageType != 'isBind') {
        this.right = '立即登录'
      } else {
        this.right = '下一步（1/2）'
      }
    },
    handleBind() {
      this.formBind.validateFields((err, values) => {
        if (!err) {
          let params = {
            userId: this.userId,
            pwd: encryptDes(values.password),
            code: values.code,
            userInfo: {
              'phone': values.phone,
              'mail': values.mail,
              'addr': values.addr,
              'name': values.name,
              'dept': values.dept,
              'zipCode': values.zipCode,
              'code': values.code
            }
          }
          let options = {
            userId: this.userId,
            phone: values.phone,
            code: values.code
          }
          if (this.$cookie.get('redirectUrl') != undefined) {
            params.redirectUrl = this.$cookie.get('redirectUrl')
            options.redirectUrl = this.$cookie.get('redirectUrl')
          }
          let sendLink = this.isBind == true ? this.$api.POST_BIND_USERINFO_BIND : this.$api.POST_BIND_USERINFO_UNBIND
          let transData = this.isBind == true ? options : params
          this.$ajax.post({
            url: sendLink,
            params: transData
          }).then(res => {
            this.gainDatas = res.data.content
            this.visibleModal = true
          })
        }
      })
    },
    handleOk() {
      let gainDatas = this.gainDatas
      if (!this.$route.query.id) {
        // let lists = JSON.parse(this.$cookie.get('systemLists'))
        let lists = this.$store.state.chooseSystemLists
        this.$com.setOldSysAccounts(gainDatas.access_token, gainDatas.refresh_token, lists)
      }
      if (gainDatas.redirectUrl) {
        this.$cookie.set('canEnterBind', '500')
        window.open(gainDatas.redirectUrl, '_parent')
      } else {
        if (gainDatas.isNew === false && gainDatas.haveNewPerm === false) {
          this.$cookie.set('canEnterBind', '500')
          const openUrl = gainDatas.url + '?userId=' + gainDatas.userId + '&accessToken=' + gainDatas.access_token +
							'&refreshToken=' + gainDatas.refresh_token
          window.open(openUrl, '_parent')
        } else {
          this.$com.setToken(gainDatas.access_token, gainDatas.refresh_token)
          this.$router.push({
            name: 'home',
          })
        }
      }
    },
    showRight() {
      if (this.pageType != '') {
        if (this.pageType == 'isBind') {
          if (this.right == '完成绑定') {
            this.handleBind()
          } else {
            this.right = '完成绑定'
            this.left = '上一步'
            this.disablePhone = false
            this.disableBtn = true
          }
        } else {
          this.goLogin()
        }
      } else {
        this.$message.error('请先选择系统，再进行下一步！')
      }

    },
    goLogin() {
      let links = '?userId=' + this.userId
      if (this.$cookie.get('redirectUrl') != undefined) {
        links = links + '&redirectUrl=' + this.$cookie.get('redirectUrl')
      }
      this.$ajax.get({
        url: this.$api.GET_SELECT_SYSTEM + links
      }).then(res => {
        let gainDatas = res.data.content
        // let lists = JSON.parse(this.$cookie.get('systemLists'))
        let lists = this.$store.state.chooseSystemLists

        this.$com.setOldSysAccounts(gainDatas.access_token, gainDatas.refresh_token, lists)
        if (gainDatas.redirectUrl) {
          this.$cookie.set('canEnterBind', '500')
          window.open(gainDatas.redirectUrl, '_parent')
        } else {
          if (gainDatas.isNew === false && gainDatas.haveNewPerm === false) {
            this.$cookie.set('canEnterBind', '500')
            const openUrl = gainDatas.url + '?userId=' + gainDatas.userId + '&accessToken=' + gainDatas.access_token +
								'&refreshToken=' + gainDatas.refresh_token
            window.open(openUrl, '_parent')
          } else {
            this.$com.setToken(gainDatas.access_token, gainDatas.refresh_token)
            this.$router.push({
              name: 'home',
            })
          }
        }
      })
    },
    sendCode() {
      const phone = this.formBind.getFieldValue('phone')
      let params = {}
      let links = ''
      if (this.$cookie.get('redirectUrl') != undefined) {
        links = '?redirectUrl=' + this.$cookie.get('redirectUrl')
      }
      if (phone) {
        this.$ajax.get({
          url: this.$api.GET_SEND_CODE.replace('{phone}', phone) + links
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
      } else {
        this.$message.error('请先填写手机号！')
      }
    },
    clearTimer() {
      clearInterval(this.timer)
      this.btnTxt = '获取验证码'
      this.disableBtn = false
    },
    validateCode(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入手机验证码!')
      } else {
        if (value.length == 6) {
          const phone = this.formBind.getFieldValue('phone')
          let params = {
            'phone': phone,
            'code': value,
            'userId': this.userId
          }
          this.$ajax.post({
            url: this.$api.POST_CHECK_CODE,
            params: params
          }).then(res => {
            if (res.code != '200') {
              callback(res.data.msg)
            } else {
              callback()
              this.disablePhone = true
              this.disableCode = true
              this.disableBtn = true
              this.isBind = this.transVal
            }
          })
        } else {
          callback('请输入6位手机验证码!')
        }
      }
    },
    validatePhone(rule, value, callback) {
      if (value && value != undefined) {
        if (!this.$com.checkPhone(value)) {
          callback('手机号码不合法!')
        } else {
          if (value.length == '11') {
            let links = '?id=' + this.userId + '&phone=' + value
            if (this.$cookie.get('redirectUrl') != undefined) {
              links = links + '&redirectUrl=' + this.$cookie.get('redirectUrl')
            }
            this.$ajax.get({
              url: this.$api.GET_CHECK_PHONE + links
            }).then(res => {
              if (res.code == '200') {
                callback()
                this.disableBtn = false
                this.transVal = res.data.content
                if (res.data.content == false) {
                  this.tips = '请完善以下信息!'
                }
              } else {
                callback(res.data.msg)
              }
            })
          }
        }
      } else {
        callback('请输入手机号!')
      }
    },
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
    validateToNextPassword(rule, value, callback) {
      const form = this.formBind
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        callback('请输入密码！')
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
          this.passwordStrength = true
          callback()
        }
      }

    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.formBind
      if (value && value !== form.getFieldValue('password')) {
        callback('密码输入不一致!')
      } else {
        callback()
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
  }
}
</script>

<style scoped>
	.loginFrame {
		width: 100%;
		height: 100%;
		min-height: 700px;
		margin: 0px;
		padding: 0px;
		position: relative;
		background-size: cover;
		z-index: 10;
	}

	.chooseSystem {
		width: 900px;
		height: 540px;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: white;
		padding: 10px 20px;
		font-size: 26px;
		color: rgba(101, 101, 101);
	}

	.logo {
		height: 70px;
	}

	.systemBlock {
		font-size: 14px;
		text-align: left;
		margin: 30px 0 0px 0;
		font-weight: bold;
	}

	.systemLists {
		margin: 10px 0 0px 0;
    }

	.systemItem {
		width: 100%;
		height: 65px;
		background: rgba(242, 247, 250);
		text-align: center;
		font-size: 12px;
		margin-bottom: 10px;
		margin-right: 10px;
		padding: 15px 17px;
		cursor: pointer;
		position: relative;
	}

	.checkImage {
		width: 100%;
		height: 65px;
		position: absolute;
		top: 0px;
		left: 0px;
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
		z-index: 0;
	}

	.btnGroup {
		position: absolute;
		bottom: 30px;
		left: -22px;
		width: 944px;
		display: flex;
		justify-content: space-between;
	}

	.btnGroup div {
		width: 150px;
		height: 50px;
		line-height: 60px;
		text-align: center;
		font-size: 14px;
		color: white;
		cursor: pointer;
		position: relative;
	}

	.btnGroup div img {
		width: 150px;
		height: 50px;
		position: absolute;
		top: 0;
		left: 0;
	}

	.btnGroup div:last-of-type img {
		right: 0;
	}

	.footer p {
		margin: 0;
	}

	.footer p:last-of-type {
		color: #829bdc;
	}

	.border {
		width: 900px;
		position: absolute;
		bottom: 0px;
		left: 0px;
	}

	.bindPhone {
		margin: 0 auto;
		height: 400px;
		font-size: 14px;
		margin-top: 20px;
		text-align: left;
		overflow: hidden;
		overflow-y: auto;
		padding: 0 10px;
	}

	.bindPhoneTitle {
		margin-bottom: 20px;
		font-weight: bold;
	}

	.ant-input-affix-wrapper,
	.login-form-button {
		height: 44px;
		text-align: left;
	}

	.tips {
		margin-bottom: 10px;
		color: red;
		font-size: 12px;
	}
</style>
