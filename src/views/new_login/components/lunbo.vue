<template>
  <div class="lunbo">
    <!-- <a-carousel :after-change="onChange" effect="fade"> -->
    <a-carousel effect="fade">
      <div>
        <img
          src="@/assets/images/home/sy_banner.jpg"
          alt=""
          style="width: 100%; height: 400px"
        />
      </div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
    </a-carousel>
    <LoginPanel id="login" class="loginpanel" />
    <LoggedInPanel
      id="loggedin"
      :nameprop="username"
      class="loginpanel"
    />
    <!-- <a-card class="loginpanel">
      <ResetPassword />
    </a-card> -->
  </div>
</template>
<script>
import LoginPanel from '@/views/new_login/components/LoginPanel'
import LoggedInPanel from '@/views/new_login/components/welcomePanel'
import ResetPassword from '@/views/login/resetPassword'
export default {
  components: {
    LoginPanel,
    LoggedInPanel,
    ResetPassword
  },
  data() {
    return {
      // 查看子组件传来的用户鉴权信息
      loginInfo: '',
      username : ''
    }
  },
  mounted() {
    this.getToken()
  },
  methods: {
    getLoginInfo(data) {
      this.loginInfo = data.login
      this.username = data.username
      document.getElementById('login').style.display = 'none'
      document.getElementById('loggedin').style.display = 'block'
      // this.$router.go(0)
      console.log(data)
    },
    getToken() {
      let cookie = this.$cookie.get('token')
      console.log('cookie' + cookie)
      if (!!cookie) {
        document.getElementById('login').style.display= 'none'
        document.getElementById('loggedin').style.display = 'block'
        console.log('!!cookie')
        this.$ajax
          .get({
            url: this.$api.GET_USER_INFO
          })
          .then(res => {
            let userInfo = res.data.content
            if (!!userInfo.name) {
              this.username = userInfo.name
            }
          })
      } else {
        document.getElementById('login').style.display = 'block'
        document.getElementById('loggedin').style.display = 'none'
        console.log('cookie not exist')
      }
    }
  }
}
</script>
<style scoped>
#login {
}

#loggedin {
}

.lunbo {
  position: relative;
}

.lunbo .loginpanel {
  position: absolute;
  top: 5%;
  right: 12%;
  box-shadow: 0px 0px 15px lightgrey;
}
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
