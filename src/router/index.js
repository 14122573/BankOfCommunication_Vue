import Vue from 'vue'
import Router from 'vue-router'
import {
  routes
} from './routes'
import Cookie from '@/util/local-cookie'
import Common from '@/util/common'
import { log } from 'util'
import store from '@/store'

Vue.use(Router)

const config = {
  mode: 'history',
  routes
}
const router = new Router(config)

router.beforeEach((to, from, next) => { 
  // TODO
  store.commit('setWebviewSrc', to.meta && to.meta.src) // 判断有src的话为需要嵌入iframe的子项目
  // store.commit('setWebviewSrc', to.meta && to.meta.src) // 判断有src的话为需要嵌入iframe的子项目

  const token = Cookie.get('token')
  const canEnterBind = Cookie.get('canEnterBind')
  // 当前无token且不在login页面则推到登录页面
  if (!token) {
    // 未登录
    if (to.path.indexOf('/homepage') !== -1) { // 首页所有路由允许访问
      next()
    } else {
      const uneedTokenRouter=[ '/veterinary/view', '/veterinary', '/cms/noticePublish', '/cms/noticePublish/view', '/cms/knowledgePublish/view', '/cms/knowledgeAnonymous', 'upperLimitErr', 'register', 'oldSysLogout', 'networkerr' ]
      // if (Common.oneOf(to.name,uneedTokenRouter) || (to.name == 'bindPhone' && canEnterBind == '200')) {
      if (Common.oneOf(to.name, uneedTokenRouter) || to.name.indexOf('/homepage')>=0 || (Common.oneOf(to.name, [ 'bindPhone', 'bindTemporarayAccount' ]) && canEnterBind == '200')) {
        next()
      } else {
        next('/login')
      }
    }
  } else { // 已经登录
    // if (Common.oneOf(to.name,['login','bindPhone'])) {
    if (Common.oneOf(to.name, [ 'bindPhone', 'bindTemporarayAccount' ])) {
      next('/home')
    } else {
      next()
    }
  }
})

export default router
