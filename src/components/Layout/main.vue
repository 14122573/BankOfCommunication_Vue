// 整体布局文件
<template>
	<a-layout id="portal">
		<Loader />
		<template v-if="showPurePage">
			<router-view />
		</template>
		<template v-else>
			<a-layout>
				<a-layout-sider :collapsed="collapsed" breakpoint="lg" collapsedWidth="80" width="16%" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0,zIndex:2 }">
					<div id="portalLogo">
						<span class="logo-img"></span><span v-if="!collapsed" class="logo-title">智能渔技</span>
					</div>
					<SideMenu :menuMode="menuMode" :collapsed="collapsed"></SideMenu>
				</a-layout-sider>
				<a-layout-header id="portalHeader"  :style="{ position: 'fixed', zIndex: 1, width: '84%',marginLeft:'215px' }">
					<div class="wrapper">
						<a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleSideCollapsed" />
						<NavBar class="navbar" />
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
						<a-badge class="navTidings" :count="tidingsCount" showZero>
							<a href="#" class="head-example">
								<a-icon type="bell" /></a>
						</a-badge>
					</div>
				</a-layout-header>
				<a-layout-content id="AppContent">
					<div v-show="!showSpaContent" class="wrapper">
						<router-view :key="$route.path"></router-view>
					</div>
					<div v-show="showSpaContent">
						<div id="content"></div>
					</div>
				</a-layout-content>
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
    }
  },
  created() {
    const token = this.$cookie.get('token')
    if (token) {
      this.getInfo()
    } else {
      this.plogout(true)
    }

    // if (token != undefined && token != null) {
    //   this.$ajax.post({
    //     url: this.$api.CHECKTOKEN_POST,
    //     params: {}
    //   }).then(res => {
    //     this.getInfo()
    //   })
    // } else {
    //   this.plogout(true)
    // }
  },
  watch: {
    '$store.state.userName': {
      handler: function(val) {
        this.username = val
      },
      deep: true
    },
    $route(to, from) {
      // 监听路由，只要是没有parent的路由就独立显示而不是嵌套在layout中显示
      if (to.matched && to.matched.length > 0 && !to.matched[to.matched.length - 1].parent) {
        this.showPurePage = true
      } else {
        this.showPurePage = false
      }
    }

  },
  computed: {
    menuMode() {
      return this.collapsed ? 'vertical' : 'inline'
    },
    showSpaContent() {
      return this.$store.state.showSpaContent
    }
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
        this.$cookie.remove('userInfo')
        this.$cookie.remove('redirectUrl')
        this.$cookie.remove('url')
        this.$cookie.remove('systemLists')
        this.$cookie.remove('canEnterBind')
      } else {
        this.$ajax.post({
          url: this.$api.POST_LOGOUT,
          params: {}
        }).then(res => {
          this.$com.handleLogOut()
        })
      }
    },
    toggleSideCollapsed() {
      this.collapsed = !this.collapsed
    },
    handleClick({
      key
    }) {
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
	#portalHeader {
		background: #fff;
		padding: 0
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
		/* overflow: hidden; */
	}

	#portalLogo {
		height: 64px;
		background: #00284e;
		width: 100%;
		text-align: left
	}

	#portalLogo .logo-img {
		float: left;
		margin: 10px 10px 0 15px;
		display: inline-block;
		width: 44px;
		height: 44px;
		background: url('../../assets/images/logo.png');
		background-size: 100%
	}

	#portalLogo .logo-title {
		color: #fff;
		font-size: 24px;
		line-height: 64px
	}

	#portalHeader .wrapper {
		padding: 0 2rem
	}

	#portalHeader .trigger {
		float: left;
		font-size: 18px;
		line-height: 20px;
		margin: 20px 16px 0 0;
		cursor: pointer;
	}

	#portalHeader .navbar {
		float: left;
		line-height: 20px;
		margin-top: 22px
	}

	#portalHeader .navdropmenu {
		float: right;
		cursor: pointer;
	}

	#portalHeader .navdropmenu .name {
		padding: 0 10px 0 5px
	}

	#portalHeader .navTidings {
		float: right;
		margin-right: 40px;
		margin-top: 30px;
		cursor: pointer;
	}

	#AppContent {
		width: 84%;
		margin: 78px 16px 0 230px;
		background: url('../../assets/images/content-bg.png') no-repeat top right;
		background-size: 20%;
	}

	#AppContent .contentbg {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 1;
		width: 20%
	}

	#AppContent .wrapper {
		padding: 1px;
		min-height: 98%
	}
</style>
