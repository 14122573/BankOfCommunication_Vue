<template>
  <div class="lunbo">
    <!-- <a-carousel :after-change="onChange" effect="fade"> -->
    <a-carousel class="lunbo_carousel" effect="fade">
      <div class="loginPlacement" v-for="(item, index) in bannerList" :key="index">
        <img
          :src="item.filePath"
          alt=""
          style="height: 400px; margin: 0 auto;"
        />
      </div>
    </a-carousel>
    <LoginPanel
      v-if="pageType == 'login'"
      v-show="isInIndexPage"
      id="login"
      class="loginpanel"
      @on-change="pageTypeChange"
    />

    <LoggedInPanel
      v-if="pageType !== 'login' && pageType !== 'forget'"
      id="loggedin"
      v-show="isInIndexPage"
      @on-change="pageTypeChange"
      :nameprop="this.username"
      class="loginpanel"
    />
    <ResetPassword v-if="pageType == 'forget'" @on-change="pageTypeChange" />
  </div>
</template>
<script>
import LoginPanel from '@/views/frontPublic/views/homePage/components/loginPanel.vue'
import LoggedInPanel from '@/views/frontPublic/views/homePage/components/welcomePanel.vue'
import ResetPassword from '@/views/frontPublic/views/homePage/components/resetPassword.vue'
export default {
  components: {
    LoginPanel,
    LoggedInPanel,
    ResetPassword
  },
  data() {
    return {
      isInIndexPage: true,
      // 查看子组件传来的用户鉴权信息
      loginInfo    : '',
      username     : '',
      pageType     : 'login',
      isready      : false,
      bannerList   : []
    }
  },
  mounted() {
    this.getLunbo()
  },
  watch: {
    // '$store.state.userInfos': {
    //   handler: function(val) {
    //     if(!!val){
    //       console.log(val)
    //       this.username = !val.name?'':val.name
    //       this.pageType= !val.name?'login':val.name
    //     }
    //   },
    //   deep: true
    // },
    $route(to, from) {
      // 当前是否在index页，不在的话就隐藏loginpanel和welcomepanel
      to.name == 'index'
        ? (this.isInIndexPage = true)
        : (this.isInIndexPage = false)
    },
  },
  methods: {
    getLunbo() {
      this.$ajax
        .get({
          url: this.$api.GET_PUB_BANNER_LIST
        })
        .then(res => {
          this.bannerList = this.$com.confirm(res, 'data.content', []) 
          this.getToken()
        })
    },
    pageTypeChange(data) {
      this.pageType = data
      this.username = data
    },
    getToken() {
      let cookie = this.$cookie.get('token')
      if (!!cookie) {
        this.$ajax
          .get({
            url: this.$api.GET_USER_INFO
          })
          .then(res => {
            let userInfo = res.data.content
            if (!!userInfo.name) {
              this.username = userInfo.name
              this.pageType = userInfo.name
            }
          })
      }
    }
  }
}
</script>
<style scoped>
.lunbo {
  position: relative;
  width: 100%;
  background-color: #ffffff;
  height: 400px;
}

.lunbo .lunbo_carousel {
  width: 100%;
}

.lunbo .loginpanel {
  position: absolute;
  left: 50%;
  top: 2%;
  margin-left: 200px;
  box-shadow: 0px 0px 15px lightgrey;
  transform: scale(1, 1);
  height: 380px;
}
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
  line-height: 160px;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

.loginPlacement {
}
</style>
