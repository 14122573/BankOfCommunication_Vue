<template>
  <div class="lunbo">
    <!-- <a-carousel :after-change="onChange" effect="fade"> -->
    <a-carousel class="lunbo_carousel" effect="scrollx" autoplay :autoplaySpeed="aSpeed">
      <div
        class="loginPlacement"
        v-for="item in bannerList"
        :key="item.bannerGroup"
      >
        <img v-if="item.linkUrl == null || !IsURL(item.linkUrl)"
            :src="item.filePath"
            alt="ImgPlaceholder"
            style="height: 400px; margin: 0 auto; width: 100%"
        />
        <a @click="carouselClick(item.linkUrl)" v-else>
          <img
            :src="item.filePath"
            alt="ImgPlaceholder"
            style="height: 400px; margin: 0 auto; width: 100%"
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
      bannerList   : [],
      aSpeed       : 5000
    }
  },
  mounted() {
    this.getLunbo()
  },
  watch: {
    /**
     * @description 判断当前是否在index页，不在的话就隐藏loginpanel和welcomepanel
     * @param {Array} to 路由要去的页面
     */
    $route(to, from) {
      to.name == 'index'
        ? (this.isInIndexPage = true)
        : (this.isInIndexPage = false)
    }
  },
  methods: {
    /**
     * @description 点击轮播图跳转到轮播图对应的链接
     * @param {String} path 轮播图对应的链接
     */
    carouselClick(path) {
      if(!!path) {
        // 如果为正确的链接地址且开头为http或https
        if(this.IsURL(path) == true && (path.indexOf('http://') == 0 || path.indexOf('https://') == 0)) {
          window.open(path)
        } else if (this.IsURL(path) == true) {
          window.open('http://' + path)
        }
      }
    },

    /**
     * @description 检查轮播图链接是否有效
     * @returns {Bool} 返回校验结果
     */
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
      + '(/[0-9a-zA-Z_!~*\'().;?:@&=+$,%#-]+)+/?)$' 
      var re=new RegExp(strRegex) 
      return re.test(str_url)
    },

    /**
     * @description 根据轮播图的bannerGroup进行排序
     * @param {String} propertyName 需要根据排序的字段
     * @returns {Int} 返回排序的结果
     */
    compare(propertyName) {
      return function(object1, object2) {
        var value1 = object1[propertyName]
        var value2 = object2[propertyName]
        if (value2 < value1) {
          return 1
        } else if (value2 > value1) {
          return -1
        } else {
          return 0
        }
      }
    },

    /**
     * @description 获取需要展示的轮播图
     */
    getLunbo() {
      let toSortList = []
      this.$ajax
        .get({
          url   : this.$api.GET_PUB_BANNER_LIST,
          params: {
            bannerGroup_nin: 0
          }
        })
        .then(res => {
          toSortList = this.$com.confirm(res, 'data.content', [])
          toSortList.sort(this.compare('bannerGroup'))
          this.bannerList = toSortList
          this.getToken()
        })
    },

    /**
     * @description 监听并用于切换LoginPanel, welcomepanel的状态
     */
    pageTypeChange(data) {
      this.pageType = data
      this.username = data
    },

    /**
     * @description 获取当前用户的token
     */
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
  left: 49.6%;
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
