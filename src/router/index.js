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
  let token = Cookie.get('token')
  let canEnterBind = Cookie.get('canEnterBind')
  // 当前无token且不在login页面则推到登录页面
  let isLogin = token == undefined || token == null || token == '' ? false : true
  if (!isLogin) {
    // 未登录
    if (to.name == 'login') {
      next()
    } else {
      if (to.name == 'bindPhone' && canEnterBind == '200') {
        next()
      } else {
        next('/login')
      }
    }
  } else { // 已经登录
    if (to.name == 'login' || to.name == 'bindPhone') {
      next('/home')
    } else {
      next()
    }
  }
})

export default router
