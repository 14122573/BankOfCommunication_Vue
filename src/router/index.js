import Vue from 'vue'
import Router from 'vue-router'
import {
  routes
} from './routes'
import Cookie from '@/util/local-cookie'
import { log } from 'util'
import {MicConfigs} from '@/config/mic'
import store from '@/store'

Vue.use(Router)

const config = {
  mode: 'history',
  routes,
}
const router = new Router(config)

router.beforeEach((to, from, next) => {
  if (MicConfigs.length > 0) {
    // 根据配置文件的子项目路由前缀自动识别state.showSpaContent应该是true还是false
    store.commit('SET_SHOWSPACONTENT', MicConfigs.some(item => to.path.startsWith(item.pathPrefix)))
  }

  // 使刷新页面后侧边菜单可以记住上一次的展开、选中状态
  let curRoute = to
  if (!curRoute.name) {
    curRoute = from
  }
  console.log(to, from);

  console.log(curRoute);

  store.commit('SET_DEFAULTMENU_STATUS', {
    defaultSelectedKeys: [(curRoute && curRoute.name) || ''],
    defaultOpenKeys: [(curRoute && curRoute.matched) ? (curRoute.matched[curRoute.matched.length - 1].parent && curRoute.matched[curRoute.matched.length - 1].parent.name) : ''],
  })

  let token = Cookie.get('token')
  let canEnterBind = Cookie.get('canEnterBind')
  // 当前无token且不在login页面则推到登录页面
  if (!token) {
    // 未登录
    if (to.name == 'login') {
      next()
    } else {
      if (to.name == 'networkerr' || to.name == 'register' || to.name == 'oldSysLogout' || (to.name == 'bindPhone' && canEnterBind == '200')) {
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
