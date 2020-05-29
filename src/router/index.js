import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
import Cookie from '@/util/local-cookie'
import Common from '@/util/common'
import store from '@/store'

Vue.use(Router)

const routers = new Router({
  mode: 'history',
  // base: process.env.NODE_ENV === 'development' ? '/' : '/portal/',
  routes,
})

routers.beforeEach((to, from, next) => {
  // TODO
  store.commit('setWebviewSrc', to.meta && to.meta.src) // 判断有src的话为需要嵌入iframe的子项目
  // store.commit('setWebviewSrc', to.meta && to.meta.src) // 判断有src的话为需要嵌入iframe的子项目
  
  // 使刷新页面后侧边菜单可以记住上一次的展开、选中状态
  // if (to && to.name) {
  //   store.commit('SET_DEFAULTMENU_STATUS', {
  //     defaultSelectedKeys: [ (to && to.name) || '' ],
  //     defaultOpenKeys    : [ (to && to.matched) ? (to.matched[to.matched.length - 1].parent && to.matched[to.matched.length - 1].parent.name) : '' ],
  //   })
  // }

  const token = Cookie.get('token')
  const canEnterBind = Cookie.get('canEnterBind')
  if(!token && to.name != 'login'){
    next('/login')
  }else{
    next()
  }
  // 当前无token且不在login页面则推到登录页面
  // if (!token) {
  //   // 未登录
  //   if (to.name == 'login') {
  //     next()
  //   } else {
  //     const uneedTokenRouter=[ '/veterinary/view', '/veterinary', '/cms/noticePublish', '/cms/noticePublish/view', '/cms/knowledgePublish/view', '/cms/knowledgeAnonymous', 'upperLimitErr', 'register', 'oldSysLogout', 'outerNetworkerr' ]
  //     // console.log(to.name,Common.oneOf(to.name,uneedTokenRouter) )
  //     // if (Common.oneOf(to.name,uneedTokenRouter) || (to.name == 'bindPhone' && canEnterBind == '200')) {
  //     if (Common.oneOf(to.name, uneedTokenRouter) || (Common.oneOf(to.name, [ 'bindPhone', 'bindTemporarayAccount' ]) && canEnterBind == '200')) {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   }
  // } else { // 已经登录
  //   // if (Common.oneOf(to.name,['login','bindPhone'])) {
  //   if (Common.oneOf(to.name, [ 'login', 'bindPhone', 'bindTemporarayAccount' ])) {
  //     next('/home')
  //   } else {
  //     next()
  //   }
  // }
})

export default routers
