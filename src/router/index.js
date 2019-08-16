import Vue from 'vue'
import Router from 'vue-router'
import {
	routes
} from './routes'
import Cookie from '@/util/local-cookie'

Vue.use(Router)

const config = {
	mode: 'history',
	routes,
}
const router = new Router(config)

router.beforeEach((to, from, next) => {
	const token = Cookie.get('token')
	const canEnterBind = Cookie.get('canEnterBind')
	// 当前无token且不在login页面则推到登录页面
	if (to.path == '/bindPhone') {
		if (canEnterBind != '200') {
			next('/login')
		} else {
			next()
		}
	} else {
		if ((!token || token == 'undefined') && to.path != '/login') {
			next('/login')
		} else {
			next()
		}
	}
})

export default router
