import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
import Cookie from '@/util/local-cookie'
// import { log } from 'util'
import Common from '@/util/common'
import store from '@/store'

Vue.use(Router)

const config = {
  mode: 'history',
  base: process.env.NODE_ENV === 'development' ? '/' : '/portal/',
  routes,
}
const router = new Router(config)

router.beforeEach((to, from, next) => {
  // 使刷新页面后侧边菜单可以记住上一次的展开、选中状态
  if (to && to.name) {
    store.commit('SET_DEFAULTMENU_STATUS', {
      defaultSelectedKeys: [(to && to.name) || ''],
      defaultOpenKeys: [(to && to.matched) ? (to.matched[to.matched.length - 1].parent && to.matched[to.matched.length - 1].parent.name) : ''],
    })
  }

  let token = Cookie.get('token')
  let canEnterBind = Cookie.get('canEnterBind')
  // 当前无token且不在login页面则推到登录页面
  if (!token) {
    // 未登录
    if (to.name == 'login') {
      next()
    } else {
      let uneedTokenRouter=['/cms/noticePublish','/cms/noticePublish/view','/cms/knowledgePublish/view','/cms/knowledgeAnonymous','upperLimitErr','register','oldSysLogout','outerNetworkerr']
      if (Common.oneOf(to.name,uneedTokenRouter) || (to.name == 'bindPhone' && canEnterBind == '200')) {
        next()
      } else {
        next('/login')
      }
    }
  } else { // 已经登录
    if (Common.oneOf(to.name,['login','bindPhone'])) {
      next('/home')
    } else {
      next()
    }
  }
  // if (!to.name) {
  //   next('/error-page')
  // } else {
  //   next()
  // }
})

export default router
