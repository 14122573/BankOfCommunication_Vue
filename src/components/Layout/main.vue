// 整体布局文件
<template>
<a-locale-provider :locale="zh_CN">
	<a-layout id="portal">
		<Loader />
		<template v-if="showPurePage">
			<router-view />
		</template>
		<template v-else>
			<a-layout>
				<a-layout-sider id="sideMenu" v-model="collapsed" breakpoint="lg">
					<div id="portalLogo">
						<img class="logo-img" src="@/assets/images/logo.png" alt="logo" />
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
								<a href="#">
									<a-icon type="bell" /></a>
							</a-badge>
							<a-dropdown class="navdropmenu">
								<span>
									<a-icon type="user" /> <span class="name">{{username}}</span>
									<a-icon type="down" />
								</span>
								<a-menu slot="overlay" @click="handleClick">
									<a-menu-item key="person">账户信息</a-menu-item>
									<a-menu-item v-if="showTransferDatas" key="transferDatas">转移个人数据</a-menu-item>
									<a-menu-item v-if="$permission('P21001')" key="expert">专家个人信息</a-menu-item>
									<a-menu-item key="logout">退出登录</a-menu-item>
								</a-menu>
							</a-dropdown>
						</div>
					</a-layout-header>
					<a-layout-content id="appContent" :style="'background: url('+ require('@/assets/images/content-bg.png') + ') no-repeat'">
            <router-view v-show="!showSpaContent" :key="$route.path" />
						<div v-show="showSpaContent" id="content" />
            <a-back-top v-if="showBacktop" :visibilityHeight="100" :target="backTopTarget"/>
					</a-layout-content>
				</a-layout>
			</a-layout>
		</template>
	</a-layout>
</a-locale-provider>
</template>
<script>
import SideMenu from '@/components/Layout/sidemenu'
import NavBar from '@/components/Layout/navbar'
import Loader from '@/components/Loader/loader'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { permission, } from '@/util/mixins'
import '@/config/micSystemRecourceConfig'
import Login from '@/views/login/login'

export default {
  name      : 'Layout',
  mixins    : [ permission ],
  components: {
    NavBar,
    Loader,
    SideMenu,
    Login,
  },
  data() {
    return {
      zh_CN,
      collapsed        : false,
      username         : '',
      loginPhone       : '',
      showPurePage     : false,
      tidingsCount     : 0,
      showSpaContent   : false,
      backTopTarget    : null,
      showBacktop      : false,
      showTransferDatas: false
    }
  },
  created() {
    let token = this.$cookie.get('token')
    if (token != undefined && token != null) {
      this.$ajax.post({
        url   : this.$api.CHECKTOKEN_POST,
        params: {}
      }).then(res => {
        this.getInfo()
        this.setTransferDatas()
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
    '$store.state.userInfos': {
      handler: function(val) {
        if(!!val){
          this.username = !val.username?'':val.username
          this.loginPhone= !val.phone?'':val.phone
          this.setTransferDatas()
        }
      },
      deep: true
    },
    $route(to, from) {
      this.calcBackTopTarget()
      // 切换页面时获取返回顶部按钮的dom依据
      let MicConfigs = this.$store.state.micSystemResourceConfig?this.$store.state.micSystemResourceConfig[process.env.NODE_ENV=='development'?'sit':process.env.NODE_ENV]:[]
      // console.log('calcBackTopTarget',MicConfigs)
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
     * 判断当前登录人，是否有权可转移个人在子业务系统中的申报数据
     */
    setTransferDatas(){
      // to do: 捷安：能力验证、范蠡奖 菜单待定（系统重做）
      // to do: 黄明：大水面、海洋牧场， 休闲渔业（系统重做）
      let allDeclarationCodes = [ 'S060104','S060107','S060108','S060109','S060110','S060112','S050101','S050109','S050301','S050201','S050202','S010101','S010107','S020101','S020103' ]
      let authCodeList=[]
      if(!!this.$store.state.userInfos){
        this.$ajax.get({
          url: this.$api.GET_USER_PEIMISSION
        }).then(res=>{
          if(res.data!=undefined && res.data!=null && res.data.content!=undefined && res.data.content!=null){
            // 当前用户全部权限编码，包含菜单及功能操作
            authCodeList = this.$com.confirm(res, 'data.content', [])
            // 判断当前用户是否拥有 申报单位用户类型的菜单权限
            authCodeList.forEach(element => {
              if(allDeclarationCodes.includes(element)){
                this.showTransferDatas = true
              }
            })
          }
        })
      }
    },

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
        // this.$cookie.remove('systemLists')
        this.$cookie.remove('canEnterBind')
        this.$cookie.remove('NavbarList')
      } else {
        this.$ajax.post({
          url   : this.$api.POST_LOGOUT,
          params: {
            refreshToken: this.$cookie.get('refresh_token')
          }
        }).then(res => {
          this.$store.commit('SET_CLEAR')
          this.$cookie.remove('KeepLogin')
          this.$cookie.remove('token')
          this.$cookie.remove('refresh_token')
          // this.$cookie.remove('userInfo')
          this.$cookie.remove('redirectUrl')
          this.$cookie.remove('url')
          // this.$cookie.remove('systemLists')
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
    handleClick({ key }) {
      switch(key){
      case 'person':
        this.$router.push({ name: 'person' })
        break
      case 'transferDatas':
        this.$router.push({ name: '/person/transferDatas' })
        break
      case 'expert':
        this.$router.push({ name : '/person/expert' ,
          query: {
            loginPhone: this.loginPhone
          }
        })
        break
      case 'logout':
        this.plogout()
        break
      default:
        break
      }
    },
    calcBackTopTarget() {
      // 获取返回顶部按钮的dom依据
      this.$nextTick(() => {
        const dom1 = document.querySelector('.portalDetailContentBody')
        const dom2 = document.querySelector('#appContent')
        if (!dom1 && !dom2) return
        this.showBacktop = false
        this.$nextTick(() => {
          if (dom1) {
            this.backTopTarget = () => dom1
          } else {
            dom2.scrollTo(0,0)
            this.backTopTarget = () => dom2
          }
          this.showBacktop = true
        })
      })
    }
  }
}
</script>

<style scoped>
	#sideMenu {
		z-index: 1;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	}

	#portalHeader {
		background: #fff;
		padding: 0;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
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

	#portalHeader>div {
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
		/* overflow: hidden; */
	}

	#appContent {
		overflow-y: auto;
		padding: 0 0 14px 0;
		background-position: 95% 10%;
		background-size: 20%;
		height: 100%;
	}
	#appContent #content { 	height: 100%; }
	#appContent #content>div { overflow-y: auto; }
</style>
