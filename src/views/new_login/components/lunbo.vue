<template>
  <div class="lunbo">
    <a-carousel :after-change="onChange" effect="fade">
      <div><img src="@/assets/images/home/sy_banner.jpg" alt="" style="width: 100%; height: 400px"></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
    </a-carousel>
    <LoginPanel v-if="!getToken()" class="loginpanel" @isLogin="getLoginInfo" />
    <LoggedInPanel :nameprop='username' v-else class="loginpanel" @isLogin="getLoginInfo" />
  </div>
</template>
<script>
import LoginPanel from '@/views/new_login/components/LoginPanel'
import LoggedInPanel from '@/views/new_login/components/welcomePanel'
export default {
  components: {
    LoginPanel,
    LoggedInPanel
  },
  mounted() {
    
  },
  data() {
    return {
      // 查看子组件传来的用户鉴权信息
      loginInfo: '',
      username : ''
    }
  },
  methods: {
    getLoginInfo(data) {
      this.loginInfo = data.login
      this.username = data.username
      console.log(data)
    },
    getToken() {
      let cookie = this.$cookie.get('token')
      console.log(cookie)
      return cookie;
    }
  },
}
</script>
<style scoped>
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