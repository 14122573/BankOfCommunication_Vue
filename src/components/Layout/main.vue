// 整体布局文件
<template>
	<a-layout id="portal">
		<Loader />
		<a-layout-sider :collapsed="collapsed" breakpoint="lg" collapsedWidth="80">
			<div id="logo">
				<img src="@/assets/images/logo.png" alt=""><span v-show="!collapsed">智能渔技</span>
			</div>
			<SideMenu :menuMode="menuMode" :collapsed="collapsed"></SideMenu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header class="ant-layout-header">
				<div class="header">
					<a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" />
					<NavBar class="navbar" />
				</div>
				<div style="display: flex; align-items: center;justify-content: space-between;">
					<div class="profile">
						<a href="" class="setting">
							<a-icon type="solution" />
							{{username}}
						</a>
						<a-dropdown>
							<span class="setting">
								<a-icon type="setting" />设定
								<a-icon type="caret-down" />
							</span>
							<a-menu slot="overlay" @click="handleClick">
								<a-menu-item key="1">个人中心</a-menu-item>
								<a-menu-item key="2">退出登录</a-menu-item>
							</a-menu>
						</a-dropdown>
					</div>
				</div>
			</a-layout-header>
			<a-layout-content id="AppContent">
				<div id="content">
					<router-view :key="$route.path"></router-view>
				</div>
			</a-layout-content>
		</a-layout>
	</a-layout>

</template>
<script>
	import SideMenu from '@/components/Layout/sidemenu'
	import NavBar from '@/components/Layout/navbar'
	import Loader from '@/components/Loader/loader'
	import {
		permission
	} from '@/util/mixins'
	export default {
		name: 'Layout',
		mixins: [permission],
		components: {
			NavBar,
			Loader,
			SideMenu
		},
		data() {
			return {
				collapsed: false,
				username:''
			}
		},
		created() {
			this.getPermission()
			this.getUserInfo()
		},
		computed: {
			menuMode() {
				return this.collapsed ? 'inline' : 'vertical'
			}
		},
		methods: {
			getUserInfo() {
				this.$ajax.get(
					this,
					this.$api.GET_USER_INFO, {},
					null,
					(res) => {
						this.$cookie.set('userInfo', res.data.content)
						this.username=res.data.content.name||res.data.content.phone
					},
				)
			},
			handleClick({
				key
			}) {
				if (key == 1) {
					this.$router.push({
						name: 'person'
					})
				}
				if (key == 2) {
					this.$cookie.remove('token')
					this.$cookie.remove('redirectUrl')
					this.$cookie.remove('userInfo')
					this.$cookie.remove('url')
					this.$cookie.remove('systemLists')
					this.$cookie.remove('canEnterBind')
					this.$router.replace({
						name: 'login'
					})
				}
			}
		}
	}
</script>

<style scoped>
	#Layout {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	#portal,
	#layout {
		width: 100%;
		height: 100%;
	}

	#logo {
		height: 64px;
		background: #00284e;
		width: 100%;
		color: white;
		padding: 0 16px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 16px;
	}

	#logo img {
		width: 50px;
		height: 50px;
		vertical-align: middle;
		margin: 2px 15px 0 0;
	}

	#logo .logo-title {
		color: #fff;
		font-size: 24px;
		line-height: 64px
	}

	#AppContent {
		margin: 24px 16px 0
	}

	#AppContent .wrapper {
		padding: 24px;
		background: #fff;
		min-height: 98%
	}

	.ant-layout-header {
		background: #fff;
		padding: 0;
		-moz-box-shadow: 0px 2px 4px #B0B0B0;
		-webkit-box-shadow: 0px 2px 4px #B0B0B0;
		box-shadow: 0px 2px 4px #B0B0B0;
		font-size: 14px;
		display: flex;
		color: rgba(0, 0, 0, 0.45);
		justify-content: space-between;
		align-items: center;
		padding: 0 16px;
	}

	.ant-layout-header .trigger {
		font-size: 18px;
		cursor: pointer;
		transition: color .3s;
		margin-right: 10px;
	}

	.header {
		width: 600px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.profile {
		width: 210px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.setting {
		color: #66707c;
		text-decoration: none;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.setting:hover {
		color: rgba(0, 0, 0, 0.45);
		cursor: pointer;
	}

	.setting i {
		display: inline-block;
		margin: 0 8px;
		font-size: 14px;
		color: rgba(0, 0, 0, 0.45);
	}

	.setting i:nth-child(2) {
		margin: 0 5px 0 3px;
		font-size: 12px;
	}

	.ant-menu-submenu-active {
		background: #313e51;
	}
</style>
