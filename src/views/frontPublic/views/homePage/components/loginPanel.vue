<template>
  <a-card style="width: 300px; max-width: 300px;" title="用户登录">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
    >
      <a-form-item class="form_item">
        <!-- <a-input
          v-decorator="[
            'username',
            { validateTrigger: 'blur', rules: [{ validator: validateAccount }] }
          ]"
          placeholder="账户或手机号"
          autocomplete="off"
          @change="!!form.getFieldValue('pwd') ? errorMsgDisplay = '' : errorMsgDisplay = '请输入密码'"
        > -->
        <a-input
          v-decorator="[
            'username',
            { validateTrigger: 'blur', rules: [{ validator: validateAccount }] }
          ]"
          placeholder="账户或手机号"
          autocomplete="off"
          @change="errorMsgDisplay = ''"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item class="form_item">
        <!-- <a-input
          v-decorator="[
            'pwd',
            {
              validateTrigger: 'blur',
              rules: [{ validator: validatePassword }]
            }
          ]"
          :type="isType"
          id="pwds"
          placeholder="密码"
          autocomplete="off"
          @change="!!form.getFieldValue('username') ? errorMsgDisplay = '' : errorMsgDisplay = '请输入用户名'"
          @focus="pasBlur"
        > -->
        <a-input
          v-decorator="[
            'pwd',
            {
              validateTrigger: 'blur',
              rules: [{ validator: validatePassword }]
            }
          ]"
          :type="isType"
          id="pwds"
          placeholder="密码"
          autocomplete="off"
          @change="errorMsgDisplay = ''"
          @focus="pasBlur"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item class="form_item_forget">
        
        <a-row>
          <a style="display: inline; height: 20px; line-height: 20px" class="login-form-forgot" @click="resetPassword">
          忘记密码
          </a>
        </a-row>
        <a-row>
          <div style="text-align: left; color: red; height: 40px; line-height: 40px">{{ errorMsgDisplay }}</div>
        </a-row>
        <a-button type="primary" class="login-form-button" @click="handleLogin">
          登录
        </a-button>
        <a-button
          type="default"
          @click="toRegister"
          class="register-form-button"
          block
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { encryptDes } from '@/util/des-cryptojs'
import { permission } from '@/util/mixins'
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  mixins: [ permission ],
  data() {
    return {
      username       : '',
      pageType       : 'login',
      loginFailMsg   : '',
      visibleError   : false,
      isType         : 'text',
      // 设置是否7天免登录
      remember       : false,
      successText    : '',
      errorCount     : 0,
      figure         : Math.random(),
      isLogin        : false,
      errorMsgDisplay: '',
    }
  },
  mounted() {
    this.setUrl()
    // 7天免登录默认是false
    this.$cookie.set('KeepLogin', false, {
      expires: 7
    })
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
    },
  },
  methods: {
    // getValidated() {
    //   this.form.validateFields(err => {
    //     if(err) {
    //       this.errorMsgDisplay = err
    //     } else {
    //       this.errorMsgDisplay = ''
    //     }
    //     return this.errorMsgDisplay
    //   })
    // },
    toRegister() {
      this.$router.push({
        name: 'register'
      })
    },
    keepLogin(e) {
      this.remember = e.target.checked
      if (this.remember) {
        this.$cookie.set('KeepLogin', true, {
          expires: 7
        })
      } else {
        this.$cookie.set('KeepLogin', false, {
          expires: 7
        })
      }
    },
    //存储redirectUrl
    setUrl() {
      if (this.redirectUrlPrefix != 'null') {
        this.$cookie.set(
          'redirectUrl',
          this.getQueryString('redirectUrl') +
            '&sysCode=' +
            String(this.getQueryString('sysCode'))
        )
      }
    },
    pasBlur() {
      this.isType = 'password'
    },
    //登录操作
    handleLogin(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {
            username: values.username,
            pwd     : encryptDes(values.pwd)
          }
          if (this.redirectUrlPrefix != 'null') {
            params.redirectUrl = this.$cookie.get('redirectUrl')
          }
          if (values.captcha) {
            params.captcha = values.captcha
            params.reqId = this.figure
          }
          this.$ajax
            .post({
              url   : this.$api.POST_LOGIN,
              params: params
            })
            .then(res => {
              const store = JSON.parse(localStorage.getItem('VuexStore'))
              if (store) store.content = ''
              sessionStorage.setItem('VuexStore', JSON.stringify(store))

              if (res.code == '200') {
                this.$cookie.set('canEnterBind', '200')
                this.$store.commit('SET_ISLOGIN', true) 
                this.jumpOpeation(res)
                this.visibleError = false
              } else {
                this.loginFailMsg = res.msg
                this.visibleError = true
                this.threeTimesShowCode(values.username)
              }
            })
        } else {
          this.visibleError = false
        }
      })
    },
    //跳转操作
    jumpOpeation(res) {
      const gainDatas = res.data.content
      if (res.msg == 'choose') {
        //存储系统列表
        this.$cookie.set('systemLists', JSON.stringify(gainDatas))
        this.$store.commit('SET_CHOOSESYSLISTS', gainDatas)
        if (this.sysCode != 'null') {
          //列表存在该code  存在去匹配code值去获取跳转路径 不存在去绑定
          const data = gainDatas.find(
            item => item.sysDic.sysCode == this.sysCode
          )
          if (data) {
            let links = '?userId=' + data.id
            if (this.redirectUrlPrefix != 'null') {
              links = links + '&redirectUrl=' + this.$cookie.get('redirectUrl')
            }
            this.$ajax
              .get({
                url: this.$api.GET_SELECT_SYSTEM + links
              })
              .then(res => {
                const gainDatas = res.data.content
                if (res.msg != 'bind') {
                  //不需要绑定
                  this.$com.setToken(
                    gainDatas.access_token,
                    gainDatas.refresh_token
                  )
                  if (gainDatas.redirectUrl) {
                    this.$cookie.set('canEnterBind', '500')
                    window.open(gainDatas.redirectUrl, '_parent')
                  } else {
                    if (
                      gainDatas.isNew === false &&
                      gainDatas.haveNewPerm === false
                    ) {
                      const openUrl =
                        gainDatas.url +
                        '?userId=' +
                        gainDatas.userId +
                        '&accessToken=' +
                        gainDatas.access_token +
                        '&refreshToken=' +
                        gainDatas.refresh_token
                      this.$cookie.set('canEnterBind', '500')
                      window.open(openUrl, '_parent')
                    } else {
                      this.$router.push({
                        name: 'new_home'
                      })
                    }
                  }
                } else {
                  //去绑定
                  this.$router.push({
                    name : 'bindPhone',
                    query: {
                      id: gainDatas
                    }
                  })
                }
              })
          } else {
            this.$router.push({
              name: 'bindPhone'
            })
          }
        } else {
          // oldUser => 
          if (!!gainDatas[0].username) {
            this.username = gainDatas[0].username
            // document.getElementById('login').style.display = 'none'
            // document.getElementById('loggedin').style.display = 'block'
            // this.loginSwitch()
            // this.getToken()
            this.$emit('on-change', { 'username': this.username, 'isOldAccount': true })
          }
          // this.$router.push({
          //   name: 'bindPhone'
          // })
        }
      } else if (res.msg == 'bind') {
        this.$router.push({
          name : 'bindPhone',
          query: {
            id: gainDatas
          }
        })
      } else if (res.msg == 'tempInfo') {
        this.$router.push({
          name : 'bindTemporarayAccount',
          query: {
            id: gainDatas
          }
        })
      } else if (res.msg == 'success') {
        this.$com.setToken(gainDatas.access_token, gainDatas.refresh_token)
        if (gainDatas.redirectUrl) {
          this.$cookie.set('canEnterBind', '500')
          window.open(gainDatas.redirectUrl, '_parent')
        } else {
          if (gainDatas.isNew === false && gainDatas.haveNewPerm === false) {
            const openUrl =
              gainDatas.url +
              '?userId=' +
              gainDatas.userId +
              '&accessToken=' +
              gainDatas.access_token +
              '&refreshToken=' +
              gainDatas.refresh_token
            this.$cookie.set('canEnterBind', '500')
            window.open(openUrl, '_parent')
          } else {
            // this.$router.push({
            //   name: 'new_home'
            // })
            this.$ajax
              .get({
                url: this.$api.GET_USER_INFO
              })
              .then(res => {
                let userInfo = res.data.content
                if (!!userInfo.name) {
                  this.username = userInfo.name 
                  // document.getElementById('login').style.display = 'none'
                  // document.getElementById('loggedin').style.display = 'block'
                  // this.loginSwitch()
                  // this.getToken()
                  // this.$emit('on-change', this.username)
                  this.$emit('on-change', { 'username': this.username, 'isOldAccount': false })
                }
              })
          }
        }
      }
    },
    //验证账户是否合法
    validateAccount(rule, value, callback) {
      if (!this.form.getFieldValue('username') && !this.form.getFieldValue('pwd')) {
        this.errorMsgDisplay = '请输入用户名和密码!'
      }  else if (
        !value ||
        value == undefined ||
        value.split(' ').join('').length === 0
      ) {
        this.errorMsgDisplay = '请输入用户名'
      } else if(!this.form.getFieldValue('pwd')) {
        this.errorMsgDisplay = '请输入密码'
      } else {
        if (this.$cookie.get('threeTime')) {
          const lists = JSON.parse(this.$cookie.get('threeTime'))
          lists.forEach((ele, index) => {
            if (ele.count < 3) {
              lists.splice(index, 1)
            }
          })
          let flag = false
          lists.forEach(ele => {
            if (ele.userId == value) {
              flag = true
              this.errorCount = ele.count
            }
          })
          if (!flag) {
            this.errorCount = 0
          }
          this.setTime(lists)
        }
        callback()
      }
    },
    // getToken() {
    //   let cookie = this.$cookie.get('token') 
    //   if (!!cookie) {
    //     document.getElementById('login').style.display= 'none'
    //     document.getElementById('loggedin').style.display = 'block' 
    //     this.$ajax
    //       .get({
    //         url: this.$api.GET_USER_INFO
    //       })
    //       .then(res => {
    //         let userInfo = res.data.content
    //         if (!!userInfo.name) {
    //           this.username = userInfo.name
    //         }
    //       })
    //   } else {
    //     document.getElementById('login').style.display = 'block'
    //     document.getElementById('loggedin').style.display = 'none' 
    //   }
    // },
    validatePassword(rule, value, callback) {
      if(!this.form.getFieldValue('username') && !this.form.getFieldValue('pwd')) {
        this.errorMsgDisplay = '请输入用户名和密码!'
      } else if (
        !value ||
        value == undefined ||
        value.split(' ').join('').length === 0
      ) {
        this.visibleError = false
        this.errorMsgDisplay = '请输入密码!'
      } else if (!this.form.getFieldValue('username')) {
        this.errorMsgDisplay = '请输入用户名'
      } else {
        callback()
      }
    },
    // loginSwitch() {
    //   this.$emit('isLogin', {
    //     login   : 'logged in',
    //     username: this.username
    //   }) 
    // },
    //得到url传递参数
    getQueryString(name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      const reg_rewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i')
      const r = window.location.search.substr(1).match(reg)
      const q = window.location.pathname.substr(1).match(reg_rewrite)
      if (r != null) {
        return unescape(r[2])
      } else if (q != null) {
        return unescape(q[2])
      } else {
        return null
      }
    },
    pageTypeChange(data) {
      this.pageType = data
    },
    changeSuccess(data) {
      this.pageType = 'success'
      this.successText = data
    },
    threeTimesShowCode(id) {
      if (!this.$cookie.get('threeTime')) {
        const datas = [
          {
            userId: id,
            count : 1
          }
        ]
        this.setTime(datas)
      } else {
        const lists = JSON.parse(this.$cookie.get('threeTime'))
        let flag = false
        lists.forEach(ele => {
          if (ele.userId == id) {
            flag = true
            ele.count = Number(ele.count) + 1
            this.errorCount = ele.count
          }
        })
        if (!flag) {
          lists.push({
            userId: id,
            count : 1
          })
        }
        this.setTime(lists)
      }
    },
    setTime(lists) {
      const now = new Date()
      const time = now
        .toLocaleString('chinese', {
          hour12: false
        })
        .split(' ')[1]
      const totalMinutes =
        (24 - Number(time.split(':')[0]) - 1) * 60 +
        (60 - Number(time.split(':')[1]))
      const inFifteenMinutes = new Date(
        new Date().getTime() + totalMinutes * 60 * 1000
      )
      const datas = JSON.stringify(lists)
      this.$cookie.set('threeTime', datas, {
        expires: inFifteenMinutes
      })
    },
    resetPassword() {
      this.$emit('on-change', 'forget')
    }
  }
}
</script>
<style>
.lunbo .loginpanel[data-v-a9d4b7dc] .form_item {
  margin: 8px 0px;
  /* height: 65px; */
}

.lunbo .loginpanel[data-v-a9d4b7dc] .form_item_forget {
  margin: 0px 0px;
  height: 44px;
}

.lunbo .loginpanel[data-v-a9d4b7dc] #components-form-demo-normal-login .login-form {
  max-width: 300px;
}
.lunbo .loginpanel[data-v-a9d4b7dc] #components-form-demo-normal-login .login-form-forgot {
  float: right;
}
.lunbo .loginpanel[data-v-a9d4b7dc] #components-form-demo-normal-login .login-form-button {
  width: 100%;
}

</style>
