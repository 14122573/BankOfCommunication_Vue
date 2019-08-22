<template>
	<div class="loginFrame">
		<div class="chooseSystem">
			<div>
				<a-row type="flex" justify="start" align="middle" :gutter="10">
					<a-col><img src="../../assets/images/logo.png" alt="" class="logo"></a-col>
					<a-col>“综合渔技智能服务平台”</a-col>
				</a-row>
			</div>
			<div class="bindPhone">
				<div class='resigerTitle' >用户注册</div>
				<a-form :form="formBind" class="register-form">
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
								<a-input v-decorator="[ 'code', { validateTrigger:'blur', rules: [ {validator: validateCode}] } ]" placeholder="手机验证码" :disabled='disableCode'>
									<a-icon slot="prefix" type="code" style="color: rgba(0,0,0,.25)" />
								</a-input>
							</a-form-item>
						</a-col>
						<a-col :span="4">
							<a-form-item>
								<a-button type="primary" :disabled='disableBtn' ghost @click="sendCode" size="small" style="height:42px"> {{btnTxt}} </a-button>
							</a-form-item>
						</a-col>
					</a-row>

          <a-row type="flex" justify="start" align="middle" :gutter="10">
            <a-col span="7">
              <a-form-item>
                <a-input v-decorator="[
                    'password',
                    {
                    validateTrigger:'blur',
                    rules: [{ required: true, message: '请输入密码!' }, {
                      validator: validateToNextPassword,
                    }] }
                  ]"
                  type="password" placeholder="密码">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col span="7">
              <a-form-item>
                <a-input v-decorator="[ 'rePassword',
                    { validateTrigger:'blur', rules: [{ required: true, message: '请重复填写密码!' }, { validator: compareToFirstPassword, }] }
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
				</a-form>
			</div>
			<img src="../../assets/images/border.png" alt="" class="border">

		</div>
	</div>
</template>

<script>
export default {
  name: 'Register',
  beforeCreate() {
    this.formBind = this.$form.createForm(this)
  },
  data() {
    return {
      left: '返回',
      disableCode: false,
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
      disableNext: true
    }
  },
  mounted() {
    // this.systemLists = this.$cookie.get('systemLists') != undefined ? JSON.parse(this.$cookie.get('systemLists')) : []
    // if (this.$route.query.id) {
    //   this.userId = this.$route.query.id
    //   this.pageType = 'isBind'
    //   this.right = '完成绑定'
    //   this.left = '返回'
    // }
  },
  methods: {
    //校验手机号
    validatePhone(rule, value, callback) {
      if (!value || value == undefined || value.split(' ').join('').length === 0) {
        this.disableBtn = true
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
                this.disableBtn = false
                callback()
              } else {
                callback('已存在此用户!')
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
    // 效验邮政编码
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
		background-image: url("../../assets/images/bg.jpg");
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
		display: flex;
		justify-content: flex-start;

	}

	.systemItem {
		width: 172px;
		height: 65px;
		background: rgba(242, 247, 250);
		text-align: center;
		font-size: 12px;
		margin-right: 10px;
		padding: 15px 17px;
		cursor: pointer;
		position: relative;
	}

	.checkImage {
		width: 172px;
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
		/* width: 700px; */
		margin: 0 auto;
		height: 400px;
		font-size: 14px;
		margin-top: 20px;
		text-align: left;
		overflow: hidden;
		overflow-y: auto;
		padding: 0 10px;
	}

	.bindPhone::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	.bindPhone::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px; -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3); background: #e8eaec;  }

	.bindPhone::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); 	border-radius: 0; background-color:#fff; }

	.resigerTitle { margin-bottom: 20px; font-weight: bold; }

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
