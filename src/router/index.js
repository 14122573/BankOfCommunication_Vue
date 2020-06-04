import Vue from 'vue'
import Router from 'vue-router'
import {
  routes
} from './routes'
import Cookie from '@/util/local-cookie'
import { log } from 'util'
import store from '@/store'

Vue.use(Router)

const config = {
  mode: 'history',
  routes,
}
const router = new Router(config)

router.beforeEach((to, from, next) => {
  // 使刷新页面后侧边菜单可以记住上一次的展开、选中状态
  if (to && to.name) {
    store.commit('SET_DEFAULTMENU_STATUS', {
      defaultSelectedKeys: [ (to && to.name) || '' ],
      defaultOpenKeys    : [ (to && to.matched) ? (to.matched[to.matched.length - 1].parent && to.matched[to.matched.length - 1].parent.name) : '' ],
    })
  }

  let token = Cookie.get('token')
  let canEnterBind = Cookie.get('canEnterBind')
  // 当前无token且不在login页面则推到登录页面
  if (!token) {
    // 未登录
    if (to.name == 'new_login') {
      next()
    } else {
      if (to.name == 'upperLimitErr' || to.name == 'networkerr' || to.name == 'register' || to.name == 'oldSysLogout' || (to.name == 'bindPhone' && canEnterBind == '200')) {
        next()
      } else {
        next('/new_home/login')
      }
    }
  } else { // 已经登录
    if (to.name == 'new_login' || to.name == 'bindPhone') {
      next('/home')
    } else {
      next()
    }
  }
})

export default router
