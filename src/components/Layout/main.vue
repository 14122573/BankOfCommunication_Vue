// 整体布局文件
<template>
	<a-layout id="portal">
		<Loader />
		<template v-if="showPurePage">
			<router-view />
		</template>
		<template v-else>
			<a-layout>
				<a-layout-sider id="sideMenu" v-model="collapsed" breakpoint="lg">
					<div id="portalLogo">
            <img class="logo-img" src="@/assets/images/logo.png" alt="logo"/>
            <span v-show="!collapsed" class="logo-name">智能渔技</span>
					</div>
					<SideMenu :menuMode="menuMode" />
				</a-layout-sider>
        <a-layout style="overflow:hidden">
          <a-layout-header id="portalHeader">
            <div>
              <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleSideCollapsed" />
              <NavBar />
            </div>
            <div>
              <a-badge class="navTidings" :count="tidingsCount" showZero>
                <a href="#"><a-icon type="bell" /></a>
              </a-badge>
              <a-dropdown class="navdropmenu">
                <span>
                  <a-icon type="user" /> <span class="name">{{username}}</span>
                  <a-icon type="down" />
                </span>
                <a-menu slot="overlay" @click="handleClick">
                  <a-menu-item key="person">个人中心</a-menu-item>
                  <a-menu-item key="logout">退出登录</a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </a-layout-header>
          <a-layout-content id="appContent">
            <router-view v-show="!showSpaContent" :key="$route.path" />
            <div v-show="showSpaContent" id="content" />
          </a-layout-content>
        </a-layout>
			</a-layout>
		</template>
	</a-layout>
</template>
<script>
import SideMenu from '@/components/Layout/sidemenu'
import NavBar from '@/components/Layout/navbar'
import Loader from '@/components/Loader/loader'
import {
  permission,
} from '@/util/mixins'
import {MicConfigs} from '@/config/mic'
import Login from '@/views/login/login'

export default {
  name: 'Layout',
  mixins: [permission],
  components: {
    NavBar,
    Loader,
    SideMenu,
    Login,
  },
  data() {
    return {
      collapsed: false,
      username: '',
      showPurePage: false,
      tidingsCount: 0,
      showSpaContent: false,
    }
  },
  created() {
    let token = this.$cookie.get('token')
    if (token != undefined && token != null) {
      this.$ajax.post({
        url: this.$api.CHECKTOKEN_POST,
        params: {}
      }).then(res => {
        this.getInfo()
      })
    } else {
      this.plogout(true)
    }

    /** 持久化存储vuex 使其页面刷新后数据不丢失 */
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('VuexStore')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('VuexStore'))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('VuexStore', JSON.stringify(this.$store.state))
    })
  },
  watch: {
    '$store.state.userName': {
      handler: function(val) {
        this.username = val
      },
      deep: true
    },
    $route(to, from) {
      if (MicConfigs.length > 0) {
        // 根据配置文件的子项目路由前缀自动识别state.showSpaContent应该是true还是false
        this.showSpaContent = MicConfigs.some(item => to.path.startsWith(item.pathPrefix))
      }

      if (!to.name) {
        this.showPurePage = false
        return
      }
      // 监听路由，只要是没有parent的路由就独立显示而不是嵌套在layout中显示
      if (to.matched && to.matched.length > 0 && !to.matched[to.matched.length - 1].parent) {
        this.showPurePage = true
      } else {
        this.showPurePage = false
      }
    },
  },
  computed: {
    menuMode() {
      return this.collapsed ? 'vertical' : 'inline'
    },
  },
  methods: {
    /**
			 * @param {boolean} isOnlyClear 是否需要调用接口登出 ； false，不需要；
			 */
    plogout(isOnlyClear) {
      isOnlyClear = (isOnlyClear != undefined && isOnlyClear != null) ? isOnlyClear : false
      if (isOnlyClear) {
        this.$store.commit('SET_CLEAR')
        this.$cookie.remove('token')
        this.$cookie.remove('refresh_token')
        // this.$cookie.remove('userInfo')
        this.$cookie.remove('redirectUrl')
        this.$cookie.remove('url')
        this.$cookie.remove('systemLists')
        this.$cookie.remove('canEnterBind')
        this.$cookie.remove('NavbarList')
      } else {
        this.$ajax.post({
          url: this.$api.POST_LOGOUT,
          params: {}
        }).then(res => {
          this.$store.commit('SET_CLEAR')
          this.$cookie.remove('KeepLogin')
          this.$cookie.remove('token')
          this.$cookie.remove('refresh_token')
          // this.$cookie.remove('userInfo')
          this.$cookie.remove('redirectUrl')
          this.$cookie.remove('url')
          this.$cookie.remove('systemLists')
          this.$cookie.remove('canEnterBind')
          this.$cookie.remove('NavbarList')
          this.$router.push({
            name: 'login'
          })
        })
      }
    },
    toggleSideCollapsed() {
      this.collapsed = !this.collapsed
    },
    handleClick({key}) {
      if (key == 'person') {
        this.$router.push({
          name: 'person'
        })
      }
      if (key == 'logout') {
        this.plogout()
      }
    }
  }
}
</script>

<style scoped>
  #sideMenu {
    z-index: 1;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
  }
	#portalHeader {
		background: #fff;
		padding: 0;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    z-index: 1;
	}
  #portalLogo {
    display: flex;
    align-items: center;
    justify-content: center;
		height: 64px;
		background: #00284e;
		width: 100%;
	}
  #portalLogo .logo-img {
		width: 40px;
		height: 40px;
	}
	#portalLogo .logo-name {
		color: #fff;
		font-size: 20px;
    margin-left: 10px;
	}
  #portalHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
		padding: 0 2rem;
	}
  #portalHeader > div {
    display: flex;
    align-items: center;
  }
  #portalHeader .trigger {
		font-size: 18px;
		cursor: pointer;
    margin-right: 20px;
	}
  #portalHeader .navdropmenu {
		cursor: pointer;
	}
  #portalHeader .navdropmenu .name {
		padding: 0 5px
	}
  #portalHeader .navTidings {
		cursor: pointer;
    margin-right: 30px;
	}
</style>

<style>
	#portal,
	#Layout {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		width: 100%;
		height: 100%;
    overflow: hidden;
	}
  #appContent {
    overflow-y:auto;
    padding-bottom:16px;
    background: url('../../assets/images/content-bg.png') no-repeat;
    background-position: 95% 10%;
    background-size: 20%;
    height: 100%;
  }
  #appContent #content { height: 100%;}
</style>
