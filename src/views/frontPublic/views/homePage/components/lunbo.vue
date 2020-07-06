<template>
  <div class="lunbo">
    <!-- <a-carousel :after-change="onChange" effect="fade"> -->
    <a-carousel class="lunbo_carousel" effect="fade">
      <div
        class="loginPlacement"
        v-for="item in bannerOneByOne()"
        :key="item.bannerGroup"
      >
        <a @click="carouselClick(item.linkUrl)">
          <img
            :src="item.filePath"
            alt="ImgPlaceholder"
            style="height: 400px; margin: 0 auto;"
          />
        </a>
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
import LoginPanel from "@/views/frontPublic/views/homePage/components/loginPanel.vue";
import LoggedInPanel from "@/views/frontPublic/views/homePage/components/welcomePanel.vue";
import ResetPassword from "@/views/frontPublic/views/homePage/components/resetPassword.vue";
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
      loginInfo: "",
      username: "",
      pageType: "login",
      isready: false,
      bannerList: []
    };
  },
  mounted() {
    this.getLunbo();
  },
  watch: {
    $route(to, from) {
      // 当前是否在index页，不在的话就隐藏loginpanel和welcomepanel
      to.name == "index"
        ? (this.isInIndexPage = true)
        : (this.isInIndexPage = false);
    }
  },
  methods: {
    bannerOneByOne() {
      let bannerFilter = [];

      for (let i = this.bannerList.length - 1; i >= 0; i--) {
        if (this.bannerList[i].bannerGroup !== "0") {
          bannerFilter.push(this.bannerList[i]);
        }
      }
      return bannerFilter;
    },
    carouselClick(path) {
      if(this.IsURL(path) == true) {
        window.location.href = path
      } else {
        this.$message.error("该图片无链接或链接错误")
      }
      
    },
    IsURL (str_url) { 
      var strRegex = '^((https|http|ftp|rtsp|mms)?://)' 
      + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
      + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
      + '|' // 允许IP和DOMAIN（域名） 
      + '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
      + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
      + '[a-z]{2,6})' // first level domain- .com or .museum 
      + '(:[0-9]{1,4})?' // 端口- :80 
      + '((/?)|' // a slash isn't required if there is no file name 
      + '(/[0-9a-zA-Z_!~*\'().;?:@&=+$,%#-]+)+/?)$'; 
      var re=new RegExp(strRegex); 
      return re.test(str_url);
    },
    getLunbo() {
      this.$ajax
        .get({
          url: this.$api.GET_PUB_BANNER_LIST
        })
        .then(res => {
          this.bannerList = this.$com.confirm(res, "data.content", []);
          this.getToken();
        });
    },
    pageTypeChange(data) {
      this.pageType = data;
      this.username = data;
    },
    getToken() {
      let cookie = this.$cookie.get("token");
      if (!!cookie) {
        this.$ajax
          .get({
            url: this.$api.GET_USER_INFO
          })
          .then(res => {
            let userInfo = res.data.content;
            if (!!userInfo.name) {
              this.username = userInfo.name;
              this.pageType = userInfo.name;
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.ant-carousel >>> li.slick-active button {
  height: 10px;
  width: 10px;
  background: #467fea;
  border-radius: 10px;
}

.ant-carousel >>> li button {
  height: 10px;
  width: 10px;
  background-color: grey;
  border-radius: 10px;
}
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #000;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
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
  top: 8%;
  margin-left: 200px;
  box-shadow: 0px 0px 15px lightgrey;
  transform: scale(1, 1);
  height: 360px;
  zoom: 0.9;
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
